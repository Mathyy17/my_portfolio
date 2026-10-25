import React from "react";
import { useLanguage } from "../LanguageContext";
import BrutalScrollPresentation from "./BrutalScrollPresentation";
import TypewriterScramble from "./TypewriterScramble";
import { motion } from "motion/react";

export default function AboutSection() {
  const { t, language } = useLanguage();

  return (
    <div className="relative w-full h-[calc(100vh-120px)] md:h-[calc(100vh-64px)] bg-transparent overflow-hidden flex flex-col justify-between py-6 md:py-8 z-10 animate-fade-in">
      
      {/* Background design matrix grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090c_1px,transparent_1px),linear-gradient(to_bottom,#09090c_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none z-0" />
      
      {/* Radial soft background ambient spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* 3D Immersive Presentation Tunnel serving as the entire background/scene */}
      <BrutalScrollPresentation />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-20 flex-grow flex flex-col justify-between pointer-events-none">
        
        {/* ================= HERO HEADER TITLE ================= */}
        <div className="w-full mb-6 md:mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-6 shrink-0 font-display pointer-events-auto">
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{t("about.marker")}</span>
            </motion.div>

            <TypewriterScramble
              text={language === "FR" ? "Présentation" : "Presentation"}
              as="h2"
              className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight"
              delay={100}
            />

            <motion.p 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="font-mono text-xs text-neutral-400 mt-2 max-w-2xl leading-relaxed"
            >
              {language === "FR" 
                ? "Apprenez en plus sur moi et mon parcours" 
                : "Learn more about me and my journey"}
            </motion.p>
          </div>
        </div>

        {/* Empty flex spacer allowing full-bleed space for 3D Cards */}
        <div className="flex-grow pointer-events-none" />

      </div>
    </div>
  );
}
