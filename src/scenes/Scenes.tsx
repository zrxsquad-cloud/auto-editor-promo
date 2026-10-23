import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { video } from "../data";
import { theme } from "../theme";
import { Orb } from "../components/Orb";
import { KineticWords } from "../components/KineticWords";
import { PushIn } from "../components/PushIn";
import { Checklist } from "../components/Checklist";
import { TimelineCut } from "../components/TimelineCut";
import { TerminalCard } from "../components/TerminalCard";

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        fontSize: 56,
        fontWeight: 800,
        color: theme.text,
        letterSpacing: -0.5,
        opacity: s,
        transform: `translateY(${(1 - s) * 22}px)`,
        textAlign: "center",
        maxWidth: 900,
      }}
    >
      {children}
    </div>
  );
};

export const HookScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
      <Orb size={230} />
      <KineticWords words={video.hook.words} fontSize={96} highlightLast />
    </div>
  </PushIn>
);

export const TimelineScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
      <Heading>{video.timeline.heading}</Heading>
      <TimelineCut before={video.timeline.before} after={video.timeline.after} />
    </div>
  </PushIn>
);

export const HowScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
      <Heading>{video.how.heading}</Heading>
      <TerminalCard lines={video.how.lines} doneText={video.how.doneText} />
    </div>
  </PushIn>
);

export const BenefitsScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
      <Heading>{video.benefits.heading}</Heading>
      <Checklist items={video.benefits.items} />
    </div>
  </PushIn>
);

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - 34), fps, config: { damping: 14 } });
  return (
    <PushIn>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        <Orb size={170} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, fontWeight: 800, color: theme.text }}>{video.cta.line1}</div>
          <div style={{ fontSize: 72, fontWeight: 800, color: theme.cyan }}>{video.cta.line2}</div>
        </div>
        <div
          style={{
            padding: "18px 38px",
            borderRadius: 999,
            border: `1.5px solid ${theme.glassBorder}`,
            background: theme.glass,
            color: theme.text,
            fontSize: 32,
            fontWeight: 650,
            opacity: s,
            transform: `scale(${0.85 + s * 0.15})`,
          }}
        >
          {video.cta.follow} 👆
        </div>
      </div>
    </PushIn>
  );
};
