import React, { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";
import GallerySection from "./components/GallerySection";
import CustomCursor from "./components/CustomCursor";
import { Sparkles, Terminal, Activity, ArrowRight, ArrowUp, Menu, X, User } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUnlocked = activeSection !== null;

  // Set initial overflow body classes to ensure proper scrolling
  useEffect(() => {
    if (activeSection === "about") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else if (isUnlocked) {
      document.body.classList.remove("portfolio-body");
      document.body.classList.add("portfolio-unlocked");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    } else {
      document.body.classList.add("portfolio-body");
      document.body.classList.remove("portfolio-unlocked");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isUnlocked, activeSection]);

  // Navigate smooth action helper that sets the active section instantly and resets scrolling position
  const navigateToSection = (sectionId: string | null) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  // Register a window-level navigator so nested components can seamlessly prompt page changes
  useEffect(() => {
    (window as any).navigateToSection = (sectionId: string | null) => {
      navigateToSection(sectionId);
    };
    return () => {
      delete (window as any).navigateToSection;
    };
  }, []);



  return (
    <div className={`min-h-screen text-[#f1f5f9] font-sans antialiased selection:bg-rose-500/25`}>
      
      {/* High-fidelity responsive precision custom cursor */}
      <CustomCursor />
      
      {/* Immersive Starfield Backdrop from sinful_9361 */}
      <div className="stars-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      {/* Dynamic Background Noise / Particles Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-50"></div>

      {/* Dynamic Sticky Header shown only when activeSection is set */}
      {activeSection && (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/50 border-b border-neutral-900/40 animate-fade-in">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo/Home link */}
            <div 
              onClick={() => navigateToSection(null)} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="font-sans font-medium text-white text-sm md:text-base tracking-wider group-hover:text-rose-400 transition-colors flex items-center gap-2">
                Portfolio <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full font-mono border border-rose-500/20">2026</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.12em] uppercase">
              <button
                onClick={() => navigateToSection("about")}
                className={`py-1 hover:text-white transition-all cursor-pointer relative ${
                  activeSection === "about" ? "text-rose-400 font-medium" : "text-neutral-400"
                }`}
              >
                {t("nav.about")}
                {activeSection === "about" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-500 animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => navigateToSection("projects")}
                className={`py-1 hover:text-white transition-all cursor-pointer relative ${
                  activeSection === "projects" ? "text-rose-400 font-medium" : "text-neutral-400"
                }`}
              >
                {t("nav.projects")}
                {activeSection === "projects" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-500 animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => navigateToSection("blog")}
                className={`py-1 hover:text-white transition-all cursor-pointer relative ${
                  activeSection === "blog" ? "text-rose-400 font-medium" : "text-neutral-400"
                }`}
              >
                {t("nav.skills")}
                {activeSection === "blog" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-500 animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => navigateToSection("gallery")}
                className={`py-1 hover:text-white transition-all cursor-pointer relative ${
                  activeSection === "gallery" ? "text-rose-400 font-medium" : "text-neutral-400"
                }`}
              >
                {t("nav.gallery")}
                {activeSection === "gallery" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-500 animate-pulse"></span>
                )}
              </button>

              
              <span className="text-neutral-800">|</span>
              
              <button
                onClick={() => navigateToSection(null)}
                className="text-neutral-500 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
              >
                {t("nav.back_home")}
              </button>

              <span className="text-neutral-800">|</span>

              {/* Language Switcher */}
              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-0.5 select-none shrink-0">
                <button 
                  onClick={() => setLanguage("FR")}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-full transition-all cursor-pointer ${language === "FR" ? "bg-rose-500 text-white font-semibold" : "text-neutral-400 hover:text-white"}`}
                >
                  FR
                </button>
                <button 
                  onClick={() => setLanguage("EN")}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-full transition-all cursor-pointer ${language === "EN" ? "bg-rose-500 text-white font-semibold" : "text-neutral-400 hover:text-white"}`}
                >
                  EN
                </button>
              </div>

            </nav>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-400 hover:text-white p-2 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-neutral-900 bg-black/95 backdrop-blur-lg px-6 py-6 space-y-4 flex flex-col uppercase font-mono tracking-[0.1em] text-xs">
              <button
                onClick={() => navigateToSection("about")}
                className={`text-left py-2 hover:text-white transition cursor-pointer ${
                  activeSection === "about" ? "text-rose-400" : "text-neutral-400"
                }`}
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => navigateToSection("projects")}
                className={`text-left py-2 hover:text-white transition cursor-pointer ${
                  activeSection === "projects" ? "text-rose-400" : "text-neutral-400"
                }`}
              >
                {t("nav.projects")}
              </button>
              <button
                onClick={() => navigateToSection("blog")}
                className={`text-left py-2 hover:text-white transition cursor-pointer ${
                  activeSection === "blog" ? "text-rose-400" : "text-neutral-400"
                }`}
              >
                {t("nav.skills")}
              </button>
              <button
                onClick={() => navigateToSection("gallery")}
                className={`text-left py-2 hover:text-white transition cursor-pointer ${
                  activeSection === "gallery" ? "text-rose-400" : "text-neutral-400"
                }`}
              >
                {t("nav.gallery")}
              </button>

              <div className="h-[1px] bg-neutral-900 my-2"></div>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-3 py-2">
                <span className="text-neutral-500 font-mono text-[10px]">LANG:</span>
                <div className="flex bg-neutral-900 border border-neutral-800 rounded-full p-0.5 select-none">
                  <button 
                    onClick={() => setLanguage("FR")}
                    className={`px-3 py-1 text-[10px] font-mono tracking-wider rounded-full transition-all cursor-pointer ${language === "FR" ? "bg-rose-500 text-white font-semibold" : "text-neutral-400 hover:text-white"}`}
                  >
                    FR
                  </button>
                  <button 
                    onClick={() => setLanguage("EN")}
                    className={`px-3 py-1 text-[10px] font-mono tracking-wider rounded-full transition-all cursor-pointer ${language === "EN" ? "bg-rose-500 text-white font-semibold" : "text-neutral-400 hover:text-white"}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-neutral-900 my-1"></div>

              <button
                onClick={() => navigateToSection(null)}
                className="text-left py-2 text-neutral-500 hover:text-white transition cursor-pointer"
              >
                {t("nav.back_home_mobile")}
              </button>
            </div>
          )}
        </header>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <main className="relative">
        
        {/* Splash View Hero Screen */}
        {!activeSection && (
          <IntroScreen
            onNavClick={navigateToSection}
          />
        )}

        {/* Portfolio Body (renders ONLY the active section for a clean single-view tab layout) */}
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full flex flex-col justify-between"
            >
              <div className="min-h-[calc(100vh-14rem)]">
                {activeSection === "about" && <AboutSection />}
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "blog" && <BlogSection />}
                {activeSection === "gallery" && <GallerySection />}
              </div>

              {/* Elegant Footer block */}
              {activeSection !== "about" && (
                <footer className="py-16 border-t border-neutral-900 bg-[#0f0f15]/40 text-neutral-500 font-mono text-xs select-all mt-12">
                  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-neutral-400 font-display font-medium text-sm">{t("footer.title")}</p>
                      <p>{t("footer.subtitle")}</p>
                    </div>

                    <div className="flex gap-4 flex-wrap justify-center">
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LINKEDIN</a>
                      <span className="text-neutral-800">|</span>
                      <a href="mailto:mathildeourceau@gmail.com" className="hover:text-white transition">EMAIL</a>
                    </div>

                    <button
                      id="footer-scroll-top"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition bg-neutral-900/50 cursor-pointer text-xs"
                    >
                      {t("footer.top")}
                      <ArrowUp className="w-3 h-3" />
                    </button>
                  </div>
                </footer>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
}
