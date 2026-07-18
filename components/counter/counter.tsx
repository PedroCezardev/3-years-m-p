"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/header/section-header";

gsap.registerPlugin(ScrollTrigger);

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Counter = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      // Data inicial do namoro: 18 de Julho de 2023 às 00:00:00 (mês 6 = Julho no JS)
      const startDate = new Date(2023, 6, 18, 0, 0, 0);
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTime({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
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
      <SectionHeader leftText="Pedro & Mari" rightText="18/07/2023" />

      {/* Main Content: Centered Title and Counter String */}
      <div
        ref={contentRef}
        className="flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-12 md:px-20 my-16 sm:my-24 text-center max-w-6xl mx-auto space-y-10 sm:space-y-16"
      >
        <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide drop-shadow-sm">
          Eu te amo há:
        </h2>

        {mounted && (
          <p className="font-parisienne text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/95 leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide drop-shadow-md px-4">
            {time.years} {time.years === 1 ? "ano" : "anos"},{" "}
            {time.months} {time.months === 1 ? "mês" : "meses"},{" "}
            {time.days} {time.days === 1 ? "dia" : "dias"},{" "}
            {time.hours} {time.hours === 1 ? "hora" : "horas"},{" "}
            {time.minutes} {time.minutes === 1 ? "minuto" : "minutos"} e{" "}
            {time.seconds} {time.seconds === 1 ? "segundo" : "segundos"}
          </p>
        )}
      </div>

      {/* Bottom balance spacing */}
      <div className="h-4 sm:h-8" />
    </section>
  );
};

export default Counter;
