"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook para detectar la dirección de scroll en los feeds principales
 * (Explorar, Mis actividades y Mi trayectoria).
 *
 * - Al scrollear hacia abajo: oculta el header (`false`).
 * - Al scrollear hacia arriba o llegar al tope: muestra el header (`true`).
 * - Al cambiar de ruta o pestaña: restablece la visibilidad a `true`.
 */
export function useHeaderScrollVisibility() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTopRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Mantener ref sincronizada con el estado para evitar re-renders innecesarios
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Al navegar entre páginas o pestañas, siempre mostrar la cabecera
  useEffect(() => {
    setIsVisible(true);
    isVisibleRef.current = true;
    lastScrollTopRef.current = 0;
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const SCROLL_THRESHOLD = 8; // Umbral de desplazamiento mínimo para ignorar vibraciones
    const TOP_REVEAL_THRESHOLD = 15; // Cerca del tope siempre visible

    const handleScroll = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      // Escuchar únicamente contenedores con scroll vertical dentro del área principal <main>
      if (!target.closest("main")) return;
      if (target.scrollHeight <= target.clientHeight) return;

      const currentScrollTop = target.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Si está en el tope o muy cerca, siempre visible
          if (currentScrollTop <= TOP_REVEAL_THRESHOLD) {
            if (!isVisibleRef.current) {
              setIsVisible(true);
            }
            lastScrollTopRef.current = Math.max(0, currentScrollTop);
            ticking = false;
            return;
          }

          // 2. Prevenir falsos disparos por rebote elástico en el fondo (iOS rubber-banding)
          const maxScroll = target.scrollHeight - target.clientHeight;
          if (currentScrollTop >= maxScroll - 5) {
            lastScrollTopRef.current = currentScrollTop;
            ticking = false;
            return;
          }

          const delta = currentScrollTop - lastScrollTopRef.current;

          // 3. Scrolleando hacia abajo -> ocultar header
          if (delta > SCROLL_THRESHOLD) {
            if (isVisibleRef.current) {
              setIsVisible(false);
            }
          }
          // 4. Scrolleando hacia arriba -> mostrar header
          else if (delta < -SCROLL_THRESHOLD) {
            if (!isVisibleRef.current) {
              setIsVisible(true);
            }
          }

          lastScrollTopRef.current = Math.max(0, currentScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  return isVisible;
}
