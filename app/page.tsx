import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import LazySections from "@/components/sections/LazySections";

export default function HomePage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="page-main mx-auto w-full max-w-7xl">
        <Hero />
        <LazySections />
      </main>
    </>
  );
}
