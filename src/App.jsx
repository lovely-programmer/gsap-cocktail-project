import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <div className="h-dvh bg-black" />
    </main>
  );
}
