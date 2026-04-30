export default function Footer() {
  return (
    <footer className="px-4 md:px-8 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <div className="text-bone font-black text-lg tracking-[0.18em]">
              PERFECTION<span className="text-giallo">WRAPS</span>
            </div>
            <p className="mt-4 text-bone/50 text-sm leading-relaxed max-w-xs">
              Atlanta's certified studio for vehicle wraps, paint protection film, and ceramic coating. Owner-operated. Insured.
            </p>
            <div className="mt-6 text-[10px] font-mono tracking-[0.2em] text-bone/30">
              EST. 2018 &middot; WOODSTOCK, GA
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-4">VISIT</div>
            <div className="text-bone/80 text-sm leading-relaxed">
              503 Hickory Ridge Trail<br />
              Suite 170<br />
              Woodstock, GA 30188
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-4">HOURS</div>
            <div className="text-bone/80 text-sm leading-relaxed font-mono space-y-1">
              <div className="flex justify-between"><span>MON–FRI</span><span>9–6</span></div>
              <div className="flex justify-between"><span>SAT</span><span>10–4</span></div>
              <div className="flex justify-between"><span>SUN</span><span className="text-bone/40">CLOSED</span></div>
            </div>
            <a
              href="tel:6783842956"
              className="mt-5 inline-block text-giallo text-sm font-mono tracking-[0.15em] hover:underline"
            >
              678.384.2956
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-bone/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] font-mono tracking-[0.2em] text-bone/30">
          <div>© {new Date().getFullYear()} PERFECTION WRAPS LLC. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-bone/60">PRIVACY</a>
            <a href="#" className="hover:text-bone/60">TERMS</a>
            <a href="#" className="hover:text-bone/60">WARRANTY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
