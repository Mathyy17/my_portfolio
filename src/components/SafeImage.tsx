import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";

export const IMAGE_FALLBACK_MAP: Record<string, string> = {};

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackTitle?: string;
  fallbackText?: string;
  fallbackSubtitle?: string;
  fallbackClassName?: string;
  fallbackTheme?: "violet" | "rose" | "amber" | "neutral" | "emerald" | "blue";
  theme?: "light" | "dark" | string;
  minPlaceholderHeight?: string;
  hideLabel?: boolean;
}

const normalizeUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }
  const base = ((import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || "/").replace(/\/$/, "");
  let cleanUrl = url;
  if (url.startsWith("/images/")) {
    cleanUrl = `${base}${url}`;
  }
  try {
    return encodeURI(decodeURI(cleanUrl));
  } catch {
    return cleanUrl;
  }
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = "Image",
  className = "",
  style,
  onClick,
  fallbackSrc,
  fallbackTitle,
  fallbackText,
  fallbackSubtitle,
  fallbackClassName,
  fallbackTheme = "neutral",
  theme,
  minPlaceholderHeight = "min-h-[160px]",
  hideLabel = false,
  loading = "lazy",
  decoding = "async",
  ...rest
}) => {
  const displayTitle = fallbackTitle || fallbackText || alt;
  const initialResolved = normalizeUrl(src || fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(initialResolved);
  const [hasError, setHasError] = useState(false);
  const [attemptedCasing, setAttemptedCasing] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(normalizeUrl(src || fallbackSrc));
    setHasError(false);
    setAttemptedCasing(false);
    setAttemptedFallback(false);
  }, [src, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If not yet attempted, try toggling uppercase/lowercase extension (.png <-> .PNG, .jpg <-> .JPG)
    if (!attemptedCasing && currentSrc) {
      setAttemptedCasing(true);
      if (currentSrc.endsWith(".png")) {
        setCurrentSrc(currentSrc.slice(0, -4) + ".PNG");
        return;
      } else if (currentSrc.endsWith(".PNG")) {
        setCurrentSrc(currentSrc.slice(0, -4) + ".png");
        return;
      } else if (currentSrc.endsWith(".jpg")) {
        setCurrentSrc(currentSrc.slice(0, -4) + ".JPG");
        return;
      } else if (currentSrc.endsWith(".JPG")) {
        setCurrentSrc(currentSrc.slice(0, -4) + ".jpg");
        return;
      }
    }

    if (fallbackSrc && !attemptedFallback && normalizeUrl(fallbackSrc) !== currentSrc) {
      setAttemptedFallback(true);
      setCurrentSrc(normalizeUrl(fallbackSrc));
    } else {
      setHasError(true);
      if (rest.onError) {
        rest.onError(e);
      }
    }
  };

  const isLight = theme === "light";
  const themeStyles = isLight
    ? {
        bg: "bg-white/95 border-neutral-200 text-neutral-800 shadow-sm",
        badge: "border-neutral-300 text-neutral-600 bg-neutral-100",
        accent: "text-neutral-500",
        text: "text-neutral-900",
      }
    : {
        violet: {
          bg: "bg-gradient-to-br from-neutral-900 via-violet-950/30 to-neutral-950 border-violet-500/30 text-violet-300",
          badge: "border-violet-500/40 text-violet-400 bg-violet-950/60",
          accent: "text-violet-400",
          text: "text-white",
        },
        rose: {
          bg: "bg-gradient-to-br from-neutral-900 via-rose-950/30 to-neutral-950 border-rose-500/30 text-rose-300",
          badge: "border-rose-500/40 text-rose-400 bg-rose-950/60",
          accent: "text-rose-400",
          text: "text-white",
        },
        amber: {
          bg: "bg-gradient-to-br from-neutral-900 via-amber-950/30 to-neutral-950 border-amber-500/30 text-amber-300",
          badge: "border-amber-500/40 text-amber-400 bg-amber-950/60",
          accent: "text-amber-400",
          text: "text-white",
        },
        emerald: {
          bg: "bg-gradient-to-br from-neutral-900 via-emerald-950/30 to-neutral-950 border-emerald-500/30 text-emerald-300",
          badge: "border-emerald-500/40 text-emerald-400 bg-emerald-950/60",
          accent: "text-emerald-400",
          text: "text-white",
        },
        blue: {
          bg: "bg-gradient-to-br from-neutral-900 via-blue-950/30 to-neutral-950 border-blue-500/30 text-blue-300",
          badge: "border-blue-500/40 text-blue-400 bg-blue-950/60",
          accent: "text-blue-400",
          text: "text-white",
        },
        neutral: {
          bg: "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-neutral-800 text-neutral-400",
          badge: "border-neutral-700 text-neutral-400 bg-neutral-900/80",
          accent: "text-neutral-400",
          text: "text-white",
        },
      }[fallbackTheme];

  if (hasError || !currentSrc) {
    return (
      <div
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center p-6 text-center select-none rounded-xl border transition-all duration-300 ${minPlaceholderHeight} ${themeStyles.bg} ${fallbackClassName || ""} ${className.replace(/object-\S+/g, "").replace(/h-auto/g, "")}`}
        style={style}
        role="img"
        aria-label={alt || displayTitle || "Image Visual"}
      >
        <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-2.5 max-w-[85%]">
          <div className="p-2.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm shadow-inner">
            <Layers className={`w-5 h-5 ${themeStyles.accent}`} />
          </div>

          {!hideLabel && (
            <div className="space-y-1">
              <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border backdrop-blur-sm font-semibold ${themeStyles.badge}`}>
                {fallbackSubtitle || "[ VISUEL PROJET ]"}
              </span>

              <p className={`font-display font-medium text-xs sm:text-sm tracking-tight leading-snug line-clamp-2 ${themeStyles.text}`}>
                {displayTitle}
              </p>
            </div>
          )}

          {!hideLabel && onClick && (
            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-400 mt-1 opacity-70">
              Cliquer pour consulter
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      onError={handleError}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
};

export default SafeImage;
