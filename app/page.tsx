import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/preloader";
import Hero from "@/components/hero/hero";
import Message from "@/components/message/message";

// Componentes "Abaixo da Dobra" carregados dinamicamente para melhorar o TBT (Total Blocking Time)
const Gallery = dynamic(() => import("@/components/gallery/gallery"));
const Counter = dynamic(() => import("@/components/counter/counter"));
const Words3D = dynamic(() => import("@/components/words-3d/words-3d"));
const Letter = dynamic(() => import("@/components/letter/letter"));
const Footer = dynamic(() => import("@/components/footer/footer"));

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Preloader />
      <Hero />
      <Message />
      <Gallery />
      <Counter />
      <Words3D />
      <Letter />
      <Footer />
    </main>
  );
}
