import React, { useState, useEffect, useRef, useMemo } from "react";

interface TypewriterScrambleProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";
  className?: string;
  delay?: number;
  speed?: number; // ms per tick
  scrambleSteps?: number; // how many fake characters to show per letter before locking in
  highlightScramble?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  preserveLayout?: boolean; // prevent text wrapping jumps by rendering ghost letters
  replayOnHover?: boolean;
  onComplete?: () => void;
}

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*+?~";

export default function TypewriterScramble({
  text,
  as: Component = "h2",
  className = "",
  delay = 120,
  speed,
  scrambleSteps = 3,
  highlightScramble = true,
  showCursor = true,
  cursorChar = "_",
  cursorClassName = "text-rose-400 font-mono font-light ml-0.5",
  preserveLayout = true,
  replayOnHover = true,
  onComplete,
}: TypewriterScrambleProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  
  // Adaptive speed: shorter text gets a slightly slower, deliberate typing; longer text types faster so it never lags
  const tickInterval = useMemo(() => {
    if (speed) return speed;
    const len = chars.length;
    if (len <= 10) return 40;
    if (len <= 20) return 32;
    return 24;
  }, [speed, chars.length]);

  // State:
  // resolvedCount: how many characters have locked into the final letter
  // currentScramble: character currently shown at resolvedCount
  // isComplete: whether the entire string has been revealed
  const [resolvedCount, setResolvedCount] = useState(0);
  const [currentScramble, setCurrentScramble] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [playTrigger, setPlayTrigger] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Reset state whenever text or playTrigger changes
    setResolvedCount(0);
    setCurrentScramble("");
    setIsComplete(false);
    setIsTyping(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    let currentResolved = 0;
    let stepCount = 0;

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        // If we reached the end of the text
        if (currentResolved >= chars.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
          setIsTyping(false);
          setCurrentScramble("");
          if (onComplete) onComplete();
          return;
        }

        const targetChar = chars[currentResolved];

        // If target character is whitespace, resolve it immediately without scrambling
        if (targetChar === " " || targetChar === "\t" || targetChar === "\n") {
          currentResolved += 1;
          stepCount = 0;
          setResolvedCount(currentResolved);
          setCurrentScramble("");
          return;
        }

        // False letter scrambling cycle
        if (stepCount < scrambleSteps) {
          // Pick a random glyph that is different from targetChar
          const randIdx = Math.floor(Math.random() * DEFAULT_GLYPHS.length);
          const fakeChar = DEFAULT_GLYPHS[randIdx];
          setCurrentScramble(fakeChar);
          stepCount += 1;
        } else {
          // Lock into the real letter
          currentResolved += 1;
          stepCount = 0;
          setResolvedCount(currentResolved);
          setCurrentScramble("");
        }
      }, tickInterval);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, chars, delay, tickInterval, scrambleSteps, onComplete, playTrigger]);

  const handleMouseEnter = () => {
    if (replayOnHover && isComplete) {
      setPlayTrigger((prev) => prev + 1);
    }
  };

  // Build the rendered elements
  const resolvedPart = chars.slice(0, resolvedCount).join("");
  const ghostPart = preserveLayout ? chars.slice(resolvedCount + (currentScramble ? 1 : 0)) : [];

  return (
    <Component
      className={`inline-block relative select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {/* Resolved letters */}
      <span className="text-white transition-colors duration-150">{resolvedPart}</span>

      {/* Currently scrambling false letter */}
      {currentScramble && (
        <span
          className={`inline-block ${
            highlightScramble
              ? "text-rose-400 font-mono opacity-90 scale-105 transition-transform"
              : "text-neutral-400"
          }`}
        >
          {currentScramble}
        </span>
      )}

      {/* Blinking typewriter caret */}
      {showCursor && (!isComplete || isTyping) && (
        <span className={`inline-block animate-pulse ${cursorClassName}`}>
          {cursorChar}
        </span>
      )}

      {/* Ghost text for layout stability: preserves natural width & prevent word wraps while typing */}
      {preserveLayout && ghostPart.length > 0 && (
        <span className="opacity-0 pointer-events-none select-none inline-block">
          {ghostPart.join("")}
        </span>
      )}
    </Component>
  );
}
