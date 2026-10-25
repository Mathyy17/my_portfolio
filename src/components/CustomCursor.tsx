import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Safely check device parameters
    const checkDevice = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth >= 768;
      setIsMobile(!hasFinePointer || !isLargeScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Track position
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.className?.includes?.("cursor-pointer") ||
        target.getAttribute?.("role") === "button";

      if (isClickable) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.className?.includes?.("cursor-pointer") ||
        target.getAttribute?.("role") === "button";

      if (isClickable) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Suppress original cursor on desktop screens */}
      <style>{`
        @media (pointer: fine) {
          body, 
          a, 
          button, 
          [role="button"], 
          .cursor-pointer,
          select,
          input[type="submit"],
          input[type="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main coordinates binder */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      >
        {/* State container */}
        <div className="relative w-10 h-10 flex items-center justify-center">

          {/* 
            CROSSHAIR MODE:
            Active only when NOT hovering an interactive item.
            It is extremely delicate, composed of 4 lines + 1 central pixel.
          */}
          <div 
            className={`absolute flex items-center justify-center w-full h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovering ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0"
            }`}
          >
            {/* Center pixel dot */}
            <div className={`w-1 h-1 bg-white rounded-full transition-transform duration-300 ${isClicking ? "scale-50" : "scale-100"}`} />

            {/* Top tick line */}
            <div className="absolute w-[1px] h-[5px] bg-white top-1 left-1/2 -translate-x-1/2" />
            {/* Bottom tick line */}
            <div className="absolute w-[1px] h-[5px] bg-white bottom-1 left-1/2 -translate-x-1/2" />
            {/* Left tick line */}
            <div className="absolute h-[1px] w-[5px] bg-white left-1 top-1/2 -translate-y-1/2" />
            {/* Right tick line */}
            <div className="absolute h-[1px] w-[5px] bg-white right-1 top-1/2 -translate-y-1/2" />
          </div>

          {/* 
            INTERACTIVE TARGET MODE (Morph shape):
            Revealed ONLY on hover.
            Transforms into a minimalist hollow diamond/square with a glowing aesthetic.
          */}
          <div 
            className={`absolute flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovering ? "opacity-100 scale-100 rotate-45" : "opacity-0 scale-50 rotate-0"
            }`}
          >
            {/* Minimalist hollow diamond (rotated square outline) */}
            <div 
              className={`border border-rose-400 rounded-[3px] transition-all duration-300 shadow-[0_0_10px_rgba(244,63,94,0.4)] ${
                isClicking ? "w-4 h-4 bg-rose-500/30" : "w-5 h-5 bg-rose-500/10"
              }`}
            />
            {/* Glowing red core point in center of the diamond */}
            <div className="absolute w-1 h-1 bg-rose-400 rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]" />
          </div>

        </div>
      </div>
    </>
  );
}
