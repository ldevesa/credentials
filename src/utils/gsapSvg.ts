import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSvgScroll() {
  // Limpia instancias previas de ScrollTrigger
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  const svg = document.querySelector("#animated-svg");
  const path = svg?.querySelector("path");

  if (!path) {
    console.error("No se encontró el trazado del SVG.");
    return;
  }

  // Obtén la longitud del trazado
  const pathLength = path.getTotalLength();

  // Configura las propiedades iniciales del trazado
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  // Configura GSAP para animar stroke-dashoffset
  gsap.to(path, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: "#svg-container",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false, // Cambia a true para depuración
    },
  });
}
