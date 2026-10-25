import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "FR" | "EN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  FR: {
    // Nav & General
    "nav.about": "Présentation",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.gallery": "Galerie",
    "nav.contact": "Contact",
    "nav.home": "Accueil",
    "nav.back_home": "← Accueil",
    "nav.back_home_mobile": "← Retour à l'accueil",
    "nav.portfolio": "Portfolio",
    "footer.title": "Mathilde Ourceau",
    "footer.subtitle": "Ingénierie & Design",
    "footer.top": "Haut",

    // Intro Screen
    "intro.subtitle": "Engineering and design",
    "intro.portfolio_title": "Portfolio 2026",
    "intro.role_left": "ID: MO_2026_DSGN",
    "intro.role_right": "Loc: Paris, FR / 48.8566° N",

    // About Section
    "about.marker": "01 / ",
    "about.title_prefix": "Présentation",
    "about.title_suffix": "",
    "about.philosophy": "Introduction personnelle & études",
    "about.journey_label": "Mon Cheminement",
    "about.journey_p1": "Depuis mon enfance, j’aime exprimer ma créativité sous différentes formes : le dessin, la peinture, la couture, la photo, la mode…",
    "about.journey_p2": "Mais j’ai toujours eu, aussi, ce besoin de comprendre comment les choses fonctionnent, ce qui les relie, les structure, les rend cohérentes.",
    "about.journey_quote": "Ce mélange-là me suit depuis toujours, et il façonne ma manière de penser et de créer.",
    "about.vision_label": "Vision Critique",
    "about.vision_intro": "C’est pour cette raison que j’ai pensé ce portfolio en deux parties.",
    "about.facet1_title": "Ancrée dans le réel",
    "about.facet1_desc": "des projets concrets, menés avec des équipes, pensés pour des usages, des contextes, des gens.",
    "about.facet2_title": "Plus personnelle",
    "about.facet2_desc": "des illustrations, des recherches en termes d’univers visuels et graphiques.",
    "about.vision_conclusion": "Deux facettes qui ne s’opposent pas, mais qui se complètent, et qui, ensemble, racontent qui je suis.",
    "about.cursus_label": "Cursus & Diplômes",
    "about.milestone1_badge": "Double diplôme",
    "about.milestone1_title": "Double diplôme ingénieur informatique designer",
    "about.milestone1_school": "CY PARIS UNIVERSITÉ",
    "about.milestone1_dept": "École de Design",
    "about.milestone2_badge": "Mention très bien",
    "about.milestone2_title": "Baccalauréat Scientifique (Mathématiques & Physique)",
    "about.milestone2_school": "COLLÈGE ET LYCÉE ECST",

    // Projects Section
    "projects.marker": "02 / ",
    "projects.heading": "Projets",
    "projects.intro": "Imaginer des solutions concrètes centrées sur l'utilisateur dans des contextes réels, souvent en partenariat avec des startups, des associations, des entreprises, etc.",
    "projects.title": "Projets",
    "projects.subtitle": "Imaginer des solutions concrètes centrées sur l'utilisateur dans des contextes réels, souvent en partenariat avec des startups, des associations, des entreprises, etc.",
    "projects.view_details": "Consulter le dossier",
    "projects.role": "RÔLE",
    "projects.timeline": "CALENDRIER",
    "projects.key_skills": "Compétences clés",
    "projects.close": "Fermer",

    // Skills/Blog Section
    "skills.marker": "03 / ",
    "skills.heading": "Compétences",
    "skills.intro": "Acquis durant mon parcours et mes expériences",
    "skills.tab_skills": "Compétences",
    "skills.tab_qualities": "Qualités",
    "skills.view_dossier": "Dossier",
    "skills.identification": "Fiche d'identification",
    "skills.focus_axis": "AXE DE FOCUS",
    "skills.preferred_tools": "OUTILS DE PRÉDILECTION",
    "skills.app_axis": "Axe d'application",
    "skills.vector_rep": "REPRÉSENTATION VECTORIELLE ABSTRAITE",

    // Gallery Section
    "gallery.marker": "04 / ",
    "gallery.heading": "Galerie & Projets personnels",
    "gallery.intro": "Une immersion dans mes illustrations, designs et explorations visuelles.",
    "gallery.details": "Détails techniques",
    "gallery.renderer": "MÉDIUM",
    "gallery.resolution": "FORMAT",
    "gallery.aspect": "PROPORTIONS",
    "gallery.palette": "PALETTE DE COULEURS",
    "gallery.concept": "CODE CONCEPT",
    "gallery.upload_title": "Ajouter à la Galerie collector",
    "gallery.upload_drag_active": "Déposez l'image ici...",
    "gallery.upload_drag_inactive": "Glissez-déposez une image ici ou cliquez pour parcourir",
    "gallery.upload_support": "Prend en charge JPG, PNG, GIF ou SVG (Max. 3 Mo)",
    "gallery.upload_btn": "Téléverser l'image",
    "gallery.upload_err_size": "L'image excède la limite autorisée de 3 Mo.",
    "gallery.upload_err_format": "Seuls les formats JPG, PNG, GIF et SVG sont acceptés.",
    "gallery.upload_form_title": "Titre",
    "gallery.upload_form_desc": "Description",
    "gallery.upload_form_cat": "Catégorie",
    "gallery.upload_form_cancel": "Annuler",
    "gallery.upload_success": "Image ajoutée à votre collection locale !",

    // Contact Section
    "contact.marker": "05 / Demandes & Chat",
    "contact.heading": "Entrer en contact",
    "contact.form_title": "Projet sur mesure",
    "contact.form_subtitle": "Soumettez un cahier des charges rapide pour obtenir une estimation.",
    "contact.form_name": "Votre nom",
    "contact.form_email": "Votre adresse email",
    "contact.form_budget": "Estimation du budget",
    "contact.form_type": "Nature du projet",
    "contact.form_msg": "Description du projet ou message",
    "contact.form_send": "Envoyer la demande",
    "contact.form_sending": "Envoi en cours...",
    "contact.form_success_feedback": "Demande reçue avec succès ! J'analyserai vos détails dans les plus brefs délais.",
    "contact.ai_title": "Assistant IA Mathilde",
    "contact.ai_subtitle": "Posez vos questions sur ses compétences, sa stack ou ses disponibilités.",
    "contact.ai_placeholder": "Posez une question sur Mathilde...",
    "contact.ai_suggestions": "Suggestions de questions :",
    "contact.ai_error": "Erreur : ",
    "contact.welcome": "Bonjour ! Je suis l'assistant virtuel de Mathilde. Posez-moi des questions sur son parcours, ses compétences, sa stack technique, sa disponibilité ou demandez une estimation de projet."
  },
  EN: {
    // Nav & General
    "nav.about": "Presentation",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.back_home": "← Home",
    "nav.back_home_mobile": "← Return to Home",
    "nav.portfolio": "Portfolio",
    "footer.title": "Mathilde Ourceau",
    "footer.subtitle": "Engineering & Design",
    "footer.top": "Top",

    // Intro Screen
    "intro.subtitle": "Engineering and design",
    "intro.portfolio_title": "Portfolio 2026",
    "intro.role_left": "ID: MO_2026_DSGN",
    "intro.role_right": "Loc: Paris, FR / 48.8566° N",

    // About Section
    "about.marker": "01 / ",
    "about.title_prefix": "Presentation",
    "about.title_suffix": "",
    "about.philosophy": "Personal introduction & studies",
    "about.journey_label": "My Journey",
    "about.journey_p1": "Since childhood, I have always loved expressing my creativity in different forms: drawing, painting, sewing, photography, fashion...",
    "about.journey_p2": "But I have also always had this need to understand how things work, what connects them, structures them, and makes them coherent.",
    "about.journey_quote": "This custom mixture has always accompanied me, shaping the way I think and create.",
    "about.vision_label": "Critical Vision",
    "about.vision_intro": "That is why I conceived this portfolio in two separate parts.",
    "about.facet1_title": "Grounded in reality",
    "about.facet1_desc": "concrete projects, led with teams, designed for actual human uses, contexts, and people.",
    "about.facet2_title": "More personal",
    "about.facet2_desc": "illustrations, visual explorations, and graphic design experimentations.",
    "about.vision_conclusion": "Two facets that do not oppose each other, but complement each other, and together tell the story of who I am.",
    "about.cursus_label": "Education & Degrees",
    "about.milestone1_badge": "Double Degree",
    "about.milestone1_title": "Double Degree in Computer Engineering and Design",
    "about.milestone1_school": "CY PARIS UNIVERSITÉ",
    "about.milestone1_dept": "Design School",
    "about.milestone2_badge": "With High Honors",
    "about.milestone2_title": "Scientific Baccalaureate (Mathematics & Physics)",
    "about.milestone2_school": "ECST MIDDLE & HIGH SCHOOL",

    // Projects Section
    "projects.marker": "02 / ",
    "projects.heading": "Projects",
    "projects.intro": "Designing user-centric concrete solutions within real-world contexts, often in partnership with startups, associations, companies, etc.",
    "projects.title": "Projects",
    "projects.subtitle": "Designing user-centric concrete solutions within real-world contexts, often in partnership with startups, associations, companies, etc.",
    "projects.view_details": "Consult Case Study",
    "projects.role": "ROLE",
    "projects.timeline": "TIMELINE",
    "projects.key_skills": "Key Skills",
    "projects.close": "Close",

    // Skills/Blog Section
    "skills.marker": "03 / ",
    "skills.heading": "Skills",
    "skills.intro": "Acquired during my journey and experiences",
    "skills.tab_skills": "Skills",
    "skills.tab_qualities": "Qualities",
    "skills.view_dossier": "Case File",
    "skills.identification": "Identification Card",
    "skills.focus_axis": "FOCUS AXIS",
    "skills.preferred_tools": "PREFERRED TOOLS",
    "skills.app_axis": "Application Area",
    "skills.vector_rep": "ABSTRACT VECTOR REPRESENTATION",

    // Gallery Section
    "gallery.marker": "04 / ",
    "gallery.heading": "Gallery & Personal Projects",
    "gallery.intro": "An immersion into my illustrations, designs, and visual explorations.",
    "gallery.details": "Technical details",
    "gallery.renderer": "MEDIUM",
    "gallery.resolution": "FORMAT",
    "gallery.aspect": "ASPECT RATIO",
    "gallery.palette": "COLOR PALETTE",
    "gallery.concept": "CONCEPT CODE",
    "gallery.upload_title": "Add to Collector's Gallery",
    "gallery.upload_drag_active": "Drop the image here...",
    "gallery.upload_drag_inactive": "Drag and drop an image here or click to browse",
    "gallery.upload_support": "Supports JPG, PNG, GIF or SVG (Max 3MB)",
    "gallery.upload_btn": "Upload Image",
    "gallery.upload_err_size": "This image exceeds the authorized limit of 3MB.",
    "gallery.upload_err_format": "Only JPG, PNG, GIF and SVG formats are accepted.",
    "gallery.upload_form_title": "Title",
    "gallery.upload_form_desc": "Description",
    "gallery.upload_form_cat": "Category",
    "gallery.upload_form_cancel": "Cancel",
    "gallery.upload_success": "Image added to your local collection successfully!",

    // Contact Section
    "contact.marker": "05 / Inquiries & Chat",
    "contact.heading": "Get In Touch",
    "contact.form_title": "Bespoke Project Form",
    "contact.form_subtitle": "Submit a quick specifications sheet to receive an estimate.",
    "contact.form_name": "Your Name",
    "contact.form_email": "Your Email Address",
    "contact.form_budget": "Estimated Budget",
    "contact.form_type": "Project Nature",
    "contact.form_msg": "Project details or message",
    "contact.form_send": "Send Enquiry",
    "contact.form_sending": "Sending in progress...",
    "contact.form_success_feedback": "Enquiry received successfully! I will analyze your details and reply shortly.",
    "contact.ai_title": "Mathilde's AI Assistant",
    "contact.ai_subtitle": "Ask questions about her hybrid stack, availability, or design guidelines.",
    "contact.ai_placeholder": "Ask a question about Mathilde...",
    "contact.ai_suggestions": "Suggested questions:",
    "contact.ai_error": "Error: ",
    "contact.welcome": "Bonjour ! I am Mathilde's digital assistant. Ask me anything about her availability, development stack, design guidelines, or request a custom project estimation."
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "EN" || saved === "FR") return saved;
    return "FR"; // Default to French
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
    // Update body attribute if helpful
    document.documentElement.setAttribute("lang", lang.toLowerCase());
  };

  useEffect(() => {
    document.documentElement.setAttribute("lang", language.toLowerCase());
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations["FR"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
