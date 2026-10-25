import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { PortfolioItem } from "./ProjectsSection";
import SafeImage from "./SafeImage";

interface ProjectDetailOverlayProps {
  selectedProject: PortfolioItem | null;
  setSelectedProject: (proj: PortfolioItem | null) => void;
  language: "FR" | "EN";
  t: (key: string) => string;
  projectsModalWrapperRef: React.RefObject<HTMLDivElement | null>;
  projectsLeftColumnRef: React.RefObject<HTMLDivElement | null>;
  setZoomedImage: (src: string | null) => void;
}

export default function ProjectDetailOverlay({
  selectedProject,
  setSelectedProject,
  language,
  t,
  projectsModalWrapperRef,
  projectsLeftColumnRef,
  setZoomedImage
}: ProjectDetailOverlayProps) {
  const [modalActiveImageIdx, setModalActiveImageIdx] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Smooth handle close with exit animation triggering before actual unmount
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
    }, 3000); // Matches transition duration (exactly 3 seconds)
  };

  React.useEffect(() => {
    // Mount trigger for smooth ultra-slow transitions
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 45);

    // Escape key listener for intuitive desk-level accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Prevent scrolling behind the full-screen modal viewport
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedProject]);

  if (!selectedProject) return null;

  const isTer = selectedProject.id === "proj_ter";
  const isWevel = selectedProject.id === "proj_wevel";

  // Data definition for TER (Project 1)
  const terData = {
    title: language === "FR" ? "Repenser le parcours TER" : "Rethinking the TER Journey",
    subtitle: language === "FR" 
      ? "Comment s’appuyer sur un levier d’humanisation pour sécuriser et ainsi séréniser le parcours voyageur TER ?"
      : "How to leverage human connection to secure and bring serenity to the TER passenger experience?",
    client: "SNCF Voyageur",
    context: language === "FR" ? "Projet Design Global" : "Global Design Project",
    year: "2026",
    tags: language === "FR" ? ["UX Research", "Travail d’équipe", "User Journey"] : ["UX Research", "Teamwork", "User Journey"]
  };

  // Data definition for Wevel (Project 2)
  const wevelData = {
    title: "Wevel +",
    subtitle: language === "FR"
      ? "Comment adapter les attentes technologiques et innovantes du projet w+ pour permettre à des femmes portant le voile de maintenir un confort capillaire et un bien être tout au long de la journée ?"
      : "How to adapt the technological and innovative expectations of the w+ project to allow women wearing the veil to maintain scalp comfort and well-being throughout the day?",
    client: "Wevel +",
    context: language === "FR" ? "Projet Design Global" : "Global Design Project",
    year: "2026",
    tags: language === "FR" 
      ? ["R&D", "Inclusif", "Ergonomie", "Prototype", "Pistes d'innovation"]
      : ["R&D", "Inclusive", "Ergonomics", "Prototype", "Innovation Paths"]
  };

  // Data definition for CY Lab (Project 3)
  const cyData = {
    title: language === "FR" ? "Mobilier informatique" : "Computer Lab Furniture",
    subtitle: language === "FR"
      ? "Comment rendre un laboratoire informatique modulable, adaptable aux technologies de demain dans un esprit convivial ?"
      : "How to make a computer lab modular, adaptable to tomorrow's technologies in a friendly spirit?",
    client: "CY ÉCOLE DE DESIGN",
    context: language === "FR" ? "Workshop Mobilier 2025" : "Furniture Workshop 2025",
    year: "2025",
    tags: language === "FR" 
      ? ["Workshop", "Ergonomie", "Modulaire", "Prototypage 1/10", "Découpe Laser"]
      : ["Workshop", "Ergonomics", "Modular", "Scale 1/10 Prototyping", "Laser Cutting"]
  };

  const data = isTer ? terData : (isWevel ? wevelData : cyData);

  return createPortal(
    <div 
      ref={projectsModalWrapperRef} 
      className="fixed inset-0 z-50 overflow-hidden flex flex-col w-screen h-screen"
    >
      {/* 
        STAGE 1: BLACK CINEMATIC BACKDROP
        Instantly covers the immersive dark starry background with a dense dark overlay.
      */}
      <div 
        onClick={handleClose}
        className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out cursor-zoom-out z-40 ${
          isMounted && !isClosing ? "bg-neutral-950/98 opacity-100 backdrop-blur-xl" : "bg-neutral-950/0 opacity-0 backdrop-blur-none"
        }`}
      ></div>

      {/* 
        STAGE 2: FULL-SCREEN PRISTINE WHITE CANVAS
        Takes 100% of the screen space, with an elegant 3-second blur & fade transition from black.
      */}
      <div className={`relative w-full h-full bg-white z-50 flex flex-col transition-all duration-[3000ms] ease-in-out overflow-hidden ${
        isMounted && !isClosing 
          ? "opacity-100 blur-0" 
          : "opacity-0 blur-3xl pointer-events-none"
      }`}>
        
        {/* Floating high-contrast close button: perfectly anchored at top right */}
        <button
          onClick={handleClose}
          className={`absolute top-6 right-6 sm:top-8 sm:right-8 z-[100] p-3 border rounded-full transition-all duration-500 cursor-pointer shadow-sm hover:rotate-90 hover:scale-115 active:scale-90 ${
            isMounted && !isClosing 
              ? "text-neutral-500 hover:text-neutral-950 bg-[#fafafa] hover:bg-neutral-100 border-neutral-200" 
              : "text-transparent bg-transparent border-transparent"
          }`}
          title={language === "FR" ? "Fermer" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* SINGLE INTEGRATED SCROLLABLE CONTAINER (Full Width, No Margins) */}
        <div ref={projectsLeftColumnRef} className="w-full flex-1 overflow-y-auto custom-scrollbar relative bg-white overflow-x-hidden text-left">
          
          {/* 1. TOP HEADER BLOCK - Redesigned into an ultra-premium editorial layout */}
          <div className="border-b border-neutral-150/60 bg-white p-8 sm:p-12 md:p-16 relative text-left">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Left Column: Title & Key Narrative Statement */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Visual Category Badge & Phase */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 ${
                    isTer ? "text-rose-600" : isWevel ? "text-violet-600" : "text-amber-600"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isTer ? "bg-rose-500 animate-pulse" : isWevel ? "bg-violet-500 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
                    {isTer ? "DESIGN DE SERVICE" : (isWevel ? "DESIGN GLOBAL" : "DESIGN DE PRODUIT")}
                  </span>
                  <span className="text-neutral-300 font-light text-xs">/</span>
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.2em] font-medium">
                    {language === "FR" ? "ÉCOLE CY DE DESIGN" : "CY DESIGN SCHOOL"}
                  </span>
                </div>

                {/* Main Heading styled with premium brand-scale high-contrast typography */}
                <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight uppercase leading-[1.12]">
                  {data.title}
                </h2>

                {/* Subtitle presenting the core problematic statement */}
                <p className="font-sans font-light text-neutral-600 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl pt-2 border-t border-neutral-100/80">
                  {data.subtitle}
                </p>
              </div>

              {/* Right Column: High-contrast architectural metadata box */}
              <div className="lg:col-span-5 bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                {/* Thin dynamic top indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${isTer ? "bg-rose-500" : isWevel ? "bg-violet-500" : "bg-amber-500"}`} />
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-1">
                    <span className="text-neutral-400 uppercase tracking-[0.16em] block text-[8px] font-bold font-mono">
                      {language === "FR" ? "CLIENT" : "CLIENT"}
                    </span>
                    <span className="text-neutral-800 font-sans font-semibold text-xs sm:text-[13px] tracking-wide block">
                      {data.client}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-neutral-400 uppercase tracking-[0.16em] block text-[8px] font-bold font-mono">
                      {language === "FR" ? "ANNÉE" : "YEAR"}
                    </span>
                    <span className="text-neutral-800 font-sans font-semibold text-xs sm:text-[13px] tracking-wide block">
                      {data.year}
                    </span>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <span className="text-neutral-400 uppercase tracking-[0.16em] block text-[8px] font-bold font-mono">
                      {language === "FR" ? "CONTEXTE" : "CONTEXT"}
                    </span>
                    <span className="text-neutral-800 font-sans font-medium text-xs sm:text-[13px] tracking-wide block">
                      {data.context}
                    </span>
                  </div>

                  <div className="space-y-2 col-span-2 pt-2 border-t border-neutral-200/40">
                    <span className="text-neutral-400 uppercase tracking-[0.16em] block text-[8px] font-bold font-mono">
                      {language === "FR" ? "COMPÉTENCES CLÉS" : "KEY SKILLS"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="font-mono text-[9px] text-neutral-700 bg-white border border-neutral-200/80 px-2 rounded-md py-0.5 tracking-wide font-normal hover:text-neutral-900 lg:hover:bg-neutral-100 transition shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 2. INNER CONTENT WRAPPER */}
          <div className="p-6 sm:p-10 space-y-12 pb-24 relative bg-[#fdfdfd]">
            
            {/* Glowing background highlights in soft pastel theme */}
            <div className={`absolute top-20 left-1/4 w-80 h-80 ${isTer ? "bg-rose-500/5" : isWevel ? "bg-violet-500/5" : "bg-amber-500/5"} rounded-full blur-[100px] pointer-events-none`} />
            <div className={`absolute bottom-20 right-1/4 w-80 h-80 ${isTer ? "bg-rose-500/5" : isWevel ? "bg-violet-500/5" : "bg-amber-500/5"} rounded-full blur-[100px] pointer-events-none`} />

          {isTer ? (
            // ==========================================
            // TER PROJECT CONTENT WITH IMAGES FOREFRONT
            // ==========================================
            <div className="space-y-16 max-w-5xl mx-auto relative z-10">
              
              {/* BLOC 01 // OBSERVATION */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="text-rose-500 font-semibold">🔍</span>
                    {language === "FR" ? "01 // L'immersion Terrain" : "01 // Field Immersion"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">01</span>
                </div>

                <p className="text-neutral-500 font-display text-xs sm:text-sm italic pl-1 leading-relaxed font-sans">
                  {language === "FR" 
                    ? "Ce que nous avons observé en allant à la rencontre des usagers."
                    : "What we observed when meeting the users."}
                </p>

                {/* Main image - Elegant frameless layout with zoom ability */}
                <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 sm:p-3 shadow-sm rounded-2xl">
                  <SafeImage 
                    src="/images/SNCF (1).png" 
                    alt="T'MATES Field Observations"
                    theme="light"
                    className="w-full h-auto max-h-[580px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 hover:scale-[1.005] hover:brightness-[1.01]"
                    onClick={() => setZoomedImage("/images/SNCF (1).png")}
                  />
                  <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-300 tracking-wider uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 cursor-pointer">
                    <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    {language === "FR" ? "AGRANDIR" : "ZOOM IN"}
                  </div>
                </div>

                {/* Enhanced Layout: Grid combining structured insights + custom editorial Quote Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Analytical Insights */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-neutral-200/70 hover:border-rose-200 transition duration-300 shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 uppercase tracking-wider font-semibold inline-block">
                          {language === "FR" ? "01 // LE CONSTAT" : "01 // THE FINDING"}
                        </span>
                        <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed">
                          {language === "FR" 
                            ? "L'automatisation des gares régionales et le manque de présence humaine créent un sentiment d'isolement et d'insécurité chez les voyageurs."
                            : "The automation of regional stations and the lack of human presence create a feeling of isolation and insecurity among passengers."}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-neutral-150 mt-4 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                        Status: Observation
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-neutral-200/70 hover:border-rose-200 transition duration-300 shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 uppercase tracking-wider font-semibold inline-block">
                          {language === "FR" ? "02 // LE POINT DE FRICTION" : "02 // THE FRICTION POINT"}
                        </span>
                        <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed">
                          {language === "FR"
                            ? "La charge mentale explose au moindre imprévu logistique du quotidien (surveiller un bagage lourd, s'absenter pour acheter de l'eau, gérer un enfant un court instant)."
                            : "Mental load spikes at the slightest daily logistical unexpected event (watching heavy luggage, leaving briefly to buy water, managing a child for a short moment)."}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-neutral-150 mt-4 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                        Status: Friction
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Elegant field analysis image */}
                  <div className="lg:col-span-5 relative select-none rounded-xl overflow-hidden border border-neutral-200/80 shadow-sm bg-white flex items-center justify-center p-3 min-h-[220px]">
                    <SafeImage 
                      src="/images/SNCF (2).png" 
                      alt="T'MATES Field Note"
                      theme="light"
                      className="w-full h-auto max-h-[300px] object-contain cursor-zoom-in transition-all duration-500 hover:scale-[1.015]"
                      onClick={() => setZoomedImage("/images/SNCF (2).png")}
                    />
                    <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-300 tracking-wider uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 cursor-pointer" onClick={() => setZoomedImage("/images/SNCF (2).png")}>
                      <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM"}
                    </div>
                  </div>
                </div>


              </div>

              {/* BLOC 02 // LE CONCEPT */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="text-rose-500 font-semibold">🤝</span>
                    {language === "FR" ? "02 // Le Concept : T'Mates" : "02 // The Concept: T'Mates"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">02</span>
                </div>

                {/* Concept Logo styled as a standalone frameless asset centered natively */}
                <div className="w-full group relative select-none flex flex-col items-center justify-center py-6">
                  <SafeImage 
                    src="/images/SNCF (3).png" 
                    alt="T'MATES Brand Emblem"
                    theme="light"
                    className="w-full max-w-xl h-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-500 cursor-zoom-in group-hover:scale-[1.015]"
                    onClick={() => setZoomedImage("/images/SNCF (3).png")}
                  />
                  <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-300 tracking-wider uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 cursor-pointer">
                    <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    {language === "FR" ? "AGRANDIR" : "ZOOM IN"}
                  </div>
                </div>

                {/* Enhanced Layout: Custom explanation statement & community connection image mockup */}
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200/90 shadow-sm space-y-6">
                  <div className="border-l-2 border-rose-500 pl-4 space-y-2">
                    <p className="text-neutral-800 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                      {language === "FR" 
                        ? "T’Mates est un service solidaire qui connecte les voyageurs d'un même trajet pour transformer l'isolement en entraide. L'objectif est de valoriser une communauté bienveillante pour que les usagers puissent s'accompagner, se rassurer et s'aider, de la gare de départ jusqu'à l'arrivée."
                        : "T’Mates is a supportive service that connects travelers on the same journey to transform isolation into mutual aid. The objective is to promote a caring community so that users can accompany, reassure and help each other, from the departure station to the arrival."}
                    </p>
                  </div>

                  {/* Interconnected image mockup */}
                  <div className="w-full relative select-none overflow-hidden rounded-2xl bg-white border border-neutral-150 p-2">
                    <SafeImage 
                      src="/images/SNCF (3.5).png" 
                      alt="T'MATES Community Interface"
                      theme="light"
                      className="w-full h-auto max-h-[460px] object-contain cursor-zoom-in transition-all duration-500 hover:scale-[1.008] hover:brightness-[1.01]"
                      onClick={() => setZoomedImage("/images/SNCF (3.5).png")}
                    />
                    <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer" onClick={() => setZoomedImage("/images/SNCF (3.5).png")}>
                      <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM IN"}
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOC 03 // THE 3-POINT ECOSYSTEM */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="text-violet-500 font-semibold">🛠️</span>
                    {language === "FR" ? "03 // Le Dispositif" : "03 // The Touchpoint System"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">03</span>
                </div>

                <p className="text-neutral-500 font-display text-xs sm:text-sm italic pl-1 leading-relaxed font-sans">
                  {language === "FR" 
                    ? "Une solution phygitale qui se déploie à travers trois outils complémentaires."
                    : "A phygital solution deployed through three complementary tools."}
                </p>

                {/* Editorial Columns: Images are large, rounded and frameless */}
                <div className="space-y-12 pt-4">
                  
                  {/* Column 1: DIGITAL */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100">
                      <SafeImage 
                        src="/images/SNCF (4.5).png" 
                        alt="Digital Screen Module"
                        theme="light"
                        className="w-full h-auto max-h-[640px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 group-hover:scale-[1.005] hover:brightness-[1.01]"
                        onClick={() => setZoomedImage("/images/SNCF (4.5).png")}
                      />
                      <span className="absolute top-4 left-4 font-mono text-[9px] bg-neutral-950/90 text-neutral-300 px-3 py-1 rounded-md uppercase font-bold tracking-wider">
                        01 // DIGITAL
                      </span>
                      <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/SNCF (4.5).png")}>
                        <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    {/* Text underneath */}
                    <div className="space-y-3">
                      <h4 className="font-display font-medium text-neutral-800 text-[15px] sm:text-[16px] uppercase tracking-tight flex items-center justify-between">
                        <span className="flex items-center gap-2">📱 {language === "FR" ? "L'App (Digital)" : "The App (Digital)"}</span>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      </h4>
                      <p className="text-neutral-500 text-[12.5px] leading-relaxed font-sans font-light max-w-3xl">
                        {language === "FR"
                          ? "Un module intégré à l'application SNCF Connect pour se signaler discrètement comme voyageur solidaire et actif sur son trajet."
                          : "An integrated module in the SNCF Connect app to discretely self-identify as a supportive, active passenger on your journey."}
                      </p>
                      <div className="border-t border-neutral-100 pt-3 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>FORMAT: INTEGRATED MODULE</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: SPATIAL */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100">
                      <SafeImage 
                        src="/images/SNCF (4).png" 
                        alt="Spatial Signage Mockups"
                        theme="light"
                        className="w-full h-auto max-h-[640px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 group-hover:scale-[1.005] hover:brightness-[1.01]"
                        onClick={() => setZoomedImage("/images/SNCF (4).png")}
                      />
                      <span className="absolute top-4 left-4 font-mono text-[9px] bg-neutral-950/90 text-neutral-300 px-3 py-1 rounded-md uppercase font-bold tracking-wider">
                        02 // SPATIAL
                      </span>
                      <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/SNCF (4).png")}>
                        <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    {/* Text underneath */}
                    <div className="space-y-3">
                      <h4 className="font-display font-medium text-neutral-800 text-[15px] sm:text-[16px] uppercase tracking-tight flex items-center justify-between">
                        <span className="flex items-center gap-2">📍 {language === "FR" ? "La Gare (Espace)" : "The Station (Space)"}</span>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      </h4>
                      <p className="text-neutral-500 text-[12.5px] leading-relaxed font-sans font-light max-w-3xl">
                        {language === "FR"
                          ? "Une signalétique au sol qui matérialise une \"zone d'attente solidaire\" sécurisante, permettant de se retrouver facilement."
                          : "Floor signage establishing a secure \"supportive waiting zone,\" making it easy to find one another."}
                      </p>
                      <div className="border-t border-neutral-100 pt-3 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>FORMAT: 1:1 SIGNALÉTIQUE</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: PHYSICAL */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100">
                      <SafeImage 
                        src="/images/SNCF (5).png" 
                        alt="Physical Travel Tag Badge"
                        theme="light"
                        className="w-full h-auto max-h-[640px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 group-hover:scale-[1.005] hover:brightness-[1.01]"
                        onClick={() => setZoomedImage("/images/SNCF (5).png")}
                      />
                      <span className="absolute top-4 left-4 font-mono text-[9px] bg-neutral-950/90 text-neutral-300 px-3 py-1 rounded-md uppercase font-bold tracking-wider">
                        03 // PHYSICAL
                      </span>
                      <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-355 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/SNCF (5).png")}>
                        <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    {/* Text underneath */}
                    <div className="space-y-3">
                      <h4 className="font-display font-medium text-neutral-800 text-[15px] sm:text-[16px] uppercase tracking-tight flex items-center justify-between">
                        <span className="flex items-center gap-2">🎒 {language === "FR" ? "L'étiquette (Objet)" : "The Tag (Object)"}</span>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      </h4>
                      <p className="text-neutral-500 text-[12.5px] leading-relaxed font-sans font-light max-w-3xl">
                        {language === "FR"
                          ? "Une étiquette de voyage accrochée au sac pour s'identifier visuellement et instantanément comme un membre de la communauté dans le train et en gare."
                          : "A luggage tag attached to your bag to visually and instantly identify yourself as a community member on the train and in stations."}
                      </p>
                      <div className="border-t border-neutral-100 pt-3 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>MATERIAL: SILICONE MAT</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Persona & Community Map section (Vertical stack placing Persona below SVG/Community Map) */}
              <div className="space-y-8 pt-4">
                {/* Community Vector Map Block (Full Width) */}
                <div className="space-y-3">
                  <div className="pb-1.5 border-b border-neutral-150 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <span>👤</span>
                      <span>{language === "FR" ? "Les Personas / Profils Voyageurs" : "User Personas / Passenger Profiles"}</span>
                    </span>
                  </div>
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 sm:p-3 shadow-sm rounded-2xl">
                    <SafeImage 
                      src="/images/SNCF (6).png" 
                      alt="T'MATES Community Visual Map"
                      theme="light"
                      className="w-full h-auto max-h-[580px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 hover:scale-[1.005] hover:brightness-[1.01]"
                      onClick={() => setZoomedImage("/images/SNCF (6).png")}
                    />
                    <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM"}
                    </div>
                  </div>
                </div>

                {/* T MATES 08 Block (Full Width, directly below Community Map) */}
                <div className="space-y-3">
                  <div className="pb-1.5 border-b border-neutral-150 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <span>👤</span>
                      <span>
                        {language === "FR" 
                          ? "Amélie aide Richard à porter ses valises, lui évitant ainsi d’avoir à forcer et à déplacer ses bagages." 
                          : "Amélie helps Richard carry his suitcases, saving him from having to strain and move his luggage."
                        }
                      </span>
                    </span>
                  </div>
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 sm:p-3 shadow-sm rounded-2xl">
                    <SafeImage 
                      src="/images/SNCF (7).png" 
                      alt="Amélie helping Richard"
                      theme="light"
                      className="w-full h-auto max-h-[580px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 hover:scale-[1.005] hover:brightness-[1.01]"
                      onClick={() => setZoomedImage("/images/SNCF (7).png")}
                    />
                    <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM"}
                    </div>
                  </div>
                </div>

                {/* Persona Block (Full Width, directly below T MATES 08) */}
                <div className="space-y-3">
                  <div className="pb-1.5 border-b border-neutral-150 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <span>👤</span>
                      <span>
                        {language === "FR" 
                          ? "Amélie va aux toilettes en confiant la surveillance de son fils à son T’Mate lui évitant ainsi d’avoir à surveiller et déplacer son enfant" 
                          : "Amélie goes to the restroom by entrusting her son's supervision to her T'Mate, saving her from having to watch and move her child"
                        }
                      </span>
                    </span>
                  </div>
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 sm:p-3 shadow-sm rounded-2xl">
                    <SafeImage 
                      src="/images/SNCF (8).png" 
                      alt="T'MATES User Personas"
                      theme="light"
                      className="w-full h-auto max-h-[580px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 hover:scale-[1.005] hover:brightness-[1.01]"
                      onClick={() => setZoomedImage("/images/SNCF (8).png")}
                    />
                    <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM"}
                    </div>
                  </div>
                </div>
              </div>



            </div>
          ) : isWevel ? (
            // ==========================================
            // WEVEL + PROJECT CONTENT
            // ==========================================
            <div className="space-y-16 max-w-5xl mx-auto relative z-10 text-neutral-800">
              
              {/* HEADER IMAGE / HERO FOR WEVEL */}
              <div className="w-full group relative select-none">
                <SafeImage 
                  src="/images/Wevel (1).png" 
                  alt="Wevel + Hero Banner"
                  theme="light"
                  className="w-full h-auto object-cover rounded-2xl shadow-sm cursor-zoom-in transition-all duration-500 hover:scale-[1.005] border border-neutral-150 bg-white p-2 sm:p-3"
                  onClick={() => setZoomedImage("/images/Wevel (1).png")}
                />
                <div className="absolute bottom-6 right-6 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  {language === "FR" ? "AGRANDIR" : "ZOOM"}
                </div>
              </div>

              {/* BLOC 01 // LE BRIEF */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                    {language === "FR" ? "[ BLOC 01 // LE BRIEF & CONTEXTE ]" : "[ BLOCK 01 // THE BRIEF & CONTEXT ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">01</span>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-150 shadow-sm space-y-4">
                  <div className="border-l-2 border-violet-500 pl-4">
                    <h4 className="font-display font-semibold text-neutral-900 text-sm sm:text-base uppercase tracking-tight mb-2">
                      {language === "FR" ? "Le Brief" : "The Brief"}
                    </h4>
                    <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                      {language === "FR" 
                        ? "Ce projet est né de la demande d'une cliente confrontée aux limites des sous-voiles actuels. Qu'il soit porté pour des raisons religieuses, sportives ou médicales, cet accessoire présente souvent des inconforts au quotidien. L’objectif était de repenser totalement ce produit pour le rendre plus sain, inclusif et ergonomique."
                        : "This project was born from the request of a client confronted with the limits of current under-veils. Whether worn for religious, athletic, or medical reasons, this accessory often presents daily discomforts. The objective was to completely rethink this product to make it healthier, more inclusive, and ergonomic."}
                    </p>
                  </div>
                </div>
              </div>

              {/* BLOC 02 // RECHERCHE & R&D */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                    {language === "FR" ? "[ BLOC 02 // LA PHASE DE RECHERCHE & R&D ]" : "[ BLOCK 02 // RESEARCH & R&D PHASE ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">02</span>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-2">
                  {/* Etude Sante */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (2).png" 
                          alt="Health Study 1"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (2).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (3).png" 
                          alt="Health Study 2"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (3).png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Étude santé" : "• Health Study"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Analyse approfondie des pathologies du cuir chevelu, des points de tension crâniens et des conséquences de la friction sur les cheveux."
                          : "In-depth analysis of scalp pathologies, cranial tension points, and the consequences of friction on hair."}
                      </p>
                    </div>
                  </div>

                  {/* Sondages Terrain */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-1 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (4).png" 
                          alt="Field Survey 1"
                          theme="light"
                          className="w-full h-auto max-h-[200px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (4).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-1 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (5).png" 
                          alt="Field Survey 2"
                          theme="light"
                          className="w-full h-auto max-h-[200px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (5).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-1 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (6).png" 
                          alt="Field Survey 3"
                          theme="light"
                          className="w-full h-auto max-h-[200px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (6).png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Sondages terrain" : "• Field Surveys"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Réalisation d'enquêtes auprès de femmes concernées pour cartographier leurs réels besoins et usages."
                          : "Conducting surveys with the women involved to map their real needs and habits."}
                      </p>
                    </div>
                  </div>

                  {/* Techniques et culture */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (7).png" 
                          alt="Cultural Reference 1"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (7).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (8).png" 
                          alt="Cultural Reference 2"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (8).png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Techniques et culture" : "• Techniques and Culture"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Recherches de systèmes d’accroche et technique pour accrocher un voile, une perruque, un tissu… sur la tête en s’inspirant de divers domaines et cultures."
                          : "Research into attachment systems and techniques for securing a veil, a wig, a fabric... on the head, drawing inspiration from diverse fields and cultures."}
                      </p>
                    </div>
                  </div>

                  {/* Textile innovant */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                      <SafeImage 
                        src="/images/Wevel (9).png" 
                        alt="Innovative Textile"
                        theme="light"
                        className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                        onClick={() => setZoomedImage("/images/Wevel (9).png")}
                      />
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Textile innovant" : "• Innovative Textile"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Veille technique sur des tissus respirants et thermorégulateurs, en s'inspirant du sport de haut niveau et du biomimétisme animal."
                          : "Technical sourcing of breathable and thermoregulating fabrics, drawing inspiration from high-level sports and animal biomimicry."}
                      </p>
                    </div>
                  </div>

                  {/* Pistes d'innovation */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                      <SafeImage 
                        src="/images/Wevel (10).png" 
                        alt="Innovation Concepts"
                        theme="light"
                        className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                        onClick={() => setZoomedImage("/images/Wevel (10).png")}
                      />
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Pistes d’innovation" : "• Innovation Concepts"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Exploration de concepts forts comme un bonnet démontable ou l’intégration d’une bande pH réactive au sébum pour auto-évaluer la santé de son cuir chevelu."
                          : "Exploration of strong concepts such as a detachable bonnet or the integration of a pH-reactive sebum band to self-assess scalp health."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOC 03 // LE CONCEPT */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                    {language === "FR" ? "[ BLOC 03 // LE CONCEPT : LE VÊTEMENT TOUT-EN-UN ]" : "[ BLOCK 03 // THE CONCEPT: THE ALL-IN-ONE GARMENT ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">03</span>
                </div>

                <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 sm:p-3 shadow-sm rounded-2xl">
                  <SafeImage 
                    src="/images/Wevel (11).png" 
                    alt="The Concept: All in one garment"
                    theme="light"
                    className="w-full h-auto max-h-[580px] object-contain rounded-xl cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                    onClick={() => setZoomedImage("/images/Wevel (11).png")}
                  />
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-150 shadow-sm space-y-4">
                  <div className="border-l-2 border-violet-500 pl-4">
                    <p className="text-neutral-800 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                      {language === "FR" 
                        ? "La réponse finale est une combinaison innovante prenant la forme d'un t-shirt/sous-voile hybride et tout en un. En englobant le haut du corps, le vêtement supprime tous les points de tension locaux derrière les oreilles ou sur la nuque. Polyvalent et minimaliste, il est conçu pour être porté seul, par des sportives, ou comme base de sous-voile by les femmes voilées. Le concept a été validé by la confection d'un premier prototype en tissu cousu main."
                        : "The final response is an innovative combination taking the form of a hybrid all-in-one t-shirt/under-veil. By wrapping around the upper body, the garment eliminates all local tension points behind the ears or on the neck. Versatile and minimalist, it is designed to be worn on its own by active women, or as a base under-veil layer by veiled women. The concept was validated by crafting a first hand-sewn fabric prototype."}
                    </p>
                  </div>
                </div>
              </div>

              {/* BLOC 04 // L'ÉCOSYSTÈME & EXPÉRIENCE POP-UP */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                    {language === "FR" ? "[ BLOC 04 // L'ÉCOSYSTÈME & L'EXPÉRIENCE POP-UP ]" : "[ BLOCK 04 // ECOSYSTEM & POP-UP EXPERIENCE ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">04</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* iPad Diagnostic */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (12).png" 
                          alt="Diagnostic 1"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (12).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (13).png" 
                          alt="Diagnostic 2"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (13).png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Diagnostic capillaire" : "• Hair Diagnostic"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Un test sur iPad en amont permet de définir précisément la nature et les spécificités de ses cheveux."
                          : "An iPad-based onboarding questionnaire allows users to precisely define the natural attributes and specific needs of their hair."}
                      </p>
                    </div>
                  </div>

                  {/* Fitting Room */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                      <SafeImage 
                        src="/images/Wevel (14).png" 
                        alt="Immersive Fitting Cabin"
                        theme="light"
                        className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                        onClick={() => setZoomedImage("/images/Wevel (14).png")}
                      />
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1">
                        {language === "FR" ? "• Cabines d'essayage immersives" : "• Immersive Fitting Cabins"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "Un espace pensé pour tester le confort en toute intimité."
                          : "An intimate and thoughtful space designed to comfortably test the garment in complete privacy."}
                      </p>
                    </div>
                  </div>

                  {/* Atelier Auto-confection */}
                  <div className="bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (15).png" 
                          alt="Atelier d'auto-confection 1"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (15).png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/Wevel (16).png" 
                          alt="Atelier d'auto-confection 2"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/Wevel (16).png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-violet-500 pl-3">
                      <h5 className="font-display font-semibold text-neutral-950 text-xs sm:text-sm uppercase tracking-tight mb-1 font-medium">
                        {language === "FR" ? "• Atelier d'auto-confection" : "• DIY Crafting Workshop"}
                      </h5>
                      <p className="text-neutral-700 font-sans text-xs sm:text-sm leading-relaxed font-light">
                        {language === "FR" 
                          ? "Possibilité d'acheter une box sur le site internet afin d'apprendre à la coudre soi-même son propre vêtement, favorisant l'upcycling et le zéro déchet."
                          : "Possibility to buy a box on the website to learn how to sew your own garment yourself, promoting upcycling and zero waste."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            // ==========================================
            // CY LAB WOODWORK CONTENT WITH IMAGES FOREFRONT
            // ==========================================
            <div className="space-y-16 max-w-5xl mx-auto relative z-10">
              
              {/* BLOC 01 // RECHERCHES & INSPIRATIONS */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    {language === "FR" ? "[ BLOC 01 // RECHERCHES & INSPIRATIONS ]" : "[ BLOCK 01 // RESEARCH & INSPIRATIONS ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">01</span>
                </div>

                {/* Subtitle / intro text styled with a warm naturish vibe */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-150 shadow-sm space-y-4">
                  <div className="border-l-2 border-amber-500 pl-4">
                    <p className="text-neutral-800 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                      {language === "FR" 
                        ? "Mes recherches se sont articulées autour d'un mobilier modulable et astucieux, pensé pour la pratique au quotidien. L’idée centrale repose sur un grand bureau en angle capable d'offrir plusieurs positions de travail pour s'adapter au rythme de la journée. Côté ambiance, le projet puise son inspiration dans la douceur de la nature : un accord subtil entre la chaleur texturée du bois et des teintes nude. Le résultat est un espace de travail au style chic, raffiné et teinté d'une touche bohème."
                        : "My research focused on modular and clever furniture, designed for everyday use. The central idea is a large corner desk offering multiple working positions to adapt to the day's rhythm. In terms of atmosphere, the project draws inspiration from the softness of nature: a subtle agreement between the textured warmth of wood and nude shades. The result is a workspace with a chic, refined style, tinted with a bohemian touch."}
                    </p>
                  </div>
                </div>

                {/* 3-Image Grid Layout - Premium, responsive, and perfectly rounded with hover-zoom */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Photo 1: 4.png */}
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 shadow-sm rounded-2xl flex flex-col justify-between">
                    <div className="relative overflow-hidden rounded-xl bg-neutral-50/50 p-1 flex-1 flex items-center justify-center">
                      <SafeImage 
                        src="/images/4.png" 
                        alt="Recherches & Inspirations 1"
                        theme="light"
                        className="w-full h-auto max-h-[380px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.01]"
                        onClick={() => setZoomedImage("/images/4.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/4.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                  </div>

                  {/* Photo 2: 5.png */}
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 shadow-sm rounded-2xl flex flex-col justify-between">
                    <div className="relative overflow-hidden rounded-xl bg-neutral-50/50 p-1 flex-1 flex items-center justify-center">
                      <SafeImage 
                        src="/images/5.png" 
                        alt="Recherches & Inspirations 2"
                        theme="light"
                        className="w-full h-auto max-h-[380px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.01]"
                        onClick={() => setZoomedImage("/images/5.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-355 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/5.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                  </div>

                  {/* Photo 3: 8.png */}
                  <div className="w-full group relative select-none border border-neutral-150 bg-white p-2 shadow-sm rounded-2xl flex flex-col justify-between">
                    <div className="relative overflow-hidden rounded-xl bg-neutral-50/50 p-1 flex-1 flex items-center justify-center">
                      <SafeImage 
                        src="/images/8.png" 
                        alt="Recherches & Inspirations 3"
                        theme="light"
                        className="w-full h-auto max-h-[380px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.01]"
                        onClick={() => setZoomedImage("/images/8.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-360 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/8.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOC 02 // PLANS & SKETCHS */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    {language === "FR" ? "[ BLOC 02 // PLANS & SKETCHS ]" : "[ BLOCK 02 // PLANS & SKETCHES ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">02</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  {/* Card 1: Sketches -> 17.png */}
                  <div className="lg:col-span-5 bg-white border border-neutral-150 p-4 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center flex-1">
                      <SafeImage 
                        src="/images/17.png" 
                        alt="Sketches & Dessins"
                        theme="light"
                        className="w-full h-auto max-h-[380px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.01]"
                        onClick={() => setZoomedImage("/images/17.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/17.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-3">
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR" 
                          ? "À travers les premiers dessins et sketchs de recherche on a testé visuellement la modularité de ce bureau avant sa conception technique."
                          : "Through the first drawings and research sketches, we visually tested the modularity of this desk before its technical design."}
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Digital Blueprints -> 19.png & 20.png */}
                  <div className="lg:col-span-7 bg-white border border-neutral-150 p-4 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 group">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-center">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/19.png" 
                          alt="Plan Illustrator 1"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/19.png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-2 border border-neutral-100 flex items-center justify-center">
                        <SafeImage 
                          src="/images/20.png" 
                          alt="Plan Illustrator 2"
                          theme="light"
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.01]"
                          onClick={() => setZoomedImage("/images/20.png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-3">
                      <p className="text-neutral-700 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {language === "FR"
                          ? "L'étape suivante a consisté à modéliser le projet sur Adobe Illustrator afin de poser un plan détaillé et millimétré."
                          : "The next step consisted of modeling the project on Adobe Illustrator to lay down a detailed and millimeter-accurate plan."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOC 03 // NOTRE PROJET MODULE-LAB */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    {language === "FR" ? "[ BLOC 03 // NOTRE PROJET MODULE-LAB ]" : "[ BLOCK 03 // OUR PROJECT MODULE-LAB ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">03</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  {/* Photos 7 & 8 Container: 22.png & 27.png */}
                  <div className="lg:col-span-12 bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 group">
                    <div className="flex flex-col gap-6 flex-1">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                        <SafeImage 
                          src="/images/22.png" 
                          alt="Module-Lab Photo 22"
                          theme="light"
                          className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                          onClick={() => setZoomedImage("/images/22.png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                        <SafeImage 
                          src="/images/27.png" 
                          alt="Module-Lab Photo 27"
                          theme="light"
                          className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                          onClick={() => setZoomedImage("/images/27.png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 mt-2">
                      <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                        {language === "FR"
                          ? "Pensé pour optimiser l'espace sans sacrifier le confort, ce bureau en bois intègre des roues pour être déplacé en un clin d'œil selon les besoins. Malgré son petit gabarit, il s'avère ultra-pratique au quotidien grâce à sa connectique : une multiprise est directement intégrée dans le plateau. Côté ergonomie, il dispose d'une tablette pliable pour créer une extension si nécessaire. Enfin, le plateau est surmonté d'une vitre en verre qui permet de voir ce qu'on écrit."
                          : "Designed to optimize space without sacrificing comfort, this wooden desk integrates wheels to be moved in the blink of an eye according to needs. Despite its small size, it proves to be ultra-practical daily thanks to its connectivity: a power strip is directly integrated into the top. On the ergonomic side, it has a folding shelf to create an extension if necessary. Finally, the top is covered with a glass pane that allows you to see what is written underneath."}
                      </p>
                    </div>
                  </div>

                  {/* Photo 9 Container: 28.png */}
                  <div className="lg:col-span-12 bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                      <SafeImage 
                        src="/images/28.png" 
                        alt="Module-Lab Photo 28"
                        theme="light"
                        className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.005]"
                        onClick={() => setZoomedImage("/images/28.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/28.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 mt-2">
                      <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                        {language === "FR"
                          ? "Grâce à ses roues et ses éléments rétractables, ce bureau se transforme en un clin d'œil selon les besoins de la journée. Il se configure ainsi très facilement pour passer d'un espace de travail solo, à une configuration de communication pour les visios, ou encore à un îlot central idéal pour le travail de groupe."
                          : "Thanks to its wheels and retractable elements, this desk transforms in the blink of an eye according to the needs of the day. It can thus be configured very easily to switch from a solo workspace to a communication setup for video calls, or even to a central island ideal for group work."}
                      </p>
                    </div>
                  </div>

                  {/* Photo 10 Container: 32.png */}
                  <div className="lg:col-span-12 bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 group">
                    <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                      <SafeImage 
                        src="/images/32.png" 
                        alt="Module-Lab Photo 32"
                        theme="light"
                        className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 group-hover:scale-[1.005]"
                        onClick={() => setZoomedImage("/images/32.png")}
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-zinc-350 uppercase tracking-wider flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setZoomedImage("/images/32.png")}>
                        <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        {language === "FR" ? "AGRANDIR" : "ZOOM"}
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 mt-2">
                      <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                        {language === "FR"
                          ? "Détail des matériaux et support."
                          : "Detail of materials and support."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOC 04 // MAQUETTE À TAILLE RÉELLE */}
              <div className="space-y-6">
                <div className="pb-2 border-b border-neutral-200/80 flex items-center justify-between relative">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    {language === "FR" ? "[ BLOC 04 // MAQUETTE À TAILLE RÉELLE ]" : "[ BLOCK 04 // FULL-SCALE MODEL ]"}
                  </span>
                  <span className="absolute -bottom-4 right-0 font-display font-bold text-[36px] text-neutral-200/40 select-none pointer-events-none">04</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  <div className="lg:col-span-12 bg-white border border-neutral-150 p-4 sm:p-6 rounded-2xl shadow-sm space-y-4 group">
                    <div className="flex flex-col gap-6">
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                        <SafeImage 
                          src="/images/33.png" 
                          alt="Maquette à taille réelle 1"
                          theme="light"
                          className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                          onClick={() => setZoomedImage("/images/33.png")}
                        />
                      </div>
                      <div className="relative overflow-hidden select-none bg-neutral-50/50 rounded-xl p-3 border border-neutral-100 flex items-center justify-center w-full">
                        <SafeImage 
                          src="/images/34.png" 
                          alt="Maquette à taille réelle 2"
                          theme="light"
                          className="w-full h-auto max-h-[580px] object-contain rounded-lg cursor-zoom-in transition-all duration-500 hover:scale-[1.005]"
                          onClick={() => setZoomedImage("/images/34.png")}
                        />
                      </div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 mt-2">
                      <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light">
                        {language === "FR"
                          ? "Pour valider l'ergonomie et la modularité du bureau, on a réalisé une maquette à taille réelle. La structure principale est construite en bois contreplaqué, tandis que les pieds utilisent des tubes en plexiglas pour apporter de la légèreté visuelle. L'ensemble des pièces a été découpé avec précision à la découpe laser pour garantir un assemblage parfait de ce prototype fonctionnel."
                          : "To validate the ergonomics and modularity of the desk, we created a full-scale model. The main structure is built from plywood, while the legs use plexiglass tubes to bring visual lightness. All parts were cut with precision using a laser cutter to guarantee a perfect assembly of this functional prototype."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Elegant bottom section divider/footer decoration */}
          <div className="pt-10 border-t border-neutral-200/60 flex flex-col sm:flex-row gap-4 justify-between items-center text-[9px] font-mono text-neutral-400 max-w-5xl mx-auto">
            <span>PORTFOLIO_MATHILDE_V3</span>
            <span className="uppercase tracking-wider">CY_ECOLE_DESIGN // 2026 // ALL RIGHTS RESERVED</span>
          </div>

          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}
