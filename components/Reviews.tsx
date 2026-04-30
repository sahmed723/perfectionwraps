const reviews = [
  {
    author: "Jennifer McConnell",
    rating: 5,
    body: "Had my Explorer detailed this week and it looks better than new! Outside with 6 mo protectant shined beautifully. Couldn't be happier with the craftsmanship and how thorough the team was.",
    service: "DETAIL + 6MO PROTECTANT",
  },
  {
    author: "Michelle Moyer",
    rating: 5,
    body: "The rate at which they respond to your messages is fantastic, and they are always so pleasant!! Quality of work matches the customer service — first-rate from start to finish.",
    service: "VINYL WRAP",
  },
  {
    author: "Tyler Queen",
    rating: 5,
    body: "My car looks almost brand new. The owner was responsive and even fit me in after I had to move my appointment. Communication and attention to detail were excellent.",
    service: "PPF + CERAMIC",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < n ? "#FFD700" : "#333"}>
          <path d="M12 2l2.9 6.9L22 9.5l-5.5 4.8L18.2 22 12 18l-6.2 4 1.7-7.7L2 9.5l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 px-4 md:px-8 border-y border-bone/5 bg-ink2/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">05 / REVIEWS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-2xl">
              Real owners. <span className="text-bone/40">Real receipts.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Stars n={5} />
            <div className="text-bone/60 text-sm">4.9 from 80+ verified clients</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="relative bg-ink border border-bone/5 p-6 md:p-7 flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-bone/10">
                <div className="text-[10px] tracking-[0.25em] font-mono text-bone/40">
                  RECEIPT #{Math.floor(Math.random() * 9000 + 1000)}
                </div>
                <Stars n={r.rating} />
              </div>
              <p className="text-bone/80 leading-relaxed text-[15px] flex-1">
                "{r.body}"
              </p>
              <div className="mt-6 pt-4 border-t border-dashed border-bone/10 flex items-center justify-between">
                <div className="font-black text-bone tracking-tight">{r.author}</div>
                <div className="text-[9px] tracking-[0.2em] font-mono text-giallo">
                  {r.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
