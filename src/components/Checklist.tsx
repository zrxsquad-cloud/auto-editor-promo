import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { glassCard } from "./PushIn";

// The plan/result card. IMPROVEMENT over the reference (which showed empty
// skeleton lines): real items slide in and each checkmark DRAWS itself
// (SVG stroke animation) as the voiceover reaches it.
export const Checklist: React.FC<{ items: string[]; width?: number }> = ({
  items,
  width = 780,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });

  return (
    <div
      style={{
        ...glassCard,
        width,
        padding: "30px 34px",
        transform: `scale(${0.92 + enter * 0.08}) translateY(${(1 - enter) * 34}px)`,
        opacity: enter,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      {items.map((item, i) => {
        const start = 20 + i * 34;
        const rowIn = spring({
          frame: Math.max(0, frame - start),
          fps,
          config: { damping: 15 },
        });
        const draw = interpolate(frame, [start + 8, start + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              opacity: rowIn,
              transform: `translateX(${(1 - rowIn) * -30}px)`,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="rgba(46,230,168,0.14)" stroke={theme.cyan} strokeWidth="2" />
              <path
                d="M12.5 20.5 L17.8 25.5 L27.5 14.5"
                fill="none"
                stroke={theme.cyanBright}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
              />
            </svg>
            <div style={{ color: theme.text, fontSize: 35, fontWeight: 600 }}>{item}</div>
          </div>
        );
      })}
    </div>
  );
};
