// ── auto-editor promo — all on-screen text lives here ───────────────────────
// Facts verified live from the GitHub API on 2026-10-24:
// WyattBlue/auto-editor — 5,605 stars, Unlicense, "Effort free video editing!"
// Total ≈ 900 frames @30fps = 30.0s

export const HAS_VOICEOVER = true; // set true after adding public/audio/voiceover.mp3

export const video = {
  hook: {
    words: ["Cut", "every", "silence.", "Automatically."],
    durationInFrames: 108,
  },
  timeline: {
    heading: "Your raw video is full of dead air",
    before: "2:00:00",
    after: "0:38:24",
    durationInFrames: 180,
  },
  how: {
    heading: "Two commands. That's it.",
    lines: ["pip install auto-editor", "auto-editor video.mp4"],
    doneText: "✓ Done — every silence is gone",
    durationInFrames: 170,
  },
  benefits: {
    heading: "Why editors love it",
    items: [
      "100% free — Unlicense, no catch",
      "5,600+ stars on GitHub",
      "Hours of cutting done in minutes",
    ],
    durationInFrames: 249,
  },
  cta: {
    line1: "Edit smarter.",
    line2: "Not longer.",
    follow: "Follow for free editor tools",
    durationInFrames: 158,
  },
};

export const TRANSITION_FRAMES = 12;

export const TOTAL_FRAMES =
  video.hook.durationInFrames +
  video.timeline.durationInFrames +
  video.how.durationInFrames +
  video.benefits.durationInFrames +
  video.cta.durationInFrames -
  4 * TRANSITION_FRAMES;
