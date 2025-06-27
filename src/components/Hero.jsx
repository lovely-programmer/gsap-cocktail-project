import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines, words" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      y: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      y: 100,
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // Note the first property refer to the element we are animating and the second property is about the screen. startValue same for the endValue
    // So what we are saying is that when the top of the video reach 50% down the screen, start the animation in the mobile version, similarly when the center of the video reaches 60% down the screen, start the animation in the desktop version
    // The same goes for the endValue, when the bottom of the video reaches 120% past the top of the screen, end the animation in the mobile version, similarly when the bottom of the video reaches the top of the screen, end the animation in the desktop version

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "video", // The element that triggers the animation
        start: startValue, // The animation starts when the top of the element reaches the top of the viewport
        end: endValue, // The animation ends when the bottom of the element reaches the bottom of the viewport
        scrub: true, // Enable scrubbing ( animation follows the scroll position )
        pin: true, // Pin the animation to the top of the viewport
      },
    });

    // When the video's metadata is loaded, the `onloadedmetadata` event is triggered, so we can start the animation when the video is ready
    videoRef.current.onloadedmetadata = () => {
      timeline.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the spirt <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative recipes, and a dash of passion. We're not just serving
                drinks, we're serving an experience.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          src="/videos/output.mp4"
          ref={videoRef}
          preload="auto"
          muted
          playsInline
        />
      </div>
    </>
  );
}
