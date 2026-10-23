import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// The signature frame: peach gradient outside, dark scene inside, and two
// glowing light bars. IMPROVEMENT over the reference: the bars are slim
// (more room for content), they slide in on frame 0, and they keep a slow
// travelling pulse for the whole video instead of sitting static.
export const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // travelling highlight position along the bars (loops every 6s)
  const pulseX = ((frame % 180) / 180) * 140 - 20;

  const bar: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 10,
    background: `linear-gradient(90deg, transparent 0%, ${theme.frameLight} ${pulseX - 18}%, #ffffff ${pulseX}%, ${theme.frameLightHot} ${pulseX + 10}%, ${theme.frameLight} ${pulseX + 26}%, transparent 100%)`,
    boxShadow: `0 0 22px 4px rgba(255,160,80,0.55)`,
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.frameBgTop} 0%, ${theme.frameBgBottom} 100%)`,
        fontFamily: theme.font,
      }}
    >
      {/* scene window */}
      <AbsoluteFill
        style={{
          top: 64,
          bottom: 64,
          left: 0,
          right: 0,
          height: "auto",
          background: `radial-gradient(ellipse 90% 70% at 50% 42%, ${theme.bgGlow} 0%, ${theme.bg} 70%)`,
          overflow: "hidden",
        }}
      >
        {children}
      </AbsoluteFill>
      {/* top + bottom light bars */}
      <div style={{ ...bar, top: 54, transform: `translateX(${(1 - slide) * -100}%)` }} />
      <div style={{ ...bar, bottom: 54, transform: `translateX(${(1 - slide) * 100}%)` }} />
    </AbsoluteFill>
  );
};
