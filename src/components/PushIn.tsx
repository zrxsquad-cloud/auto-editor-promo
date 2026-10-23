import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Wraps a whole scene with a slow cinematic push-in (scale 1 → 1.06) so no
// scene ever sits perfectly still — the reference video's main weakness.
export const PushIn: React.FC<{ children: React.ReactNode; from?: number; to?: number }> = ({
  children,
  from = 1,
  to = 1.06,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 400], [from, to], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export const glassCard: React.CSSProperties = {
  background: theme.glass,
  border: `1.5px solid ${theme.glassBorder}`,
  borderRadius: 26,
  boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
  backdropFilter: "blur(6px)",
};
