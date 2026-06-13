import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import SideRails from "@/components/layout/SideRails";
import Hero from "@/components/sections/Hero";
import LazySections from "@/components/sections/LazySections";

export default function HomePage() {
  return (
    <>
      <Background />
      <Navbar />
      <SideRails />
      <main className="page-main mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-16 xl:px-16">
        <Hero />
        <LazySections />
      </main>
    </>
  );
}
