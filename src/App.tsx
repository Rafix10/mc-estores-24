/**
 * MC ESTORES — landing page completa num único ficheiro.
 * Conteúdo, componentes e secções estão aqui; os estilos ficam em src/index.css.
 */
import { useEffect, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock3,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import repairEstoresImage from "./assets/repair-estores.jpg?inline";

const phoneDisplay = "965 285 851";
const phoneHref = "+351965285851";
const whatsappHref =
  "https://wa.me/351965285851?text=Ol%C3%A1%20MC%20Estores%2C%20preciso%20de%20assist%C3%AAncia.";
const LOGO_URL = "https://i.imgur.com/Qzs0t5f.png";
const LOGO_LIGHT_URL = "https://i.imgur.com/RA1eHjq.png";

const gallery = [
  "https://images.pexels.com/photos/13137129/pexels-photo-13137129.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/35102521/pexels-photo-35102521.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/28337819/pexels-photo-28337819.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/18874327/pexels-photo-18874327.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/14585335/pexels-photo-14585335.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/34997019/pexels-photo-34997019.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

type Benefit = { icon: LucideIcon; title: string; text: string };
const promises: Benefit[] = [
  { icon: ShieldCheck, title: "Orçamento transparente", text: "Explicamos o problema e o preço antes de começar. Sem surpresas." },
  { icon: Sparkles, title: "Cuidado em sua casa", text: "Trabalho rigoroso, limpo e atenção a cada acabamento." },
  { icon: Clock3, title: "Atendimento 24 horas", text: "Estamos disponíveis todos os dias, incluindo fins de semana." },
  { icon: Award, title: "Garantia no serviço", text: "Componentes de qualidade e garantia na mão de obra." },
];

type Service = { title: string; text: string; image: string; points: string[]; icon: LucideIcon };
const services: Service[] = [
  {
    title: "Reparação de estores",
    text: "Fitas partidas, estores presos, réguas danificadas, enroladores e caixas com problemas. Diagnosticamos e resolvemos no momento.",
    image: repairEstoresImage,
    points: ["Fitas e enroladores", "Réguas partidas", "Caixas e calhas"],
    icon: Wrench,
  },
  {
    title: "Instalação por medida",
    text: "Soluções em alumínio ou PVC adaptadas a cada janela, com um acabamento cuidado e discreto.",
    image: "https://images.pexels.com/photos/8787526/pexels-photo-8787526.jpeg?auto=compress&cs=tinysrgb&w=900",
    points: ["Alumínio e PVC", "Acabamento cuidado", "Janelas de qualquer dimensão"],
    icon: Ruler,
  },
  {
    title: "Motorização",
    text: "Transformamos estores manuais em elétricos, com comando, interruptor ou integração inteligente.",
    image: "https://images.pexels.com/photos/35566817/pexels-photo-35566817.jpeg?auto=compress&cs=tinysrgb&w=900",
    points: ["Comando à distância", "Interruptor de parede", "Smart home"],
    icon: Zap,
  },
];

const problems = [
  "Estore preso ou desalinhado",
  "Fita, enrolador ou réguas partidas",
  "Motor sem força ou sem resposta",
  "Ruído, esforço ou movimento irregular",
];

const steps = [
  { number: "01", title: "Conte-nos o problema", text: "Ligue ou envie uma mensagem com uma fotografia. Respondemos rapidamente." },
  { number: "02", title: "Diagnóstico claro", text: "Explicamos a solução e damos um orçamento honesto e detalhado." },
  { number: "03", title: "Intervenção rápida", text: "O técnico desloca-se com as ferramentas e peças certas." },
  { number: "04", title: "Teste e garantia", text: "Verificamos tudo consigo antes de sair. Garantia no serviço." },
];

const reviews = [
  { name: "Margarida Lopes", location: "Lisboa", rating: 5, text: "Vieram no próprio dia, identificaram logo o problema e trocaram a fita em menos de uma hora. Atendimento de excelência." },
  { name: "Rui Carvalho", location: "Porto", rating: 5, text: "Motorizaram todos os estores da casa. Trabalho limpo, sem barulho e explicaram tudo o que iam fazer." },
  { name: "Inês Ferreira", location: "Coimbra", rating: 5, text: "Resolveram um estore que ninguém conseguia. Profissionais, cuidadosos e preço justo. Recomendo sem hesitar." },
  { name: "Tiago Antunes", location: "Faro", rating: 5, text: "Atendimento de madrugada quando me trancaram o estore por acidente. Chegaram rapidamente e resolveram." },
];

const faqs = [
  { question: "Atendem durante a noite e ao fim de semana?", answer: "Sim. A MC Estores recebe pedidos de assistência 24 horas, todos os dias. Ao contactar-nos, confirmamos a disponibilidade para a sua zona." },
  { question: "Fico a saber o valor antes da reparação?", answer: "Sempre. Antes de avançarmos, avaliamos o problema e explicamos a solução recomendada. Só começamos depois da sua aprovação." },
  { question: "Trabalham com estores manuais e elétricos?", answer: "Sim. Trabalhamos com estores manuais e motorizados, em alumínio ou PVC, desde pequenas afinações a substituições completas." },
  { question: "Quanto tempo demora uma reparação?", answer: "A maioria das reparações fica resolvida na primeira visita, em menos de uma hora. Para instalações, agendamos a melhor data para si." },
];

const tickerItems = ["Atendimento 24 horas", "Todos os dias do ano", "Reparação urgente", "Orçamento gratuito", "Fins de semana e feriados", "Instalação e motorização"];
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo-light" : ""}`}>
      <img
        src={light ? LOGO_LIGHT_URL : LOGO_URL}
        alt="MC Estores"
        className={`logo-image ${light ? "logo-image-light" : ""}`}
        loading="eager"
      />
    </span>
  );
}

function ShimmerButton({ href, variant, children, external }: { href: string; variant: "primary" | "quiet" | "white"; children: ReactNode; external?: boolean }) {
  return (
    <motion.a href={href} className={`button button-${variant}`} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
      <span className="button-glow" aria-hidden="true" />
      <span className="button-content">{children}</span>
    </motion.a>
  );
}

function CallButton({ href, label, chip = false, arrow = false }: { href: string; label: string; chip?: boolean; arrow?: boolean }) {
  return (
    <span className="call-wrap">
      <motion.a href={href} className="button button-primary call-button" aria-label={chip ? `${label} - atendimento 24 horas` : label} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
        <span className="button-glow" aria-hidden="true" />
        <span className="button-content">
          <span className="call-icon" aria-hidden="true"><Phone /></span>
          {label}
          {chip && <span className="call-chip" aria-hidden="true"><span className="mini-clock" />24h</span>}
          {arrow && <ArrowRight />}
        </span>
      </motion.a>
    </span>
  );
}

const CYCLE_SECONDS = 30;
const START_HOUR = 9;
const OPENING = { x: 212, y: 170, w: 336, h: 458 };
const SLAT_COUNT = 10;
const SLAT_H = 46;
const SLAT_STEP = (OPENING.h - SLAT_H) / (SLAT_COUNT - 1);
const RAIL_H = 16;
const PALETTE_HOURS = [0, 5, 6.5, 8, 17, 18.5, 20, 24];
const SUN_HOURS = [0, 5, 6, 9, 12.5, 16, 19, 20, 24];
const MOON_HOURS = [0, 4, 6, 17, 18, 20, 24];
const STARS: Array<[number, number, number]> = [[236, 196, 1.8], [262, 232, 1.2], [292, 190, 1.5], [318, 250, 1.1], [346, 206, 2], [372, 270, 1.3], [402, 196, 1.4], [430, 242, 1.2], [458, 204, 1.8], [492, 258, 1.2], [520, 196, 1.5], [534, 300, 1.1], [246, 318, 1.3], [300, 340, 1.6], [420, 334, 1.2], [476, 350, 1.5]];
const BUILDINGS = [{ x: 226, w: 24, top: 528 }, { x: 252, w: 20, top: 512 }, { x: 274, w: 28, top: 536 }, { x: 452, w: 26, top: 520 }, { x: 480, w: 22, top: 506 }, { x: 504, w: 30, top: 534 }];
const BUILDING_BASE = 600;
const LIT_WINDOWS = BUILDINGS.flatMap((building, bIndex) => {
  const windows: Array<{ key: string; x: number; y: number }> = [];
  for (let row = 0; row < Math.floor((BUILDING_BASE - building.top - 12) / 12); row += 1) {
    for (let col = 0; col < Math.floor((building.w - 6) / 8); col += 1) {
      if ((bIndex * 7 + row * 3 + col * 5) % 4 === 0) continue;
      windows.push({ key: `${bIndex}-${row}-${col}`, x: building.x + 4 + col * 8, y: building.top + 6 + row * 12 });
    }
  }
  return windows;
});

function useKeyframes<T extends number | string>(source: MotionValue<number>, hours: number[], values: T[]) {
  return useTransform(source, hours.map((hour) => hour / 24), values);
}
const palette = (night: string, sunset: string, day: string) => [night, night, sunset, day, day, sunset, night, night];

function Slat({ index, progress, shade }: { index: number; progress: MotionValue<number>; shade: MotionValue<number> }) {
  const closedY = OPENING.y + index * SLAT_STEP;
  const openY = 96 + index * 2;
  const stagger = index * 0.045;
  const phase = useTransform(progress, [0, stagger, stagger + 0.76, 1], [0, 0, 1, 1]);
  const smoothPhase = useSpring(phase, { stiffness: 92, damping: 20 });
  const y = useTransform(smoothPhase, [0, 0.14, 0.82, 1], [openY - 4, openY, closedY - 5, closedY]);
  const scaleY = useTransform(smoothPhase, [0, 0.15, 0.84, 1], [0.88, 1, 1, 0.96]);
  const rotate = useTransform(smoothPhase, [0, 0.25, 0.8, 1], [-1.6, 0, 0, 0.8]);
  return (
    <motion.g style={{ y, scaleY, rotate, transformOrigin: "380px 23px" }}>
      <rect x="208" y="0" width="344" height={SLAT_H} fill="url(#mc-slat)" />
      <rect x="208" y="0" width="344" height={SLAT_H} fill="url(#mc-slots)" />
      <rect x="208" y="0" width="344" height="3" fill="#fff" opacity="0.9" />
      <rect x="208" y={SLAT_H - 6} width="344" height="6" fill="#8faec1" opacity="0.35" />
      <motion.rect x="208" y="0" width="344" height={SLAT_H} fill="#071a3d" style={{ opacity: shade }} />
    </motion.g>
  );
}

function SealBadge() {
  return (
    <div className="seal-badge" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs><path id="mc-seal-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs>
        <circle cx="60" cy="60" r="58" fill="#fff" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="#bcdcf3" strokeWidth="1" />
        <g className="seal-spin"><text fontSize="9.2" fontWeight="800" letterSpacing="1.5" fill="#0a5cb8"><textPath href="#mc-seal-circle">24 HORAS · 7 DIAS · SEM FÉRIAS · </textPath></text></g>
        <circle cx="60" cy="60" r="30" fill="#0078f0" />
        <text x="60" y="69" textAnchor="middle" fontSize="25" fontWeight="800" fill="#fff">24h</text>
      </svg>
    </div>
  );
}

function ShutterScene({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 130, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 130, damping: 20 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3.2, 3.2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.2, -3.2]);
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const cycle = useMotionValue(START_HOUR / 24);
  useAnimationFrame((time) => { if (!reduceMotion) cycle.set((START_HOUR / 24 + time / 1000 / CYCLE_SECONDS) % 1); });
  const progress = useSpring(open ? 0 : 1, { stiffness: 70, damping: 16 });
  useEffect(() => { const target = open ? 0 : 1; if (reduceMotion) progress.jump(target); else progress.set(target); }, [open, progress, reduceMotion]);
  const railY = useTransform(progress, [0, 1], [OPENING.y, OPENING.y + OPENING.h - RAIL_H]);
  const dayOpacity = useKeyframes(cycle, [0, 5.5, 7.5, 17, 19, 24], [0, 0, 1, 1, 0, 0]);
  const sunsetOpacity = useKeyframes(cycle, [0, 5, 6.2, 7.6, 17, 18.2, 19.6, 24], [0, 0, 1, 0, 0, 1, 0, 0]);
  const nightOpacity = useKeyframes(cycle, [0, 5, 7, 18, 20, 24], [1, 1, 0, 0, 1, 1]);
  const lightsOpacity = useKeyframes(cycle, [0, 5.5, 6.5, 17, 18.5, 20, 24], [1, 1, 0, 0, 0.6, 1, 1]);
  const slatShade = useTransform(nightOpacity, (value) => value * 0.42);
  const sunX = useKeyframes(cycle, SUN_HOURS, [230, 230, 245, 320, 380, 450, 515, 530, 530]);
  const sunY = useKeyframes(cycle, SUN_HOURS, [650, 650, 540, 300, 222, 300, 540, 650, 650]);
  const sunColor = useKeyframes(cycle, [0, 6, 8, 17, 19, 24], ["#ff8a4c", "#ff8a4c", "#ffd45a", "#ffd45a", "#ff8a4c", "#ff8a4c"]);
  const moonX = useKeyframes(cycle, MOON_HOURS, [380, 330, 300, 300, 450, 420, 380]);
  const moonY = useKeyframes(cycle, MOON_HOURS, [230, 300, 650, 650, 540, 260, 230]);
  const farHill = useKeyframes(cycle, PALETTE_HOURS, palette("#1e3a68", "#c98a86", "#8ec3dc"));
  const midHill = useKeyframes(cycle, PALETTE_HOURS, palette("#142c52", "#a5607a", "#4d8fb3"));
  const frontHill = useKeyframes(cycle, PALETTE_HOURS, palette("#0d2140", "#5b4468", "#1f6a90"));
  const skyline = useKeyframes(cycle, PALETTE_HOURS, palette("#0b1a33", "#7a4c6c", "#3b7ea3"));
  const facade = useKeyframes(cycle, PALETTE_HOURS, palette("#c7d4ec", "#ffe6d6", "#f7fcff"));
  const sash = useKeyframes(cycle, PALETTE_HOURS, palette("#94a8cf", "#f2d8cf", "#f4f9fd"));
  const strapSpring = { type: "spring" as const, stiffness: 60, damping: 14 };
  const strapLength = open ? 320 : 200;
  const onKeyToggle = (event: KeyboardEvent<SVGRectElement>) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onToggle(); } };

  return (
    <motion.div className={`shutter-scene ${open ? "is-open" : "is-closed"}`} onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}>
      <svg viewBox="0 0 760 780" role="img" aria-labelledby="scene-title scene-description">
        <title id="scene-title">Janela com estore da MC Estores, do dia à noite</title>
        <desc id="scene-description">Uma janela com estore de rolo que abre e fecha, e um ciclo de 24 horas com sol, lua e estrelas.</desc>
        <defs>
          <linearGradient id="mc-sky-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4fb8ff" /><stop offset="1" stopColor="#e6f6ff" /></linearGradient>
          <linearGradient id="mc-sky-sunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4b4aa8" /><stop offset="0.55" stopColor="#ff8f6b" /><stop offset="1" stopColor="#ffd9a3" /></linearGradient>
          <linearGradient id="mc-sky-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#040b20" /><stop offset="0.6" stopColor="#12275a" /><stop offset="1" stopColor="#2a4a86" /></linearGradient>
          <linearGradient id="mc-slat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="0.6" stopColor="#e6f1f8" /><stop offset="1" stopColor="#c2d8e6" /></linearGradient>
          <linearGradient id="mc-box" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a97ff" /><stop offset="1" stopColor="#0a5fd0" /></linearGradient>
          <linearGradient id="mc-rail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0a6be0" /><stop offset="1" stopColor="#0656b8" /></linearGradient>
          <linearGradient id="mc-sill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#cfe1ee" /></linearGradient>
          <linearGradient id="mc-box-shadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0.32" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
          <linearGradient id="mc-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.4" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <radialGradient id="mc-sun-halo"><stop offset="0" stopColor="#fff2b0" stopOpacity="0.85" /><stop offset="1" stopColor="#fff2b0" stopOpacity="0" /></radialGradient>
          <radialGradient id="mc-moon-halo"><stop offset="0" stopColor="#cfe0ff" stopOpacity="0.6" /><stop offset="1" stopColor="#cfe0ff" stopOpacity="0" /></radialGradient>
          <radialGradient id="mc-glow-day"><stop offset="0" stopColor="#bfe8ff" stopOpacity="0.95" /><stop offset="1" stopColor="#bfe8ff" stopOpacity="0" /></radialGradient>
          <radialGradient id="mc-glow-sunset"><stop offset="0" stopColor="#ffb27a" stopOpacity="0.85" /><stop offset="1" stopColor="#ffb27a" stopOpacity="0" /></radialGradient>
          <radialGradient id="mc-glow-night"><stop offset="0" stopColor="#5b7dff" stopOpacity="0.6" /><stop offset="1" stopColor="#5b7dff" stopOpacity="0" /></radialGradient>
          <pattern id="mc-slots" width="44" height={SLAT_H} patternUnits="userSpaceOnUse" x="208" y="0"><rect x="13" y="19" width="18" height="6" rx="3" fill="#7d9fb3" opacity="0.4" /></pattern>
          <clipPath id="mc-opening"><rect x={OPENING.x} y={OPENING.y} width={OPENING.w} height={OPENING.h} /></clipPath>
          <clipPath id="mc-slat-clip"><rect x="200" y={OPENING.y} width="360" height={OPENING.h + 2} /></clipPath>
        </defs>
        <motion.ellipse cx="380" cy="400" rx="340" ry="390" fill="url(#mc-glow-day)" style={{ opacity: dayOpacity }} />
        <motion.ellipse cx="380" cy="400" rx="340" ry="390" fill="url(#mc-glow-sunset)" style={{ opacity: sunsetOpacity }} />
        <motion.ellipse cx="380" cy="400" rx="340" ry="390" fill="url(#mc-glow-night)" style={{ opacity: nightOpacity }} />
        <motion.rect x="150" y="70" width="460" height="649" rx="30" stroke="#cfe4f2" strokeWidth="2" opacity="0.94" style={{ fill: facade }} />
        <g clipPath="url(#mc-opening)">
          <rect x={OPENING.x} y={OPENING.y} width={OPENING.w} height={OPENING.h} fill="url(#mc-sky-night)" />
          <motion.rect x={OPENING.x} y={OPENING.y} width={OPENING.w} height={OPENING.h} fill="url(#mc-sky-day)" style={{ opacity: dayOpacity }} />
          <motion.rect x={OPENING.x} y={OPENING.y} width={OPENING.w} height={OPENING.h} fill="url(#mc-sky-sunset)" style={{ opacity: sunsetOpacity }} />
          <motion.g style={{ opacity: nightOpacity }}>{STARS.map(([x, y, r], index) => <motion.circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }} transition={{ duration: 2 + (index % 3), repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }} />)}</motion.g>
          <motion.g style={{ x: sunX, y: sunY }}>
            <circle r="96" fill="url(#mc-sun-halo)" />
            <motion.g animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>{Array.from({ length: 8 }).map((_, index) => <line key={index} x1="0" y1="-56" x2="0" y2="-70" stroke="#ffd264" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${index * 45})`} />)}</motion.g>
            <motion.circle r="40" style={{ fill: sunColor }} />
          </motion.g>
          <motion.g style={{ x: moonX, y: moonY }}><circle r="80" fill="url(#mc-moon-halo)" /><circle r="30" fill="#fff8de" /><circle cx="-10" cy="-7" r="6" fill="#eadfae" opacity="0.7" /><circle cx="9" cy="8" r="8" fill="#eadfae" opacity="0.55" /><circle cx="6" cy="-14" r="3.5" fill="#eadfae" opacity="0.6" /></motion.g>
          <motion.g style={{ opacity: dayOpacity }}>
            <motion.g animate={reduceMotion ? undefined : { x: [-160, 600] }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} opacity="0.85"><path d="M10 240c14-28 49-31 69-9 25-15 60 1 61 31H8c-6-7-5-15 2-22Z" fill="#fff" /></motion.g>
            <motion.g animate={reduceMotion ? undefined : { x: [600, -160] }} transition={{ duration: 46, repeat: Infinity, ease: "linear", delay: 3 }} opacity="0.6"><path d="M10 330c10-20 36-22 50-6 18-11 44 1 44 22H8c-4-5-3-11 2-16Z" fill="#fff" /></motion.g>
          </motion.g>
          <motion.path d="M212 520 300 440l60 50 70-70 118 100v108H212Z" style={{ fill: farHill }} />
          <motion.path d="M212 560 320 480l70 60 80-70 78 90v68H212Z" style={{ fill: midHill }} />
          {BUILDINGS.map((building) => <motion.rect key={building.x} x={building.x} y={building.top} width={building.w} height={BUILDING_BASE - building.top} rx="2" style={{ fill: skyline }} />)}
          <motion.g style={{ opacity: lightsOpacity }}>{LIT_WINDOWS.map((window) => <rect key={window.key} x={window.x} y={window.y} width="4" height="5" rx="0.8" fill="#ffd76a" />)}</motion.g>
          <motion.path d="M212 596c78-34 138-30 198-6 50 20 100 10 138-10v48H212Z" style={{ fill: frontHill }} />
          <motion.g fill="none" strokeWidth="7" style={{ stroke: sash }}><rect x="219" y="177" width="322" height="444" /><path d="M380 177V621M219 372H541" /></motion.g>
          <motion.g animate={reduceMotion ? undefined : { x: [-130, 340] }} transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 5.5, ease: "easeInOut" }}><path d="M300 170h60l-60 458h-60z" fill="url(#mc-shine)" /></motion.g>
        </g>
        <g clipPath="url(#mc-slat-clip)">
          {Array.from({ length: SLAT_COUNT }).map((_, index) => <Slat key={index} index={index} progress={progress} shade={slatShade} />)}
          <motion.g style={{ y: railY }}><rect x="204" y="0" width="352" height={RAIL_H} rx="5" fill="#5f8aa3" /><rect x="204" y="0" width="352" height="4" rx="2" fill="#fff" opacity="0.5" /><rect x="356" y="5" width="48" height="6" rx="3" fill="#2f5468" /><motion.rect x="204" y="0" width="352" height={RAIL_H} rx="5" fill="#071a3d" style={{ opacity: slatShade }} /></motion.g>
        </g>
        <rect x={OPENING.x} y={OPENING.y} width={OPENING.w} height="34" fill="url(#mc-box-shadow)" />
        <rect x="194" y="166" width="20" height="470" rx="5" fill="url(#mc-rail)" /><rect x="546" y="166" width="20" height="470" rx="5" fill="url(#mc-rail)" /><rect x="200" y="172" width="3" height="456" rx="1.5" fill="#fff" opacity="0.28" /><rect x="552" y="172" width="3" height="456" rx="1.5" fill="#fff" opacity="0.28" />
        <rect x="184" y="92" width="392" height="80" rx="16" fill="url(#mc-box)" /><rect x="192" y="98" width="376" height="8" rx="4" fill="#fff" opacity="0.28" /><path d="M214 128h332M214 140h332" stroke="#054a99" strokeWidth="2" opacity="0.35" strokeLinecap="round" /><rect x="190" y="162" width="380" height="8" rx="4" fill="#04479a" opacity="0.6" /><motion.circle cx="552" cy="118" r="4" fill="#28dd8c" animate={reduceMotion ? undefined : { opacity: [1, 0.25, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        <rect x="186" y="648" width="388" height="9" rx="4.5" fill="#0b2c50" opacity="0.14" /><rect x="176" y="628" width="408" height="22" rx="7" fill="url(#mc-sill)" stroke="#b5cfe0" strokeWidth="1.2" />
        <rect x="574" y="118" width="26" height="8" rx="4" fill="#0a5fd0" />
        <motion.g animate={reduceMotion ? undefined : { rotate: [-1.4, 1.4, -1.4] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} style={{ originX: 0.5, originY: 0 }}>
          <motion.rect x="596" y="124" width="8" rx="3" fill="#f4f9fd" stroke="#a9c6d9" strokeWidth="1.2" initial={false} animate={{ height: strapLength }} transition={strapSpring} />
          <motion.g initial={false} animate={{ y: strapLength }} transition={strapSpring}><rect x="588" y="116" width="24" height="40" rx="9" fill="#0a6be0" /><rect x="597" y="128" width="6" height="16" rx="3" fill="#fff" opacity="0.7" /></motion.g>
        </motion.g>
        <motion.g className="scene-plant" animate={reduceMotion ? undefined : { rotate: [-1.3, 1.5, -1.3] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} style={{ originX: 0.5, originY: 1 }}><path d="M82 648c18-68 51-96 94-117-6 53-35 94-94 117Z" fill="#72b9a0" /><path d="M116 660c-12-64-2-108 32-143 17 55 7 102-32 143Z" fill="#3e947e" /><path d="M92 646c-39-43-49-79-35-116 40 32 55 69 35 116Z" fill="#a1d1b7" /><path d="M74 637h82l-12 81H86Z" fill="#f0b78d" /></motion.g>
        <path d="M90 719h581" stroke="#acd4e8" strokeWidth="2" />
        <rect className="window-hit" x={OPENING.x} y={OPENING.y} width={OPENING.w} height={OPENING.h} rx="4" role="button" tabIndex={0} aria-label={open ? "Fechar o estore" : "Abrir o estore"} onClick={onToggle} onKeyDown={onKeyToggle} />
      </svg>
      <motion.div className="floating-tag" animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true"><i className="online-dot" /><span>24h assistência imediata</span></motion.div>
      <SealBadge />
      <motion.button type="button" className="shutter-toggle" onClick={onToggle} aria-pressed={open} whileTap={{ scale: 0.95 }}>
        <span className="toggle-icon"><motion.span animate={{ y: open ? -5 : 5 }} transition={{ duration: 0.35 }} /><motion.span animate={{ y: 0 }} transition={{ duration: 0.35 }} /><motion.span animate={{ y: open ? 5 : -5 }} transition={{ duration: 0.35 }} /></span>
        {open ? "Fechar estore" : "Abrir estore"}
      </motion.button>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(true);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timeout = window.setTimeout(() => setShutterOpen((value) => !value), 7000);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion, shutterOpen]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  useEffect(() => { const updateHeader = () => setScrolled(window.scrollY > 24); updateHeader(); window.addEventListener("scroll", updateHeader, { passive: true }); return () => window.removeEventListener("scroll", updateHeader); }, []);

  return (
    <div className="app-shell">
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="page-width header-inner">
          <a href="#inicio" aria-label="MC Estores - Início"><Logo /></a>
          <nav className="desktop-nav" aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#processo">Como funciona</a><a href="#galeria">Trabalhos</a><a href="#perguntas">Perguntas</a></nav>
          <div className="header-actions"><span className="availability"><i /> Disponível 24h</span><CallButton href={`tel:${phoneHref}`} label="Ligar agora" /></div>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 91% 6%)" }} animate={{ clipPath: "circle(150% at 91% 6%)" }} exit={{ clipPath: "circle(0% at 91% 6%)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-menu-top"><a href="#inicio" onClick={closeMenu}><Logo light /></a><button type="button" onClick={closeMenu} aria-label="Fechar menu"><X /></button></div>
            <nav><a href="#servicos" onClick={closeMenu}>Serviços</a><a href="#processo" onClick={closeMenu}>Como funciona</a><a href="#galeria" onClick={closeMenu}>Trabalhos</a><a href="#perguntas" onClick={closeMenu}>Perguntas</a><a href="#contactos" onClick={closeMenu}>Contactos</a></nav>
            <a className="mobile-menu-call" href={`tel:${phoneHref}`}><span>Assistência 24 horas</span><strong>{phoneDisplay}</strong></a>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <section id="inicio" className="hero">
          <div className="hero-soft-shape" aria-hidden="true" /><div className="hero-orbit-bg" aria-hidden="true" />
          <div className="page-width hero-layout">
            <div className="hero-copy">
              <motion.div className="hero-pill" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}><span className="dot-pulse" /> Aberto agora · 24 horas por dia, 7 dias por semana</motion.div>
              <h1><span className="hero-brand-clip"><motion.span className="hero-brand" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}>Estores reparados.</motion.span></span><motion.span className="hero-promise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>Conforto de volta, sem esperas.</motion.span></h1>
              <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.58 }}>Reparação, instalação e motorização de estores em todo o país. De dia, de noite ou ao fim de semana: equipa própria, resposta rápida e tudo explicado antes de começar.</motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
                <CallButton href={`tel:${phoneHref}`} label="Ligar agora" chip arrow />
                <ShimmerButton href={whatsappHref} variant="quiet" external><MessageCircle /> Pedir no WhatsApp</ShimmerButton>
              </motion.div>
              <motion.div className="hero-trust" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }}>
                <div className="stars">{[0, 1, 2, 3, 4].map((item) => <Star key={item} />)}<strong>4.9/5</strong></div>
                <span>+850 clientes satisfeitos em todo o país</span>
              </motion.div>
            </div>
            <motion.div className="hero-visual-wrap" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}><ShutterScene open={shutterOpen} onToggle={() => setShutterOpen((value) => !value)} /></motion.div>
          </div>
          <a className="scroll-cue" href="#ticker" aria-label="Continuar"><span /> Descobrir mais</a>
        </section>
        <div id="ticker" className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1, 2, 3].map((group) => <div className="ticker-group" key={group}>{tickerItems.map((item) => <span className="ticker-item" key={item}><Clock3 /> {item}</span>)}</div>)}</div></div>
        <section id="confianca" className="trust-section"><div className="page-width"><motion.div className="trust-heading" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow">Porque escolhem a MC Estores</span><h2>Mais de 18 anos a cuidar<br />do conforto das casas portuguesas.</h2></motion.div><div className="promise-grid">{promises.map((item, index) => { const Icon = item.icon; return <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.08 }} whileHover={reduceMotion ? undefined : { y: -8 }}><span className="promise-icon"><Icon /></span><h3>{item.title}</h3><p>{item.text}</p></motion.article>; })}</div></div></section>
        <section id="servicos" className="services-section"><div className="page-width services-layout"><motion.div className="services-intro" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.7 }}><span className="eyebrow">Soluções para o seu estore</span><h2>Do pequeno ajuste à instalação completa.</h2><p>Escolhemos a solução certa sem complicar o que pode ser simples.</p><a className="text-link" href={`tel:${phoneHref}`}>Não sabe do que precisa? Fale connosco <ArrowRight /></a></motion.div><div className="service-list">{services.map((service, index) => { const Icon = service.icon; const active = activeService === index; return <motion.div className={`service-item ${active ? "active" : ""}`} key={service.title} initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.08 }}><button type="button" onClick={() => setActiveService(index)} aria-expanded={active}><span className="service-title"><Icon /> {service.title}</span><ChevronDown /></button><AnimatePresence initial={false}>{active && <motion.div className="service-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}><div className="service-content"><div className="service-image"><img src={service.image} alt={service.title} loading="lazy" /></div><div className="service-text"><p>{service.text}</p><ul>{service.points.map((point) => <li key={point}><Check /> {point}</li>)}</ul><ShimmerButton href={whatsappHref} variant="quiet" external>Pedir orçamento <ArrowRight /></ShimmerButton></div></div></motion.div>}</AnimatePresence></motion.div>; })}</div></div></section>
        <section id="galeria" className="gallery-section"><div className="page-width gallery-head"><motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow">Trabalhos recentes</span><h2>Casas mais confortáveis<br />em todo o país.</h2></motion.div><a className="text-link" href={whatsappHref} target="_blank" rel="noreferrer">Ver mais projetos no WhatsApp <ArrowRight /></a></div><div className="gallery-track"><motion.div className="gallery-row" animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>{[...gallery, ...gallery].map((src, index) => <div className="gallery-card" key={`${src}-${index}`}><img src={src} alt="Trabalho realizado pela MC Estores" loading="lazy" /><div className="gallery-shade" /></div>)}</motion.div></div></section>
        <section className="reassurance-section"><div className="reassurance-glow" aria-hidden="true" /><div className="page-width reassurance-layout"><motion.div className="reassurance-copy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow eyebrow-light">Menos preocupação</span><h2>O problema pode ser pequeno.<br /><em>O desconforto nunca é.</em></h2><p>Um estore preso muda a luz, o descanso e a segurança da casa. Por isso, tratamos cada pedido com a atenção que merece.</p><ShimmerButton href={`tel:${phoneHref}`} variant="white">Resolver o meu estore <ArrowRight /></ShimmerButton></motion.div><motion.div className="reassurance-list" initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.1 }}>{problems.map((item) => <p key={item}><Check /> {item}</p>)}</motion.div></div></section>
        <section id="processo" className="process-section"><div className="page-width"><motion.div className="process-heading" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow">Sem complicações</span><h2>Da mensagem à solução,<br />sabe sempre o que esperar.</h2></motion.div><div className="process-grid">{steps.map((step, index) => <motion.article key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.55 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={reduceMotion ? undefined : { y: -8 }}><div className="step-line"><span>{step.number}</span><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 + index * 0.1 }} /></div><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}</div></div></section>
        <section className="reviews-section"><div className="page-width reviews-head"><motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow">Quem confia</span><h2>Mais de 850 famílias<br />já recomendam.</h2></motion.div></div><div className="reviews-grid">{reviews.map((review, index) => <motion.article className="review-card" key={review.name} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.08 }} whileHover={reduceMotion ? undefined : { y: -6 }}><Quote className="quote-mark" /><div className="review-stars">{Array.from({ length: review.rating }).map((_, item) => <Star key={item} />)}</div><p>{review.text}</p><div className="review-meta"><strong>{review.name}</strong><span>{review.location}</span></div></motion.article>)}</div></section>
        <section id="perguntas" className="faq-section"><div className="page-width faq-layout"><motion.div className="faq-intro" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}><span className="eyebrow">Antes de ligar</span><h2>Perguntas que ajudam a decidir com confiança.</h2><p>Se não encontrar aqui a resposta, estamos a uma mensagem de distância.</p></motion.div><div className="faq-list">{faqs.map((faq, index) => { const active = activeFaq === index; return <div className={`faq-item ${active ? "active" : ""}`} key={faq.question}><button type="button" onClick={() => setActiveFaq(active ? null : index)} aria-expanded={active}><span>{faq.question}</span><ChevronDown /></button><AnimatePresence initial={false}>{active && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></div>; })}</div></div></section>
        <section id="contactos" className="contact-section"><div className="contact-orbit contact-orbit-one" aria-hidden="true" /><div className="contact-orbit contact-orbit-two" aria-hidden="true" /><motion.div className="page-width contact-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.75 }}><span className="availability availability-large"><i /> Estamos disponíveis 24h</span><h2>Volte a sentir conforto<br />em sua casa.</h2><p>Explique-nos o que se passa. Respondemos rapidamente, sem compromisso.</p><div className="contact-actions"><CallButton href={`tel:${phoneHref}`} label={`Ligar ${phoneDisplay}`} chip /><ShimmerButton href={whatsappHref} variant="quiet" external><MessageCircle /> Enviar mensagem</ShimmerButton></div><div className="week-strip" aria-label="Disponível todos os dias, 24 horas">{weekDays.map((day, index) => <span key={day} style={{ animationDelay: `${index * 0.7}s` }}><b>{day}</b> 24h</span>)}</div></motion.div></section>
      </main>
      <footer><div className="page-width footer-main"><a href="#inicio"><Logo light /></a><p>Instalação, reparação e motorização de estores.<br />Assistência 24 horas em todo o país.</p><nav aria-label="Navegação de rodapé"><a href="#servicos">Serviços</a><a href="#processo">Como funciona</a><a href="#galeria">Trabalhos</a><a href="#perguntas">Perguntas</a></nav></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} MC Estores</span><span>Conforto que se sente. Serviço em que se confia.</span></div></footer>
      <a className="mobile-sticky-call" href={`tel:${phoneHref}`}><span className="call-icon" aria-hidden="true"><Phone /></span><span>Pedir assistência 24h</span></a>
    </div>
  );
}

export default App;
