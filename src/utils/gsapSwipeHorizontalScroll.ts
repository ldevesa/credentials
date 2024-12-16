import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSwipeSection() {
    let currentIndex: number = -1;
    let animating: boolean = false;
    const swipePanels = gsap.utils.toArray<HTMLElement>(".swipe-section .panel");
    
    // Configura el segundo panel con `xPercent: 100` o `xPercent: -100` dependiendo de si el scroll es vertical u horizontal
    gsap.set(".x-100", { xPercent: 100 });
    
    // Configura los niveles de z-index para los paneles de swipe
    gsap.set(swipePanels, {
      zIndex: (i: number) => i,
    });
    
    // Crea un observador de intención y desactívalo al inicio
    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => !animating && gotoPanel(currentIndex + 1, true),
      onDown: () => !animating && gotoPanel(currentIndex - 1, false),
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onPress: (self) => {
        // En dispositivos táctiles, llama a preventDefault() en `touchstart` para evitar el scrolling
        if (ScrollTrigger.isTouch) {
          self.event.preventDefault();
        }
      },
    });
    intentObserver.disable();
    
    // Manejo de las animaciones de panel swipe
    function gotoPanel(index: number, isScrollingDown: boolean) {
      if (animating) return;
    
      animating = true;
    
      // Regresa al scroll normal si estamos al final o al inicio
      if ((index >= swipePanels.length && isScrollingDown) || (index < 0 && !isScrollingDown)) {
        animating = false;
        if (isScrollingDown) intentObserver.disable();
        return;
      }
    
      // Selecciona el panel objetivo
      const target = isScrollingDown ? swipePanels[index] : swipePanels[currentIndex];
    
      if (target) {
        gsap.to(target, {
          xPercent: isScrollingDown ? 0 : 100,
          duration: 1,
          onComplete: () => {
            animating = false;
          },
        });
        currentIndex = index;
        console.log("Current Index:", index);
      } else {
        console.error("Target panel no encontrado.");
        animating = false;
      }
    }
    
    // Pin swipe section e inicia el observador
    ScrollTrigger.create({
      trigger: ".swipe-section",
      pin: true,
      start: "top top",
      end: "+=100%",
      markers: true,
      onEnter: () => {
        intentObserver.enable();
        gotoPanel(currentIndex + 1, true);
      },
      onEnterBack: () => {
        intentObserver.enable();
        gotoPanel(currentIndex - 1, false);
      },
    });
}