import { useEffect, useState } from 'react';
import Lanyard from './Lanyard';

// Card face dimensions — portrait, roughly matches the card GLB's UV aspect ratio
const CARD_W = 512;
const CARD_H = 756;

// Portfolio color tokens (must match global.css @theme values)
const C = {
  bg:      '#F5F0E8',
  surface: '#EDE7D9',
  text:    '#1A1714',
  muted:   '#8C7E6E',
  accent:  '#C94A2A',
  green:   '#2A4A3E',
};

async function generateCardTexture(): Promise<string> {
  // Wait for Fraunces + DM Sans (loaded in Layout.astro via Google Fonts)
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width  = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d')!;

  // ── Background ──────────────────────────────────────────────────────────────
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // ── Top accent strip ────────────────────────────────────────────────────────
  const STRIP_H = 84;
  ctx.fillStyle = C.accent;
  ctx.fillRect(0, 0, CARD_W, STRIP_H);

  // Strip label
  ctx.save();
  ctx.fillStyle = 'rgba(245,240,232,0.65)';
  ctx.font = '400 10px "DM Sans"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Manual letter-spacing by spacing each char (canvas letterSpacing support is uneven)
  const label = 'IOT  ENGINEERING   ·   PORTFOLIO';
  ctx.fillText(label, CARD_W / 2, STRIP_H / 2);
  ctx.restore();

  // ── Monogram circle ─────────────────────────────────────────────────────────
  const MONO_R  = 42;
  const MONO_CX = CARD_W / 2;
  const MONO_CY = STRIP_H + 72;

  ctx.beginPath();
  ctx.arc(MONO_CX, MONO_CY, MONO_R, 0, Math.PI * 2);
  ctx.fillStyle = C.green;
  ctx.fill();

  ctx.save();
  ctx.fillStyle = C.bg;
  ctx.font = '300 38px "Fraunces"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', MONO_CX, MONO_CY + 2);
  ctx.restore();

  // ── Name ────────────────────────────────────────────────────────────────────
  const NAME_Y = MONO_CY + MONO_R + 56;
  ctx.save();
  ctx.fillStyle = C.text;
  ctx.font = '300 54px "Fraunces"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Huzaifa', CARD_W / 2, NAME_Y);
  ctx.restore();

  // ── Title ───────────────────────────────────────────────────────────────────
  const TITLE_Y = NAME_Y + 36;
  ctx.save();
  ctx.fillStyle = C.muted;
  ctx.font = '400 17px "DM Sans"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('IoT Engineering Student', CARD_W / 2, TITLE_Y);
  ctx.restore();

  // ── Separator ───────────────────────────────────────────────────────────────
  const SEP_Y = TITLE_Y + 34;
  ctx.beginPath();
  ctx.moveTo(64, SEP_Y);
  ctx.lineTo(CARD_W - 64, SEP_Y);
  ctx.strokeStyle = 'rgba(140,126,110,0.22)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // ── "SKILLS" label ──────────────────────────────────────────────────────────
  const SKILLS_LABEL_Y = SEP_Y + 28;
  ctx.save();
  ctx.fillStyle = 'rgba(140,126,110,0.6)';
  ctx.font = '500 10px "DM Sans"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('SKILLS', CARD_W / 2, SKILLS_LABEL_Y);
  ctx.restore();

  // ── Skill pills ─────────────────────────────────────────────────────────────
  const PILL_H    = 26;
  const PILL_PAD  = 14;
  const PILL_GAP  = 8;
  const PILL_Y    = SKILLS_LABEL_Y + 14;
  const PILL_R    = PILL_H / 2;
  const skills    = ['ESP32', 'TinyML', 'Arduino', 'Edge ML'];

  ctx.save();
  ctx.font = '400 12px "DM Sans"';

  // Measure widths to centre the row
  const pillWidths = skills.map(s => ctx.measureText(s).width + PILL_PAD * 2);
  const rowW = pillWidths.reduce((a, b) => a + b, 0) + PILL_GAP * (skills.length - 1);
  let px = (CARD_W - rowW) / 2;

  skills.forEach((skill, i) => {
    const pw = pillWidths[i];

    // Pill background
    ctx.beginPath();
    ctx.roundRect(px, PILL_Y, pw, PILL_H, PILL_R);
    ctx.fillStyle = C.surface;
    ctx.fill();

    // Pill border
    ctx.strokeStyle = 'rgba(140,126,110,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pill text
    ctx.fillStyle = C.text;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(skill, px + pw / 2, PILL_Y + PILL_H / 2);

    px += pw + PILL_GAP;
  });
  ctx.restore();

  // ── Thin bottom decoration line ──────────────────────────────────────────────
  const BOT_SEP_Y = CARD_H - 72;
  ctx.beginPath();
  ctx.moveTo(64, BOT_SEP_Y);
  ctx.lineTo(CARD_W - 64, BOT_SEP_Y);
  ctx.strokeStyle = 'rgba(140,126,110,0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // ── University line ─────────────────────────────────────────────────────────
  ctx.save();
  ctx.fillStyle = 'rgba(140,126,110,0.45)';
  ctx.font = '400 12px "DM Sans"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Presidency University, Bangalore', CARD_W / 2, CARD_H - 36);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export default function LanyardCard() {
  const [frontImage, setFrontImage] = useState<string | null>(null);

  useEffect(() => {
    generateCardTexture().then(setFrontImage);
  }, []);

  return (
    <Lanyard
      frontImage={frontImage}
      height="100%"
      transparent={true}
      gravity={[0, -40, 0]}
      fov={20}
      lanyardWidth={0.9}
    />
  );
}
