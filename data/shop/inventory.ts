export type InventoryCategory = "vinyl" | "ppf" | "tint" | "ceramic" | "tools" | "supplies";

export type InventoryItem = {
  id: string;
  category: InventoryCategory;
  brand: string;
  product: string;
  sku: string;
  unit: "ft" | "each" | "oz" | "roll";
  onHand: number;
  reorderAt: number;
  unitCost: number;
  unitPrice: number;
  vendor: string;
  lastReceivedAt: string;
};

export const INVENTORY: InventoryItem[] = [
  { id: "inv-1", category: "vinyl", brand: "3M", product: "1080 Satin Black", sku: "1080-S12", unit: "ft", onHand: 47, reorderAt: 50, unitCost: 9.5, unitPrice: 18, vendor: "CARiD", lastReceivedAt: "2025-04-12" },
  { id: "inv-2", category: "vinyl", brand: "KPMF", product: "K88621 Satin Black", sku: "K88621", unit: "ft", onHand: 120, reorderAt: 50, unitCost: 7.4, unitPrice: 14, vendor: "Metro Restyling", lastReceivedAt: "2025-03-20" },
  { id: "inv-3", category: "vinyl", brand: "Inozetek", product: "Super Gloss Metallic Midnight", sku: "SGM-MN", unit: "ft", onHand: 85, reorderAt: 40, unitCost: 8.2, unitPrice: 16.5, vendor: "Inozetek USA", lastReceivedAt: "2025-04-01" },
  { id: "inv-4", category: "vinyl", brand: "Avery", product: "Supreme Wrapping Gloss White", sku: "SW-GW", unit: "ft", onHand: 12, reorderAt: 40, unitCost: 6.8, unitPrice: 14, vendor: "Sign Warehouse", lastReceivedAt: "2025-02-15" },
  { id: "inv-5", category: "ppf", brand: "XPEL", product: "Ultimate Plus 60in", sku: "UP-60", unit: "ft", onHand: 65, reorderAt: 30, unitCost: 22, unitPrice: 42, vendor: "XPEL Direct", lastReceivedAt: "2025-04-18" },
  { id: "inv-6", category: "ppf", brand: "XPEL", product: "Stealth Satin 60in", sku: "STH-60", unit: "ft", onHand: 18, reorderAt: 25, unitCost: 25, unitPrice: 48, vendor: "XPEL Direct", lastReceivedAt: "2025-03-30" },
  { id: "inv-7", category: "ppf", brand: "SunTek", product: "Reaction PPF 60in", sku: "RPF-60", unit: "ft", onHand: 32, reorderAt: 25, unitCost: 19.5, unitPrice: 38, vendor: "SunTek", lastReceivedAt: "2025-04-05" },
  { id: "inv-8", category: "tint", brand: "Llumar", product: "IRX 35%", sku: "IRX-35", unit: "ft", onHand: 90, reorderAt: 30, unitCost: 8.2, unitPrice: 22, vendor: "Llumar", lastReceivedAt: "2025-04-22" },
  { id: "inv-9", category: "tint", brand: "Llumar", product: "IRX 20%", sku: "IRX-20", unit: "ft", onHand: 22, reorderAt: 30, unitCost: 8.2, unitPrice: 22, vendor: "Llumar", lastReceivedAt: "2025-04-01" },
  { id: "inv-10", category: "tint", brand: "3M", product: "Crystalline 70%", sku: "CR70", unit: "ft", onHand: 45, reorderAt: 25, unitCost: 11, unitPrice: 30, vendor: "3M", lastReceivedAt: "2025-03-28" },
  { id: "inv-11", category: "ceramic", brand: "Ceramic Pro", product: "Sport 50ml", sku: "CP-S50", unit: "each", onHand: 8, reorderAt: 5, unitCost: 65, unitPrice: 0, vendor: "Ceramic Pro", lastReceivedAt: "2025-04-10" },
  { id: "inv-12", category: "ceramic", brand: "Gtechniq", product: "Crystal Serum Ultra 30ml", sku: "CSU-30", unit: "each", onHand: 4, reorderAt: 3, unitCost: 145, unitPrice: 0, vendor: "Gtechniq", lastReceivedAt: "2025-03-15" },
  { id: "inv-13", category: "tools", brand: "YelloTools", product: "Boa Squeegee", sku: "BOA-001", unit: "each", onHand: 14, reorderAt: 4, unitCost: 22, unitPrice: 0, vendor: "Yellotools", lastReceivedAt: "2025-02-01" },
  { id: "inv-14", category: "tools", brand: "Olfa", product: "Snap Knife AK-1", sku: "OLFA-AK1", unit: "each", onHand: 6, reorderAt: 5, unitCost: 8, unitPrice: 0, vendor: "Amazon", lastReceivedAt: "2025-03-12" },
  { id: "inv-15", category: "supplies", brand: "Gyeon", product: "Q2M Prep 1L", sku: "GY-PREP", unit: "each", onHand: 9, reorderAt: 4, unitCost: 22, unitPrice: 0, vendor: "Gyeon", lastReceivedAt: "2025-04-01" },
  { id: "inv-16", category: "supplies", brand: "IPA", product: "Isopropyl Alcohol 99%", sku: "IPA-99", unit: "each", onHand: 3, reorderAt: 6, unitCost: 18, unitPrice: 0, vendor: "Amazon", lastReceivedAt: "2025-03-22" },
];
