import React, { useState, useRef, useEffect } from "react";
import { 
  Compass, Users, MessageSquare, Palette, Box, Frame, Code, 
  Puzzle, CheckSquare, Zap, Sparkles
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import TypewriterScramble from "./TypewriterScramble";
import { motion } from "motion/react";

interface SkillItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Compétence" | "Qualité" | "Skill" | "Quality";
  description: string;
  tags: string[];
  specs: {
    code: string;
    focus: string;
    tools: string;
  };
  iconName: "compass" | "users" | "speech" | "palette" | "box" | "frame" | "code" | "puzzle" | "check" | "zap" | "sparkles";
  themeColor: string;
}const SKILL_ITEMS: SkillItem[] = [
  {
    id: "sk_equipe",
    title: "TRAVAIL D'ÉQUIPE",
    subtitle: "COLLABORATION & FACILITATION DE PROJET",
    category: "Compétence",
    description: "Travail en équipes pluridisciplinaires",
    tags: ["Collaboration", "Facilitation", "Miro", "Figma"],
    specs: {
      code: "TEAM_COLLAB_FACIL",
      focus: "",
      tools: ""
    },
    iconName: "users",
    themeColor: "from-blue-500/20 to-indigo-600/20"
  },
  {
    id: "sk_parole",
    title: "PRISE DE PAROLE",
    subtitle: "PITCHS DE PROJET & FACILITATION",
    category: "Compétence",
    description: "Restitution et défense de concepts face à des jurys ou des clients. Capacité à valoriser un parti pris créatif et à expliquer simplement des enjeux techniques complexes",
    tags: ["Pitch", "Storytelling", "Présentation", "Vulgarisation"],
    specs: {
      code: "PITCH_ORAL_FACIL",
      focus: "",
      tools: ""
    },
    iconName: "speech",
    themeColor: "from-emerald-500/20 to-teal-600/20"
  },
  {
    id: "sk_branding",
    title: "BRANDING & IDENTITÉ VISUELLE",
    subtitle: "CRÉATION D'UNIVERS GRAPHIQUE",
    category: "Compétence",
    description: "Conception d'identités visuelles complètes, logotypes et chartes graphiques. Choix des typographies, des couleurs et des codes visuels pour traduire fidèlement les valeurs et l'image d'un projet.",
    tags: ["Branding", "Identité Visuelle", "Logo", "Typographies"],
    specs: {
      code: "BRAND_VISUAL_IDENTITY",
      focus: "Univers graphique & Image",
      tools: "Illustrator, Photoshop, Figma, InDesign, Procreate"
    },
    iconName: "palette",
    themeColor: "from-purple-500/20 to-pink-600/20"
  },
  {
    id: "sk_modelisation",
    title: "MODELISATION",
    subtitle: "CONCEPTION 3D & ARCHITECTURE DE SYSTÈMES",
    category: "Compétence",
    description: "Modélisation globale de solutions, de la structure de bases de données relationnelles complexes à la création de volumes, d'objets et de concepts spatiaux en trois dimensions.",
    tags: ["CAO 3D", "SGBD", "Structure", "Volumes"],
    specs: {
      code: "CAD_GEOMETRIC_3D",
      focus: "Bases de données & Volumes",
      tools: "Blender, PostgreSQL"
    },
    iconName: "box",
    themeColor: "from-amber-500/20 to-orange-600/20"
  },
  {
    id: "sk_prototypage",
    title: "PROTOTYPAGE & MAQUETTAGE",
    subtitle: "CONCEPTION D'INTERFACES INTERACTIVES & LIVRABLES PHYSIQUES",
    category: "Compétence",
    description: "Création de parcours utilisateurs (UX) et de maquettes numériques (UI). Conception et fabrication de prototypes et de modèles fonctionnels en FabLab pour tester l'ergonomie et l'usage en conditions réelles.",
    tags: ["Prototypage", "Maquettage", "UI/UX", "FabLab"],
    specs: {
      code: "FAST_PROTO_UI_UX",
      focus: "Parcours utilisateur & Ergonomie",
      tools: "Illustrator, Laser/FabLab"
    },
    iconName: "frame",
    themeColor: "from-cyan-500/20 to-blue-600/20"
  },
  {
    id: "sk_resolution",
    title: "RÉSOLUTION DE PROBLÈME",
    subtitle: "ANALYSE, LOGIQUE ALGORITHMIQUE",
    category: "Compétence",
    description: "Analyse de problèmes complexes pour en extraire des solutions concrètes. Combinaison de la logique mathématique de l'ingénieur et de l'ingéniosité du designer pour concevoir des produits viables et cohérents.",
    tags: ["Résolution de Problème", "Analyse Systémique", "Algorithmique", "Design Thinking"],
    specs: {
      code: "CREATIVE_PROBLEM_SOLVING",
      focus: "Rationnel & Innovation",
      tools: "Algorithmique, Design Thinking"
    },
    iconName: "puzzle",
    themeColor: "from-rose-500/20 to-purple-600/20"
  }
];

export default function BlogSection() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [targetFloat, setTargetFloat] = useState<number>(0);
  const [activeFloat, setActiveFloat] = useState<number>(0);

  // Localization function to translate tags and categories smoothly
  const localizedItems = SKILL_ITEMS.map((skill) => {
    if (language === "EN") {
      if (skill.id === "sk_equipe") {
        return {
          ...skill,
          title: "TEAM WORK",
          subtitle: "COLLABORATION & PROJECT FACILITATION",
          category: "Skill" as const,
          description: "Working within multidisciplinary teams.",
          tags: ["Teamwork", "Co-Design", "Project Facilitation", "Agile Collab"],
          specs: {
            code: "TEAM_COLLAB_FACIL",
            focus: "",
            tools: ""
          }
        };
      }
      if (skill.id === "sk_parole") {
        return {
          ...skill,
          title: "PUBLIC STORYTELLING",
          subtitle: "PROJECT PITCHING & FACILITATION",
          category: "Skill" as const,
          description: "Presenting and defending concepts in front of juries or clients. Ability to advocate for a creative direction and simply explain complex technical issues.",
          tags: ["Project Defenses", "Pitching", "Storytelling", "Simplification"],
          specs: {
            code: "PITCH_ORAL_FACIL",
            focus: "",
            tools: ""
          }
        };
      }
      if (skill.id === "sk_branding") {
        return {
          ...skill,
          title: "BRANDING & DESIGN SYSTEMS",
          subtitle: "CREATION OF GRAPHIC UNIVERSES",
          category: "Skill" as const,
          description: "Designing complete visual identities, logotypes, and style guides. Selection of typography, colors, and visual codes to accurately reflect project values and branding.",
          tags: ["Brand Identity", "Art Direction", "Design Systems", "Vector Art"],
          specs: {
            code: "BRAND_VISUAL_IDENTITY",
            focus: "Cohesive Branding",
            tools: "Illustrator, Photoshop, Figma, InDesign, Procreate"
          }
        };
      }
      if (skill.id === "sk_modelisation") {
        return {
          ...skill,
          title: "MODELING",
          subtitle: "3D MODELING & SYSTEM ARCHITECTURE",
          category: "Skill" as const,
          description: "Comprehensive modeling of solutions, from the structure of complex relational databases to the creation of three-dimensional volumes, objects, and spatial concepts.",
          tags: ["CAD CAM 3D", "Modeling", "Geometric Optimization", "Rhino / Fusion"],
          specs: {
            code: "CAD_GEOMETRIC_3D",
            focus: "Databases & Volumes",
            tools: "Blender, PostgreSQL"
          }
        };
      }
      if (skill.id === "sk_prototypage") {
        return {
          ...skill,
          title: "RAPID PROTOTYPING",
          subtitle: "INTERACTIVE INTERFACES & PHYSICAL DELIVERABLES",
          category: "Skill" as const,
          description: "Creating user journeys (UX) and digital wireframes (UI). Design and fabrication of prototypes and functional scale models in FabLabs to test ergonomics and user experiences.",
          tags: ["Interactive UX", "UI Mockups", "FabLab Makerspace", "3D Printing"],
          specs: {
            code: "FAST_PROTO_UI_UX",
            focus: "Mechanical & Physical Validation",
            tools: "Illustrator, Laser/FabLab"
          }
        };
      }
      if (skill.id === "sk_resolution") {
        return {
          ...skill,
          title: "CREATIVE PROBLEM SOLVING",
          subtitle: "ANALYSIS, ALGORITHMIC LOGIC",
          category: "Skill" as const,
          description: "Analyzing complex problems to extract concrete solutions. Combining engineering logic with designer ingenuity to create viable and consistent products.",
          tags: ["Algorithmic Logic", "Conceptual Thinking", "Software Architecture", "Design Thinking"],
          specs: {
            code: "CREATIVE_PROBLEM_SOLVING",
            focus: "Algorithms & Systems Logic",
            tools: "Algorithms, Design Thinking"
          }
        };
      }
    }
    return skill;
  });

  const filteredItems = localizedItems;

  const totalItems = filteredItems.length;

  const activeIndex = Math.min(
    Math.max(0, Math.round(activeFloat)),
    totalItems - 1
  );

  const activeItem = filteredItems[activeIndex];

  // 1. Linearly interpolate activeFloat towards targetFloat for liquid-smooth movement
  useEffect(() => {
    let animationFrameId: number;
    
    const updateLerp = () => {
      setActiveFloat((prev) => {
        const diff = targetFloat - prev;
        if (Math.abs(diff) < 0.001) {
          return targetFloat;
        }
        return prev + diff * 0.12;
      });
      animationFrameId = requestAnimationFrame(updateLerp);
    };

    animationFrameId = requestAnimationFrame(updateLerp);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetFloat]);

  // 2. High-performance wheel event listener to update target progress inside container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const sensitivity = 0.0025;
      setTargetFloat((prev) => {
        const next = prev + delta * sensitivity;
        return Math.max(0, Math.min(totalItems - 1, next));
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [totalItems]);

  // 3. Smooth touch swipe event handling for mobile devices
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      
      const deltaY = touchStartY.current - currentY;
      const deltaX = touchStartX.current - currentX;

      const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;

      if (Math.abs(delta) > 5) {
        e.preventDefault();
        
        const sensitivity = 0.008;
        setTargetFloat((prev) => {
          const next = prev + delta * sensitivity;
          return Math.max(0, Math.min(totalItems - 1, next));
        });

        touchStartY.current = currentY;
        touchStartX.current = currentX;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [totalItems]);

  const handleCardClick = (index: number) => {
    setTargetFloat(index);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "compass": return <Compass className="w-5 h-5" />;
      case "users": return <Users className="w-5 h-5" />;
      case "speech": return <MessageSquare className="w-5 h-5" />;
      case "palette": return <Palette className="w-5 h-5" />;
      case "box": return <Box className="w-5 h-5" />;
      case "frame": return <Frame className="w-5 h-5" />;
      case "code": return <Code className="w-5 h-5" />;
      case "puzzle": return <Puzzle className="w-5 h-5" />;
      case "check": return <CheckSquare className="w-5 h-5" />;
      case "zap": return <Zap className="w-5 h-5" />;
      case "sparkles": return <Sparkles className="w-5 h-5" fill="currentColor" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-64px)] bg-transparent overflow-x-hidden flex flex-col justify-between py-6 md:py-10 z-10 animate-fade-in"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090c_1px,transparent_1px),linear-gradient(to_bottom,#09090c_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none z-0" />
      {/* Elegant Header similar to Projects/About Section */}
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-baseline justify-between gap-6 shrink-0 font-display relative z-10">
        <div className="space-y-1">
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              {t("skills.marker")}
            </span>
          </motion.div>

          <TypewriterScramble
            text={t("skills.heading")}
            as="h2"
            className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight"
            delay={100}
          />

          <motion.p 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="font-mono text-xs text-neutral-400 mt-2 max-w-xl"
          >
            {t("skills.intro")}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="flex items-center gap-4 shrink-0 self-end md:self-auto"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full font-mono text-xs text-neutral-300">
            <span className="font-semibold text-rose-400">{(activeIndex + 1).toString().padStart(2, "0")}</span>
            <span className="text-neutral-600">/</span>
            <span>{totalItems}</span>
          </div>
        </motion.div>
      </div>

      {/* 3D Fan Carousel Stage Area */}
      <div className="relative w-full flex-grow flex flex-col items-center justify-center select-none overflow-hidden pb-4 z-10">
        
        {/* Fan carousel viewport wrapper */}
        <div className="relative w-full h-[320px] sm:h-[350px] md:h-[380px] flex items-center justify-center">
          {filteredItems.map((item, index) => {
            const offset = index - activeFloat;
            const isActive = index === activeIndex;

            if (Math.abs(offset) > 3.5) return null;

            // Highly aesthetic vertical card ratios
            const cardStyle: React.CSSProperties = {
              width: "clamp(190px, 21vw, 250px)",
              height: "clamp(240px, 26vw, 310px)",
              position: "absolute",
              left: "50%",
              top: "50%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -50%) translate(${offset * 105}%, ${Math.abs(offset) * 16}%) rotate(${offset * 14}deg) scale(${1 - Math.abs(offset) * 0.12})`,
              zIndex: Math.round(100 - Math.abs(offset) * 10),
              opacity: isActive ? 1 : Math.max(0.12, 0.7 - Math.abs(offset) * 0.22),
              filter: isActive 
                ? "grayscale(0) blur(0px) brightness(1.05)" 
                : `grayscale(1) blur(${Math.min(6, Math.abs(offset) * 3)}px) brightness(${Math.max(0.2, 0.7 - Math.abs(offset) * 0.15)})`,
              transition: "transform 180ms cubic-bezier(0.25, 1, 0.5, 1), opacity 350ms, filter 350ms, box-shadow 350ms",
              borderRadius: "20px",
              boxShadow: isActive 
                ? "0 30px 70px -10px rgba(244, 63, 94, 0.25), 0 0 50px 1px rgba(244, 63, 94, 0.1)" 
                : "0 15px 35px -10px rgba(0, 0, 0, 0.75)",
            };

            return (
              <div
                key={item.id}
                style={cardStyle}
                onClick={() => handleCardClick(index)}
                className="cursor-pointer"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 150,
                    rotate: offset < 0 ? -12 : offset > 0 ? 12 : 0,
                    scale: 0.82,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 85,
                    damping: 14,
                    delay: 0.1 + Math.abs(offset) * 0.08,
                  }}
                  className={`w-full h-full border overflow-hidden group bg-neutral-950/90 backdrop-blur-md flex flex-col justify-between p-6 text-center relative rounded-[20px] shadow-2xl ${
                    isActive 
                      ? "border-rose-500/60 ring-1 ring-rose-500/20" 
                      : "border-neutral-800/80 hover:border-neutral-700/80"
                  }`}
                >
                  {/* Thin technical corner-border accent lines */}
                  {isActive && (
                    <>
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-rose-500/50" />
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-rose-500/50" />
                      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-rose-500/50" />
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-rose-500/50" />
                    </>
                  )}

                  {/* Micro tech banner indicator inside the card */}
                  <div className="flex items-center justify-between font-mono text-[8.5px] text-neutral-500 tracking-wider w-full pb-3 border-b border-neutral-900/40">
                    <span className="uppercase text-neutral-400">{(language === "FR" ? "Compétence" : "Skill") + ` // ${item.specs.code.substring(0, 8)}`}</span>
                    <span className={isActive ? "text-rose-500 font-semibold" : "text-neutral-500"}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Subtly colored ambient core glow inside the card based on themeColor */}
                  <div className={`absolute -inset-10 bg-gradient-to-tr ${item.themeColor} opacity-[0.04] group-hover:opacity-[0.08] blur-2xl transition-all duration-500 pointer-events-none rounded-full`}></div>

                  {/* Card Title area - highly refined vertical balance */}
                  <div className="flex-grow flex flex-col items-center justify-center py-4">
                    <h3 className="font-display font-medium text-xs sm:text-[13px] md:text-[14px] text-neutral-100 tracking-wide uppercase leading-snug px-1 group-hover:text-white group-hover:scale-[1.02] transition-all duration-300">
                      {item.title}
                    </h3>
                    <div className="w-5 h-[1.5px] bg-neutral-800/80 mt-3 group-hover:bg-rose-500/50 transition-colors duration-300"></div>
                  </div>

                  {/* Logo/Icon area placed elegantly at the bottom center */}
                  <div className="flex flex-col items-center justify-end pt-2">
                    <div className={`p-3 bg-neutral-900/60 border rounded-xl shadow-inner transition-all duration-300 ${
                      isActive 
                        ? "text-rose-400 bg-rose-950/20 border-rose-500/30" 
                        : "text-neutral-500 border-neutral-800 group-hover:text-neutral-300 group-hover:border-neutral-700"
                    }`}>
                      {renderIcon(item.iconName)}
                    </div>
                  </div>

                  {/* Dark vignette overlay on idle cards */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-400 rounded-2xl pointer-events-none"></div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Short description below the card */}
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.28 }}
            className="flex flex-col items-center text-center pointer-events-none select-none relative z-10 max-w-[85vw] mt-6 md:mt-8 px-6"
            key={`caption-${activeItem.id}`}
          >
            <h3 className="font-sans font-medium text-xs sm:text-sm text-neutral-300 uppercase tracking-widest max-w-xl leading-relaxed">
              {activeItem.subtitle}
            </h3>
            <p className="font-sans text-[11px] text-neutral-400 max-w-xl leading-relaxed mt-2.5">
              {activeItem.description}
            </p>
          </motion.div>
        )}

        {/* Custom compact metadata / specs panel closely below description */}
        {activeItem && activeItem.specs.tools && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.36 }}
            className="w-full max-w-md px-6 relative z-20 mt-6 md:mt-8"
            key={`details-${activeItem.id}`}
          >
            <div className="bg-neutral-900/80 border border-neutral-800/60 px-4 py-3 rounded-xl flex flex-col gap-2 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-neutral-500 uppercase tracking-widest">{language === "FR" ? "Outils" : "Tools"}</span>
                <span className="text-neutral-300 font-medium truncate max-w-[240px]">{activeItem.specs.tools}</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Decorative Spacer to balance outer vertical layout */}
      <div className="h-2 shrink-0"></div>
    </div>
  );
}
