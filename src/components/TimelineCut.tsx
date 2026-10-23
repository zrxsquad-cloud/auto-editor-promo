import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { glassCard } from "./PushIn";

// Editing-timeline mock: waveform blocks, the grey "silence" blocks get
// marked, shrink away, and the good parts slide together — the whole video
// in one animation. A counter shows 2:00:00 collapsing to 0:38:24.
const SEGMENTS: { w: number; silent?: boolean; h: number }[] = [
  { w: 86, h: 44 }, { w: 60, silent: true, h: 10 }, { w: 110, h: 58 },
  { w: 44, silent: true, h: 8 }, { w: 95, h: 50 }, { w: 74, silent: true, h: 12 },
  { w: 120, h: 62 }, { w: 52, silent: true, h: 9 }, { w: 88, h: 46 },
  { w: 66, silent: true, h: 11 }, { w: 102, h: 54 },
];

export const TimelineCut: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const frame = useCurrentFrame();

  // phases: 0-40 settle · 45-85 silent blocks flash · 90-150 they shrink out
  const shrink = interpolate(frame, [90, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash = frame > 45 && frame < 90 ? 0.55 + Math.sin(frame / 3) * 0.3 : 0;
  const counterT = interpolate(frame, [95, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // interpolate the duration counter numerically (seconds)
  const totalSec = Math.round(7200 + (2304 - 7200) * counterT);
  const hh = Math.floor(totalSec / 3600);
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  const counter = counterT === 0 ? before : counterT === 1 ? after : `${hh}:${mm}:${ss}`;

  return (
    <div style={{ ...glassCard, width: 820, padding: "34px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 92 }}>
        {SEGMENTS.map((s, i) => {
          const w = s.silent ? s.w * shrink : s.w;
          if (s.silent && shrink === 0) return null;
          return (
            <div
              key={i}
              style={{
                width: w,
                height: s.h,
                borderRadius: 5,
                background: s.silent
                  ? `rgba(255,92,92,${0.35 + flash})`
                  : "rgba(46,230,168,0.75)",
                boxShadow: s.silent && flash > 0 ? "0 0 14px rgba(255,92,92,0.6)" : "none",
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          marginTop: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: theme.textDim, fontSize: 24, fontWeight: 600 }}>
          {counterT < 1 ? "Raw footage" : "After auto-editor"}
        </span>
        <span
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: counterT === 1 ? theme.cyan : theme.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {counter}
        </span>
      </div>
    </div>
  );
};
