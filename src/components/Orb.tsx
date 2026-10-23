import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// The glowing cyan "AI" orb — the series' brand mark.
// Springs in with a soft overshoot, rays rotate very slowly, and the glow
// breathes (sin pulse) so the scene never feels frozen.
export const Orb: React.FC<{ size?: number; delay?: number }> = ({
  size = 190,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - delay);

  const pop = spring({ frame: f, fps, config: { damping: 14, mass: 0.9 } });
  const breathe = 1 + Math.sin(f / 16) * 0.035;
  const raySpin = interpolate(f, [0, 3600], [0, 360]);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transform: `scale(${pop * breathe})`,
      }}
    >
      {/* rays */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          inset: -size * 0.22,
          width: size * 1.44,
          height: size * 1.44,
          transform: `rotate(${raySpin}deg)`,
          opacity: 0.55 * pop,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 50 + Math.cos(a) * 36;
          const y1 = 50 + Math.sin(a) * 36;
          const x2 = 50 + Math.cos(a) * 46;
          const y2 = 50 + Math.sin(a) * 46;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={theme.cyan}
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {/* orb body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `radial-gradient(circle at 34% 30%, ${theme.cyanBright} 0%, ${theme.cyan} 55%, #17b985 100%)`,
          boxShadow: `0 0 ${size * 0.35}px ${size * 0.06}px rgba(46,230,168,0.55), inset 0 -${size * 0.08}px ${size * 0.16}px rgba(0,60,40,0.35)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#06231a",
          fontWeight: 800,
          fontSize: size * 0.34,
          letterSpacing: -1,
        }}
      >
        AI
      </div>
    </div>
  );
};
