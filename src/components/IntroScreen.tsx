import React, { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface IntroScreenProps {
  onNavClick: (sectionId: string) => void;
}

export default function IntroScreen({ onNavClick }: IntroScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const [revealed, setRevealed] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [animating, setAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Set animating state to trigger premium calligraphy writing animation sequence on load and replay
  useEffect(() => {
    setAnimating(false);
    const timer = setTimeout(() => {
      setAnimating(true);
    }, 80);
    return () => clearTimeout(timer);
  }, [animationKey]);


  return (
    <div className="logo-container h-screen flex flex-col justify-center items-center relative overflow-hidden select-none">
      {/* Floating Language Switcher for Intro Screen */}
      <div className="absolute top-6 right-6 z-30 flex items-center bg-neutral-900/60 border border-neutral-800/60 rounded-full p-0.5 select-none backdrop-blur-sm">
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

      {/* Background Texture/Depth Elements from Immersive UI */}
      <div className="absolute -z-10 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute -z-10 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent bottom-12 pointer-events-none"></div>

      {/* Peripheral Stats / Detail (Portfolio Style) from Immersive UI */}
      <div className="absolute bottom-10 left-10 text-[9px] text-white opacity-20 uppercase tracking-[0.2em] font-mono hidden sm:block">
        {t("intro.role_left")}
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] text-white opacity-20 uppercase tracking-[0.2em] font-mono hidden sm:block">
        {t("intro.role_right")}
      </div>

      {/* Dynamic Starfield Ambient Backing */}
      <div className="absolute inset-0 bg-transparent pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping [animation-duration:3s]"></div>
        <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse [animation-duration:4s]"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping [animation-duration:5s]"></div>
        <div className="absolute top-2/3 left-4/5 w-1.5 h-1.5 bg-white rounded-full animate-pulse [animation-duration:3.5s]"></div>
      </div>

      <div className="relative w-[95%] max-w-[950px] flex flex-col items-center justify-center text-center z-10">
        {/* Responsive Signature Container inside the logo region */}
        <div className="container max-w-[850px] mx-auto mb-2 px-4">
          <div className="signature relative overflow-hidden w-full h-0 pb-[25.33%]">
            <svg
              ref={svgRef}
              id="Calque_1"
              data-name="Calque 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="115 250 1500 380"
              className="absolute top-0 left-0 w-full h-full"
            >
              <g className={animating ? "animate-signature" : ""}>
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M438.9,455.6c0,0-2.1-17.7,8.1-37.9c16.5-37.9,55.8-63.1,51-75.4c-0.9-1.9-4.8-1.5-4.8-1.5c-4.6,0.3-10.3,3.5-16.9,9.5c-5.5,4.9-11.5,12-18,20.5c-11.1,14.8-19.3,29.5-19.5,29.7c0,0-1,1.9-3,5.5c-2.8,5.5-6,12.4-9.3,20.7c-2.7,6.6-4.8,12.4-7.6,21.7c0,0-10.9,39.7-28.2,40.6c0,0-2.9,0.1-6.3-1.4c-2.4-1-5.4-4.9-5.4-4.9c-7.8-10.3-13.8-34.3,11.5-69c26.1-35.5,64.8-65.4,61.3-72.4c-0.3-0.6-1.1-0.9-1.8-1c-1.9-0.6-5.1-0.5-8.8,0.4c-5.2,1.1-11.7,3.5-19.5,6.8c-4.4,1.8-25.9,13-25.9,13c-25.5,14.1-46,23.4-62.8,28.3c-9.7,2.7-18.3,4.2-25.9,4.2c-5.1,0-9.7-0.6-14.1-2c-4.5-1.2-8.7-4-8.7-4c-2.2-1.8-13.2-11.1-8.8-24c0,0,0.8-2,2.8-3c1.5-0.8,4.4-0.9,6.9,0.6c0,0,2.4,1.1,1,4c-1,2.2-3.4,19,11.7,22.3c2.9,0.6,5.8,0.9,9.1,0.9c19.8,0,47.2-10.2,86.2-31.9c0.6-0.3,13-7.5,26.4-13.3c8.1-3.4,15-5.8,20.5-7c5.8-1.2,10.3-1,13.3,0.5c0.4,0.2,0.8,0.3,1.2,0.6c3.8,2.2,8.5,7.4-0.4,18.9c-4.6,6-33.9,45.6-43.6,60.4c0,0-16.2,25.6-21.9,49.5c0,0-4.4,19.5,2.4,18.3c4.3-1,9-7.6,13.3-19.3c12.6-35.2,23.2-55.6,30-66.6c0.4-0.9,8.8-15.6,19.8-30.1c15.3-20.5,28.2-31.3,38.5-32.1c2.2-0.3,6.6-0.1,9,3c0,0,0.8,0.9,1,1.7c6.4,13.8-22.2,42.4-38.1,72.4c-21.1,40-17.7,47.5-15.1,48.9c1.2-1,2.5-5.1,3.9-8.8c4.5-12.4,12.9-35.4,39.4-68.4c9.3-11.7,18.1-21,26.2-27.7c8.2-6.7,13.6-9.1,16.6-9.9c3.3-0.9,5.5-0.1,6.9,0.8c0.6,0.5,1.2,0.9,1.6,1.5c9.9,12.9-11.8,32.2-27.9,63.7c-18,35.2-9.6,37-9.6,37s9.9,1.5,32.5-35.8c0.6-0.9,1.4-1.3,2.4-1.3c1.2,0,2,1.3,1.4,2.5c-5.4,9-24.9,40.3-37,38.7c0,0-19.9-2-9.1-35.4c9.6-29.2,48.4-53.5,43.8-65.8c-0.3-0.3-0.5-0.6-0.9-0.9c-0.6-0.3-1.5-0.5-2.7-0.2c-7,2-21.1,12.1-40,35.7c-3.4,4.6-18.1,25.5-29.7,51.7c-5.1,12-10.5,30.6-18.9,30.1c-4.2-0.3-6.4-2.9-7.9-6C439.4,460.4,438.9,455.6,438.9,455.6z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M601.2,415.1c-5.4,9-24.9,40.3-37,38.7c0,0-9.6-0.3-6.9-14.8c-0.6,0.8-1.4,1.5-2,2.2c-5.8,6.8-11.1,10.6-15.6,11.8c0,0-1.5,0.3-3.3,0.3c0,0-11.2,0.8-7-19.6c3.7-18.9,24.7-39.3,38.7-37.8c0,0,1.8,0.2,3.2,0.8c1.7,0.8,2.7,2,3.3,2.8c0.3,0.8,0.6,1.5,0.9,2.4c1.2-1.8,2.1-3.2,3-4.2c1.2-1.5,2.9-2.4,4.8-2.4h4.4c1.9,0,3.1,2.2,2.1,3.9c-7.9,12-30.4,47.2-24.7,50.5c0,0,9.9,1.5,32.5-35.8c0.6-0.9,1.3-1.3,2.4-1.3C601.1,412.5,601.8,413.9,601.2,415.1z M560.7,427.7c3-7,6.9-13.8,10.3-19.3c0.5-1.2,1.4-4.8,0.2-6.9c-0.2-0.5-0.5-0.8-0.9-1c-0.6-0.3-5.7-1.8-23.4,23.4c0,0-14.7,21.6-8.7,25c0.3,0.1,1,0.3,1.6,0.1c3.6-1.3,7.9-4.8,12.6-10.2C556.1,434.6,559.1,430.2,560.7,427.7z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M648.8,371c0,1.2-1.1,2.2-2.2,2.2h-13.8c-10.2,16-24,38.7-33,58.2c-4.5,9.4-7.3,16.8-4.8,18.3c0,0,12.3,4.8,36.6-35.8c0.5-0.9,1.4-1.3,2.2-1.3c1.2,0,2,1.3,1.4,2.5c-5.7,10.3-25,40.2-40.9,38.7c0,0-11.7,0-4.3-22.8c6.3-19.3,19.3-41.5,30-57.7h-14.5c-0.1,0-0.1,0-0.3,0c-12.1-0.1-17.2-5.4-14.4-9.3c2.4-3.1,8.5,0.6,8.5,0.6c7.2,3.8,12.9,4.2,14.5,4.2h9c7.5-11.1,13-18.5,13-18.5c1.2-1.5,3-2.4,5-2.4h4.2c2.1,0,3.2,2.2,2,3.9c0,0-4.5,6.8-11.1,17h10.8C647.7,368.7,648.8,369.6,648.8,371z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M692.4,415.1c-5.4,9-24.9,40.3-36.9,38.7c0,0-14-0.5-5.5-22.8c1.6-4.5,7.6-16.3,7.6-16.3c7.9-14.1,6.3-14.5,6.3-14.5c-2.1-2-9,3.6-18.3,18c-9.4,14.5-15.7,33.4-15.7,33.4c-0.3,1-1.7,1.7-2.7,1c-10.5-6.7,0.8-32.1,0.8-32.1c15.1-35.8,39.1-70.2,39.1-70.2c1.2-1.5,3-2.4,5-2.4h4.2c2.1,0,3.2,2.2,2,3.9c-19.6,31-31.9,53.8-40.2,69.9c-3.5,6.8-5.4,12.4-6.6,16.9c4.5-11.8,14.4-29.1,23.4-37.9c3.9-3.9,7.9-6.3,12.9-5.2c14.5,3-1.5,27.4-1.5,27.4c-7.2,12.6-13.2,24.9-9.9,26.8c0,0,9.9,1.5,32.5-35.8c0.5-0.9,1.4-1.3,2.2-1.3C692.3,412.5,693,413.9,692.4,415.1z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M722.1,415.1c-5.4,9-24.9,40.3-36.9,38.7c0,0-13-0.3-4.8-22.8c5.2-14.4,14.8-27.9,18.9-33.3c1.2-1.5,3-2.4,4.8-2.4h4.3c2,0,3.2,2.2,2.1,3.9c-7.8,12-30.3,47.2-24.6,50.5c0,0,9.9,1.5,32.5-35.8c0.5-0.9,1.3-1.3,2.2-1.3C722,412.5,722.9,413.9,722.1,415.1z M704.3,389.4c0-1.6,2.4-3,5.1-3c2.8,0,5.1,1.3,5.1,3c0,1.7-2.2,3-5.1,3C706.7,392.4,704.3,391.1,704.3,389.4z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M716.3,449.7c0,0,12.3,4.8,36.6-35.8c0.6-0.9,1.4-1.3,2.2-1.3c1.4,0,2.1,1.3,1.5,2.5c-5.8,10.3-25,40.2-41.1,38.7c0,0-11.5,0-4.2-22.8c11.2-35.2,45.7-80.7,45.7-80.7c1.2-1.5,3.2-2.4,5-2.4h4.3c2,0,3,2.2,2,3.9c0,0-31,44.8-47.2,79.6C716.7,440.9,713.7,448.2,716.3,449.7z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M783.5,431.4c-4.4,9.4-7.3,16.8-4.8,18.3c0,0,9.9,1.5,32.5-35.8c0.6-0.9,1.4-1.3,2.2-1.3c1.4,0,2.1,1.3,1.5,2.5c-5.4,9-24.9,40.3-37,38.7c0,0-9.2,0-6-16c-0.9,1.2-1.8,2.2-2.8,3.4c-5.9,6.8-11.1,10.6-15.8,11.8c0,0-1.3,0.3-3.1,0.3c0,0-11.2,0.8-7-19.6c3.8-18.9,24.7-39.3,38.7-37.8c0,0,1.8,0.2,3.2,0.8c1.5,0.8,2.4,1.6,3,2.5c14.1-25.9,31.5-48.9,31.5-48.9c1.2-1.5,3.2-2.4,5-2.4h4.3c2,0,3,2.2,2,3.9C830.7,351.8,799.7,396.6,783.5,431.4z M775.1,426.8c2.9-7.5,6.5-15.4,10.5-23.2c0-0.8-0.2-1.5-0.6-2.1c-0.2-0.5-0.6-0.8-0.9-1c-0.6-0.3-5.7-1.8-23.4,23.4c0,0-14.7,21.6-8.7,25c0.3,0.1,1,0.3,1.6,0.1c3.6-1.3,8-4.8,12.6-10.2C770.3,434,773.7,429,775.1,426.8z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M860.6,415.1c-2.8,4.6-9.6,15.4-16.9,24.4c0,0-5.7,7.5-13.8,12.1c-5.2,3-11.7,4.3-17.5,2.1c-7.8-3-10.9-9.3-10.9-15.6c0-8.8,5.4-17.7,5.4-17.7c8.1-14.1,22.9-25.8,33.7-24.6c0,0,1.8,0.2,3.1,0.8c1.7,0.8,2.7,2,3.2,2.8c1,1.8,1.3,4,1,6.9c0,0-1.2,6.6-6.5,12.9c-3.4,4-9.1,8.2-16.6,6.7c0,0-3.6-0.8-4.9-3.1c-0.2,0.3-0.3,0.6-0.6,0.9c-12.7,20.5-3.9,26.1-3.9,26.1c4.6,2.4,9.9,0.6,14.4-2.4c6.3-4.2,11.2-10.6,11.2-10.6c4.4-5.2,9.6-12.6,15.9-22.9c0.5-0.9,1.4-1.3,2.2-1.3C860.4,412.5,861.2,413.9,860.6,415.1z M823.7,417.6c-2,3.2,0.8,4.5,0.8,4.5c1.8,0.9,4.3,0.6,6.3,0c3.6-1.3,6.3-4.2,6.3-4.2c5.1-5.2,6.6-11.2,6.6-11.2c1.5-5.2-0.9-6.3-0.9-6.3C842.1,400.1,837.8,398.7,823.7,417.6z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M905,482.4c-9.1-8.4-9.3-22.9-9.3-23.8c0-15.3,4.8-28.6,14.5-39.7c8.2-9.3,19.9-17.1,34.9-23.1c25.9-10.6,56.5-14.1,77.2-15.7c1.6-0.2,3.3-0.3,5-0.5c3.7-4.5,8.4-9.9,13.9-15.3c8.7-8.4,17.8-15,26.8-19.8c11.2-6,22.5-9,33.4-9c0.3,0,0.5,0,0.6,0c0.8,0,9.7,0,13.6,5.7c2.2,3,2.4,7,0.8,11.7c-3.3,8.8-12,15.7-26.7,20.8c0.8,0.3,1.3,0.5,2,0.8c6.3,2.4,11.2,6.1,14.7,11.4c7.2,10.6,7.6,26.7,1.2,47.7c-4.5,15.1-11.4,27.4-20.1,36.4c-7,7.3-15.4,12.8-24.9,15.9c-7.7,2.5-14.7,3.2-20.1,3.2c-5.7,0-9.4-0.8-9.9-0.8c-16.3-3.5-27.1-11.1-32.1-22.9c-2.7-6.6-3.6-14.7-2.4-23.8c0.9-7,3-14.8,6.3-23.2c5.5-13.8,12.3-24.3,12.8-25c0.3-0.3,2.2-3.4,5-8.1c-1.3,0.2-10.9,0.9-10.9,0.9c-35.5,3.8-54,9.9-65.1,14.4c-7.2,3-13.5,6.3-19.2,10c-10.2,7.6-21.4,20.4-22.8,40.5c-1.5,22.2,17.5,27.3,20.7,26.1c2.2-0.9,3.6,0.3,3.6,0.3c2,1.7,2.5,5.1,1.8,6.9c-1,2.4-3.1,3.3-3.1,3.3c-5.1,2.4-11.2,1-15.9-0.6C908.9,485.6,905,482.4,905,482.4z M1079.4,376.8c-10.2,2.7-22.5,4.8-37.9,6.4c-5.2,7.3-10.5,16-15.6,26.1c0,0-29.8,56.8,1.6,71.8c2.5,1.2,4.8,1.8,8.1,2.2c0.8,0.1,2,0.3,3.3,0.3c2.1,0.2,4.5,0,7.2-0.2c14.5-1.3,37.9-9.4,51.9-50.2c13.9-40.6-3.1-52-12.7-55.2C1083.2,377.6,1079.4,376.8,1079.4,376.8z M1082.1,370.8c8.2-2.2,14.8-5.1,19.8-8.2c5.1-3.4,8.2-7.2,9.9-11.4c1-3.1,1-5.4,0-7.2c-3.2-4.8-12.6-3.5-12.6-3.5c-8.1,0.8-29.8,5.7-53.7,37.2c8.5-1,16-2.2,22.8-3.6C1073.6,373.2,1082.1,370.8,1082.1,370.8z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1189.8,415.1c-5.4,9-24.9,40.3-36.9,38.7c0,0-11.1-0.3-6.3-18.1c-7.7,9.9-16.5,19-23.1,18.1c0,0-13-0.3-4.8-22.8c5.2-14.4,14.8-27.9,18.9-33.3c1.2-1.5,3-2.4,4.8-2.4h4.3c2,0,3.2,2.2,2.1,3.9c-7.8,12-30.3,47.2-24.6,50.5c0,0,8.8,1.3,28.8-30c5.1-9.7,11-18.1,13.9-22c1.2-1.5,3-2.4,4.8-2.4h4.4c1.9,0,3.1,2.2,2.1,3.9c-7.8,12-30.3,47.2-24.6,50.5c0,0,9.9,1.5,32.5-35.8c0.5-0.9,1.4-1.3,2.2-1.3C1189.7,412.5,1190.4,413.9,1189.8,415.1z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1232.3,415.1c-5.4,9-24.9,40.3-36.9,38.7c0,0-13.5-0.5-4.8-22.8c3-7.5,7.7-15.1,12.1-21.3c4.5-6.5-1.8-8.7-5.1-9.5c-4,8.5-8.7,16.3-10.9,20.1c-0.8,1-2.2,1-2.8-0.2c-0.5-0.8-0.5-1.8,0-2.5c4.3-7,7.5-13,10-18c-15-3.2-9.6-13.5-4.2-17.1c5.5-3.6,11.2-2.7,13.5,0.3c2.2,2.7-1.8,10.8-3.9,14.5c9,2.2,19.2,8.4,11.2,19.9c-9.6,14.1-18.3,30.3-14.4,32.4c0,0,9.9,1.5,32.5-35.8c0.5-0.9,1.3-1.3,2.2-1.3C1232.1,412.5,1232.9,413.9,1232.3,415.1z M1195.2,396.5c1.3-3.3,4.3-11.1,3.3-11.4c-1.4-0.3-6.9,1.5-9.6,6.8C1188.9,391.8,1187.3,394.8,1195.2,396.5z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1232.1,449.9c4.5,2.4,9.7,0.6,14.2-2.4c6.3-4.2,11.2-10.6,11.2-10.6c4.3-5.2,9.7-12.6,15.9-22.9c0.6-0.9,1.3-1.3,2.2-1.3c1.3,0,2.1,1.3,1.5,2.5c-2.8,4.6-9.4,15.4-16.9,24.4c0,0-5.7,7.5-13.8,12.1c-5.1,3-11.5,4.3-17.4,2.1c-7.3-2.8-10.5-8.5-10.8-14.4c-0.5-9.1,5.2-18.9,5.2-18.9c7.9-14.1,22.8-25.8,33.6-24.6c0,0,1.8,0.2,3.1,0.8c1.7,0.8,2.7,2,3.3,2.8c1.1,1.8,1.4,4,0.9,6.9c0,0-2,10.5-7,7.9c-3.8-1.8-0.9-5.7-0.9-5.7c0.7-1.3,2.1-2.8,2.7-3.9c2-3.3,0.2-4.3,0.2-4.3c-0.6-0.3-5.7-1.8-23.5,23.4C1223.1,444.3,1232.1,449.9,1232.1,449.9z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1323,415.1c-2.8,4.6-9.6,15.4-16.9,24.4c0,0-5.7,7.5-13.8,12.1c-5.2,3-11.7,4.3-17.5,2.1c-7.8-3-10.9-9.3-10.9-15.6c0-8.8,5.4-17.7,5.4-17.7c8.1-14.1,22.9-25.8,33.7-24.6c0,0,1.8,0.2,3.1,0.8c1.7,0.8,2.7,2,3.2,2.8c1,1.8,1.3,4,1,6.9c0,0-1.2,6.6-6.5,12.9c-3.4,4-9.1,8.2-16.6,6.7c0,0-3.6-0.8-4.9-3.1c-0.2,0.3-0.3,0.6-0.6,0.9c-12.7,20.5-3.9,26.1-3.9,26.1c4.6,2.4,9.9,0.6,14.4-2.4c6.3-4.2,11.2-10.6,11.2-10.6c4.4-5.2,9.6-12.6,15.9-22.9c0.5-0.9,1.4-1.3,2.2-1.3C1322.9,412.5,1323.6,413.9,1323,415.1z M1286.1,417.6c-2,3.2,0.8,4.5,0.8,4.5c1.8,0.9,4.3,0.6,6.3,0c3.6-1.3,6.3-4.2,6.3-4.2c5.1-5.2,6.6-11.2,6.6-11.2c1.5-5.2-0.9-6.3-0.9-6.3C1304.6,400.1,1300.2,398.7,1286.1,417.6z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1381.4,415.1c-5.4,9-24.9,40.3-37,38.7c0,0-9.6-0.3-6.9-14.8c-0.6,0.8-1.4,1.5-2,2.2c-5.8,6.8-11.1,10.6-15.6,11.8c0,0-1.5,0.3-3.3,0.3c0,0-11.2,0.8-7-19.6c3.8-18.9,24.7-39.3,38.7-37.8c0,0,1.8,0.2,3.2,0.8c1.7,0.8,2.7,2,3.3,2.8c0.3,0.8,0.6,1.5,0.9,2.4c1.2-1.8,2.1-3.2,3-4.2c1.2-1.5,2.9-2.4,4.8-2.4h4.4c1.9,0,3.1,2.2,2.1,3.9c-7.9,12-30.4,47.2-24.7,50.5c0,0,9.9,1.5,32.5-35.8c0.6-0.9,1.3-1.3,2.4-1.3C1381.2,412.5,1382,413.9,1381.4,415.1z M1340.9,427.7c3-7,6.9-13.8,10.3-19.3c0.5-1.2,1.4-4.8,0.2-6.9c-0.2-0.5-0.5-0.8-0.9-1c-0.6-0.3-5.7-1.8-23.4,23.4c0,0-14.7,21.6-8.7,25c0.3,0.1,1,0.3,1.7,0.1c3.6-1.3,7.9-4.8,12.6-10.2C1336.2,434.6,1339.2,430.2,1340.9,427.7z"
                />
                <path
                  className={`signature-text select-none ${animating ? "animate-signature" : ""}`}
                  d="M1440.3,415.1c-5.4,9-24.9,40.3-36.9,38.7c0,0-11.1-0.3-6.3-18.1c-7.7,9.9-16.5,19-23.1,18.1c0,0-13-0.3-4.8-22.8c5.2-14.4,14.8-27.9,18.9-33.3c1.2-1.5,3-2.4,4.8-2.4h4.3c2,0,3.2,2.2,2.1,3.9c-7.8,12-30.3,47.2-24.6,50.5c0,0,8.8,1.3,28.8-30c5.1-9.7,11-18.1,13.9-22c1.2-1.5,3-2.4,4.8-2.4h4.4c1.9,0,3.1,2.2,2.1,3.9c-7.8,12-30.3,47.2-24.6,50.5c0,0,9.9,1.5,32.5-35.8c0.5-0.9,1.4-1.3,2.2-1.3C1440.2,412.5,1440.9,413.9,1440.3,415.1z"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Character split animation subtitle displaying Subtitle stacked vertically */}
        <div className="logo-h2 flex flex-col items-center justify-center text-center mt-2 gap-1.5">
          {/* Engineering and design */}
          <div className="flex items-center gap-4 w-full px-8 max-w-md md:max-w-xl">
            <div 
              className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#a3a3c2]/30 transition-all duration-1000 ease-out" 
              style={{ 
                transform: revealed ? "scaleX(1)" : "scaleX(0)", 
                transformOrigin: "right" 
              }}
            />
            <div className="font-sans font-light text-[#a3a3c2] text-xs md:text-sm tracking-widest block uppercase text-opacity-100 whitespace-nowrap flex-shrink-0">
              {"Engineering and design".split("").map((char, index) => {
                const delay = 500 + index * 15;
                return (
                  <span
                    key={index}
                    className="inline-block transition-all duration-350"
                    style={{
                      opacity: revealed ? 0.75 : 0,
                      transform: revealed ? "translateY(0)" : "translateY(5px)",
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </div>
            <div 
              className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#a3a3c2]/30 transition-all duration-1000 ease-out" 
              style={{ 
                transform: revealed ? "scaleX(1)" : "scaleX(0)", 
                transformOrigin: "left" 
              }}
            />
          </div>

          {/* Portfolio 2026 */}
          <div className="font-mono text-[10px] md:text-xs text-rose-400 bg-rose-955/20 border border-rose-500/10 px-2.5 py-0.5 rounded-full tracking-wider uppercase block mt-0.5">
            {"Portfolio 2026".split("").map((char, index) => {
              const delay = 850 + index * 15;
              return (
                <span
                  key={index}
                  className="inline-block transition-all duration-350"
                  style={{
                    opacity: revealed ? 0.9 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(3px)",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Custom Clip Hover Navigation */}
        <nav className="logo-nav select-none flex flex-wrap justify-center gap-1 mt-2">
          <a
            href="#about"
            id="nav-about-link"
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("about");
            }}
          >
            {t("nav.about")}
          </a>
          <a
            href="#projects"
            id="nav-projects-link"
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("projects");
            }}
          >
            {t("nav.projects")}
          </a>
          <a
            href="#blog"
            id="nav-blog-link"
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("blog");
            }}
          >
            {t("nav.skills")}
          </a>
          <a
            href="#gallery"
            id="nav-gallery-link"
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("gallery");
            }}
          >
            {t("nav.gallery")}
          </a>

        </nav>

        {/* Custom Social & Contact Links */}
        <div 
          className="flex items-center gap-6 mt-14 text-xs font-mono tracking-[0.15em] text-neutral-400 select-all"
          style={{
            opacity: revealed ? 0.75 : 0,
            transform: revealed ? "translateY(0)" : "translateY(5px)",
            transitionDelay: "1100ms",
            transitionProperty: "all",
            transitionDuration: "350ms"
          }}
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-rose-400 transition-colors duration-200 border-b border-transparent hover:border-rose-400/30 pb-0.5 cursor-pointer"
          >
            LINKEDIN
          </a>
          <span className="text-neutral-850 select-none">|</span>
          <a
            href="mailto:mathildeourceau@gmail.com"
            className="hover:text-rose-400 transition-colors duration-200 border-b border-transparent hover:border-rose-400/30 pb-0.5 cursor-pointer animate-pulse"
          >
            EMAIL
          </a>
        </div>


      </div>
    </div>
  );
}
