import React, { useState, useRef } from "react";
import { useLanguage } from "../LanguageContext";
import { motion } from "motion/react";
import { Layers, Calendar, GraduationCap, User, Palette } from "lucide-react";
import SafeImage from "./SafeImage";

export default function BrutalScrollPresentation() {
  const { language } = useLanguage();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Configuration for cards cover and coordinates metadata
  const CARD_ITEMS = [
    {
      index: "01",
      title_fr: "A PROPOS DE MOI",
      title_en: "ABOUT ME",
      subtitle_fr: "Mathilde Ourceau",
      subtitle_en: "Mathilde Ourceau",
      coord: "COORD: HOME_BASE",
      accent: "#ec4899", // Ultimate vibrant hot pink from art direction screenshot
      secondary: "#f472b6" // Soft rose highlight
    },
    {
      index: "02",
      title_fr: "MES DÉBUTS",
      title_en: "MY BEGINNINGS",
      subtitle_fr: "Exploration & Dualité",
      subtitle_en: "Exploration & Duality",
      coord: "SYS_LOG: ORIGIN_DATA",
      accent: "#f43f5e", // Vibrant Rose
      secondary: "#fb7185" // Soft Rose
    },
    {
      index: "03",
      title_fr: "MON PARCOURS",
      title_en: "MY JOURNEY",
      subtitle_fr: "Formations & Diplômes",
      subtitle_en: "Education & Degrees",
      coord: "SYS_TRAJ: CY_TECH",
      accent: "#db2777", // Deep Pink
      secondary: "#fda4af" // Pastel Rose
    }
  ];

  // Specific slots offset & tilt presets to create physical "thrown on a desk" effect for exactly 3 cards
  const DESK_SLOTS = [
    { rotate: -2, x: -6, y: 0, delay: 0.1 },
    { rotate: 1, x: 0, y: -2, delay: 0.15 },
    { rotate: 3, x: 6, y: 1, delay: 0.2 }
  ];

  // Static stars background configuration
  const starsRef = useRef<{ x: number; y: number; size: number; key: number }[]>([]);
  if (starsRef.current.length === 0) {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 1.5 + 1,
        key: i
      });
    }
    starsRef.current = arr;
  }

  const toggleFlip = (index: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent overflow-y-auto overflow-x-hidden pt-[180px] sm:pt-[190px] md:pt-[170px] pb-12 px-4 md:px-8 z-10 custom-thin-scrollbar flex flex-col justify-between">
      {/* Add custom style overrides to perfectly implement the card DA from the image */}
      <style>{`
        .pres-card-da {
          width: 310px;
          height: 360px; /* Wider and slightly taller to ensure zero scrolling and maximum legibility */
        }
        @media (max-width: 640px) {
          .pres-card-da {
            width: 290px;
            height: 360px;
          }
        }
        .pres-card-da .pres-back, .pres-card-da .pres-front {
          background-color: #07070a !important;
          border-radius: 16px !important;
          border-width: 0px !important;
          box-shadow: none !important;
          overflow: hidden;
        }
        .pres-card-da .pres-back::before {
          display: none !important; /* Remove spinning animation for a clean tech-cosmic card style */
        }
        .pres-card-da .pres-back-content {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: transparent;
          border-radius: 0px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          overflow: hidden;
        }
        .pres-card-da .pres-front-content {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: transparent;
        }
      `}</style>

      {/* Dynamic colorful decorative blurs matching the refined pink/violet theme */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full filter blur-[100px] pointer-events-none z-0 opacity-40 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full filter blur-[120px] pointer-events-none z-0 opacity-40 animate-pulse" style={{ animationDuration: "8s" }} />

      {/* Parallax Stars backdrop field */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {starsRef.current.map((star) => (
          <div
            key={star.key}
            className="absolute rounded-full bg-white"
            style={{
              left: `${50 + star.x}%`,
              top: `${50 + star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.3)"
            }}
          />
        ))}
      </div>

      {/* Film grain layer overlay */}
      <div className="absolute inset-0 bg-brutal-grain pointer-events-none z-0 opacity-20" />

      {/* Main interactive area wrapper */}
      <div className="w-full max-w-6xl mx-auto px-4 relative z-20 flex-grow flex flex-col justify-center">
        {/* Interactive Desk Guide */}
        <div className="flex justify-center items-center mb-6 sm:mb-8 border-b border-white/5 pb-2 sm:pb-3 select-none">
          <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-400 tracking-wider">
            <Layers className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>
              {language === "FR"
                ? "BUREAU INTERACTIF • CLIQUEZ SUR UNE CARTE POUR LA RETOURNER"
                : "INTERACTIVE DESK • CLICK A CARD TO FLIP IT"}
            </span>
          </div>
        </div>

        {/* Scattered interactive card scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12 items-center justify-center justify-items-center w-full">
          {CARD_ITEMS.map((card, i) => {
            const slot = DESK_SLOTS[i] || { rotate: 0, x: 0, y: 0, delay: 0 };
            const isFlipped = !!flippedCards[card.index];

            return (
              <motion.div
                key={card.index}
                initial={{
                  opacity: 0,
                  y: 120,
                  x: (i % 2 === 0 ? -40 : 40),
                  rotate: i % 2 === 0 ? -15 : 15,
                  scale: 0.88
                }}
                animate={{
                  opacity: 1,
                  y: slot.y,
                  x: slot.x,
                  rotate: slot.rotate,
                  scale: 1,
                  zIndex: isFlipped ? 40 : 10
                }}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 15,
                  delay: slot.delay
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  x: 0,
                  y: -6,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 180, damping: 14 }
                }}
                className={`relative cursor-pointer ${
                  isFlipped ? "z-40" : "z-10"
                }`}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  toggleFlip(card.index);
                }}
              >
                  <div
                    className={`pres-card pres-card-da group ${isFlipped ? "pres-flipped" : ""}`}
                    style={{
                      "--card-accent": card.accent,
                      "--card-accent-secondary": card.secondary
                    } as React.CSSProperties}
                  >
                    <div className="pres-content">
                      
                      {/* ================= BACK SIDE (CLOSED CARD COVER - DA IDENTICAL TO THE PROVIDED SCREENSHOT) ================= */}
                      <div 
                        className="pres-back"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
                          `,
                          backgroundSize: "22px 22px",
                          border: `1px solid ${card.accent}45`,
                          boxShadow: `0 0 25px -5px ${card.accent}15`
                        }}
                      >
                        {/* Interactive glow effect */}
                        <div
                          className="absolute -inset-10 bg-radial-glow opacity-10 group-hover:opacity-20 blur-2xl transition-all duration-500 pointer-events-none rounded-full"
                          style={{ background: `radial-gradient(circle, ${card.accent} 0%, transparent 65%)` }}
                        />

                        {/* Technical Inset Corner Brackets (from the Art Direction) */}
                        <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t border-l pointer-events-none transition-colors duration-300 opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 border-t border-r pointer-events-none transition-colors duration-300 opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 border-b border-l pointer-events-none transition-colors duration-300 opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b border-r pointer-events-none transition-colors duration-300 opacity-80" style={{ borderColor: card.accent }} />

                        <div className="pres-back-content">
                          {/* Top Technical Info Bar */}
                          <div className="flex justify-between items-center w-full pb-2 border-b border-white/5 relative z-10">
                            <span className="font-mono text-[7.5px] text-neutral-500 uppercase tracking-widest font-semibold">
                              {/* Minimalism */}
                            </span>
                            <span style={{ color: card.accent }} className="font-mono text-[8px] font-extrabold tracking-wider">
                              {card.index}
                            </span>
                          </div>

                          {/* Central Accent-line & Large Capital Heading */}
                          <div className="my-auto py-2 flex flex-col justify-center items-center text-center relative z-10 w-full">
                            <h3 className="font-sans font-medium text-[15px] sm:text-[16px] leading-snug text-white uppercase tracking-[0.16em] w-full text-center">
                              {language === "FR" ? card.title_fr : card.title_en}
                            </h3>
                            <div
                              className="w-10 h-[1.5px] mt-3 transition-all duration-500 group-hover:w-20"
                              style={{ backgroundColor: card.accent }}
                            />
                          </div>

                          {/* Round square container with center glowing icon (Art Direction Match) */}
                          <div className="flex justify-center items-center w-full py-1 relative z-10">
                            <div 
                              className="w-[50px] h-[50px] rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                              style={{
                                backgroundColor: `${card.accent}08`,
                                borderColor: `${card.accent}30`,
                                boxShadow: `0 0 15px -3px ${card.accent}15`
                              }}
                            >
                              {card.index === "01" && <User className="w-5 h-5" style={{ color: card.accent }} />}
                              {card.index === "02" && <Palette className="w-5 h-5" style={{ color: card.accent }} />}
                              {card.index === "03" && <GraduationCap className="w-5 h-5" style={{ color: card.accent }} />}
                            </div>
                          </div>

                          {/* Technical Card Footer with Action link */}
                          <div className="flex justify-between items-center border-t border-white/5 pt-2 font-mono text-[7.5px] text-neutral-500 uppercase tracking-wider w-full relative z-10">
                            <span>{card.coord}</span>
                            <span style={{ color: card.accent }} className="text-[7px] font-extrabold group-hover:translate-x-0.5 transition-transform duration-300">
                              {language === "FR" ? "OUVRIR →" : "OPEN →"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ================= FRONT SIDE (OPEN / REVEALED FLIPPED STATE) ================= */}
                      <div 
                        className="pres-front"
                        style={{
                          backgroundImage: `
                             linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
                           `,
                          backgroundSize: "22px 22px",
                          border: `1px solid ${card.accent}45`,
                          boxShadow: `0 0 25px -5px ${card.accent}15`
                        }}
                      >
                        {/* Inner glow */}
                        <div
                          className="absolute -inset-10 bg-radial-glow opacity-10 group-hover:opacity-15 blur-2xl transition-all duration-500 pointer-events-none rounded-full"
                          style={{ background: `radial-gradient(circle, ${card.accent} 0%, transparent 65%)` }}
                        />

                        {/* Corner Brackets */}
                        <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t border-l pointer-events-none opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 border-t border-r pointer-events-none opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 border-b border-l pointer-events-none opacity-80" style={{ borderColor: card.accent }} />
                        <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b border-r pointer-events-none opacity-80" style={{ borderColor: card.accent }} />

                        <div className="pres-front-content">
                          
                          {/* Top Technical bar */}
                          <div className="flex justify-between items-center w-full pb-2 border-b border-white/5 relative z-10 select-none">
                            <span className="font-mono text-[7.5px] text-neutral-500 uppercase tracking-widest font-semibold">
                              {/* Minimalism */}
                            </span>
                            <span style={{ color: card.accent }} className="font-mono text-[8px] font-extrabold">{card.index}</span>
                          </div>

                          {/* Main content body (Guarantees zero scroll and fits perfectly inside cards bounds) */}
                          <div className="flex-grow flex flex-col justify-center w-full py-1.5 overflow-hidden relative z-10">
                            
                            {/* --- CARD 1: BIOGRAPHY WITH PORTRAIT IN COHERENT CHRONOS CIRCLE --- */}
                            {card.index === "01" && (
                              <div className="flex flex-col items-center justify-center text-center py-0.5">
                                <div className="relative">
                                  {/* Back glowing aura */}
                                  <div className="absolute inset-0 rounded-full blur-md opacity-30 scale-105" style={{ backgroundColor: card.accent }} />
                                  
                                  {/* Concentric rotating technical rings */}
                                  <div className="absolute -inset-1.5 rounded-full border border-dashed animate-[spin_50s_linear_infinite]" style={{ borderColor: `${card.accent}30` }} />
                                  <div className="absolute -inset-3 rounded-full border border-dashed animate-[spin_80s_linear_infinite_reverse]" style={{ borderColor: `${card.accent}15` }} />
                                  
                                  {/* Clean circular image container */}
                                  <div className="w-[105px] h-[105px] rounded-full overflow-hidden border-2 shadow-xl relative z-10" style={{ borderColor: `${card.accent}65` }}>
                                    <SafeImage
                                      src="/images/mathildeblue-042.jpg"
                                      alt="Mathilde Ourceau"
                                      className="w-full h-full object-cover object-[center_22%] group-hover:scale-105 transition-transform duration-500 ease-out"
                                      fallbackClassName="w-full h-full rounded-full min-h-0"
                                      fallbackText="Mathilde"
                                      hideLabel
                                    />
                                  </div>
                                </div>

                                <div className="mt-4 text-center px-1 select-text" onClick={(e) => e.stopPropagation()}>
                                  <h4 className="font-sans font-medium text-[13px] sm:text-[14px] leading-relaxed text-white tracking-[0.14em] uppercase">
                                    Mathilde Ourceau
                                  </h4>
                                  
                                  <div className="mt-4 flex flex-col gap-2.5 items-center justify-center">
                                    <span 
                                      className="font-mono text-[9px] uppercase tracking-[0.12em] font-extrabold"
                                      style={{ color: card.accent }}
                                    >
                                      {language === "FR" ? "21 Ans • Proche Paris, FR" : "21 Y/O • Near Paris, FR"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* --- CARD 2: MES DÉBUTS (EXPLORATION & DUAL SYSTEM - GUARANTEED ZERO SCROLL) --- */}
                            {card.index === "02" && (
                              <div className="space-y-3 text-left py-1 select-text w-full" onClick={(e) => e.stopPropagation()}>
                                {/* First paragraph: Creative explorations with light left pink accent line */}
                                <div className="p-2.5 rounded-lg border-l-2 bg-pink-500/5" style={{ borderColor: `${card.secondary}` }}>
                                  <p className="font-sans font-light text-[10.5px] leading-relaxed text-neutral-300">
                                    {language === "FR" ? (
                                      <>
                                        Depuis mon enfance, j’aime exprimer ma <span className="text-pink-400 font-medium select-text">créativité</span> sous différentes formes : <span className="text-pink-300 select-text">le dessin, la peinture, la couture, la photo, la mode...</span>
                                      </>
                                    ) : (
                                      <>
                                        Since my childhood, I have loved expressing my <span className="text-pink-400 font-medium select-text">creativity</span> in different ways: <span className="text-pink-300 select-text">drawing, painting, sewing, photography, fashion...</span>
                                      </>
                                    )}
                                  </p>
                                </div>

                                {/* Second paragraph: System analysis with light left rose accent line */}
                                <div className="p-2.5 rounded-lg border-l-2 bg-rose-500/5" style={{ borderColor: `${card.accent}` }}>
                                  <p className="font-sans font-light text-[10.5px] leading-relaxed text-neutral-300">
                                    {language === "FR" ? (
                                      <>
                                        Mais j’ai toujours eu, aussi, ce besoin de <span className="text-rose-400 font-medium select-text">comprendre comment les choses fonctionnent</span>, ce qui les relie, les <span className="text-rose-300 select-text">structure</span>, les rend <span className="text-rose-300 select-text">cohérentes</span>.
                                      </>
                                    ) : (
                                      <>
                                        But I have also always had this urge to <span className="text-rose-400 font-medium select-text">understand how things work</span>, what connects, <span className="text-rose-300 select-text">structures</span>, and aligns them.
                                      </>
                                    )}
                                  </p>
                                </div>

                                {/* Connection paragraph with light left neutral line */}
                                <div className="p-2.5 rounded-lg border-l-2 bg-white/5 border-neutral-700">
                                  <p className="font-sans font-light text-[10.5px] leading-relaxed text-neutral-300">
                                    {language === "FR" ? (
                                      <>
                                        Ce mélange-là me suit depuis toujours, et il façonne ma manière de <span className="text-rose-400 font-medium select-text">penser</span> et de <span className="text-pink-400 font-medium select-text">créer</span>.
                                      </>
                                    ) : (
                                      <>
                                        This blend has stayed with me ever since, and it shapes my way of <span className="text-rose-400 font-medium select-text">thinking</span> and <span className="text-pink-400 font-medium select-text">creating</span>.
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* --- CARD 3: MON PARCOURS (TIMELINE - COHERENT AND BALANCED, NO CHANCE TO SCROLL) --- */}
                            {card.index === "03" && (
                              <div className="flex flex-col gap-3 ml-1.5 relative pl-3.5 text-left py-0.5 select-text" onClick={(e) => e.stopPropagation()}>
                                {/* Vertical timeline lines */}
                                <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[1px]" style={{ background: `linear-gradient(to bottom, ${card.accent} 0%, ${card.secondary} 100%)` }} />

                                {/* College & Lycee ECST block */}
                                <div className="relative">
                                  <div className="absolute -left-[18.5px] top-1.5 w-2 h-2 rounded-full bg-neutral-950 border flex items-center justify-center shadow-md scale-90" style={{ borderColor: card.accent }} />
                                  <div className="flex flex-col">
                                    <span className="font-mono text-[7.5px] font-bold tracking-wider flex items-center gap-1 opacity-90" style={{ color: card.accent }}>
                                      <Calendar className="w-2.5 h-2.5" />
                                      2016 – 2023
                                    </span>
                                    <h4 className="font-sans text-[10px] font-bold text-white tracking-wide uppercase mt-0.5">
                                      COLLEGE ET LYCEE ECST
                                    </h4>
                                    <p className="font-sans text-[9px] text-neutral-300 font-light leading-snug">
                                      {language === "FR"
                                        ? "Baccalauréat Scientifique (Maths / Phys-Chimie)"
                                        : "High School Scientific Baccalaureate (Math / Physics)"}
                                    </p>
                                    <span className="text-[7.5px] font-mono tracking-wide uppercase font-semibold mt-0.5" style={{ color: card.accent }}>
                                      {language === "FR" ? "★ MENTION TRÈS BIEN" : "★ WITH HIGH HONORS"}
                                    </span>
                                  </div>
                                </div>

                                {/* CY Paris & CY Design Dual Curriculum Block */}
                                <div className="relative">
                                  <div className="absolute -left-[18.5px] top-1.5 w-2 h-2 rounded-full bg-neutral-900 border flex items-center justify-center shadow-md scale-90" style={{ borderColor: card.secondary }} />
                                  <div className="flex flex-col">
                                    <span className="font-mono text-[7.5px] font-bold tracking-wider flex items-center gap-1 opacity-90" style={{ color: card.secondary }}>
                                      <Calendar className="w-2.5 h-2.5" />
                                      2023 – 2029
                                    </span>
                                    <h4 className="font-sans text-[10px] font-bold text-white tracking-wide uppercase mt-0.5 flex items-center gap-1">
                                      <GraduationCap className="w-3.5 h-3.5" style={{ color: card.secondary }} />
                                      CY PARIS UNIVERSITE
                                    </h4>
                                    <p className="font-sans text-[9px] text-neutral-300 font-light leading-snug">
                                      {language === "FR"
                                        ? "Double diplôme ingénieur informatique & designer"
                                        : "Dual degree in CS Engineering & Design"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card Footer Branding bar */}
                          <div 
                            className="border-t border-white/5 pt-2 flex justify-between items-center font-mono text-[7px] text-neutral-500 tracking-widest w-full cursor-pointer select-none"
                            onClick={(e) => {
                              // Click footer to flip card back
                              e.stopPropagation();
                              toggleFlip(card.index);
                            }}
                          >
                            <span>MATHILDE OURCEAU</span>
                            <span style={{ color: card.accent }} className="font-semibold">
                              {language === "FR" ? "RETOUR →" : "BACK →"}
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
