const GLOW_ID = "cursor-glow";

export function initCursorGlow(): void {
  const glow = document.getElementById(GLOW_ID);
  if (!glow) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    glow.remove();
    return;
  }

  const setPosition = (clientX: number, clientY: number): void => {
    glow.style.setProperty("--mx", `${clientX}px`);
    glow.style.setProperty("--my", `${clientY}px`);
  };

  const onMove = (e: PointerEvent): void => {
    setPosition(e.clientX, e.clientY);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  setPosition(window.innerWidth / 2, window.innerHeight / 2);
}
