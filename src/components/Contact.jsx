import React from "react";
import { openingHours, socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

export default function Contact() {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    timeLine
      .from(titleSplit.words, {
        opacity: 0,
        y: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", { opacity: 0, y: 100, stagger: 0.02 })
      .to("f-right-leaf", { y: -50, duration: 1, ease: "power1.out" })
      .to("f-left-leaf", { y: -50, duration: 1, ease: "power1.out" }, "<"); // < means both start the same time and move to opposite direction
  });

  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
      />

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit our Bar</h3>
          <p>123 Main St, Springfield, IL 62701</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(555) 456-7890</p>
          <p>hello@jane_doe.com</p>
        </div>

        <div>
          <h3>Open every day</h3>
          {openingHours.map(({ day, time }) => (
            <p key={day}>
              {day}: {time}
            </p>
          ))}
        </div>

        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map(({ name, icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <img src={icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
