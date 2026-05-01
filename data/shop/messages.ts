export type ThreadMessage = {
  direction: "in" | "out";
  body: string;
  at: string;
};

export type Thread = {
  id: string;
  customerId: string;
  workOrderId?: string;
  channel: "sms" | "email";
  unread: boolean;
  lastMessageAt: string;
  preview: string;
  subject?: string;
  messages: ThreadMessage[];
};

export const THREADS: Thread[] = [
  {
    id: "th-1",
    customerId: "c-002",
    workOrderId: "WO-2025-0142",
    channel: "sms",
    unread: true,
    lastMessageAt: "2025-04-30T16:42:00Z",
    preview: "Looks insane already. Will it really be ready Friday?",
    messages: [
      { direction: "out", body: "Hi Jen, this is HD. Just kicking off your GT3 — I'll send pics every couple hours.", at: "2025-04-30T08:20:00Z" },
      { direction: "in", body: "Sounds great! Pumped to see it.", at: "2025-04-30T08:23:00Z" },
      { direction: "out", body: "Hood's prepped and the front bumper is wrapped. About 30% in. Looking clean.", at: "2025-04-30T11:05:00Z" },
      { direction: "out", body: "Quick pic — check that bumper edge wrap.", at: "2025-04-30T15:31:00Z" },
      { direction: "in", body: "Looks insane already. Will it really be ready Friday?", at: "2025-04-30T16:42:00Z" },
    ],
  },
  {
    id: "th-2",
    customerId: "c-006",
    workOrderId: "WO-2025-0145",
    channel: "sms",
    unread: true,
    lastMessageAt: "2025-04-30T20:48:00Z",
    preview: "Got it — can we do something on the running boards too?",
    messages: [
      { direction: "out", body: "Hi Sophia! Estimate for the GX is ready — $2,900. You can review and sign here: [link].", at: "2025-04-30T20:20:00Z" },
      { direction: "in", body: "Got it — can we do something on the running boards too?", at: "2025-04-30T20:48:00Z" },
    ],
  },
  {
    id: "th-3",
    customerId: "c-007",
    workOrderId: "WO-2025-0141",
    channel: "sms",
    unread: false,
    lastMessageAt: "2025-04-30T11:08:00Z",
    preview: "Going on Insta tonight — make sure I look good 😎",
    messages: [
      { direction: "out", body: "Tariq! Cybertruck is on the lift. Going to be 4-5 days like we discussed.", at: "2025-04-28T08:30:00Z" },
      { direction: "in", body: "Send pics! Already gassed up on Insta hyping it.", at: "2025-04-28T08:32:00Z" },
      { direction: "out", body: "Day 2 — front quarter panel done. The seam game is strong.", at: "2025-04-29T14:01:00Z" },
      { direction: "out", body: "Roof + tonneau done. One more day.", at: "2025-04-30T11:00:00Z" },
      { direction: "in", body: "Going on Insta tonight — make sure I look good 😎", at: "2025-04-30T11:08:00Z" },
    ],
  },
  {
    id: "th-4",
    customerId: "c-001",
    workOrderId: "WO-2025-0143",
    channel: "sms",
    unread: false,
    lastMessageAt: "2025-04-29T11:48:00Z",
    preview: "Perfect — see you Monday.",
    messages: [
      { direction: "out", body: "Marcus, you're on the books for May 5 at 8 AM for the Model Y front PPF. Coffee will be ready.", at: "2025-04-29T11:45:00Z" },
      { direction: "in", body: "Perfect — see you Monday.", at: "2025-04-29T11:48:00Z" },
    ],
  },
  {
    id: "th-5",
    customerId: "c-005",
    workOrderId: "WO-2025-0144",
    channel: "email",
    unread: false,
    lastMessageAt: "2025-04-30T15:30:00Z",
    preview: "Re: Audi RS6 — tint estimate",
    subject: "Audi RS6 — tint estimate",
    messages: [
      { direction: "out", body: "Andre — estimate signed. Tentative drop-off May 8 at 9 AM. Will confirm Thursday.", at: "2025-04-30T15:30:00Z" },
    ],
  },
  {
    id: "th-6",
    customerId: "c-004",
    channel: "sms",
    unread: false,
    lastMessageAt: "2025-04-29T18:22:00Z",
    preview: "Hey — saw the Cybertruck reel. When can you fit me in for the M340?",
    messages: [
      { direction: "in", body: "Hey — saw the Cybertruck reel. When can you fit me in for the M340?", at: "2025-04-29T18:22:00Z" },
    ],
  },
  {
    id: "th-7",
    customerId: "c-008",
    channel: "sms",
    unread: false,
    lastMessageAt: "2025-04-12T15:21:00Z",
    preview: "Already did 🙂",
    messages: [
      { direction: "out", body: "Linda — all done! Invoice paid. Mind dropping us a Google review? [link]", at: "2025-04-12T15:15:00Z" },
      { direction: "in", body: "Already did 🙂", at: "2025-04-12T15:21:00Z" },
    ],
  },
];
