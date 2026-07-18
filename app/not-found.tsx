"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const elements = contentRef.current.querySelectorAll(".animate-item");
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 35,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#2C0000] overflow-hidden flex flex-col justify-between items-center select-none text-center px-6 py-12"
    >
      {/* Imagem de fundo com escurecimento de luxo minimalista */}
      <img
        src="/image-footer-flowers.png"
        alt="Flores de fundo"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-screen pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

      {/* Brilho suave ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="z-10 animate-item">
        <span className="font-parisienne text-2xl sm:text-3xl text-white/85 tracking-wider">
          Mari & Pedro
        </span>
      </header>

      {/* Center 404 Content */}
      <main ref={contentRef} className="z-10 max-w-3xl mx-auto flex flex-col items-center my-auto py-12">
        <span className="animate-item font-cormorant text-xs sm:text-sm font-semibold tracking-[0.35em] text-white/60 uppercase mb-4">
          Erro 404 — Página não encontrada
        </span>

        <h1 className="animate-item font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
          Parece que nos perdemos por aqui...
        </h1>

        <div className="animate-item pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-white/30 bg-white/10 hover:bg-white text-white hover:text-neutral-950 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-xl hover:shadow-white/20 hover:scale-[1.03] active:scale-95 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1 text-base leading-none">
              ←
            </span>
            <span>Voltar para a Nossa História</span>
          </Link>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="z-10 animate-item">
        <span className="font-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-white/50">
          18 de Julho de 2023 — Para Todo o Sempre
        </span>
      </footer>
    </div>
  );
}
