export type Appointment = {
  id: string;
  workOrderId?: string;
  customerId: string;
  vehicleId: string;
  technicianId: string;
  startsAt: string;
  endsAt: string;
  bay: 1 | 2 | 3;
  title: string;
  status: "confirmed" | "tentative" | "completed";
};

export const APPOINTMENTS: Appointment[] = [
  // Mon Apr 28
  { id: "a-1", workOrderId: "WO-2025-0141", customerId: "c-007", vehicleId: "v-010", technicianId: "t-001", startsAt: "2025-04-28T08:00:00Z", endsAt: "2025-04-28T17:00:00Z", bay: 2, title: "Cybertruck — Satin Black Wrap (day 1)", status: "confirmed" },
  { id: "a-2", workOrderId: "WO-2025-0140", customerId: "c-003", vehicleId: "v-006", technicianId: "t-003", startsAt: "2025-04-28T08:00:00Z", endsAt: "2025-04-28T16:00:00Z", bay: 3, title: "ProMaster Fleet Graphics", status: "completed" },
  // Tue Apr 29
  { id: "a-3", workOrderId: "WO-2025-0141", customerId: "c-007", vehicleId: "v-010", technicianId: "t-001", startsAt: "2025-04-29T08:00:00Z", endsAt: "2025-04-29T17:00:00Z", bay: 2, title: "Cybertruck — Satin Black Wrap (day 2)", status: "confirmed" },
  { id: "a-4", workOrderId: "WO-2025-0140", customerId: "c-003", vehicleId: "v-006", technicianId: "t-003", startsAt: "2025-04-29T09:00:00Z", endsAt: "2025-04-29T15:00:00Z", bay: 3, title: "ProMaster Fleet Graphics", status: "completed" },
  // Wed Apr 30
  { id: "a-5", workOrderId: "WO-2025-0142", customerId: "c-002", vehicleId: "v-003", technicianId: "t-002", startsAt: "2025-04-30T08:00:00Z", endsAt: "2025-04-30T17:00:00Z", bay: 1, title: "911 GT3 — Full Front PPF + Ceramic", status: "confirmed" },
  { id: "a-6", workOrderId: "WO-2025-0141", customerId: "c-007", vehicleId: "v-010", technicianId: "t-001", startsAt: "2025-04-30T08:00:00Z", endsAt: "2025-04-30T17:00:00Z", bay: 2, title: "Cybertruck — Satin Black Wrap (day 3)", status: "confirmed" },
  // Thu May 1
  { id: "a-7", workOrderId: "WO-2025-0142", customerId: "c-002", vehicleId: "v-003", technicianId: "t-002", startsAt: "2025-05-01T08:00:00Z", endsAt: "2025-05-01T17:00:00Z", bay: 1, title: "911 GT3 — Full Front PPF + Ceramic (day 2)", status: "confirmed" },
  { id: "a-8", workOrderId: "WO-2025-0141", customerId: "c-007", vehicleId: "v-010", technicianId: "t-001", startsAt: "2025-05-01T08:00:00Z", endsAt: "2025-05-01T13:00:00Z", bay: 2, title: "Cybertruck — Final QC + Delivery", status: "confirmed" },
  // Fri May 2
  { id: "a-9", workOrderId: "WO-2025-0142", customerId: "c-002", vehicleId: "v-003", technicianId: "t-002", startsAt: "2025-05-02T08:00:00Z", endsAt: "2025-05-02T17:00:00Z", bay: 1, title: "911 GT3 — Final QC + Delivery", status: "confirmed" },
  { id: "a-10", customerId: "c-004", vehicleId: "v-007", technicianId: "t-004", startsAt: "2025-05-02T13:00:00Z", endsAt: "2025-05-02T16:00:00Z", bay: 3, title: "BMW M340i — Tint Refresh", status: "tentative" },
  // Sat May 3
  { id: "a-11", customerId: "c-008", vehicleId: "v-011", technicianId: "t-004", startsAt: "2025-05-03T10:00:00Z", endsAt: "2025-05-03T12:00:00Z", bay: 3, title: "Civic Si — Tint Touch-up", status: "confirmed" },
  // Mon May 5
  { id: "a-12", workOrderId: "WO-2025-0143", customerId: "c-001", vehicleId: "v-001", technicianId: "t-002", startsAt: "2025-05-05T08:00:00Z", endsAt: "2025-05-05T17:00:00Z", bay: 1, title: "Tesla Model Y — Front PPF", status: "confirmed" },
  { id: "a-13", workOrderId: "WO-2025-0144", customerId: "c-005", vehicleId: "v-008", technicianId: "t-004", startsAt: "2025-05-08T09:00:00Z", endsAt: "2025-05-08T12:00:00Z", bay: 3, title: "Audi RS6 — Llumar IRX Tint", status: "confirmed" },
];
