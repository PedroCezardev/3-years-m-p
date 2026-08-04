"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Bloquear o scroll do Lenis/Body enquanto o Preloader estiver rodando
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  useGSAP(
    () => {
      if (!containerRef.current || !liquidRef.current) return;

      const progressObj = { value: 0 };
      const curtainRects = containerRef.current.querySelectorAll(".curtain-rect");

      // 1. Animação contínua da onda do líquido oscilando horizontalmente
      gsap.to(".liquid-wave-1", {
        x: "-50%",
        duration: 2.2,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".liquid-wave-2", {
        x: "50%",
        duration: 3.2,
        repeat: -1,
        ease: "linear",
      });

      // 2. Timeline de carregamento (0% até 100% de preenchimento do coração líquido em ~3 segundos)
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
        },
      });

      tl.to(progressObj, {
        value: 100,
        duration: 3.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentProgress = Math.round(progressObj.value);
          setProgress(currentProgress);

          // O coração vai de Y: 110 (vazio no fundo) até Y: -5 (cheio até o topo)
          if (liquidRef.current) {
            const yPos = gsap.utils.interpolate(110, -5, progressObj.value / 100);
            gsap.set(liquidRef.current, { y: yPos });
          }
        },
      });

      // Pausa rápida de contemplação com o coração 100% cheio, aumentando o brilho via Opacity/Scale (GPU accelerated)
      tl.to(
        ".heart-glow-contour",
        {
          opacity: 1,
          scale: 1.03,
          transformOrigin: "center center",
          duration: 0.4,
        },
        "-=0.2"
      );
      tl.to({}, { duration: 0.5 });

      // 3. Saída: Esconder conteúdo central (Coração + Porcentagem)
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 1.12,
        filter: "blur(10px)",
        duration: 0.6,
        ease: "power2.in",
      });

      // 4. Saída dos retângulos: deslizam para a ESQUERDA em cascata/stagger revelando o Hero abaixo!
      tl.to(
        curtainRects,
        {
          scaleX: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-full h-full pointer-events-auto select-none overflow-hidden flex flex-col justify-between"
    >
      {/* 6 Retângulos Verticais compondo o fundo (#2C0000) que se recolhem/deslizam para a ESQUERDA no final */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-6 z-10 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="curtain-rect w-full h-full bg-[#2C0000] border-r border-black/15 last:border-r-0 origin-left"
          />
        ))}
      </div>

      {/* Top Header do Preloader */}
      <header className="z-20 w-full pt-8 sm:pt-12 flex justify-center items-center">
        <span className="font-parisienne text-2xl sm:text-3xl text-white/85 tracking-wider drop-shadow-sm">
          Mari & Pedro
        </span>
      </header>

      {/* Centro: Coração com enchimento de Líquido e Porcentagem ao Vivo */}
      <div
        ref={contentRef}
        className="z-20 flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-4"
      >
        {/* SVG Coração Líquido */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Recorte preciso em formato de coração */}
              <clipPath id="heart-liquid-clip">
                <path d="M60 106.75l-7.25-6.6C27 70.8 10 55.4 10 36.5 10 21.1 22.1 9 37.5 9c8.7 0 17.05 4.05 22.5 10.45C65.45 13.05 73.8 9 82.5 9 97.9 9 110 21.1 110 36.5c0 18.9-17 34.3-42.75 63.7L60 106.75z" />
              </clipPath>

              {/* Gradiente do líquido interior do coração */}
              <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#aa0000ff" />
                <stop offset="50%" stopColor="#800000ff" />
                <stop offset="100%" stopColor="#800000" />
              </linearGradient>

              {/* Gradiente suave de fundo dentro do coração antes do líquido subir */}
              <linearGradient id="heart-bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.06)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
              </linearGradient>
            </defs>

            {/* Fundo do interior do coração */}
            <path
              d="M60 106.75l-7.25-6.6C27 70.8 10 55.4 10 36.5 10 21.1 22.1 9 37.5 9c8.7 0 17.05 4.05 22.5 10.45C65.45 13.05 73.8 9 82.5 9 97.9 9 110 21.1 110 36.5c0 18.9-17 34.3-42.75 63.7L60 106.75z"
              fill="url(#heart-bg-gradient)"
            />

            {/* Grupo recortado pelo formato do coração (aqui dentro o líquido sobe!) */}
            <g clipPath="url(#heart-liquid-clip)">
              {/* O grupo liquidRef move o Y de 110 (vazio no fundo) até -5 (cheio ao topo) */}
              <g ref={liquidRef} className="translate-y-[110px]">
                {/* Onda 1 (Fundo/Escura) */}
                <path
                  className="liquid-wave-1"
                  fill="#990000"
                  opacity="0.8"
                  d="M -120 10 Q -90 0, -60 10 T 0 10 T 60 10 T 120 10 T 180 10 T 240 10 L 240 140 L -120 140 Z"
                />
                {/* Onda 2 (Frente/Brilhante) */}
                <path
                  className="liquid-wave-2"
                  fill="url(#liquid-gradient)"
                  opacity="0.95"
                  d="M -120 12 Q -90 22, -60 12 T 0 12 T 60 12 T 120 12 T 180 12 T 240 12 L 240 140 L -120 140 Z"
                />
              </g>
            </g>

            {/* Contorno Brilhante do Coração (Otimizado para GPU com Opacity) */}
            <path
              className="heart-glow-contour transition-all duration-300"
              d="M60 106.75l-7.25-6.6C27 70.8 10 55.4 10 36.5 10 21.1 22.1 9 37.5 9c8.7 0 17.05 4.05 22.5 10.45C65.45 13.05 73.8 9 82.5 9 97.9 9 110 21.1 110 36.5c0 18.9-17 34.3-42.75 63.7L60 106.75z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.2"
              opacity="0.6"
            />
          </svg>

          {/* Brilho pulsante suave no centro */}
          <div className="absolute inset-0 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Porcentagem Digital e Texto de Carregamento */}
        <div className="flex flex-col items-center space-y-1">
          <span className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wider tabular-nums drop-shadow-md">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
