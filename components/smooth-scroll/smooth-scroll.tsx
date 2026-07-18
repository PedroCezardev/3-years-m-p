"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inicializa o Lenis com scroll mais lento e pesado para uma sensação premium e cinematográfica
    const lenis = new Lenis({
      duration: 1.8, // Mais lento e pesado (padrão é 1.2), perfeito para toque de luxo
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave clássica
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85, // Deixa a rolagem do mouse um pouco mais cadenciada e pesada
      touchMultiplier: 1.5,
    });

    // Sincroniza o Lenis diretamente com as atualizações do ScrollTrigger do GSAP
    lenis.on("scroll", ScrollTrigger.update);

    // Integra o requestAnimationFrame do Lenis ao ticker do GSAP para eliminar qualquer engasgo
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return <>{children}</>;
}
