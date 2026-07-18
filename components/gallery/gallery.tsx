"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/header/section-header";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "/image-hero-flowers-girassois.png",
    alt: "Nossos Momentos — Foto 1",
  },
  {
    id: 2,
    src: "/image-hero-flowers-girassois.png",
    alt: "Nossos Momentos — Foto 2",
  },
  {
    id: 3,
    src: "/image-hero-flowers-girassois.png",
    alt: "Nossos Momentos — Foto 3",
  },
];

const Gallery = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animação de entrada do título e descrição
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });

      // Animação de expansão da largura (width expand) para cada imagem ao rolar o scroll
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");

      cards.forEach((card) => {
        // Animação de expansão do container (de tamanho menor cortado para largura total na tela)
        gsap.fromTo(
          card,
          {
            width: "80%", // Menor tamanho começa na largura que antes era a máxima (80% da tela)
            borderRadius: "32px",
          },
          {
            width: "100%", // Expande para preencher 100% do container max-w-[97vw], ficando pertinho da borda
            borderRadius: "16px",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "center 45%",
              scrub: 1,
            },
          }
        );

        // Efeito parallax cinemático na imagem interna enquanto o container expande
        const img = card.querySelector(".gallery-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "center 45%",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#2C0000] min-h-screen w-full flex flex-col justify-between relative overflow-hidden select-none py-8 sm:py-12 md:py-16"
    >
      {/* Reusable SectionHeader */}
      <SectionHeader leftText="18/07/2025" rightText="Mari & Pedro" />

      {/* Center Title and Description */}
      <div
        ref={textRef}
        className="w-full px-6 sm:px-12 md:px-20 my-10 sm:my-14 md:my-16 text-center max-w-6xl mx-auto space-y-3 sm:space-y-4"
      >
        <h2 className="font-parisienne text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-wide drop-shadow-sm">
          Nossos Momentos
        </h2>
        <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-white/90 font-normal leading-relaxed max-w-4xl mx-auto">
          Cada momento desses contribuiu para que eu me apaixonasse ainda mais por você!
        </p>
      </div>

      {/* Array de 3 Imagens com animação de expansão da largura (Width Expand) no scroll */}
      <div className="w-full px-2 sm:px-4 md:px-6 pb-8 sm:pb-16 max-w-[97vw] mx-auto flex flex-col items-center gap-14 sm:gap-24 md:gap-32">
        {galleryImages.map((item) => (
          <div
            key={item.id}
            className="w-full flex justify-center items-center"
          >
            <div className="gallery-card w-[80%] aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[520px] bg-white/[0.06] backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-white/15 overflow-hidden relative shadow-2xl group transition-colors duration-500 hover:border-white/30">
              {/* Imagem do casal */}
              <img
                src={item.src}
                alt={item.alt}
                className="gallery-img w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
