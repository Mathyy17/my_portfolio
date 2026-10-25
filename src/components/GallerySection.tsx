import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../LanguageContext";
import { motion } from "motion/react";
import { 
  ZoomIn, X, ChevronLeft, ChevronRight, Sliders, 
  RotateCcw, Sparkles, AlertCircle, Eye, CornerDownRight, Focus,
  Upload, Trash2, Pencil
} from "lucide-react";
import SafeImage from "./SafeImage";
import TypewriterScramble from "./TypewriterScramble";

interface GalleryItem {
  id: string;
  title: string;
  category: "Generative" | "Typography Grid" | "Structure" | "ICON Collection" | "Other Illustrations" | "Realistic" | "Tokyo Strokes" | "One Piece" | "Halloween 2026" | "Photographie" | "Dessin Manuel";
  description: string;
  image: string;
  gridClass: string;
  bgColor?: string;
  subcategory?: string;
  specs: {
    resolution: string;
    renderer: string;
    frequency?: string;
    aspect: string;
    palette: string[];
    conceptCode: string;
  };
}

const GALLERY_ITEMS_RAW: GalleryItem[] = [
  {
    id: "gal_ill_barbara",
    title: "Barbara",
    category: "Other Illustrations",
    description: "",
    image: "/images/Barbara.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#f43f5e", "#18181b", "#fbbf24", "#ffffff"],
      conceptCode: "AUTRE_BARBARA"
    }
  },
  {
    id: "gal_ill_bleu",
    title: "Bleu",
    category: "Other Illustrations",
    description: "",
    image: "/images/Bleu.png",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#0284c7", "#38bdf8", "#0f172a", "#f0f9ff"],
      conceptCode: "AUTRE_BLEU"
    }
  },
  {
    id: "gal_ill_bright",
    title: "Bright",
    category: "Other Illustrations",
    description: "",
    image: "/images/Bright.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#f59e0b", "#ec4899", "#111111", "#fef3c7"],
      conceptCode: "AUTRE_BRIGHT"
    }
  },
  {
    id: "gal_ill_jenna",
    title: "Jenna",
    category: "Other Illustrations",
    description: "",
    image: "/images/Jenna.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#8b5cf6", "#ec4899", "#18181b", "#ffffff"],
      conceptCode: "AUTRE_JENNA"
    }
  },
  {
    id: "gal_ill_kim",
    title: "Kim",
    category: "Other Illustrations",
    description: "",
    image: "/images/Kim.png",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#d946ef", "#06b6d4", "#09090b", "#fdf4ff"],
      conceptCode: "AUTRE_KIM"
    }
  },
  {
    id: "gal_ill_natasha",
    title: "Natasha",
    category: "Other Illustrations",
    description: "",
    image: "/images/Natasha.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#e11d48", "#1e1b4b", "#fda4af", "#ffffff"],
      conceptCode: "AUTRE_NATASHA"
    }
  },
  {
    id: "gal_ill_or",
    title: "Or",
    category: "Other Illustrations",
    description: "",
    image: "/images/Or.png",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#eab308", "#ca8a04", "#713f12", "#fef9c3"],
      conceptCode: "AUTRE_OR"
    }
  },
  {
    id: "gal_ill_orange",
    title: "Orange",
    category: "Other Illustrations",
    description: "",
    image: "/images/Orange.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#ea580c", "#f97316", "#1c1917", "#ffedd5"],
      conceptCode: "AUTRE_ORANGE"
    }
  },
  {
    id: "gal_ill_rouge",
    title: "Rouge",
    category: "Other Illustrations",
    description: "",
    image: "/images/Rouge.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#dc2626", "#991b1b", "#18181b", "#fee2e2"],
      conceptCode: "AUTRE_ROUGE"
    }
  },
  {
    id: "gal_ill_sunshine",
    title: "Sunshine",
    category: "Other Illustrations",
    description: "",
    image: "/images/Sunshine.png",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "2:3",
      palette: ["#f59e0b", "#fbbf24", "#0f172a", "#fef3c7"],
      conceptCode: "AUTRE_SUNSHINE"
    }
  },
  {
    id: "gal_ill_katarina",
    title: "Katarina",
    category: "Other Illustrations",
    description: "",
    image: "/images/Katarina.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "3:4",
      palette: ["#f43f5e", "#8b5cf6", "#0f172a", "#fef3c7"],
      conceptCode: "AUTRE_KATARINA"
    }
  },
  {
    id: "gal_ill_pumpkin",
    title: "Pumpkin",
    category: "Halloween 2026",
    description: "",
    image: "/images/Pumpkin.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "3:4",
      palette: ["#f97316", "#7c2d12", "#18181b", "#fef08a"],
      conceptCode: "HALLOWEEN_PUMPKIN"
    }
  },
  {
    id: "gal_ill_clary",
    title: "Clary",
    category: "Other Illustrations",
    description: "",
    image: "/images/Clary.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Graphite & Crayon",
      aspect: "1:1",
      palette: ["#18181b", "#52525b", "#a1a1aa", "#fafafa"],
      conceptCode: "REALISTIC_CLARY"
    }
  },
  {
    id: "gal_ill_skeleton",
    title: "Skeleton",
    category: "Other Illustrations",
    description: "",
    image: "/images/skeleton.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Graphite & Crayon",
      aspect: "1:1",
      palette: ["#09090b", "#3f3f46", "#d4d4d8", "#f4f4f5"],
      conceptCode: "REALISTIC_SKELETON"
    }
  },
  {
    id: "gal_ill_skeleton_v2",
    title: "Skeleton V2",
    category: "Other Illustrations",
    description: "",
    image: "/images/skeleton v2.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Graphite & Crayon",
      aspect: "1:1",
      palette: ["#1c1917", "#57534e", "#d6d3d1", "#fafaf9"],
      conceptCode: "REALISTIC_SKELETON_V2"
    }
  },
  {
    id: "gal_ill_taylor",
    title: "Taylor",
    category: "Other Illustrations",
    description: "",
    image: "/images/Taylor.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Graphite & Crayon",
      aspect: "1:1",
      palette: ["#0a0a0a", "#404040", "#a3a3a3", "#fafafa"],
      conceptCode: "REALISTIC_TAYLOR"
    }
  },
  {
    id: "op_vivi",
    title: "Vivi",
    category: "One Piece",
    description: "La princesse d'Alabasta, Nefeltari Vivi, rayonnante avec ses cheveux bleu azur et une expression pleine d'espoir et de courage.",
    image: "/images/Vivi.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "1:1",
      palette: ["#06b6d4", "#fef3c7", "#ffffff", "#db2777"],
      conceptCode: "OP_GIRLS_VIVI"
    }
  },
  {
    id: "op_viola",
    title: "Viola",
    category: "One Piece",
    description: "La princesse Viola de Dressrosa, sublimée par une pose de danse flamenco passionnée et des teintes chaudes et hispanisantes.",
    image: "/images/Viola.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "1:1",
      palette: ["#b91c1c", "#fbbf24", "#ffffff", "#111111"],
      conceptCode: "OP_GIRLS_VIOLA"
    }
  },
  {
    id: "op_yamato",
    title: "Yamato",
    category: "One Piece",
    description: "Yamato, le fils autoproclamé de Kaido qui hérite de la volonté d'Oden, dessiné avec ses cornes rouges et sa posture noble.",
    image: "/images/Yamato.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "1:1",
      palette: ["#111111", "#14b8a6", "#ef4444", "#ffffff"],
      conceptCode: "OP_GIRLS_YAMATO"
    }
  },
  {
    id: "op_robin_demon",
    title: "Robin Demon",
    category: "One Piece",
    description: "Nico Robin sous sa forme démon (Demoni Fleurs), capturant sa puissance et sa grâce mystique avec des contrastes pop intenses.",
    image: "/images/Robin demon.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "1:1",
      palette: ["#111111", "#991b1b", "#ffffff", "#3b82f6"],
      conceptCode: "OP_GIRLS_ROBIN_DEMON"
    }
  },
  {
    id: "op_tashigi",
    title: "Tashigi",
    category: "One Piece",
    description: "La capitaine de la Marine Tashigi, alliant la rigueur de son sabre à une expression douce, soulignée par ses lunettes emblématiques.",
    image: "/images/Tashigi.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "1:1",
      palette: ["#0f172a", "#3b82f6", "#ffffff", "#ef4444"],
      conceptCode: "OP_GIRLS_TASHIGI"
    }
  },
  {
    id: "op_amande",
    title: "Charlotte Amande",
    category: "One Piece",
    description: "Charlotte Amande, la redoutable épéiste au chapeau démesuré de l'équipage de Big Mom.",
    image: "/images/Amande.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#475569", "#dc2626", "#ffffff", "#0f172a"],
      conceptCode: "OP_GIRLS_AMANDE"
    }
  },
  {
    id: "op_big_mom",
    title: "Big Mom",
    category: "One Piece",
    description: "Charlotte Linlin rayonnante, capturant l'énergie débordante et extravagante de l'Impératrice.",
    image: "/images/Big Mom.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#ec4899", "#fbbf24", "#ffffff", "#9333ea"],
      conceptCode: "OP_GIRLS_BIG_MOM"
    }
  },
  {
    id: "op_boa_hancock",
    title: "Boa Hancock",
    category: "One Piece",
    description: "L'Impératrice pirate d'Amazon Lily, la femme la plus splendide du monde avec sa chevelure noire et ses ornements d'or.",
    image: "/images/Boa Hancock.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#991b1b", "#fbbf24", "#111111", "#ffffff"],
      conceptCode: "OP_GIRLS_BOA_HANCOCK"
    }
  },
  {
    id: "op_califa",
    title: "Califa",
    category: "One Piece",
    description: "L'agente secrète d'élite du CP9 avec ses lunettes emblématiques et sa gestuelle impeccable.",
    image: "/images/Califa.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#0f172a", "#fde047", "#ffffff", "#38bdf8"],
      conceptCode: "OP_GIRLS_CALIFA"
    }
  },
  {
    id: "op_camie",
    title: "Camie",
    category: "One Piece",
    description: "La sirène gourami joyeuse et vive avec sa chevelure vert pomme et sa spontanéité.",
    image: "/images/Camie.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#22c55e", "#f43f5e", "#38bdf8", "#ffffff"],
      conceptCode: "OP_GIRLS_CAMIE"
    }
  },
  {
    id: "op_carrot",
    title: "Carrot",
    category: "One Piece",
    description: "La guerrière Mink lapin de Zou, pleine d'entrain, d'agilité et d'électrochocs pétillants.",
    image: "/images/Carrot.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#f59e0b", "#38bdf8", "#ffffff", "#10b981"],
      conceptCode: "OP_GIRLS_CARROT"
    }
  },
  {
    id: "op_mone",
    title: "Monet",
    category: "One Piece",
    description: "La femme-neige de Punk Hazard avec ses ailes de harpie et son regard magnétique émeraude.",
    image: "/images/Mone.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#10b981", "#38bdf8", "#ffffff", "#065f46"],
      conceptCode: "OP_GIRLS_MONE"
    }
  },
  {
    id: "op_nami",
    title: "Nami",
    category: "One Piece",
    description: "La navigatrice des Mugiwaras, lumineuse avec sa crinière rousse et son sourire déterminé.",
    image: "/images/Nami.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#f97316", "#38bdf8", "#ffffff", "#84cc16"],
      conceptCode: "OP_GIRLS_NAMI"
    }
  },
  {
    id: "op_nojiko",
    title: "Nojiko",
    category: "One Piece",
    description: "La grande sœur protectrice de Cocoyashi aux tatouages azur et au caractère bien trempé.",
    image: "/images/Nojiko.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#3b82f6", "#f59e0b", "#ffffff", "#1e293b"],
      conceptCode: "OP_GIRLS_NOJIKO"
    }
  },
  {
    id: "op_otama",
    title: "Otama",
    category: "One Piece",
    description: "La petite kunoichi du pays des Wa pleine de bravoure avec son chignon violet et son chapeau tressé.",
    image: "/images/O-Tama.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#a855f7", "#10b981", "#fbbf24", "#ffffff"],
      conceptCode: "OP_GIRLS_OTAMA"
    }
  },
  {
    id: "op_olvia",
    title: "Nico Olvia",
    category: "One Piece",
    description: "L'archéologue d'Ohara, symbole de courage et de mémoire historique face au Buster Call.",
    image: "/images/Olvia.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#64748b", "#38bdf8", "#ffffff", "#0f172a"],
      conceptCode: "OP_GIRLS_OLVIA"
    }
  },
  {
    id: "op_paula",
    title: "Paula (Miss Doublefinger)",
    category: "One Piece",
    description: "L'élégante agente du Baroque Works marchant avec assurance et sensualité mortelle.",
    image: "/images/Paula.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#0284c7", "#f43f5e", "#fbbf24", "#111111"],
      conceptCode: "OP_GIRLS_PAULA"
    }
  },
  {
    id: "op_perona",
    title: "Perona",
    category: "One Piece",
    description: "La princesse fantôme de Thriller Bark avec son style baroque gothique et ses couettes rosées.",
    image: "/images/Perona.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#f43f5e", "#111111", "#ffffff", "#9333ea"],
      conceptCode: "OP_GIRLS_PERONA"
    }
  },
  {
    id: "op_reiju",
    title: "Vinsmoke Reiju",
    category: "One Piece",
    description: "Poison Pink du royaume de Germa, alliant prestance royale, exosquelette et compassion.",
    image: "/images/Reiju.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#ec4899", "#1e1b4b", "#ffffff", "#38bdf8"],
      conceptCode: "OP_GIRLS_REIJU"
    }
  },
  {
    id: "op_robin",
    title: "Nico Robin",
    category: "One Piece",
    description: "L'archéologue des Chapeaux de Paille, calme et mystique avec son allure distinguée.",
    image: "/images/Robin.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#1e293b", "#3b82f6", "#ffffff", "#a855f7"],
      conceptCode: "OP_GIRLS_ROBIN"
    }
  },
  {
    id: "op_smoothie",
    title: "Charlotte Smoothie",
    category: "One Piece",
    description: "L'une des trois Sweet Commanders de Big Mom, représentée avec sa prestance majestueuse et son esthétique Pop Art singulière.",
    image: "/images/Smoothie.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#d97706", "#fef3c7", "#4338ca", "#ffffff"],
      conceptCode: "OP_GIRLS_SMOOTHIE"
    }
  },
  {
    id: "gal_ill_bride",
    title: "Bride",
    category: "Halloween 2026",
    description: "",
    image: "/images/Bride.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#111111", "#64748b", "#cbd5e1", "#ffffff"],
      conceptCode: "HALLOWEEN_BRIDE"
    }
  },
  {
    id: "gal_ill_rabbit",
    title: "Rabbit",
    category: "Halloween 2026",
    description: "",
    image: "/images/Rabit.PNG",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#111111", "#94a3b8", "#e11d48", "#ffffff"],
      conceptCode: "HALLOWEEN_RABBIT"
    }
  },
  {
    id: "gal_ill_wallys",
    title: "Wallys",
    category: "Other Illustrations",
    description: "",
    image: "/images/Wallys.png",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "2:3",
      palette: ["#1e1b4b", "#4338ca", "#ec4899", "#ffffff"],
      conceptCode: "OTHER_WALLYS"
    }
  },
  {
    id: "gal_ill_water_face",
    title: "Water Face",
    category: "Other Illustrations",
    description: "",
    image: "/images/Water face.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Application Procreate",
      aspect: "1:1",
      palette: ["#0284c7", "#38bdf8", "#0f172a", "#f0f9ff"],
      conceptCode: "OTHER_WATER_FACE"
    }
  },
  {
    id: "gal_ill_impression",
    title: "Impression Study",
    category: "Other Illustrations",
    description: "",
    image: "/images/IMG_5762.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Technique mixte numérique",
      aspect: "3:4",
      palette: ["#18181b", "#71717a", "#e4e4e7", "#ffffff"],
      conceptCode: "OTHER_IMPRESSION"
    }
  },
  {
    id: "gal_man_cyberanimal",
    title: "Cyberanimal",
    category: "Dessin Manuel",
    description: "Créature hybride biomécanique et animale, mêlant lignes graphiques précises, feutres Promarker et crayons de couleurs.",
    image: "/images/Cyberanimal.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#0284c7", "#ec4899", "#f59e0b", "#111111"],
      conceptCode: "MANUEL_CYBERANIMAL"
    }
  },
  {
    id: "gal_man_demon",
    title: "Demon",
    category: "Dessin Manuel",
    description: "Figure démoniaque du folklore japonais avec cornes imposantes et contrastes profonds de lavis et d'encre.",
    image: "/images/Demon.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "3:4",
      palette: ["#dc2626", "#18181b", "#fbbf24", "#ffffff"],
      conceptCode: "MANUEL_DEMON"
    }
  },
  {
    id: "gal_man_died",
    title: "Died",
    category: "Dessin Manuel",
    description: "Composition dramatique autour du thème de la métamorphose et de la finitude dans l'iconographie nippone.",
    image: "/images/Died.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#3b82f6", "#e11d48", "#171717", "#ffffff"],
      conceptCode: "MANUEL_DIED"
    }
  },
  {
    id: "gal_man_dog",
    title: "Dog",
    category: "Dessin Manuel",
    description: "Chien mythologique protecteur stylisé aux aplats d'aquarelle vifs et contours acérés.",
    image: "/images/Dog.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#f59e0b", "#10b981", "#ef4444", "#18181b"],
      conceptCode: "MANUEL_DOG"
    }
  },
  {
    id: "gal_man_dragon",
    title: "Dragon",
    category: "Dessin Manuel",
    description: "Ryū traditionnel japonais ondulant aux écailles détaillées et nuances de couleurs intenses.",
    image: "/images/Dragon.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#16a34a", "#ca8a04", "#dc2626", "#09090b"],
      conceptCode: "MANUEL_DRAGON"
    }
  },
  {
    id: "gal_man_egypt",
    title: "Egypt",
    category: "Dessin Manuel",
    description: "Fusion thématique entre l'esthétique manga et les divinités de l'Égypte antique.",
    image: "/images/Egypt.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#eab308", "#0284c7", "#0f172a", "#f8fafc"],
      conceptCode: "MANUEL_EGYPT"
    }
  },
  {
    id: "gal_man_fish",
    title: "Fish",
    category: "Dessin Manuel",
    description: "Carpe Koï emblématique ondulant dans un courant fluide aux teintes d'aquarelle lumineuses.",
    image: "/images/Fish.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#f97316", "#06b6d4", "#e11d48", "#ffffff"],
      conceptCode: "MANUEL_FISH"
    }
  },
  {
    id: "gal_man_frog",
    title: "Frog",
    category: "Dessin Manuel",
    description: "Crapaud fantastique et expressif, inspiré des estampes ukiyo-e et du folklore shinto.",
    image: "/images/Frog.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#84cc16", "#059669", "#78350f", "#111111"],
      conceptCode: "MANUEL_FROG"
    }
  },
  {
    id: "gal_man_mask",
    title: "Mask",
    category: "Dessin Manuel",
    description: "Masque Oni traditionnel japonais aux traits expressifs et couleurs saturées.",
    image: "/images/Mask.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#dc2626", "#facc15", "#18181b", "#ffffff"],
      conceptCode: "MANUEL_MASK"
    }
  },
  {
    id: "gal_man_watercolor",
    title: "Watercolor",
    category: "Dessin Manuel",
    description: "Étude fluide et poétique à l'aquarelle célébrant le geste et la spontanéité du pinceau.",
    image: "/images/Watercolor.png",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "PNG",
      renderer: "Crayons de couleurs, Promarker, Aquarelle, Posca",
      aspect: "2:3",
      palette: ["#3b82f6", "#8b5cf6", "#ec4899", "#ffffff"],
      conceptCode: "MANUEL_WATERCOLOR"
    }
  }
];

const GALLERY_ITEMS: GalleryItem[] = GALLERY_ITEMS_RAW.map(item => ({
  ...item,
  specs: {
    ...item.specs,
    renderer: (item.category === "One Piece" || item.id.startsWith("one_piece_") || item.id.startsWith("op_"))
      ? "Application Procreate"
      : (item.specs.renderer === "Œuvre Numérique Vivante" ? "Application Procreate" : item.specs.renderer)
  }
}));

const PHOTO_ITEMS: GalleryItem[] = [
  // 1. RainGlow
  {
    id: "photo_rainglow_2",
    title: "Rain Glow Close-up 2",
    category: "Photographie",
    subcategory: "RainGlow",
    description: "",
    image: "/images/closeuppalette2.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#db2777", "#2563eb", "#4f46e5", "#ffffff"],
      conceptCode: "PH_RAINGLOW_CLOSEUP_2"
    }
  },
  {
    id: "photo_palette_large",
    title: "Palette Plan d'ensemble",
    category: "Photographie",
    subcategory: "RainGlow",
    description: "",
    image: "/images/palette-large.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "16:9",
      palette: ["#ec4899", "#3b82f6", "#10b981", "#000000"],
      conceptCode: "PH_PALETTE_LARGE"
    }
  },
  {
    id: "photo_rainglow_1",
    title: "Rain Glow Close-up 1",
    category: "Photographie",
    subcategory: "RainGlow",
    description: "",
    image: "/images/closeup_palette1.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#ec4899", "#3b82f6", "#e11d48", "#facc15"],
      conceptCode: "PH_RAINGLOW_CLOSEUP_1"
    }
  },

  // 2. Typologie
  {
    id: "photo_typology_closeup2",
    title: "Typologie Close-up",
    category: "Photographie",
    subcategory: "Typologie",
    description: "",
    image: "/images/Typology_closeup2.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#1c1917", "#44403c", "#78716c", "#ffffff"],
      conceptCode: "PH_TYPO_CLOSEUP"
    }
  },
  {
    id: "photo_typologie_copie",
    title: "Typologie Plan d'ensemble",
    category: "Photographie",
    subcategory: "Typologie",
    description: "",
    image: "/images/Typologie copie.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "16:9",
      palette: ["#44403c", "#78716c", "#a8a29e", "#f5f5f4"],
      conceptCode: "PH_TYPO_LARGE"
    }
  },

  // 3. Prada ocre
  {
    id: "photo_ocre_1",
    title: "Ocre Closeup 1",
    category: "Photographie",
    subcategory: "Prada ocre",
    description: "",
    image: "/images/Ocre_closeup1.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#854d0e", "#b45309", "#ca8a04", "#fafaf9"],
      conceptCode: "PH_OCRE_CLOSEUP_1"
    }
  },
  {
    id: "photo_plan_large2",
    title: "Plan d'ensemble 2",
    category: "Photographie",
    subcategory: "Prada ocre",
    description: "",
    image: "/images/Plan_large2.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "16:9",
      palette: ["#451a03", "#78350f", "#ca8a04", "#e2e8f0"],
      conceptCode: "PH_PLAN_LARGE_2"
    }
  },
  {
    id: "photo_ocre_2",
    title: "Ocre Closeup 2",
    category: "Photographie",
    subcategory: "Prada ocre",
    description: "",
    image: "/images/Ocre_closeup2.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#78350f", "#92400e", "#b45309", "#fef3c7"],
      conceptCode: "PH_OCRE_CLOSEUP_2"
    }
  },

  // 4. Prada pink
  {
    id: "photo_plan_large1",
    title: "Plan d'ensemble 1",
    category: "Photographie",
    subcategory: "Prada pink",
    description: "",
    image: "/images/Plan_large1.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "16:9",
      palette: ["#451a03", "#78350f", "#ca8a04", "#e2e8f0"],
      conceptCode: "PH_PLAN_LARGE_1"
    }
  },
  {
    id: "photo_prada_impression",
    title: "Prada Impression",
    category: "Photographie",
    subcategory: "Prada pink",
    description: "",
    image: "/images/close up prada impression.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#18181b", "#52525b", "#d4d4d8", "#fafafa"],
      conceptCode: "PH_PRADA_CLOSEUP"
    }
  },
  {
    id: "photo_optique_closeup",
    title: "Optic Closeup",
    category: "Photographie",
    subcategory: "Prada pink",
    description: "",
    image: "/images/close-up.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie expérimentale",
      aspect: "4:3",
      palette: ["#18181b", "#52525b", "#d4d4d8", "#fafafa"],
      conceptCode: "PH_OPTIQUE_CLOSEUP"
    }
  },

  // 5. color flower
  {
    id: "photo_fleur_main",
    title: "Fleur Main",
    category: "Photographie",
    subcategory: "color flower",
    description: "",
    image: "/images/Fleur main.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#e11d48", "#f43f5e", "#ffe4e6", "#111111"],
      conceptCode: "PH_FLEUR_MAIN"
    }
  },
  {
    id: "photo_closeup_rose",
    title: "Closeup Rose",
    category: "Photographie",
    subcategory: "color flower",
    description: "",
    image: "/images/closeup_rose2.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "3:4",
      palette: ["#f43f5e", "#fda4af", "#4c0519", "#ffffff"],
      conceptCode: "PH_ROSE_MACRO"
    }
  },

  // 6. vinyl
  {
    id: "photo_vinyle_grandplan",
    title: "Vinyl Plan d'ensemble",
    category: "Photographie",
    subcategory: "vinyl",
    description: "",
    image: "/images/Vinyle_grandplan_web.jpg",
    gridClass: "nomnom-item nomnom-item--large",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "16:9",
      palette: ["#111111", "#334155", "#cbd5e1", "#ffffff"],
      conceptCode: "PH_VINYLE_LARGE"
    }
  },
  {
    id: "photo_cd_closeup",
    title: "CD Closeup",
    category: "Photographie",
    subcategory: "vinyl",
    description: "",
    image: "/images/CD-closeup.jpg",
    gridClass: "nomnom-item nomnom-item--medium",
    specs: {
      resolution: "JPG",
      renderer: "Photographie numérique",
      aspect: "1:1",
      palette: ["#06b6d4", "#ec4899", "#111111", "#ffffff"],
      conceptCode: "PH_CD_CLOSEUP"
    }
  }
];

// Helper to compress and optimize uploaded images so they fit in localStorage's 5MB limits beautifully
const resizeAndOptimizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1024;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve(dataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export default function GallerySection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"illustrations" | "dessin_manuel" | "photographies">("illustrations");
  const [filter, setFilter] = useState<string>("All");
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to top when opening or switching items
  useEffect(() => {
    if (selectedItemIdx !== null && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [selectedItemIdx]);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    let items = [...GALLERY_ITEMS];
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("nomnom_gallery_items_v37");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validItemsMap = new Map(GALLERY_ITEMS.map((it) => [it.id, it]));
            const staticItemIds = new Set(GALLERY_ITEMS.map((it) => it.id));
            const excludedIds = new Set([
              "gal_ill_avatar", "op_pudding", "op_sadi", "op_ulti",
              "op_all", "gal_ill_ponyo", "photo_lightpaint",
              "gal_ill_1", "gal_ill_2", "gal_ill_3", "gal_ill_4", "gal_ill_5", "gal_ill_6", "gal_ill_7",
              "gal_ill_8", "gal_ill_9", "gal_ill_10", "gal_ill_11", "gal_ill_12",
              "gal_ill_13", "gal_ill_14", "gal_ill_15", "gal_ill_16", "gal_ill_17",
              "gal_ill_18", "gal_ill_19", "one_piece_demon", "one_piece_died",
              "one_piece_dog", "one_piece_dragon", "one_piece_egypt", "one_piece_fish",
              "one_piece_frog", "one_piece_mask"
            ]);
            
            // Map saved properties for existing static items
            const savedStaticItemsMap = new Map<string, any>();
            parsed.forEach((item) => {
              if (validItemsMap.has(item.id) && !excludedIds.has(item.id)) {
                savedStaticItemsMap.set(item.id, item);
              }
            });

            // Merge current static items with any saved stats (e.g., custom views or likes)
            const mergedStaticItems = GALLERY_ITEMS
              .filter((staticItem) => !excludedIds.has(staticItem.id))
              .map((staticItem) => {
                const savedItem = savedStaticItemsMap.get(staticItem.id);
                if (savedItem) {
                  return {
                    ...staticItem,
                    likes: savedItem.likes !== undefined ? savedItem.likes : 0,
                    views: savedItem.views !== undefined ? savedItem.views : 0,
                  };
                }
                return staticItem;
              });

            // Also keep user-uploaded custom drawings
            const userUploadedItems = parsed.filter((item) => !staticItemIds.has(item.id) && !excludedIds.has(item.id));

            items = [...mergedStaticItems, ...userUploadedItems];
          }
        } catch (e) {
          console.error("Error loading gallery items from localStorage:", e);
        }
      }
    }
    // Mélange aléatoire (Fisher-Yates shuffle) à chaque chargement de la galerie
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  useEffect(() => {
    try {
      localStorage.setItem("nomnom_gallery_items_v37", JSON.stringify(galleryItems));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }, [galleryItems]);



  const filteredItems = activeTab === "illustrations"
    ? galleryItems.filter((item) => item.category !== "Dessin Manuel" && (filter === "All" || item.category === filter))
    : activeTab === "dessin_manuel"
      ? galleryItems.filter((item) => item.category === "Dessin Manuel")
      : PHOTO_ITEMS.filter((item) => filter === "All" || item.subcategory === filter);

  const handleNextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    const nextIdx = (selectedItemIdx + 1) % filteredItems.length;
    setSelectedItemIdx(nextIdx);
  };

  const handlePrevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    const prevIdx = (selectedItemIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItemIdx(prevIdx);
  };

  return (
    <section id="gallery" className="py-24 border-t border-neutral-900/60 relative animate-fade-in">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090c_1px,transparent_1px),linear-gradient(to_bottom,#09090c_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none z-0" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Gallery Segment Marker */}
        <motion.div 
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{t("gallery.marker")}</span>
        </motion.div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-baseline justify-between mb-12 gap-6">
          <div>
            <TypewriterScramble
              text={t("gallery.heading")}
              as="h2"
              className="font-display font-medium text-4xl text-white tracking-tight"
              delay={100}
            />
            <motion.p 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="font-mono text-xs text-neutral-400 mt-2 max-w-xl"
            >
              {t("gallery.intro")}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.18 }}
            className="flex flex-wrap gap-2 items-center"
          >
            {activeTab === "illustrations" && (
              <div className="flex flex-wrap gap-1 bg-neutral-900/30 p-1.5 rounded-lg border border-neutral-800/40">
                {(["All", "One Piece", "Halloween 2026", "Other Illustrations"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setSelectedItemIdx(null);
                    }}
                    className={`px-3 py-1 rounded text-[10px] font-mono tracking-wider uppercase cursor-pointer transition-all ${
                      filter === cat
                        ? "text-rose-400 bg-rose-950/20 border border-rose-500/20"
                        : "text-neutral-400 hover:text-white"
                     }`}
                  >
                    {cat === "All"
                      ? (language === "FR" ? "Toutes" : "All")
                      : cat === "Other Illustrations"
                      ? (language === "FR" ? "Autres Illustrations" : "Other Illustrations")
                      : cat}
                  </button>
                ))}
              </div>
            )}
            {activeTab === "photographies" && (
              <div className="flex flex-wrap gap-1 bg-neutral-900/30 p-1.5 rounded-lg border border-neutral-800/40">
                {(["All", "RainGlow", "Typologie", "Prada ocre", "Prada pink", "color flower", "vinyl"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setSelectedItemIdx(null);
                    }}
                    className={`px-3 py-1 rounded text-[10px] font-mono tracking-wider uppercase cursor-pointer transition-all ${
                      filter === cat
                        ? "text-rose-400 bg-rose-950/20 border border-rose-500/20"
                        : "text-neutral-400 hover:text-white"
                     }`}
                  >
                    {cat === "All"
                      ? (language === "FR" ? "Toutes" : "All")
                      : cat}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Tab Switcher: Illustrations / Dessin Manuel / Photographies */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.22 }}
          className="flex justify-start mb-8 border-b border-neutral-900/40 pb-3"
        >
          <div className="flex gap-6">
            <button
              onClick={() => {
                setActiveTab("illustrations");
                setFilter("All");
                setSelectedItemIdx(null);
              }}
              className={`relative pb-3 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === "illustrations"
                  ? "text-rose-400 font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === "FR" ? "Illustrations" : "Illustrations"}
              {activeTab === "illustrations" && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500" 
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("dessin_manuel");
                setFilter("All");
                setSelectedItemIdx(null);
              }}
              className={`relative pb-3 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === "dessin_manuel"
                  ? "text-rose-400 font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              {language === "FR" ? "Dessin Manuel" : "Hand-drawn Art"}
              {activeTab === "dessin_manuel" && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500" 
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("photographies");
                setFilter("All");
                setSelectedItemIdx(null);
              }}
              className={`relative pb-3 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === "photographies"
                  ? "text-rose-400 font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Focus className="w-3.5 h-3.5" />
              {language === "FR" ? "Photographies" : "Photographs"}
              {activeTab === "photographies" && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500" 
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* MAIN BODY AREA */}
        <div>
          {activeTab === "photographies" ? (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  initial={{ opacity: 0, y: 100, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 85,
                    damping: 14,
                    delay: 0.12 + (index % 6) * 0.06 
                  }}
                  onClick={() => setSelectedItemIdx(index)}
                  className="break-inside-avoid mb-6 relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-950/40 hover:border-rose-500/60 hover:ring-1 hover:ring-rose-500/20 hover:shadow-[0_20px_45px_-12px_rgba(244,63,94,0.22),0_0_25px_1px_rgba(244,63,94,0.06)] transition-all duration-300 hover:scale-[1.015] cursor-pointer shadow-xl group flex flex-col justify-end"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto block select-none rounded-2xl"
                    fallbackClassName="w-full aspect-[4/3] rounded-2xl"
                    fallbackText={item.title}
                  />
                  
                  {/* Thin technical corner-border accent lines on hover */}
                  <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />
                  <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

                  {/* Status indicator badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {item.image.startsWith("data:") && (
                      <span className="bg-emerald-950/90 text-emerald-300 font-mono text-[8px] uppercase px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm tracking-wide font-medium">
                        {language === "FR" ? "● importé actif" : "● active import"}
                      </span>
                    )}
                  </div>

                  {/* Sliding details block overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-900/60 flex flex-col justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 justify-between">
                        <span className="font-display font-medium text-sm text-white tracking-tight leading-snug">
                          {item.title}
                        </span>
                        {item.subcategory && (
                          <span className="font-mono text-[9px] text-rose-400 bg-rose-950/30 border border-rose-500/25 px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                            {item.subcategory}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wide flex items-center gap-1">
                        <CornerDownRight className="w-3 h-3 text-neutral-600" />
                        {item.specs.conceptCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-3 border-t border-neutral-900/40 pt-2.5">
                      <span className="text-neutral-500">{item.specs.renderer}</span>
                      <span className="text-rose-400 font-bold flex items-center gap-1 group-hover:text-rose-300">{language === "FR" ? "Détails ↗" : "Details ↗"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  initial={{ opacity: 0, y: 100, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 85,
                    damping: 14,
                    delay: 0.12 + (index % 6) * 0.06 
                  }}
                  onClick={() => setSelectedItemIdx(index)}
                  className="break-inside-avoid mb-6 relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-950/40 hover:border-rose-500/60 hover:ring-1 hover:ring-rose-500/20 hover:shadow-[0_20px_45px_-12px_rgba(244,63,94,0.22),0_0_25px_1px_rgba(244,63,94,0.06)] transition-all duration-300 hover:scale-[1.015] cursor-pointer shadow-xl group flex flex-col justify-end"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto block select-none rounded-2xl"
                    fallbackClassName="w-full aspect-[4/3] rounded-2xl"
                    fallbackText={item.title}
                  />
                  
                  {/* Thin technical corner-border accent lines on hover */}
                  <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />
                  <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

                  {/* Status indicator badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {item.image.startsWith("data:") && (
                      <span className="bg-emerald-950/90 text-emerald-300 font-mono text-[8px] uppercase px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm tracking-wide font-medium">
                        {language === "FR" ? "● importé actif" : "● active import"}
                      </span>
                    )}
                  </div>

                  {/* Sliding details block overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-900/60 flex flex-col justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 justify-between">
                        <span className="font-display font-medium text-sm text-white tracking-tight leading-snug">
                          {item.title}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wide flex items-center gap-1">
                        <CornerDownRight className="w-3 h-3 text-neutral-600" />
                        {item.specs.conceptCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-3 border-t border-neutral-900/40 pt-2.5">
                      <span className="text-neutral-500">{item.specs.renderer}</span>
                      <span className="text-rose-400 font-bold flex items-center gap-1 group-hover:text-rose-300">{language === "FR" ? "Détails ↗" : "Details ↗"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* COMPREHENSIVE LIGHTBOX DIALOG OVERLAY */}
        {selectedItemIdx !== null && createPortal(
          <div ref={modalScrollRef} className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Dark background overlay */}
            <div 
              onClick={() => setSelectedItemIdx(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            ></div>

            {/* Lightbox Modal card wrapper */}
            <div className="relative max-w-5xl w-full h-[90vh] md:h-[82vh] max-h-[720px] bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden z-10 flex flex-col md:flex-row shadow-2xl animate-fade-in">
              {/* Close button */}
              <button
                onClick={() => setSelectedItemIdx(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrevItem}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextItem}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Left Image Screen */}
              <div className="md:w-3/5 h-1/2 md:h-full bg-neutral-950 flex flex-col items-center justify-center p-6 relative select-none">
                <div className="flex-1 flex items-center justify-center w-full relative group">
                  <div className="relative max-w-full max-h-[380px] md:max-h-[465px] rounded-lg overflow-hidden cursor-zoom-in">
                    <SafeImage
                      src={filteredItems[selectedItemIdx].image}
                      alt={filteredItems[selectedItemIdx].title}
                      className="max-h-[380px] md:max-h-[465px] object-contain w-full filter saturate-100 transition-all duration-550 group-hover:scale-[1.015] active:scale-98 group-hover:brightness-110"
                      fallbackClassName="w-full min-h-[350px] rounded-lg"
                      fallbackText={filteredItems[selectedItemIdx].title}
                      onClick={() => setZoomedImage(filteredItems[selectedItemIdx].image)}
                    />
                    {/* Floating Zoom Indicator on Hover */}
                    <div 
                      onClick={() => setZoomedImage(filteredItems[selectedItemIdx].image)}
                      className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md border border-neutral-800 px-3 py-1.5 rounded-lg text-[9px] font-mono text-zinc-300 group-hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      {language === "FR" ? "AGRANDIR" : "ZOOM"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Specs Specs / Details panel */}
              <div className="md:w-2/5 h-1/2 md:h-full p-8 border-t md:border-t-0 md:border-l border-neutral-900/60 flex flex-col justify-between bg-[#0b0b0e] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] text-rose-400 bg-rose-955/20 border border-rose-500/20 px-2.5 py-1 rounded uppercase tracking-wider inline-block">
                      {filteredItems[selectedItemIdx].category === "Photographie"
                        ? (filteredItems[selectedItemIdx].subcategory || "Photographie")
                        : filteredItems[selectedItemIdx].category === "Other Illustrations"
                        ? (language === "FR" ? "Autres Illustrations" : "Other Illustrations")
                        : filteredItems[selectedItemIdx].category}
                    </span>
                    <h3 className="font-display font-medium text-2xl text-white mt-3">
                      {filteredItems[selectedItemIdx].title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 uppercase mt-0.5 tracking-wider">
                      {filteredItems[selectedItemIdx].specs.conceptCode}
                    </p>
                  </div>

                  {/* Descriptions completely removed for Photographie, Other Illustrations, and Halloween 2026 */}
                  {filteredItems[selectedItemIdx].category === "Photographie" || 
                   filteredItems[selectedItemIdx].category === "Other Illustrations" || 
                   filteredItems[selectedItemIdx].category === "Halloween 2026" ? null : filteredItems[selectedItemIdx].category === "ICON Collection" ? (
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {language === "FR"
                        ? "« ICON » est une série d'illustrations aux couleurs vives, présentant des portraits de femmes transformées en figures mystiques."
                        : "“ICON” is a vivid series of illustrations presenting portraits of women transformed into mystical figures."}
                    </p>
                  ) : filteredItems[selectedItemIdx].category === "Dessin Manuel" ? (
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {language === "FR"
                        ? "Passionnée par l’univers et l'esthétique de la culture japonaise, j'ai réalisé cette série de dessins manuels avec pour objectif de créer une exposition dédiée à cette culture. Dans cette collection, j'explore et mixe différents médiums et techniques artistiques : la texture du crayon de couleur, les aplats dynamiques au Promarker, la fluidité de l'aquarelle et les touches de Posca."
                        : "Passionate about the universe and aesthetics of Japanese culture, I created this series of hand drawings in order to design an exhibition dedicated to this culture. In this collection, I explore and mix different mediums and artistic techniques: colored pencil textures, dynamic Promarker flats, watercolor fluidity, and Posca highlights."}
                    </p>
                  ) : filteredItems[selectedItemIdx].category === "One Piece" ? (
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {language === "FR"
                        ? "Cette série de dessins s'articule comme une recherche visuelle autour des personnages féminins de l'animé One piece en appliquant les codes esthétiques du Pop Art : aplats de couleurs vives, contrastes saturés et lignes graphiques fortes."
                        : "This series of drawings is structured as a visual research around the female characters of the One Piece anime by applying the aesthetic codes of Pop Art: flat bright colors, saturated contrasts, and strong graphic lines."}
                    </p>
                  ) : filteredItems[selectedItemIdx].description ? (
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {filteredItems[selectedItemIdx].description}
                    </p>
                  ) : null}

                  <div className="space-y-4">
                    <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-2">
                      {language === "FR" ? "Informations Additionnelles" : "Additional Information"}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                      {filteredItems[selectedItemIdx].specs.renderer && (
                        <div>
                          <span className="block text-neutral-500 uppercase">{language === "FR" ? "Médium" : "Medium"}</span>
                          <span className="text-neutral-300">
                            {filteredItems[selectedItemIdx].specs.renderer === "Application Procreate" && language === "EN"
                              ? "Procreate Application"
                              : filteredItems[selectedItemIdx].specs.renderer === "Crayons de couleurs, Promarker, Aquarelle, Posca" && language === "EN"
                              ? "Colored pencils, Promarker, Watercolor, Posca"
                              : filteredItems[selectedItemIdx].specs.renderer}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <span className="block font-mono text-[10px] text-neutral-500 uppercase mb-1.5">
                        {language === "FR" ? "Palette de Couleurs Hex" : "Primary Hex Colors"}
                      </span>
                      <div className="flex gap-2">
                        {filteredItems[selectedItemIdx].specs.palette.map((color, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded border border-neutral-800" style={{ backgroundColor: color }} />
                            <span className="font-mono text-[9px] text-neutral-400">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* ZOOMED IMAGE LIGHTBOX MODAL FOR GALLERY ARTWORKS */}
      {zoomedImage && createPortal(
        <div className="fixed inset-0 z-[70] overflow-hidden flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setZoomedImage(null)}
            className="absolute inset-0 bg-white/95 backdrop-blur-lg cursor-zoom-out"
          ></div>
          
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 z-[80] p-2.5 rounded-full bg-[#fafafa]/95 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 transition border border-neutral-200 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <SafeImage
            src={zoomedImage || ""}
            alt="Zoomed Illustration"
            className="max-w-full max-h-screen object-contain z-10 select-none pointer-events-none rounded-lg shadow-2xl filter saturate-100 border border-neutral-200/50"
            fallbackClassName="p-12 min-h-[300px] rounded-lg"
            fallbackText="Zoomed Illustration"
            theme="light"
          />
        </div>,
        document.body
      )}
    </section>
  );
}
