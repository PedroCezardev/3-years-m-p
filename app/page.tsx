import Preloader from "@/components/preloader/preloader";
import Hero from "@/components/hero/hero";
import Message from "@/components/message/message";
import Gallery from "@/components/gallery/gallery";
import Counter from "@/components/counter/counter";
import Letter from "@/components/letter/letter";
import Words3D from "@/components/words-3d/words-3d";
import Footer from "@/components/footer/footer";

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
