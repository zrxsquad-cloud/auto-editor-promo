# AI Tips Motion Graphics — Remotion Template

তুমি যে ভিডিওটা পাঠালে (ChatGPT prompt tip, teal + orange style) — সেটারই
একটা **আরো সুন্দর, polished version** এই template-এ বানানো। একই design,
কিন্তু improvements সহ। আর এটা template — প্রতিটা নতুন ভিডিওতে শুধু
লেখা বদলালেই নতুন ভিডিও ready।

## GitHub Codespace দিয়ে render (PC তে কিছু install ছাড়া)

Repo টা GitHub-এ থাকলে:

1. Repo পেজে সবুজ **Code** button → **Codespaces** tab → **Create codespace on main**
2. Codespace তৈরি হতে ২–৩ মিনিট লাগবে — সব dependency (Node, Chrome,
   ffmpeg) auto install হয়ে যাবে (`.devcontainer` setup দেওয়া আছে)
3. নিচের terminal-এ লিখো: `npm run render`
4. তৈরি ভিডিও: `out/prompt-tip.mp4` — ফাইলে right-click → **Download**

Machine বাছাই: Codespace তৈরির সময় 4-core নিলে render দ্রুত হবে।
Free account-এ মাসে ~60 ঘণ্টা (4-core) পাওয়া যায় — এই ভিডিও render
হতে লাগে কয়েক মিনিট মাত্র।

Live preview চাইলে Codespace-এর terminal-এ `npm run studio` — browser-এই
Remotion Studio খুলবে।

## নিজের PC তে render (৩টা command)

```bash
npm install
npm run studio     # browser-এ live preview — text বদলে সাথে সাথে দেখো
npm run render     # out/prompt-tip.mp4 তৈরি হবে (1:1 square)
```

Vertical (Reels/Shorts) version: `npm run render-vertical`

## Sample ভিডিও

`sample/prompt-tip-sample.mp4` — এই template দিয়ে বানানো finished ভিডিও
(27.4s, 1080×1080)। আগে এটা দেখো, তারপর নিজের text বসাও।

## নিজের ভিডিও বানাতে হলে শুধু এই ফাইলটা edit করো

**`src/data.ts`** — সব লেখা এখানে:
- `hook.words` — প্রথম scene-এর kinetic words
- `demo.promptText` — ChatGPT window-তে যেটা type হবে
- `result.items` — checklist-এর ৩টা point
- `rule.nodes` — goal/audience card দুটো
- `cta` — শেষের লাইন + follow text
- প্রতিটা scene-এর `durationInFrames` (30 frame = 1 সেকেন্ড)

## Voiceover যোগ করা

1. তোমার voiceover MP3 টা রাখো: `public/audio/voiceover.mp3`
2. `src/data.ts`-তে `HAS_VOICEOVER = true` করো
3. Scene-এর duration গুলো voiceover-এর timing অনুযায়ী মেলাও

## Reference-এর চেয়ে যা যা ভালো করা হয়েছে

1. **Frame slim + animated** — উপরে-নিচের light bar এখন পাতলা, ভেতরে
   ঢোকে slide হয়ে, আর পুরো ভিডিওতে একটা আলোর pulse চলতে থাকে
   (আগে জায়গা খেত ~25%, এখন content বড়)
2. **প্রতিটা scene-এ slow zoom (push-in)** — কিছুই পুরোপুরি স্থির না
3. **Checklist-এ আসল লেখা + নিজে আঁকা checkmark animation**
   (reference-এ শুধু ফাঁকা line ছিল)
4. **বড় text** — typing scene-এর লেখা phone feed-এও পড়া যায়
5. **Smooth transition** — hard cut-এর বদলে fade/slide, সব scene-এ
   একই spring motion language
6. **Orb জীবন্ত** — spring দিয়ে ঢোকে, rays ধীরে ঘোরে, glow "শ্বাস" নেয়

## Structure

- `src/data.ts` — সব text + timing (শুধু এটাই edit করলেই চলে)
- `src/theme.ts` — রঙ (cyan, teal, orange frame)
- `src/components/` — Frame, Orb, ChatWindow, Checklist, NodeDiagram,
  KineticWords, PushIn
- `src/scenes/Scenes.tsx` — ৫টা scene
- `src/PromptTip.tsx` — scene গুলো জোড়া + transition
- Compositions: `PromptTip` (1080×1080) আর `PromptTipVertical` (1080×1920)

## নতুন tip-এর জন্য নতুন ভিডিও

data.ts-তে text বদলাও → render। চাইলে Root.tsx-এ নতুন Composition
যোগ করে একই component গুলো দিয়ে সম্পূর্ণ নতুন scene-ও বানানো যায়।
