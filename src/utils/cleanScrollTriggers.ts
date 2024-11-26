import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Limpia todos los triggers y animaciones activas de GSAP.
 * Este método debe ejecutarse antes de cambiar de página
 * o al desmontar la sección correspondiente.
 */
export function cleanScrollTriggers() {
  // Limpia todos los ScrollTriggers activos
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Limpia la línea de tiempo global de GSAP
  gsap.globalTimeline.clear();

  console.log("ScrollTrigger y animaciones de GSAP limpiados.");
}
