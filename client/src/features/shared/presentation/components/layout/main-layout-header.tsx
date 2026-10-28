"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "./app-header";
import { AppNavbar } from "./app-navbar";
import { useHeaderScrollVisibility } from "../../hooks/use-header-scroll-visibility";

export function MainLayoutHeader() {
  const pathname = usePathname();
  const isHeaderVisible = useHeaderScrollVisibility();

  if (pathname === "/search") {
    return null;
  }

  return (
    <header className="shrink-0 z-40 bg-white">
      {/* Contenedor colapsable para AppHeader con animación fluida de altura y opacidad */}
      <div
        className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-in-out ${
          isHeaderVisible
            ? "grid-rows-[1fr] opacity-100 translate-y-0"
            : "grid-rows-[0fr] opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <AppHeader />
        </div>
      </div>

      {/* En pantallas de escritorio la navegación está en el DesktopSidebar */}
      <div className="lg:hidden">
        <AppNavbar />
      </div>
    </header>
  );
}
