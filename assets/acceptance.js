export const acceptanceSummary = {
  accept: [
    "1BR / 2BR in Gueliz or Hivernage",
    "Elevator above 2nd floor",
    "Split AC in bedroom and living room",
    "Quiet street at night",
    "Owner agrees to safety kit (smoke alarm, extinguisher) and pro photos"
  ],
  caseByCase: [
    "Studios in A-locations (quiet block, elevator, strong reviews nearby)",
    "Medina streets with easy car access/parking"
  ],
  notFit: [
    "Units over/near nightclubs or chronic noise/odors",
    "Outskirts with weak transport/amenities",
    "3BR+ until operations team is scaled"
  ]
};

export const acceptanceTable = [
  { area: "Gueliz", cat: "Studio", cohostFurnished: "⚠️ if A‑block & quiet; churny", cohostUnfurnish: "⚠️ only if furnish ≤ 25k MAD", leaseFurnished: "⚠️ slim buffer; avoid noisy streets", leaseUnfurnish: "❌ CAPEX rarely pays" },
  { area: "Gueliz", cat: "1BR", cohostFurnished: "✅ bread‑and‑butter", cohostUnfurnish: "✅ payback ~6–10 mo if furnish ≤ 45k", leaseFurnished: "✅ if 25–30% buffer after costs", leaseUnfurnish: "⚠️ if landlord co‑funds CAPEX" },
  { area: "Gueliz", cat: "2BR", cohostFurnished: "✅ families/long weekends", cohostUnfurnish: "✅ if 2nd BR is true room", leaseFurnished: "⚠️ watch seasonality", leaseUnfurnish: "⚠️ near schools/parks only" },
  { area: "Hivernage", cat: "Studio", cohostFurnished: "⚠️ near venues; price wars", cohostUnfurnish: "⚠️ design must pop", leaseFurnished: "❌ risk/ADR mismatch", leaseUnfurnish: "❌ skip" },
  { area: "Hivernage", cat: "1BR", cohostFurnished: "✅ high‑yield if quiet + AC", cohostUnfurnish: "✅ if furnish ≤ 50k", leaseFurnished: "⚠️ OK with aligned deposit", leaseUnfurnish: "⚠️ negotiate rent; CAPEX high" },
  { area: "Hivernage", cat: "2BR", cohostFurnished: "✅ photos + parking matter", cohostUnfurnish: "✅ but CAPEX climbs", leaseFurnished: "⚠️ control party risk", leaseUnfurnish: "⚠️ turnovers heavier" },
  { area: "Medina (car‑access)", cat: "1BR", cohostFurnished: "⚠️ ops friction; charge 25%", cohostUnfurnish: "⚠️ furnish for durability", leaseFurnished: "❌ access hurts", leaseUnfurnish: "❌ skip early" },
  { area: "Palmeraie", cat: "1BR/2BR", cohostFurnished: "⚠️ depends on resort/transport", cohostUnfurnish: "⚠️ watch seasonality", leaseFurnished: "❌ thin at start", leaseUnfurnish: "❌ skip" },
  { area: "Outskirts/Other", cat: "Any", cohostFurnished: "⚠️ discount heavy", cohostUnfurnish: "❌ usually no", leaseFurnished: "❌ no", leaseUnfurnish: "❌ no" }
];
