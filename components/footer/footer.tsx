"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Efeito Parallax suave de zoom na imagem das flores de fundo
      // OTIMIZAÇÃO: Usamos scrub: true em vez de scrub: 1 para não travar com o Lenis
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.15, y: -40 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      // Animação de revelação da frase romântica de efeito
      gsap.from(phraseRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phraseRef.current,
          start: "top 85%",
        },
      });

      // Animação da barra inferior de direitos e logo
      gsap.from(bottomBarRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomBarRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[100vh] sm:min-h-[100vh] flex flex-col justify-between overflow-hidden select-none bg-[#2C0000]"
    >
      {/* Background Image: image-footer-flowers.png - OTIMIZADA PARA NEXT/IMAGE (Qualidade Máxima Restaurada) */}
      <Image
        ref={bgImageRef}
        src="/image-footer-flowers.png"
        alt="Flores de Fundo"
        fill
        sizes="100vw"
        className="object-cover object-center z-0"
        quality={100} 
      />

      {/* Camada uniforme para escurecer a imagem inteira com toque minimalista de luxo */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Top spacing */}
      <div className="h-16 sm:h-24 z-20" />

      {/* Center: Frase de Efeito para finalização do site */}
      <div
        ref={phraseRef}
        className="z-20 flex-1 flex items-center justify-center w-full px-6 sm:px-12 md:px-20 max-w-5xl mx-auto my-12"
      >
        <h2 className="font-parisienne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide text-center leading-relaxed sm:leading-relaxed md:leading-relaxed drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          Três anos são apenas o começo, que o nosso amor continue florescendo para todo o sempre.
        </h2>
      </div>

      {/* Bottom Bar: Direitos Reservados à esquerda & Feito por à direita com Logo */}
      <div
        ref={bottomBarRef}
        className="z-20 w-full px-6 sm:px-12 md:px-20 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Left: Direitos Reservados */}
        <p className="font-cormorant text-sm sm:text-base md:text-lg text-white/85 tracking-wider text-center sm:text-left drop-shadow-sm">
          Mari e Pedro 3 anos, todos os direitos reservados.
        </p>

        {/* Right: Feito por + Logo Completa Branca */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-cormorant text-sm sm:text-base md:text-lg text-white/85 tracking-wider drop-shadow-sm">
            Feito por:
          </span>
          <Image
            src="/LOGO-COMPLETA-BRANCA.png"
            alt="Pedro PC Cezar Logo"
            width={120}
            height={32}
            unoptimized={true}
            quality={100}
            className="h-4 sm:h-6 md:h-8 w-auto object-contain brightness-100 transition-transform duration-300"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
