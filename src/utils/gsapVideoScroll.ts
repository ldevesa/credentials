import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initVideoScroll() {
  // Verifica si el video y el contenedor existen antes de continuar
  const video = document.querySelector("#video-background");
  const container = document.querySelector("#video-container");

  if (!video || !container) {
    console.error("No se encontró el video o el contenedor.");
    return;
  }

  const htmlVideo = video as HTMLVideoElement;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP o ScrollTrigger no están disponibles.");
    return;
  }

  htmlVideo.addEventListener('loadedmetadata', () => {
    const videoDuration = htmlVideo.duration;
    if (isNaN(videoDuration) || !isFinite(videoDuration)) {
      console.error("La duración del video no es válida.");
      return;
    }

    console.log('Duración del video:', videoDuration);
    htmlVideo.pause();

    // Mata cualquier instancia de ScrollTrigger existente antes de crear una nueva
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Configuración de ScrollTrigger para avanzar o retroceder el video con el scroll
    gsap.to(htmlVideo, {
      currentTime: videoDuration,
      scrollTrigger: {
        trigger: container, // El contenedor o el elemento que activa el scroll
        start: "top top", // Empieza cuando el contenedor esté en la parte superior
        end: "bottom top", // Termina cuando el contenedor llegue al final
        scrub: true, // Sincroniza el video con el scroll
        markers: false, // Desactiva los marcadores de depuración
      }
    });
  });

  // Inicializar el script después de que la página esté completamente cargada
  window.onload = () => {
    initVideoScroll();
  };
}
