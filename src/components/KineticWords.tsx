import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// Kinetic typography: words pop in one by one with a spring, synced to the
// voiceover beats (stagger frames apart). The last word can glow cyan.
export const KineticWords: React.FC<{
  words: string[];
  fontSize?: number;
  stagger?: number;
  startDelay?: number;
  highlightLast?: boolean;
}> = ({ words, fontSize = 92, stagger = 13, startDelay = 0, highlightLast = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: fontSize * 0.28,
        justifyContent: "center",
        maxWidth: 880,
      }}
    >
      {words.map((w, i) => {
        const f = Math.max(0, frame - startDelay - i * stagger);
        const s = spring({ frame: f, fps, config: { damping: 13, mass: 0.8 } });
        const isHi = highlightLast && i === words.length - 1;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `scale(${0.6 + s * 0.4}) translateY(${(1 - s) * 26}px)`,
              opacity: s,
              fontSize,
              fontWeight: 800,
              color: isHi ? theme.cyan : theme.text,
              textShadow: isHi ? `0 0 34px rgba(46,230,168,0.5)` : "none",
              letterSpacing: -1,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
