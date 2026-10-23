import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL_FRAMES } from "./data";
import { AutoEditorPromo } from "./AutoEditorPromo";

export const Root: React.FC = () => {
  return (
    <>
      {/* Vertical 9:16 — Reels / Shorts / TikTok */}
      <Composition
        id="AutoEditorPromo"
        component={AutoEditorPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
