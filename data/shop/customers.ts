export type CustomerTag = "vip" | "fleet" | "repeat" | "insurance";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  tags: CustomerTag[];
  ltv: number;
  totalJobs: number;
  firstJobAt: string;
  vehicles: string[];
  notes?: string;
};

export const CUSTOMERS: Customer[] = [
  { id: "c-001", firstName: "Marcus", lastName: "Williams", phone: "(770) 555-0142", email: "marcus.w@gmail.com", city: "Alpharetta", tags: ["vip", "repeat"], ltv: 14500, totalJobs: 4, firstJobAt: "2022-03-12", vehicles: ["v-001", "v-002"], notes: "Always wants satin finishes. Prefers Saturday drop-off." },
  { id: "c-002", firstName: "Jen", lastName: "Nakamura", phone: "(404) 555-0188", email: "jnakamura@outlook.com", city: "Atlanta", tags: ["vip"], ltv: 22000, totalJobs: 2, firstJobAt: "2024-01-08", vehicles: ["v-003"], notes: "Show car. Wants a private bay. Referred us 3 friends." },
  { id: "c-003", firstName: "David", lastName: "Chen", phone: "(678) 555-0199", email: "", city: "Woodstock", tags: ["fleet"], ltv: 8900, totalJobs: 7, firstJobAt: "2023-06-20", vehicles: ["v-004", "v-005", "v-006"], notes: "Construction company. Recurring fleet of F-250s and trailers." },
  { id: "c-004", firstName: "Brittany", lastName: "Soto", phone: "(770) 555-0177", email: "b.soto@hotmail.com", city: "Marietta", tags: ["repeat"], ltv: 3400, totalJobs: 2, firstJobAt: "2024-09-15", vehicles: ["v-007"], notes: "" },
  { id: "c-005", firstName: "Andre", lastName: "Patel", phone: "(404) 555-0123", email: "andre.p@gmail.com", city: "Atlanta", tags: ["insurance"], ltv: 6200, totalJobs: 1, firstJobAt: "2025-02-10", vehicles: ["v-008"], notes: "State Farm claim. Adjuster: Mike Reynolds (770) 555-0987" },
  { id: "c-006", firstName: "Sophia", lastName: "Reyes", phone: "(678) 555-0166", email: "sreyes@outlook.com", city: "Cumming", tags: [], ltv: 0, totalJobs: 0, firstJobAt: "2025-04-29", vehicles: ["v-009"], notes: "New lead — first inquiry." },
  { id: "c-007", firstName: "Tariq", lastName: "Johnson", phone: "(770) 555-0144", email: "tariq.j@gmail.com", city: "Roswell", tags: ["vip", "repeat"], ltv: 31000, totalJobs: 5, firstJobAt: "2021-08-04", vehicles: ["v-010"], notes: "Cybertruck owner. Tagged on every Instagram post." },
  { id: "c-008", firstName: "Linda", lastName: "Park", phone: "(404) 555-0111", email: "lpark@gmail.com", city: "Sandy Springs", tags: [], ltv: 1200, totalJobs: 1, firstJobAt: "2024-11-22", vehicles: ["v-011"], notes: "" },
];
