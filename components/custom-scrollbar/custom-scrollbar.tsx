"use client";

import React, { useEffect, useRef, useState } from "react";

const CustomScrollbar = () => {
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const currentProgress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        setProgress(currentProgress);
      } else {
        setProgress(0);
      }

      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    animationFrameId = requestAnimationFrame(updateScrollProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Permite clicar na barra para rolar até aquele ponto exato do site
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickRatio = Math.min(1, Math.max(0, clickY / rect.height));

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetTop = clickRatio * scrollHeight;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className="fixed top-1/2 right-0.5 sm:right-1 md:right-2 -translate-y-1/2 z-[99999] h-[76vh] sm:h-[82vh] w-[14px] sm:w-[18px] flex justify-center items-center cursor-pointer select-none group pointer-events-auto"
      title={`Rolagem: ${Math.round(progress * 100)}%`}
    >
      {/* Track visual flutuante (Fundo em tom cinza claro/prateado elegante representando o restante do site) */}
      <div className="w-[2.5px] sm:w-[3px] h-full bg-white/25 sm:bg-neutral-400/45 rounded-full relative overflow-hidden transition-all duration-300 group-hover:w-[4.5px] sm:group-hover:w-[5.5px] shadow-sm">
        {/* Progress bar visual (A parte clara/branca destacando o que desceu até o momento no fundo vermelho) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.95)] origin-top transition-transform duration-75 ease-out"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;
