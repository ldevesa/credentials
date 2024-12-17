import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initVideoScroll() {
  // Verifica si el video y el contenedor existen antes de continuar
  const video = document.querySelector("#video-background") as HTMLVideoElement | null;
  const container = document.querySelector("#video-container");

  if (!video || !container) {
    console.error("No se encontró el video o el contenedor.");
    return;
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP o ScrollTrigger no están disponibles.");
    return;
  }

  // Función para inicializar GSAP después de cargar los metadatos del video
  const initializeScrollTrigger = () => {
    const videoDuration = video.duration;

    if (isNaN(videoDuration) || !isFinite(videoDuration)) {
      console.error("La duración del video no es válida.");
      return;
    }

    console.log("Duración del video:", videoDuration);

    // Pausa el video inicialmente
    video.pause();

    // Mata cualquier instancia de ScrollTrigger existente
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Configura ScrollTrigger para sincronizar el video con el scroll
    gsap.to(video, {
      currentTime: videoDuration, // Avanza el tiempo del video hasta su duración total
      scrollTrigger: {
        trigger: container, // Elemento que activa el scroll
        start: "top top", // Cuando el contenedor está en la parte superior
        end: "bottom top", // Cuando el contenedor llega al final
        scrub: true, // Sincroniza el video con el scroll
        markers: false, // Desactiva los marcadores de depuración
      },
    });
  };

  // Si los metadatos ya están cargados, inicializa directamente
  if (video.readyState >= 1) {
    initializeScrollTrigger();
  } else {
    // Si no, espera a que se carguen
    video.addEventListener("loadedmetadata", initializeScrollTrigger, { once: true });
  }
}
