import { runCalc } from "./calculator.js";
import { acceptanceSummary } from "./acceptance.js";

function q(sel){ return document.querySelector(sel); }
function val(sel){ const el=q(sel); return el?.value || ""; }
function chk(sel){ const el=q(sel); return !!el?.checked; }

function renderAcceptanceBox(){
  const box = q("#acceptanceBox");
  if(!box) return;
  const { accept, caseByCase, notFit } = acceptanceSummary;
  box.innerHTML = `
  <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 grid gap-3">
    <h3 class="font-semibold text-emerald-900">What we’re looking for</h3>
    <div class="grid md:grid-cols-3 gap-4 text-sm">
      <div>
        <div class="font-semibold mb-1">We typically accept</div>
        <ul class="list-disc ml-5">${accept.map(x=>`<li>${x}</li>`).join("")}</ul>
      </div>
      <div>
        <div class="font-semibold mb-1">Case by case</div>
        <ul class="list-disc ml-5">${caseByCase.map(x=>`<li>${x}</li>`).join("")}</ul>
      </div>
      <div>
        <div class="font-semibold mb-1">Not a fit (for now)</div>
        <ul class="list-disc ml-5">${notFit.map(x=>`<li>${x}</li>`).join("")}</ul>
      </div>
    </div>
  </div>`;
}

async function onCalc(mode){
  const area = val("#area");
  const category = val("#category");
  const flags = {
    noElevatorFourthPlus: chk("#noElevator"),
    highNoise: chk("#highNoise"),
    noAC: chk("#noAC"),
    parking: chk("#parking"),
    flaggedOps: chk("#flaggedOps")
  };
  const fixedRentMAD = Number(val("#fixedRent")) || 0;
  const res = await runCalc({area, category, flags, mode, fixedRentMAD});
  const out = q("#result");
  if(!res.ok){ out.textContent = res.reason; return; }
  if(mode==="cohost"){
    out.innerHTML = `
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="bg-white rounded-xl p-3 border"><div>ADR</div><div class="text-lg font-semibold">${res.adr} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Occupancy</div><div class="text-lg font-semibold">${res.occ}%</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Gross (30d)</div><div class="text-lg font-semibold">${res.gross.toLocaleString()} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Co-host Fee (${res.feePct}%)</div><div class="text-lg font-semibold">${res.feeMAD.toLocaleString()} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border col-span-2"><div>Estimated Owner Net (after utilities/HOA)</div><div class="text-xl font-semibold">${res.ownerNet.toLocaleString()} MAD</div></div>
      </div>`;
  } else {
    const color = res.buffer >= 0 ? "text-emerald-700" : "text-rose-700";
    out.innerHTML = `
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="bg-white rounded-xl p-3 border"><div>ADR</div><div class="text-lg font-semibold">${res.adr} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Occupancy</div><div class="text-lg font-semibold">${res.occ}%</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Gross (30d)</div><div class="text-lg font-semibold">${res.gross.toLocaleString()} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Ops Cost (est.)</div><div class="text-lg font-semibold">${res.opsCost.toLocaleString()} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border"><div>Fixed Rent</div><div class="text-lg font-semibold">${res.fixedRentMAD.toLocaleString()} MAD</div></div>
        <div class="bg-white rounded-xl p-3 border col-span-2"><div>Buffer after costs</div><div class="text-xl font-semibold ${color}">${res.buffer.toLocaleString()} MAD</div></div>
      </div>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderAcceptanceBox();
  document.querySelector("#btnCohost")?.addEventListener("click", () => onCalc("cohost"));
  document.querySelector("#btnLease")?.addEventListener("click", () => onCalc("lease"));
});
