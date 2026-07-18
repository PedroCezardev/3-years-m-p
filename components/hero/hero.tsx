"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Deixa o movimento do buquê bem mais suave e romântico
    }
    // Garante que o GSAP recalcule as posições de todos os ScrollTriggers após a criação do pin
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cols = gsap.utils.toArray<HTMLElement>(".col-transition");

      gsap.fromTo(
        cols,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          stagger: 0.08, // Cria o efeito de escada/cascata entre os retângulos
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=50%", // Reduzido de +=100% para +=50% para a transição acontecer bem mais perto e rápido
            pin: true, // Fixa o Hero na tela enquanto as colunas retangulares descem
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full h-screen min-h-[600px] overflow-hidden overflow-x-hidden flex items-center justify-center select-none px-4"
    >
      {/* Background Video (100vh & Full Width - Playback slower) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={handleVideoLoad}
        onPlay={handleVideoLoad}
        className="absolute inset-0 w-full h-full object-cover scale-100 animate-pulse-slow transition-transform duration-1000"
      >
        <source src="/video-flowers-hero.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em segundo plano.
      </video>

      {/* Subtle Dark Overlays for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* Frosted Glassmorphism Card centered both horizontally and vertically */}
      <div className="relative z-10 max-w-[92vw] w-full sm:w-[500px] md:w-[560px] p-8 sm:p-12 rounded-3xl bg-white/[0.08] backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/[0.12] hover:border-white/30 group/card flex flex-col items-center text-center">
        {/* Subtle Decorative Top Element */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <span className="font-parisienne text-[10px] sm:text-xs tracking-[0.5em] font-medium uppercase text-white/70 text-center">
            3 anos com você
          </span>
        </div>

        {/* Text 1: Smaller, clean typography (Centered) */}
        <p className="font-cormorant text-xs sm:text-sm font-medium tracking-[0.22em] text-white/90 uppercase mb-2 drop-shadow-sm text-center">
          Feliz 3 anos de namoro
        </p>

        {/* Text 2: Larger, bold focal point with romantic serif typography (Centered) */}
        <h1 className="font-parisienne text-5xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-tight mb-8 drop-shadow-md text-center">
          Mariana e Pedro
        </h1>

        {/* Button inspired by the reference image (Centered) */}
        <div className="pt-2 flex justify-center w-full">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-white/30 bg-white/5 hover:bg-white text-white hover:text-neutral-950 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-[1.03] active:scale-95 cursor-pointer group/btn"
          >
            <span>VER MAIS</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5 text-base leading-none">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Divs retangulares em cascata/escada que descem até o tamanho do Hero e conectam com o componente Message */}
      <div className="absolute inset-0 w-full h-full flex pointer-events-none z-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="col-transition flex-1 h-full bg-[#2C0000] origin-top scale-y-0"
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;