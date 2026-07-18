"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/header/section-header";

gsap.registerPlugin(ScrollTrigger);

const Letter = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted && videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animação de entrada do título
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      // Animação do texto da carta (esquerda)
      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      // Animação do celular (direita)
      gsap.from(phoneRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#2C0000] min-h-screen w-full flex flex-col justify-between relative overflow-hidden select-none py-8 sm:py-12 md:py-12"
    >
      {/* Reusable SectionHeader */}
      <SectionHeader leftText="Mari & Pedro" rightText="18/07/2026" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-12 md:px-20 my-12 sm:my-16 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide drop-shadow-sm text-center mb-12 sm:mb-16 md:mb-20"
        >
          Como não te amar:
        </h2>

        {/* Two columns: Declaration Letter (Left) and Phone Video (Right) alinhados ao topo (items-start) */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 sm:gap-14 lg:gap-16">
          {/* Left: Romantic Love Letter Text in Parisienne */}
          <div
            ref={textRef}
            className="w-full lg:w-1/2 text-left space-y-6 sm:space-y-8 max-w-2xl px-2 pt-1"
          >
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              Cada dia ao seu lado é um presente que Deus me deu, construindo memórias que levarei para sempre no meu coração.
            </p>
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              O seu sorriso ilumina qualquer momento e a sua presença transforma o comum em extraordinário. Você é o meu porto seguro e a minha maior alegria.
            </p>
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              Obrigado por ser essa mulher incrível, carinhosa e parceira. Que venham muitos outros anos, histórias maravilhosas e conquistas juntos. Eu te Amão Grandão Infinitão!
            </p>
          </div>

          {/* Right: Vertical Phone Aspect Frame with Looping Video alinhado no topo */}
          <div
            ref={phoneRef}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-start pt-0"
          >
            {/* Phone Container */}
            <div className="w-[260px] sm:w-[300px] md:w-[340px] aspect-[9/16] bg-black rounded-[2.8rem] sm:rounded-[3.2rem] border-[6px] sm:border-[8px] border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col items-center justify-center group">
              
              {/* Looping Video */}
              <video
                ref={videoRef}
                src="/video-letter.mp4"
                autoPlay
                loop
                muted
                playsInline
                onClick={toggleSound}
                className="w-full h-full object-cover object-center z-10 transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Controles de Som e Play/Pause flutuando no canto inferior direito, perto da borda para não interferir no vídeo */}
              <div className="absolute bottom-4 sm:bottom-5 right-3.5 sm:right-4.5 z-30 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white shadow-[0_6px_25px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-[1.03] hover:border-white/40">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer hover:text-red-300"
                >
                  {isMuted ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 animate-pulse shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                  <span>{isMuted ? "Ouvir Música" : "Com Som"}</span>
                </button>

                <span className="w-px h-3 bg-white/20" />

                <button
                  type="button"
                  onClick={togglePlay}
                  className="transition-colors cursor-pointer hover:text-red-300 p-0.5 flex items-center justify-center shrink-0"
                  title={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                >
                  {isPlaying ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Fallback displayed if /video-letter.mp4 is not yet inside public folder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#2C0000] to-black z-0">
                <span className="font-parisienne text-2xl sm:text-3xl text-white/80 mb-3">
                  Vídeo Especial ❤️
                </span>
                <span className="font-cormorant text-xs sm:text-sm text-white/60 uppercase tracking-[0.15em] leading-relaxed">
                  Adicione o seu vídeo vertical em
                  <br />
                  <strong className="text-white/90 lowercase">/public/video-letter.mp4</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-6 sm:h-12" />
    </section>
  );
};

export default Letter;
