import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { glassCard } from "./PushIn";

// Terminal window: command lines type themselves, then a green "done" line
// pops in. Big mono text so it reads in a phone feed.
export const TerminalCard: React.FC<{ lines: string[]; doneText: string }> = ({
  lines,
  doneText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });

  const LINE1_START = 16;
  const LINE2_START = 70;
  const DONE_AT = 128;
  const typeCount = (start: number, text: string) =>
    Math.max(0, Math.min(text.length, Math.floor((frame - start) * 1.15)));

  const done = spring({
    frame: Math.max(0, frame - DONE_AT),
    fps,
    config: { damping: 13 },
  });

  const row = (text: string, start: number, isLast: boolean) => (
    <div style={{ display: "flex", gap: 14, fontSize: 35, lineHeight: 1.5 }}>
      <span style={{ color: theme.cyan, fontWeight: 700 }}>$</span>
      <span style={{ color: theme.text, fontWeight: 600 }}>
        {text.slice(0, typeCount(start, text))}
        {frame >= start && typeCount(start, text) < text.length && (
          <span style={{ color: theme.cyan }}>▌</span>
        )}
      </span>
      {isLast && <span style={{ width: 1 }} />}
    </div>
  );

  return (
    <div
      style={{
        ...glassCard,
        width: 800,
        padding: "26px 32px 30px",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        transform: `scale(${0.92 + enter * 0.08}) translateY(${(1 - enter) * 34}px)`,
        opacity: enter,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", color: theme.textDim, fontSize: 19, fontWeight: 600 }}>
          Terminal
        </div>
        <div style={{ width: 55 }} />
      </div>
      {row(lines[0], LINE1_START, false)}
      {row(lines[1], LINE2_START, true)}
      <div
        style={{
          marginTop: 16,
          fontSize: 32,
          fontWeight: 700,
          color: theme.cyanBright,
          opacity: done,
          transform: `scale(${0.85 + done * 0.15})`,
          textShadow: "0 0 22px rgba(46,230,168,0.5)",
        }}
      >
        {doneText}
      </div>
    </div>
  );
};
