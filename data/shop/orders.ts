export type WorkflowStatus =
  | "quote"
  | "approved"
  | "scheduled"
  | "in-bay"
  | "photo-qc"
  | "ready"
  | "invoiced";

export type LineItem = {
  id: string;
  type: "service" | "material" | "labor" | "fee";
  description: string;
  quantity: number;
  unit?: string;
  unitCost: number;
  unitPrice: number;
};

export type OrderPhoto = {
  id: string;
  caption: string;
  stage: "before" | "in-progress" | "after";
  takenAt: string;
};

export type OrderMessage = {
  id: string;
  direction: "in" | "out";
  channel: "sms" | "email";
  body: string;
  sentAt: string;
};

export type OrderTag = "vip" | "show-car" | "rush" | "insurance" | "fleet";

export type WorkOrder = {
  id: string;
  customerId: string;
  vehicleId: string;
  status: WorkflowStatus;
  technicianId: string;
  createdAt: string;
  scheduledFor?: string;
  promisedBy?: string;
  tags: OrderTag[];
  primaryService: string;
  lineItems: LineItem[];
  photos: OrderPhoto[];
  messages: OrderMessage[];
  laborHoursEstimated: number;
  laborHoursLogged: number;
  authorizedAt?: string;
  paidAt?: string;
  notes?: string;
};

export type Technician = {
  id: string;
  name: string;
  role: string;
  initials: string;
  clockedIn: boolean;
};

export const TECHNICIANS: Technician[] = [
  { id: "t-001", name: "HD Patel", role: "Owner / Lead Installer", initials: "HD", clockedIn: true },
  { id: "t-002", name: "Andy Rivers", role: "Senior PPF Installer", initials: "AR", clockedIn: true },
  { id: "t-003", name: "Marco Lopez", role: "Wrap Installer", initials: "ML", clockedIn: true },
  { id: "t-004", name: "Sam Knox", role: "Tint & Ceramic", initials: "SK", clockedIn: false },
];

export const STATUS_LABELS: Record<WorkflowStatus, string> = {
  quote: "NEW QUOTE",
  approved: "APPROVED",
  scheduled: "SCHEDULED",
  "in-bay": "IN BAY",
  "photo-qc": "PHOTO QC",
  ready: "READY FOR PICKUP",
  invoiced: "INVOICED",
};

export const STATUS_ORDER: WorkflowStatus[] = [
  "quote",
  "approved",
  "scheduled",
  "in-bay",
  "photo-qc",
  "ready",
  "invoiced",
];

export const STATUS_VAR: Record<WorkflowStatus, string> = {
  quote: "var(--status-quoted)",
  approved: "var(--status-new)",
  scheduled: "var(--status-new)",
  "in-bay": "var(--status-progress)",
  "photo-qc": "var(--status-progress)",
  ready: "var(--status-won)",
  invoiced: "var(--status-won)",
};

export const ORDERS: WorkOrder[] = [
  {
    id: "WO-2025-0142",
    customerId: "c-002",
    vehicleId: "v-003",
    status: "in-bay",
    technicianId: "t-002",
    createdAt: "2025-04-26T14:00:00Z",
    scheduledFor: "2025-04-30T08:00:00Z",
    promisedBy: "2025-05-02T17:00:00Z",
    tags: ["vip", "show-car"],
    primaryService: "Full Front PPF + Ceramic Coating",
    lineItems: [
      { id: "li-1", type: "service", description: "XPEL Ultimate Plus PPF — Full Front Package", quantity: 1, unit: "each", unitCost: 0, unitPrice: 2400 },
      { id: "li-2", type: "material", description: "XPEL Ultimate Plus PPF Roll — 60in", quantity: 18, unit: "ft", unitCost: 22, unitPrice: 0 },
      { id: "li-3", type: "service", description: "Ceramic Pro Sport — 2 year", quantity: 1, unit: "each", unitCost: 0, unitPrice: 800 },
      { id: "li-4", type: "labor", description: "Master installer labor", quantity: 14, unit: "hr", unitCost: 65, unitPrice: 125 },
      { id: "li-5", type: "fee", description: "Shop supplies & disposables", quantity: 1, unit: "each", unitCost: 0, unitPrice: 75 },
    ],
    photos: [
      { id: "p-1", caption: "Pre-wrap inspection — driver side", stage: "before", takenAt: "2025-04-30T08:15:00Z" },
      { id: "p-2", caption: "Hood prep complete", stage: "in-progress", takenAt: "2025-04-30T11:00:00Z" },
      { id: "p-3", caption: "Bumper PPF installed", stage: "in-progress", takenAt: "2025-04-30T15:30:00Z" },
    ],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "Hi Jen, this is HD. Just kicking off your GT3 — I'll send pics every couple hours.", sentAt: "2025-04-30T08:20:00Z" },
      { id: "m-2", direction: "in", channel: "sms", body: "Sounds great! Pumped to see it.", sentAt: "2025-04-30T08:23:00Z" },
      { id: "m-3", direction: "out", channel: "sms", body: "Hood's prepped and the front bumper is wrapped. About 30% in. Looking clean.", sentAt: "2025-04-30T11:05:00Z" },
    ],
    laborHoursEstimated: 14,
    laborHoursLogged: 8.5,
    authorizedAt: "2025-04-26T16:30:00Z",
    notes: "Wedding photos are May 4. Has to be done. No exceptions.",
  },
  {
    id: "WO-2025-0141",
    customerId: "c-007",
    vehicleId: "v-010",
    status: "photo-qc",
    technicianId: "t-001",
    createdAt: "2025-04-22T10:00:00Z",
    scheduledFor: "2025-04-28T08:00:00Z",
    promisedBy: "2025-05-01T17:00:00Z",
    tags: ["vip", "show-car"],
    primaryService: "Satin Black Full Wrap — Cybertruck",
    lineItems: [
      { id: "li-1", type: "service", description: "KPMF Satin Black K88621 — Full Wrap Cybertruck", quantity: 1, unit: "each", unitCost: 0, unitPrice: 6800 },
      { id: "li-2", type: "material", description: "KPMF K88621 Satin Black — 60in roll", quantity: 75, unit: "ft", unitCost: 14, unitPrice: 0 },
      { id: "li-3", type: "labor", description: "Lead installer labor", quantity: 38, unit: "hr", unitCost: 65, unitPrice: 135 },
    ],
    photos: [
      { id: "p-1", caption: "Stainless before any prep", stage: "before", takenAt: "2025-04-28T08:00:00Z" },
      { id: "p-2", caption: "Front quarter panel done", stage: "in-progress", takenAt: "2025-04-29T14:00:00Z" },
      { id: "p-3", caption: "Roof and tonneau wrapped", stage: "in-progress", takenAt: "2025-04-30T11:00:00Z" },
      { id: "p-4", caption: "Final QC walkaround", stage: "after", takenAt: "2025-05-01T09:00:00Z" },
    ],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "Tariq! Cybertruck is on the lift. Going to be 4-5 days like we discussed.", sentAt: "2025-04-28T08:30:00Z" },
      { id: "m-2", direction: "in", channel: "sms", body: "Send pics! Already gassed up on Insta hyping it.", sentAt: "2025-04-28T08:32:00Z" },
    ],
    laborHoursEstimated: 38,
    laborHoursLogged: 36,
    authorizedAt: "2025-04-22T15:00:00Z",
    notes: "Tariq wants social-ready before/after photos for his page.",
  },
  {
    id: "WO-2025-0143",
    customerId: "c-001",
    vehicleId: "v-001",
    status: "scheduled",
    technicianId: "t-002",
    createdAt: "2025-04-29T11:30:00Z",
    scheduledFor: "2025-05-05T08:00:00Z",
    promisedBy: "2025-05-07T17:00:00Z",
    tags: ["vip", "fleet"],
    primaryService: "Full Front PPF — Tesla Model Y",
    lineItems: [
      { id: "li-1", type: "service", description: "XPEL Ultimate Plus — Full Front", quantity: 1, unit: "each", unitCost: 0, unitPrice: 1850 },
      { id: "li-2", type: "material", description: "XPEL Ultimate Plus — 60in", quantity: 14, unit: "ft", unitCost: 22, unitPrice: 0 },
      { id: "li-3", type: "labor", description: "Installer labor", quantity: 9, unit: "hr", unitCost: 55, unitPrice: 115 },
    ],
    photos: [],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "Marcus, you're on the books for May 5 at 8 AM for the Model Y front PPF. Coffee will be ready.", sentAt: "2025-04-29T11:45:00Z" },
    ],
    laborHoursEstimated: 9,
    laborHoursLogged: 0,
    authorizedAt: "2025-04-29T11:40:00Z",
    notes: "Loaner not needed — wife is dropping him off.",
  },
  {
    id: "WO-2025-0140",
    customerId: "c-003",
    vehicleId: "v-006",
    status: "ready",
    technicianId: "t-003",
    createdAt: "2025-04-15T09:00:00Z",
    scheduledFor: "2025-04-21T08:00:00Z",
    promisedBy: "2025-04-30T17:00:00Z",
    tags: ["fleet"],
    primaryService: "Fleet Graphics — ProMaster Van",
    lineItems: [
      { id: "li-1", type: "service", description: "Print + cut decals — Chen Construction logo + DOT", quantity: 1, unit: "each", unitCost: 0, unitPrice: 1850 },
      { id: "li-2", type: "material", description: "3M IJ180Cv3 + 8520 laminate", quantity: 1, unit: "each", unitCost: 280, unitPrice: 0 },
      { id: "li-3", type: "labor", description: "Installer labor", quantity: 11, unit: "hr", unitCost: 50, unitPrice: 95 },
    ],
    photos: [
      { id: "p-1", caption: "Bare van prep complete", stage: "before", takenAt: "2025-04-21T09:00:00Z" },
      { id: "p-2", caption: "Driver-side complete", stage: "in-progress", takenAt: "2025-04-22T15:00:00Z" },
      { id: "p-3", caption: "Final delivery photo", stage: "after", takenAt: "2025-04-29T16:00:00Z" },
    ],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "David — ProMaster is ready for pickup. Final invoice attached. Looks fantastic.", sentAt: "2025-04-29T16:30:00Z" },
    ],
    laborHoursEstimated: 11,
    laborHoursLogged: 11,
    authorizedAt: "2025-04-15T14:00:00Z",
  },
  {
    id: "WO-2025-0144",
    customerId: "c-005",
    vehicleId: "v-008",
    status: "approved",
    technicianId: "t-004",
    createdAt: "2025-04-30T15:00:00Z",
    promisedBy: "2025-05-12T17:00:00Z",
    tags: ["insurance", "vip"],
    primaryService: "Llumar IRX Tint — Audi RS6",
    lineItems: [
      { id: "li-1", type: "service", description: "Llumar IRX 5 windows — 25%/35%", quantity: 1, unit: "each", unitCost: 0, unitPrice: 695 },
      { id: "li-2", type: "labor", description: "Tint installer labor", quantity: 3, unit: "hr", unitCost: 45, unitPrice: 90 },
    ],
    photos: [],
    messages: [
      { id: "m-1", direction: "out", channel: "email", body: "Andre — estimate signed. Tentative drop-off May 8 at 9 AM. Will confirm Thursday.", sentAt: "2025-04-30T15:30:00Z" },
    ],
    laborHoursEstimated: 3,
    laborHoursLogged: 0,
    authorizedAt: "2025-04-30T15:25:00Z",
  },
  {
    id: "WO-2025-0145",
    customerId: "c-006",
    vehicleId: "v-009",
    status: "quote",
    technicianId: "t-001",
    createdAt: "2025-04-30T20:14:00Z",
    promisedBy: "2025-05-20T17:00:00Z",
    tags: [],
    primaryService: "Lexus GX — PPF + Ceramic Quote",
    lineItems: [
      { id: "li-1", type: "service", description: "Full Front PPF — Lexus GX 550", quantity: 1, unit: "each", unitCost: 0, unitPrice: 2100 },
      { id: "li-2", type: "service", description: "Ceramic Pro Sport — 2 year", quantity: 1, unit: "each", unitCost: 0, unitPrice: 800 },
    ],
    photos: [],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "Hi Sophia! Estimate for the GX is ready — $2,900. You can review and sign here: [link].", sentAt: "2025-04-30T20:20:00Z" },
    ],
    laborHoursEstimated: 12,
    laborHoursLogged: 0,
  },
  {
    id: "WO-2025-0139",
    customerId: "c-008",
    vehicleId: "v-011",
    status: "invoiced",
    technicianId: "t-004",
    createdAt: "2025-04-08T11:00:00Z",
    scheduledFor: "2025-04-12T09:00:00Z",
    promisedBy: "2025-04-12T17:00:00Z",
    tags: [],
    primaryService: "Window Tint — Civic Si",
    lineItems: [
      { id: "li-1", type: "service", description: "Llumar ATC 5 windows — 20%/35%", quantity: 1, unit: "each", unitCost: 0, unitPrice: 395 },
      { id: "li-2", type: "labor", description: "Tint installer labor", quantity: 2, unit: "hr", unitCost: 45, unitPrice: 90 },
    ],
    photos: [{ id: "p-1", caption: "Final delivery", stage: "after", takenAt: "2025-04-12T15:00:00Z" }],
    messages: [
      { id: "m-1", direction: "out", channel: "sms", body: "Linda — all done! Invoice paid. Mind dropping us a Google review? [link]", sentAt: "2025-04-12T15:15:00Z" },
      { id: "m-2", direction: "in", channel: "sms", body: "Already did 🙂", sentAt: "2025-04-12T15:21:00Z" },
    ],
    laborHoursEstimated: 2,
    laborHoursLogged: 2,
    authorizedAt: "2025-04-08T13:00:00Z",
    paidAt: "2025-04-12T15:00:00Z",
  },
];
