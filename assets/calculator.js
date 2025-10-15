import { COHOST_FEE_STANDARD, COHOST_FEE_FLAGGED, COHOST_FEE_FLOOR_MAD } from "./config.js";

async function loadBaselines() {
  const res = await fetch("./data/baselines.json");
  return res.json();
}

function pickMid([lo, hi]) { return Math.round((lo + hi) / 2); }
function pickMidOcc([lo, hi]) { return ((lo + hi) / 2); }

export async function runCalc({area, category, flags, mode, fixedRentMAD=0}) {
  const base = await loadBaselines();
  const group = base[area] || {};
  const row = group[category];
  if (!row) return { ok:false, reason: "No baseline for this combo." };

  let adr = pickMid(row.ADR);
  let occ = pickMidOcc(row.Occ);

  // Ops adjustments
  if (flags.noElevatorFourthPlus) adr *= 0.95;         // -5% ADR
  if (flags.highNoise) occ *= 0.95;                    // -5% Occ
  if (flags.noAC) adr *= 0.93;                         // -7% ADR
  if (flags.parking) occ *= 1.02;                      // +2% Occ
  if (occ > 0.85) occ = 0.85; if (occ < 0.25) occ = 0.25;

  const nights = 30;
  const gross = adr * occ * nights;

  if (mode === "cohost") {
    const flagged = flags.flaggedOps === true;
    const feePct = flagged ? COHOST_FEE_FLAGGED : COHOST_FEE_STANDARD;
    const feeMAD = Math.max(gross * feePct, COHOST_FEE_FLOOR_MAD);
    const ownerNet = gross - feeMAD - 1000; // simple utilities/HOA estimate
    return {
      ok:true, area, category, adr: Math.round(adr), occ: Math.round(occ*100),
      gross: Math.round(gross), feePct: Math.round(feePct*100), feeMAD: Math.round(feeMAD),
      ownerNet: Math.round(ownerNet)
    };
  }

  if (mode === "lease") {
    // Show buffer after fixed rent + ops costs (clean/consumables rough 12%)
    const opsCost = gross * 0.12 + 1000; // simple model
    const buffer = gross - opsCost - fixedRentMAD;
    return {
      ok:true, area, category, adr: Math.round(adr), occ: Math.round(occ*100),
      gross: Math.round(gross), fixedRentMAD, opsCost: Math.round(opsCost),
      buffer: Math.round(buffer)
    };
  }

  return { ok:false, reason: "Unknown mode" };
}
