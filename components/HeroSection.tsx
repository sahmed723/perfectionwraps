"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { wraps, cameraPresets, type Wrap, type CameraPreset } from "@/lib/wraps";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[78vh] md:h-[92vh] w-full flex flex-col items-center justify-center bg-ink">
      <div className="text-3xl md:text-5xl chrome-text font-black tracking-tight">
        PERFECTION
      </div>
      <div className="mt-3 text-[10px] tracking-[0.4em] font-mono text-bone/40">
        BOOTING WEBGL
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const [selected, setSelected] = useState<Wrap>(wraps[0]);
  const [preset, setPreset] = useState<CameraPreset>(cameraPresets[0]);

  return (
    <section id="top" className="relative pt-14 md:pt-16">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 md:px-10 pt-10 md:pt-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-4">
              01 / WOODSTOCK · GA · EST 2018
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.9] max-w-5xl">
              WHERE <span className="giallo-text">VINYL</span>
              <br />
              MEETS <span className="text-bone/35">OBSESSION.</span>
            </h1>
            <p className="mt-5 md:mt-7 max-w-md text-bone/55 text-base md:text-lg leading-relaxed">
              Premium vehicle wraps, paint protection, and ceramic coatings. Atlanta's certified studio for supercars, daily drivers, and fleet work.
            </p>
          </div>
        </div>

        <Hero3D
          selected={selected}
          onSelect={setSelected}
          preset={preset}
          setPreset={setPreset}
        />

        <div className="relative z-30 px-4 md:px-10 pt-12 md:pt-16 pb-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <a
              href="#quote"
              className="inline-flex items-center justify-center bg-giallo text-ink px-8 py-4 font-black tracking-[0.18em] text-sm hover:bg-ambra transition"
            >
              GET QUOTE
            </a>
            <a
              href="#wraps"
              className="inline-flex items-center justify-center border border-bone/30 text-bone px-8 py-4 font-black tracking-[0.18em] text-sm hover:border-bone hover:bg-bone/5 transition"
            >
              VIEW WORK
            </a>
            <div className="hidden sm:flex items-center ml-auto gap-2 text-[11px] font-mono tracking-[0.2em] text-bone/40">
              <span className="w-2 h-2 bg-cut animate-pulse-dot rounded-full" />
              BOOKING SUMMER 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
