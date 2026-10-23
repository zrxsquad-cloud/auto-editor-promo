import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { HAS_VOICEOVER, TRANSITION_FRAMES, video } from "./data";
import { Frame } from "./components/Frame";
import { BenefitsScene, CtaScene, HookScene, HowScene, TimelineScene } from "./scenes/Scenes";

const timing = () => linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const AutoEditorPromo: React.FC = () => {
  return (
    <Frame>
      {HAS_VOICEOVER && <Audio src={staticFile("audio/voiceover.mp3")} />}
      <AbsoluteFill>
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={video.hook.durationInFrames}>
            <HookScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing()} />
          <TransitionSeries.Sequence durationInFrames={video.timeline.durationInFrames}>
            <TimelineScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing()} />
          <TransitionSeries.Sequence durationInFrames={video.how.durationInFrames}>
            <HowScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing()} />
          <TransitionSeries.Sequence durationInFrames={video.benefits.durationInFrames}>
            <BenefitsScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing()} />
          <TransitionSeries.Sequence durationInFrames={video.cta.durationInFrames}>
            <CtaScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </Frame>
  );
};
