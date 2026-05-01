export type Vehicle = {
  id: string;
  customerId: string;
  year: string;
  make: string;
  model: string;
  trim?: string;
  color: string;
  vin?: string;
  plate?: string;
  imageHint: string;
};

export const VEHICLES: Vehicle[] = [
  { id: "v-001", customerId: "c-001", year: "2024", make: "Tesla", model: "Model Y", trim: "Performance", color: "Pearl White", vin: "5YJYGDEE7NF123456", plate: "CIV-4421", imageHint: "tesla-white" },
  { id: "v-002", customerId: "c-001", year: "2021", make: "BMW", model: "M340i", color: "Alpine White", plate: "BMW-882", imageHint: "bmw-white" },
  { id: "v-003", customerId: "c-002", year: "2023", make: "Porsche", model: "911", trim: "GT3", color: "Guards Red", plate: "GT3-RACE", imageHint: "porsche-red" },
  { id: "v-004", customerId: "c-003", year: "2022", make: "Ford", model: "F-250", trim: "Platinum", color: "Agate Black", plate: "CHEN-01", imageHint: "truck-black" },
  { id: "v-005", customerId: "c-003", year: "2023", make: "Ford", model: "F-250", trim: "XLT", color: "Oxford White", plate: "CHEN-02", imageHint: "truck-white" },
  { id: "v-006", customerId: "c-003", year: "2024", make: "Ram", model: "ProMaster", color: "Bright White", plate: "CHEN-03", imageHint: "van-white" },
  { id: "v-007", customerId: "c-004", year: "2019", make: "BMW", model: "M340i", color: "Mineral Grey", plate: "SOT-119", imageHint: "bmw-grey" },
  { id: "v-008", customerId: "c-005", year: "2024", make: "Audi", model: "RS6", color: "Nardo Grey", plate: "AUDI-RS", imageHint: "audi-grey" },
  { id: "v-009", customerId: "c-006", year: "2025", make: "Lexus", model: "GX 550", color: "Manganese Lustre", plate: "LX-2025", imageHint: "suv-grey" },
  { id: "v-010", customerId: "c-007", year: "2024", make: "Tesla", model: "Cybertruck", color: "Stainless", plate: "CYBR-1", imageHint: "cyber-silver" },
  { id: "v-011", customerId: "c-008", year: "2022", make: "Honda", model: "Civic", trim: "Si", color: "Aegean Blue", plate: "PARK-22", imageHint: "civic-blue" },
];
