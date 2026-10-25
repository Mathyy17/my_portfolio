import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Eye, X, CornerDownRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import ProjectDetailOverlay from "./ProjectDetailOverlay";
import SafeImage from "./SafeImage";
import TypewriterScramble from "./TypewriterScramble";
import { motion } from "motion/react";

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Engineering" | "Design" | "Hybrid" | "Illustration";
  tags: string[];
  image: string;
  images?: string[];
  metric: string;
  role: string;
  timeline: string;
  description: string;
  longDescription?: string;
}

const GALLERY_ITEMS: PortfolioItem[] = [
  {
    id: "proj1",
    title: "Mobilier informatique",
    subtitle: "Comment rendre un laboratoire informatique modulable, adaptable aux technologies de demain dans un esprit convivial ?",
    category: "Design",
    tags: ["Workshop", "Ergonomie", "Modulaire", "Prototypage SCALE 1/10", "Découpe Laser"],
    image: "/images/32.png",
    images: [
      "/images/4.png",
      "/images/5.png",
      "/images/8.png",
      "/images/17.png",
      "/images/19.png",
      "/images/20.png",
      "/images/22.png",
      "/images/27.png",
      "/images/28.png",
      "/images/32.png",
      "/images/33.png",
      "/images/34.png"
    ],
    metric: "CY ÉCOLE DE DESIGN",
    role: "Étudiante Designer",
    timeline: "workshop 2025 - 5 jours",
    description: "L’objectif : concevoir un bureau ergonomique, modulaire et durable, capable de s’adapter aux besoins des utilisateurs et aux technologies.",
    longDescription: `L’objectif : concevoir un bureau ergonomique, modulaire et durable, capable de s’adapter aux besoins des utilisateurs et aux technologies.

Démarche :
• Observation des usages & besoins actuels
• Recherches formelles : sketchs, scénario d'usage, expérimentation sur la forme et la circulation
• Modélisation 3D pour tester les proportions & configurations
• Prototypage à l'échelle 1/10 avec découpes laser`
  },
  {
    id: "proj_wevel",
    title: "Wevel +",
    subtitle: "Comment adapter les attentes technologiques et innovantes du projet w+ pour permettre à des femmes portant le voile de maintenir un confort capillaire et un bien être tout au long de la journée ?",
    category: "Design",
    tags: ["R&D", "Inclusif", "Ergonomie", "Prototype", "Pistes d'innovation"],
    image: "/images/Wevel (14).png",
    images: [
      "/images/Wevel (1).png",
      "/images/Wevel (2).png",
      "/images/Wevel (3).png",
      "/images/Wevel (4).png",
      "/images/Wevel (5).png",
      "/images/Wevel (6).png",
      "/images/Wevel (7).png",
      "/images/Wevel (8).png",
      "/images/Wevel (9).png",
      "/images/Wevel (10).png",
      "/images/Wevel (11).png",
      "/images/Wevel (12).png",
      "/images/Wevel (13).png",
      "/images/Wevel (14).png",
      "/images/Wevel (15).png",
      "/images/Wevel (16).png"
    ],
    metric: "PROJET DESIGN GLOBAL",
    role: "Designer Global & R&D",
    timeline: "Projet 2026",
    description: "Comment adapter les attentes technologiques et innovantes du projet w+ pour permettre à des femmes portant le voile de maintenir un confort capillaire et un bien être tout au long de la journée ?"
  },
  {
    id: "proj_ter",
    title: "Repenser le parcours TER",
    subtitle: "Comment s’appuyer sur un levier d’humanisation pour sécuriser et ainsi séréniser le parcours voyageur TER ?",
    category: "Design",
    tags: ["UX RESEARCH", "Travail d'équipe", "USER JOURNEY"],
    image: "/images/SNCF (4.5).png",
    images: [
      "/images/SNCF (1).png",
      "/images/SNCF (2).png",
      "/images/SNCF (3).png",
      "/images/SNCF (3.5).png",
      "/images/SNCF (4.5).png",
      "/images/SNCF (4).png",
      "/images/SNCF (5).png",
      "/images/SNCF (6).png",
      "/images/SNCF (7).png",
      "/images/SNCF (8).png"
    ],
    metric: "CY ÉCOLE DE DESIGN",
    role: "UX Research, Service Design & Prototypage",
    timeline: "Workshop 4 semaines",
    description: "Comment s’appuyer sur un levier d’humanisation pour sécuriser et ainsi séréniser le parcours voyageur TER ?"
  }
];

const contentTER = {
  FR: {
    tag: "Client : SNCF Voyageur",
    title: "Repenser le parcours TER",
    subtitle: "Comment s’appuyer sur un levier d’humanisation pour sécuriser et ainsi séréniser le parcours voyageur TER ?",
    client: "SNCF Voyageur",
    context: "Projet Design Global",
    year: "2026",
    tags: ["UX RESEARCH", "Travail d’équipe", "USER JOURNEY"],
    blocks: [
      {
        marker: "[ BLOC 01 // LE CONSTAT & L'IMMERSION ]",
        title: "Le constat & l'immersion",
        paragraphs: [
          "L'immersion sur le terrain et les entretiens utilisateurs ont révélé 2 vulnérabilités majeures :",
          "• **Insécurité** : Une angoisse renforcée par le vide humain des gares TER.",
          "• **La charge mentale** liée à la logistique (ex: devoir faire surveiller un bagage ou un enfant un court instant)."
        ],
        img: "/images/SNCF (1).png"
      },
      {
        marker: "// 02 _ LE CONCEPT : T'MATES",
        title: "Le Concept : T'Mates",
        paragraphs: [
          "T'Mates est un écosystème d'entraide conçu pour réinjecter de la solidarité et de la sécurité. Le projet s'articule autour de deux piliers majeurs :",
          "• **Une communauté active** : Fédérer les usagers sous une même identité (les T'Mates).",
          "• Permettre à chacun d'exprimer simplement ses craintes, ses besoins ou sa capacité à aider."
        ],
        img: "/images/SNCF (3).png"
      },
      {
        marker: "// 03 _ LE DISPOSITIF : DIGITAL",
        title: "Le Dispositif : Volet Digital",
        paragraphs: [
          "La solution se matérialise par un écosystème en three points :",
          "• **Digital - Le module SNCF Connect** : L'outil numérique pour devenir T’Mates au moment de la réservation de son billet."
        ],
        img: "/images/SNCF (4.5).png"
      },
      {
        marker: "// 04 _ LE DISPOSITIF : SPATIAL",
        title: "Le Dispositif : Volet Spatial",
        paragraphs: [
          "La solution se matérialise par un écosystème en trois points :",
          "• **Spatial | La signalétique en gare** : Des repères physiques au sol et sur les murs pour matérialiser les zones de rencontre."
        ],
        img: "/images/SNCF (4).png"
      },
      {
        marker: "// 05 _ LE DISPOSITIF : PHYSIQUE",
        title: "Le Dispositif : Volet Physique",
        paragraphs: [
          "La solution se matérialise par un écosystème en trois points :",
          "• **Physique | L'étiquette de voyage** : Un objet tangible arboré par les membres, symbole fort de ralliement et repère visuel immédiat sur le quai ou dans le train."
        ],
        img: "/images/SNCF (5).png"
      }
    ]
  },
  EN: {
    tag: "Client: SNCF Voyageur",
    title: "Rethinking the passenger experience in regional trains (TER)",
    subtitle: "How to leverage human connection to secure and thus bring serenity to the regional train (TER) passenger experience?",
    client: "SNCF Voyageur",
    context: "Global Design Project",
    year: "2026",
    tags: ["UX RESEARCH", "Teamwork", "USER JOURNEY"],
    blocks: [
      {
        marker: "[ BLOCK 01 // OBSERVATION & IMMERSION ]",
        title: "Observations & Immersion",
        paragraphs: [
          "Field immersion and user interviews revealed two major vulnerabilities:",
          "• **Insecurity**: Anxiety amplified by the human emptiness of TER open spaces.",
          "• **Mental load** linked to school/work logistics (e.g., needing to have baggage or a child watched for a brief moment)."
        ],
        img: "/images/SNCF (1).png"
      },
      {
        marker: "// 02 _ THE CONCEPT: T'MATES",
        title: "The Concept: T'Mates",
        paragraphs: [
          "T'Mates is a mutual aid ecosystem designed to inject solidarity and safety. The project revolves around two main pillars:",
          "• **An active community**: Uniting passengers under a single identity (the T'Mates).",
          "• Enabling everyone to easily express their fears, needs, or capacity to help."
        ],
        img: "/images/SNCF (3).png"
      },
      {
        marker: "// 03 _ THE SYSTEM: DIGITAL",
        title: "The System: Digital Leg",
        paragraphs: [
          "The solution takes shape through a three-point ecosystem:",
          "• **Digital - The SNCF Connect module**: The digital tool to become a T’Mate when booking your ticket."
        ],
        img: "/images/SNCF (4.5).png"
      },
      {
        marker: "// 04 _ THE SYSTEM: SPATIAL",
        title: "The System: Spatial Leg",
        paragraphs: [
          "The solution takes shape through a three-point ecosystem:",
          "• **Spatial | In-station signage**: Physical markers on floors and walls to define designated meeting areas."
        ],
        img: "/images/SNCF (4).png"
      },
      {
        marker: "// 05 _ THE SYSTEM: PHYSICAL",
        title: "The System: Physical Leg",
        paragraphs: [
          "The solution takes shape through a three-point ecosystem:",
          "• **Physical | The travel tag**: A tangible object worn by members, serving as a powerful symbol of unity and an instant visual indicator on platforms or inside the train."
        ],
        img: "/images/SNCF (5).png"
      }
    ]
  }
};

export default function ProjectsSection() {
  const { language, t } = useLanguage();
  const [selectedProjectState, setSelectedProjectState] = useState<PortfolioItem | null>(null);
  const [modalActiveImageIdx, setModalActiveImageIdx] = useState<number>(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const projectsModalWrapperRef = useRef<HTMLDivElement | null>(null);
  const projectsLeftColumnRef = useRef<HTMLDivElement | null>(null);
  const projectsRightColumnRef = useRef<HTMLDivElement | null>(null);
  const otherProjectsRightPanelRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll modal and inner columns to top when project or active image changes
  useEffect(() => {
    if (selectedProjectState) {
      if (projectsModalWrapperRef.current) projectsModalWrapperRef.current.scrollTop = 0;
      if (projectsLeftColumnRef.current) projectsLeftColumnRef.current.scrollTop = 0;
      if (projectsRightColumnRef.current) projectsRightColumnRef.current.scrollTop = 0;
      if (otherProjectsRightPanelRef.current) otherProjectsRightPanelRef.current.scrollTop = 0;
    }
  }, [selectedProjectState, modalActiveImageIdx]);

  // Localized project mapping helper
  const getLocalizedItem = (item: PortfolioItem): PortfolioItem => {
    if (language === "FR") return item;

    // Detailed translation overrides for English
    const overrides: Record<string, Partial<PortfolioItem>> = {
      proj1: {
        title: "Computer Furniture",
        subtitle: "HOW TO MAKE A MODULAR COMPUTER LAB, ADAPTABLE TO TOMORROW'S TECHNOLOGIES IN A FRIENDLY ATMOSPHERE?",
        role: "Design Student",
        timeline: "workshop 2025 - 5 days",
        description: "The goal: design an ergonomic, modular, and sustainable desk capable of adapting to user needs and technologies.",
        longDescription: `The goal: design an ergonomic, modular, and sustainable desk capable of adapting to user needs and technologies.

Approach:
• Observation of current uses & needs
• Formal research: sketches, user scenario, testing form and traffic
• 3D modeling to test proportions & configurations
• Prototyping at 1/10 scale using laser cutting`
      },
      proj_wevel: {
        title: "Wevel +",
        subtitle: "HOW TO ADAPT THE TECHNOLOGICAL AND INNOVATIVE EXPECTATIONS OF THE W+ PROJECT TO ALLOW WOMEN WEARING THE VEIL TO MAINTAIN SCALP COMFORT AND WELL-BEING THROUGHOUT THE DAY?",
        role: "Global Designer & R&D",
        timeline: "Project 2026",
        description: "How to adapt the technological and innovative expectations of the w+ project to allow women wearing the veil to maintain scalp comfort and well-being throughout the day?"
      },
      proj_ter: {
        title: "Rethinking the passenger experience in regional trains (TER)",
        subtitle: "HOW TO LEVERAGE HUMAN CONNECTION TO SECURE AND THUS BRING SERENITY TO THE REGIONAL TRAIN (TER) PASSENGER EXPERIENCE?",
        role: "UX Research, Service Design & Prototyping",
        timeline: "4-week Workshop",
        description: "How to leverage human connection to secure and thus bring serenity to the regional train (TER) passenger experience?"
      }
    };

    return { ...item, ...(overrides[item.id] || {}) };
  };

  const LOCALIZED_GALLERY_ITEMS = GALLERY_ITEMS.map(getLocalizedItem);

  const selectedProject = selectedProjectState ? getLocalizedItem(selectedProjectState) : null;
  const setSelectedProject = (proj: PortfolioItem | null) => {
    setSelectedProjectState(proj);
  };

  // Reset active image index whenever the selected project changes
  useEffect(() => {
    setModalActiveImageIdx(0);
  }, [selectedProjectState]);

  const totalItems = LOCALIZED_GALLERY_ITEMS.length;

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedProject(item);
  };

  // Color theme helpers per project
  const getProjectTheme = (id: string) => {
    if (id === "proj_ter") {
      return {
        accent: "text-rose-400",
        border: "border-rose-500/70",
        glow: "hover:shadow-[0_0_35px_rgba(244,63,94,0.18)]",
        diamondBorder: "border-rose-400",
        diamondBg: "bg-rose-500",
        diamondGlow: "shadow-[0_0_15px_rgba(244,63,94,0.6)]",
        connector: "bg-rose-500/60",
        tagBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
        dotBg: "bg-rose-500"
      };
    }
    if (id === "proj_wevel") {
      return {
        accent: "text-violet-400",
        border: "border-violet-500/70",
        glow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]",
        diamondBorder: "border-violet-400",
        diamondBg: "bg-violet-500",
        diamondGlow: "shadow-[0_0_15px_rgba(139,92,246,0.6)]",
        connector: "bg-violet-500/60",
        tagBg: "bg-violet-500/10 text-violet-300 border-violet-500/20",
        dotBg: "bg-violet-500"
      };
    }
    return {
      accent: "text-amber-400",
      border: "border-amber-500/70",
      glow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.18)]",
      diamondBorder: "border-amber-400",
      diamondBg: "bg-amber-500",
      diamondGlow: "shadow-[0_0_15px_rgba(245,158,11,0.6)]",
      connector: "bg-amber-500/60",
      tagBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      dotBg: "bg-amber-500"
    };
  };

  return (
    <div 
      className="relative w-full min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-64px)] bg-transparent overflow-x-hidden flex flex-col justify-start py-6 md:py-10 z-10 animate-fade-in"
    >
      {/* Background Dot Matrix pattern mirroring user diagram */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090c_1px,transparent_1px),linear-gradient(to_bottom,#09090c_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none z-0" />

      {/* Elegant Top Header (preserved as requested) */}
      {!selectedProject && (
        <div className="w-full max-w-6xl mx-auto px-6 mb-12 sm:mb-16 shrink-0 relative z-10">
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full animate-pulse bg-rose-500" />
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{t("projects.marker")}</span>
            </motion.div>

            <TypewriterScramble
              text={t("projects.title")}
              as="h2"
              className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight"
              delay={100}
            />

            <motion.p 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="font-mono text-xs text-neutral-400 mt-2 max-w-xl leading-relaxed"
            >
              {t("projects.subtitle")}
            </motion.p>
          </div>
        </div>
      )}

      {/* ANIMATED TIMELINE SPINE LAYOUT (Matching user diagram) */}
      {!selectedProject && (
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 z-10 pb-20">
          
          {/* Central Animated Vertical Line (Desktop: center / Mobile: left aligned) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-12 -translate-x-1/2 w-[3px] bg-neutral-800/80 z-0 overflow-hidden">
            {/* Animated drawing beam moving down */}
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-neutral-600 via-white to-neutral-600"
              initial={{ y: "-100%" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
            />
          </div>

          {/* Timeline Projects Container */}
          <div className="relative space-y-16 md:space-y-24">
            {LOCALIZED_GALLERY_ITEMS.map((item, index) => {
              // Alternation: index 0 (Left), index 1 (Right), index 2 (Left)
              const isLeft = index % 2 === 0;
              const theme = getProjectTheme(item.id);
              const isHovered = hoveredId === item.id;
              const num = (index + 1).toString().padStart(2, "0");
              const meta = item.id === "proj_ter"
                ? { numberWithYear: `${num} // 2026`, client: "SNCF VOYAGEUR" }
                : item.id === "proj_wevel"
                  ? { numberWithYear: `${num} // 2026`, client: "WEVEL +" }
                  : { numberWithYear: `${num} // 2025`, client: "CY ÉCOLE DE DESIGN" };

              return (
                <div 
                  key={item.id}
                  className="relative w-full"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Central Diamond Marker (Node) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      whileInView={{ scale: 1, rotate: 45 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                      className={`w-5 h-5 sm:w-6 sm:h-6 bg-neutral-950 border-2 transition-all duration-300 flex items-center justify-center ${
                        isHovered 
                          ? `${theme.diamondBorder} ${theme.diamondGlow} scale-125` 
                          : "border-white bg-black shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                      }`}
                    >
                      {/* Inner solid diamond core */}
                      <div className={`w-2 h-2 transition-colors duration-300 ${
                        isHovered ? theme.diamondBg : "bg-white"
                      }`} />
                    </motion.div>
                  </div>

                  {/* Desktop Alternating Row Grid / Mobile Stack */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
                    
                    {/* LEFT SLOT */}
                    <div className={`pl-14 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "hidden md:block"}`}>
                      {isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: -60, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                          onClick={() => handleCardClick(item)}
                          className="relative group cursor-pointer"
                        >
                          {/* Desktop Horizontal Connector to central diamond */}
                          <div className={`hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full h-[2px] w-12 transition-all duration-300 ${
                            isHovered ? theme.connector : "bg-neutral-800"
                          }`} />

                          {/* Mobile Horizontal Connector */}
                          <div className={`md:hidden absolute -left-8 top-1/2 -translate-y-1/2 h-[2px] w-8 transition-all duration-300 ${
                            isHovered ? theme.connector : "bg-neutral-800"
                          }`} />

                          {/* The Project Box */}
                          <div className={`relative bg-neutral-950/90 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 transition-all duration-400 group-hover:-translate-y-1 ${theme.glow} ${
                            isHovered ? theme.border : "hover:border-neutral-700"
                          }`}>
                            {/* Subtle tech dot overlay inside card */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.035] pointer-events-none" />

                            {/* Top metadata row: 01 avec l'année et nom du client */}
                            <div className="flex items-center justify-between gap-4 mb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400">
                              <span className="flex items-center gap-2 font-medium">
                                <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} animate-pulse`} />
                                {meta.numberWithYear}
                              </span>
                              <span className="font-medium text-neutral-300">
                                {meta.client}
                              </span>
                            </div>

                            {/* Main Title */}
                            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-3xl text-white tracking-tight uppercase leading-snug group-hover:text-white transition-colors">
                              {item.title}
                            </h3>

                            {/* Bottom interactive action bar: projet et découvrir le projet */}
                            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-neutral-500 flex items-center gap-1">
                                {language === "FR" ? "PROJET" : "PROJECT"}
                              </span>
                              <span className={`inline-flex items-center gap-1.5 font-semibold transition-all duration-300 ${
                                isHovered ? theme.accent : "text-neutral-400 group-hover:text-white"
                              }`}>
                                {language === "FR" ? "DÉCOUVRIR LE PROJET" : "EXPLORE PROJECT"}
                                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* RIGHT SLOT */}
                    <div className={`pl-14 md:pl-12 ${!isLeft ? "md:text-left" : "hidden md:block"}`}>
                      {!isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: 60, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                          onClick={() => handleCardClick(item)}
                          className="relative group cursor-pointer"
                        >
                          {/* Desktop Horizontal Connector to central diamond */}
                          <div className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full h-[2px] w-12 transition-all duration-300 ${
                            isHovered ? theme.connector : "bg-neutral-800"
                          }`} />

                          {/* Mobile Horizontal Connector */}
                          <div className={`md:hidden absolute -left-8 top-1/2 -translate-y-1/2 h-[2px] w-8 transition-all duration-300 ${
                            isHovered ? theme.connector : "bg-neutral-800"
                          }`} />

                          {/* The Project Box */}
                          <div className={`relative bg-neutral-950/90 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 transition-all duration-400 group-hover:-translate-y-1 ${theme.glow} ${
                            isHovered ? theme.border : "hover:border-neutral-700"
                          }`}>
                            {/* Subtle tech dot overlay inside card */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.035] pointer-events-none" />

                            {/* Top metadata row: 01 avec l'année et nom du client */}
                            <div className="flex items-center justify-between gap-4 mb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400">
                              <span className="flex items-center gap-2 font-medium">
                                <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} animate-pulse`} />
                                {meta.numberWithYear}
                              </span>
                              <span className="font-medium text-neutral-300">
                                {meta.client}
                              </span>
                            </div>

                            {/* Main Title */}
                            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-3xl text-white tracking-tight uppercase leading-snug group-hover:text-white transition-colors">
                              {item.title}
                            </h3>

                            {/* Bottom interactive action bar: projet et découvrir le projet */}
                            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-neutral-500 flex items-center gap-1">
                                {language === "FR" ? "PROJET" : "PROJECT"}
                              </span>
                              <span className={`inline-flex items-center gap-1.5 font-semibold transition-all duration-300 ${
                                isHovered ? theme.accent : "text-neutral-400 group-hover:text-white"
                              }`}>
                                {language === "FR" ? "DÉCOUVRIR LE PROJET" : "EXPLORE PROJECT"}
                                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* PORTFOLIO ITEM DETAILED OVERLAY (LIGHTBOX MODAL) */}
      {selectedProject && (
        <ProjectDetailOverlay
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          language={language}
          t={t}
          projectsModalWrapperRef={projectsModalWrapperRef}
          projectsLeftColumnRef={projectsLeftColumnRef}
          setZoomedImage={setZoomedImage}
        />
      )}

      {/* ZOOMED IMAGE LIGHTBOX MODAL */}
      {zoomedImage && createPortal(
        <div className="fixed inset-0 z-[70] overflow-hidden flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setZoomedImage(null)}
            className="absolute inset-0 bg-white/95 backdrop-blur-lg cursor-zoom-out"
          ></div>
          
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#fafafa]/95 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 transition border border-neutral-200 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center pointer-events-none select-none z-10 p-2">
            <SafeImage
              src={zoomedImage || ""}
              alt="Zoomed Detail"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-neutral-200/50"
              fallbackClassName="p-12 min-h-[300px] rounded-xl"
              fallbackText="Zoomed Detail"
              theme="light"
            />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
