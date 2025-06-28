import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
    </main>
  );
}
