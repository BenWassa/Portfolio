/* project-descriptions.ts */

import type { Project, ProjectDescriptions } from '../types';

export const projectsData: Project[] = [
  // --- NARRATIVE SYSTEMS (Landscape) ---
  {
    title: 'Skywalker',
    tag: 'Movie-Narrative Guide',
    desc: "An immersive mythic companion using Luke Skywalker's journey as a mirror for personal growth.",
    href: 'https://benwassa.github.io/Skywalker/',
    img: 'assets/projects/Skywalker.png',
    alt: 'Skywalker - Narrative System',
    theme: { primary: '#3B82F6', secondary: '#1F2937', tertiary: '#151720', bg: '#0A0B14' },
    status: 'active',
    type: 'narrative',
    orientation: 'landscape',
    techSpecs: {
      model: 'Single-Page Narrative',
      stack: ['HTML', 'CSS', 'JavaScript'],
      features: ['Web Audio Engine', 'Prompt-Driven Flow'],
    },
  },
  {
    title: 'Sankofa',
    tag: 'Scientific-Narrative Guide',
    desc: 'A unified framework addressing the Modern Meaning Crisis through mythic storytelling.',
    href: 'https://benwassa.github.io/sankofa/',
    img: 'assets/projects/Sankofa.png',
    alt: 'Sankofa - Narrative System',
    theme: { primary: '#d4af37', secondary: '#2d2520', tertiary: '#1a1a1a', bg: '#0a0a0a' },
    status: 'active',
    type: 'narrative',
    orientation: 'landscape',
    techSpecs: {
      model: 'Static Narrative Site',
      stack: ['HTML', 'CSS', 'JavaScript'],
      features: ['Long-form Layout', 'Multimedia Scaffolding'],
    },
  },
  {
    title: 'Dukkha',
    tag: 'Scientific-Narrative Guide',
    desc: 'A field guide on dopamine as a cultural force and tool for digital autonomy.',
    href: 'https://benwassa.github.io/dukkha/',
    img: 'assets/projects/Dukkha.png',
    alt: 'Dukkha - Digital well-being',
    theme: { primary: '#10b981', secondary: '#1f2937', tertiary: '#111827', bg: '#0f172a' },
    status: 'draft',
    type: 'psychology',
    orientation: 'landscape',
    techSpecs: {
      model: 'Interactive Guide',
      stack: ['Python', 'HTML', 'CSS'],
      features: ['Live HTML Experiences', 'Research Synthesis'],
    },
  },
  {
    title: 'Agoge',
    tag: 'Scientific-Narrative Guide',
    desc: 'A cross-cultural study of rites of passage reimagined for modern resilience.',
    href: 'https://benwassa.github.io/agoge/',
    img: 'assets/projects/Agoge.png',
    alt: 'Agoge - Rites of passage',
    theme: { primary: '#dc2626', secondary: '#7f1d1d', tertiary: '#1c1917', bg: '#0c0a09' },
    status: 'draft',
    type: 'narrative',
    orientation: 'landscape',
    techSpecs: {
      model: 'Narrative Research',
      stack: ['Python', 'Markdown'],
      features: ['Cross-Cultural Analysis', 'Mythic Structure'],
    },
  },
  {
    title: 'Orpheus',
    tag: 'Music Research Tool',
    desc: 'A lyrical lantern decoding the themes in your listening patterns.',
    href: null,
    img: 'assets/projects/Orpheus.png',
    alt: 'Orpheus - Audio Analysis',
    theme: { primary: '#8B5CF6', secondary: '#1e1b4b', tertiary: '#1e293b', bg: '#0f0f23' },
    status: 'draft',
    type: 'psychology',
    orientation: 'landscape',
    techSpecs: {
      model: 'Data Analysis Tool',
      stack: ['Python', 'pandas', 'Streamlit'],
      features: ['Plotly Visualization', 'Audio Feature Extraction'],
    },
  },

  // --- SYSTEMS & APPS (Square) ---
  {
    title: 'drop',
    tag: 'Daily Domain Tracker',
    desc: 'Setting, tracking, and reviewing habit consistency.',
    href: 'https://benwassa.github.io/drop/',
    img: 'assets/projects/drop.png',
    alt: 'drop - Tracker',
    theme: { primary: '#3b82f6', secondary: '#1c1c21', tertiary: '#0b0b0f', bg: '#09090b' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Offline-First PWA',
      stack: ['JavaScript', 'HTML', 'CSS'],
      features: ['IndexedDB', 'Service Worker', 'Local-Only Privacy'],
    },
  },
  {
    title: 'STARK',
    tag: 'Fitness Intelligence',
    desc: 'Fitness intelligence dashboard for strength, endurance, recovery.',
    href: 'https://benwassa.github.io/STARK/',
    img: 'assets/projects/stark.png',
    alt: 'STARK - Fitness PWA',
    theme: { primary: '#d4956d', secondary: '#b06a3a', tertiary: '#8b5c3c', bg: '#3d2a1f' },
    status: 'prototype',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Client-Side Dashboard',
      stack: ['React', 'TypeScript', 'Tailwind'],
      features: ['Data Visualization', 'IndexedDB', 'Framer Motion'],
    },
  },
  {
    title: 'Vox',
    tag: 'Language Learning Tracker',
    desc: 'Vocabulary and grammar studying tool.',
    href: 'https://benwassa.github.io/Vox_Showcase/',
    img: 'assets/projects/vox.png',
    alt: 'Vox - Language Tool',
    theme: { primary: '#d4956d', secondary: '#b06a3a', tertiary: '#8b5c3c', bg: '#3d2a1f' },
    status: 'prototype',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Offline-First App',
      stack: ['JavaScript', 'JSON'],
      features: ['Local Persistence', 'Spaced Repetition Logic'],
    },
  },
  {
    title: 'Punchbuggy',
    tag: 'Game',
    desc: 'Minimalist punchbuggy game with instant feedback.',
    href: 'https://benwassa.github.io/punchbuggy/',
    img: 'assets/projects/punchbuggy.png',
    alt: 'Punchbuggy - Game',
    theme: { primary: '#3b82f6', secondary: '#1f2937', tertiary: '#374151', bg: '#111827' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Instant Game PWA',
      stack: ['JavaScript', 'Vite'],
      features: ['Zero-Latency UI', 'Installable', 'Offline Capable'],
    },
  },
  {
    title: 'Hearth',
    tag: 'Shared Watchlist',
    desc: 'Shared watchlist to decide what to watch together.',
    href: 'https://benwassa.github.io/template-hearth/',
    img: 'assets/projects/hearth.png',
    alt: 'Hearth - Watchlist',
    theme: { primary: '#aa6c4b', secondary: '#be185d', tertiary: '#831843', bg: '#3f0f4d' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Real-Time Sync App',
      stack: ['React', 'Firebase'],
      features: ['Firestore Realtime', '3D Elements (Three.js)'],
    },
  },
  {
    title: 'PushUp Challenge',
    tag: 'Fitness Challenge App',
    desc: 'Pushup challenge tracker with community accountability.',
    href: 'https://benwassa.github.io/the-pushup-challenge-2025/?mode=demo',
    img: 'assets/projects/pushup.png',
    alt: 'PushUp - Fitness App',
    theme: { primary: '#ef4444', secondary: '#b91c1c', tertiary: '#7f1d1d', bg: '#4c0519' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Community Tracker',
      stack: ['React', 'Firebase'],
      features: ['Live Leaderboard', 'PWA Installable'],
    },
  },
  {
    title: 'Wrestle',
    tag: 'Grappling Training Log',
    desc: 'Offline-first training log for wrestlers.',
    href: 'https://benwassa.github.io/wrestlePWA/',
    img: 'assets/projects/wrestle.png',
    alt: 'Wrestle - Log',
    theme: { primary: '#d4956d', secondary: '#b06a3a', tertiary: '#8b5c3c', bg: '#3d2a1f' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Offline-First PWA',
      stack: ['JavaScript', 'Tailwind'],
      features: ['IndexedDB', 'Chart.js Analytics', 'Local-Only'],
    },
  },
  {
    title: 'Narrative',
    tag: 'Travel Photo Organizer',
    desc: 'Organize travel photos and videos by story role.',
    href: 'https://benwassa.github.io/Narrative/',
    img: 'assets/projects/narrative.png',
    alt: 'Narrative - Photo Tool',
    theme: { primary: '#84cc16', secondary: '#65a30d', tertiary: '#4b5320', bg: '#202601' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Local-First Utility',
      stack: ['React', 'TypeScript'],
      features: ['File System Access API', 'IndexedDB', 'Privacy-Centric'],
    },
  },
  {
    title: 'Morpheus',
    tag: 'Dream Journal',
    desc: 'A dream journal designed for serious reflection.',
    href: 'https://benwassa.github.io/template-morpheus/',
    img: 'assets/projects/morpheus.png',
    alt: 'Morpheus - Journal',
    theme: { primary: '#8b5cf6', secondary: '#6d28d9', tertiary: '#4c1d95', bg: '#2e1065' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Private Journaling PWA',
      stack: ['React', 'Tailwind'],
      features: ['Encrypted Local Storage', 'Export to JSON/Zip'],
    },
  },
  {
    title: 'Ecological Constellation',
    tag: 'Personality Framework',
    desc: 'A personality framework mapping Big Five traits to ecological strategies.',
    href: 'https://benwassa.github.io/ecological-constellation/',
    img: 'assets/projects/ecological.png',
    alt: 'Ecological Constellation',
    theme: { primary: '#06b6d4', secondary: '#0891b2', tertiary: '#164e63', bg: '#082f4f' },
    status: 'active',
    type: 'app',
    orientation: 'square',
    techSpecs: {
      model: 'Interactive Visualization',
      stack: ['React', 'TypeScript'],
      features: ['WebGL (OGL)', 'Dynamic Modeling'],
    },
  },
];

export const projectDescriptions: ProjectDescriptions = {
  skywalker: {
    portfolio:
      'A comprehensive UX playground for personal systems and compounding routines with advanced interaction patterns.',
    full: "The Skywalker Quest Map is an immersive mythic companion for personal reflection and philosophical growth, using Luke Skywalker's journey as a timeless mirror for your own. It transforms passive listening into active self-discovery through structured prompts, symbolic insight, and guided questions - weaving classic mythic stages into modern psychological reflection. Thoughtfully designed for slow, deliberate use, it invites you to map your inner conflicts, inheritances, shadows, and redemptions, all within a poetic, soul-centered framework that honors myth not as fantasy but as a living guide for becoming.",
  },

  sankofa: {
    portfolio:
      'An immersive mythic psychology narrative experience with podcast scaffolding in a living document environment.',
    full: 'Project Sankofa is an overarching narrative framework to tackle the Modern Meaning Crisis. It weaves mythic storytelling, cultural critique, and deep research into a unified exploration of how contemporary life lost cohesive meaning - and how people might find soul, purpose, and moral compass again. Sankofa ties together dopamine work, rites of passage concepts, and narrative design into a podcast or multimedia experience that blends rigorous insight with emotionally resonant mythic arcs.',
  },

  dukkha: {
    portfolio:
      'A comprehensive field guide for digital discipline - featuring live HTML experiences & systematic UX patterns.',
    full: 'Project Dukkha is a field guide and manifesto for understanding dopamine not just as a neurotransmitter but as a living, mythic force shaping human culture, motivation, habits, and collective drift. It aims to reveal misconceptions, chart how dopamine-driven systems fuel modern temptations and crises, and offer practical tools to navigate daily life with more clarity and autonomy.',
  },

  vox: {
    portfolio:
      'Advanced language-learning dashboard with progress tracking, analytics, and adaptive learning algorithms (in development).',
    full: 'Project Vox is a pilot framework for building a rigorous, self-directed language learning system. It emphasizes grammar mastery, transparent vocab tracking, and real-world sentence production - eschewing gamified fluff in favor of deliberate, adaptive practice. Designed to function fully offline with clean JSON architecture, Vox visualizes progress like a growing reservoir of knowledge, where vocabulary adds volume, grammar shapes the container, and output waters the fields of fluency. It serves as both prototype and proof-of-concept for a learner-first, data-transparent alternative to mainstream apps.',
  },

  orpheus: {
    portfolio:
      'Experimental audio interfaces and sonic interaction patterns - exploring the intersection of sound and digital experience.',
    full: 'Project Orpheus is a lyrical lantern into the underworld of memory and emotion. By tracing the songs you play on repeat - the fixations, the phases, the sudden crescendos - it reveals the hidden narratives shaping your life. Like Orpheus descending with music as his guide, this framework transforms passive listening into active self-discovery through structured analysis, mythic symbolism, and reflective prompts. Thoughtfully designed for slow, deliberate exploration, it lets you chart emotional currents, pivotal transitions, and unmet needs inside a poetic, soul-centered map where every refrain becomes a clue to becoming more wholly yourself.',
  },

  agoge: {
    portfolio:
      'A narrative research project exploring traditional rites of passage and authentic initiation for the modern world.',
    full: "Project Agoge is a narrative research project exploring how traditional rites transformed boys into grounded, resilient men. It blends cross-cultural history, mythic symbolism, and modern psychology to uncover timeless insights on confidence, moral strength, and belonging - laying the groundwork for a podcast and supporting framework that reimagines authentic initiation for today's world.",
  },

  stark: {
    portfolio:
      'A data visualization PWA that unifies strength, endurance, mobility, and recovery into one elegant Fitness Index, complete with VO2 max and trend insights.',
    full: 'Project STARK is a static Progressive Web App built with React and TailwindCSS, designed to turn physiological data into a clear visual story of fitness and recovery. It blends performance metrics, VO2 max estimation, and normative comparisons into an elegant offline dashboard that values transparency, simplicity, and privacy. All calculations are client-side, data is stored in IndexedDB, and users can install it as a PWA - no logins, no servers, just insight.',
  },

  drop: {
    portfolio:
      'A mindful daily tracker for Sleep, Fitness, Mind, and Spirit - built as a pure vanilla JavaScript PWA that values quality, reflection, and sustained growth over streaks or perfection.',
    full: "Project drop is a minimalist, framework-free Progressive Web App designed for reflective self-tracking across four life domains: Sleep, Fitness, Mind, and Spirit. It integrates a philosophically grounded scoring model based on weighted trends and intrinsic motivation, emphasizing balance, consistency, and self-awareness. The app runs fully offline, includes IndexedDB auto-backups, and features an elegant interface optimized for touch and accessibility. It's a digital companion for maintaining mindful engagement with your growth - not a habit tracker, but a quality tracker.",
  },

  punchbuggy: {
    portfolio: 'A minimalist game PWA—no punchbacks, just instant feedback and genuine enjoyment.',
    full: "Project Punchbuggy is a game designed for pure play. It strips away gamification, accounts, and complexity to deliver immediate, honest fun. Built for quick sessions and infinite replayability, it proves that elegance and engagement don't require addiction mechanics.",
  },

  hearth: {
    portfolio:
      'A calm, shared watchlist PWA that helps couples decide what to watch together without algorithmic noise.',
    full: "Project Hearth is a two-player watchlist designed for couples who want to decide what to watch without endless scrolling or recommendations. It's about shared intent, simple browsing, and actual human decision-making. Clean, focused, and built with intimacy in mind.",
  },

  pushupchallenge: {
    portfolio:
      'A time-bound fitness app supporting the Pushup Challenge with tracking and community accountability.',
    full: 'Project PushUp Challenge is a specialized app built for the annual Pushup Challenge. It provides clean tracking of daily progress, community leaderboards, and sustainable progression without gamification. Designed for participants who take the challenge seriously and want transparent data.',
  },

  wrestle: {
    portfolio:
      'An offline-first training log for wrestlers—honest tracking without accounts or gamification.',
    full: 'Project Wrestle is built for grapplers. It strips away social features and focuses on what matters: honest, structured tracking of techniques, matches, and improvements. No accounts, no notifications, no algorithms—just a reliable record of your training and progress.',
  },

  narrative: {
    portfolio:
      'A fast, offline-first travel photo organizer that sorts images by story role instead of time.',
    full: 'Project Narrative transforms how you organize travel photos. Instead of chronological sorting, it categorizes images by their role in your story: opening moments, key scenes, unexpected details, climax, reflection. It turns a photo library into a narrative arc, making memories more vivid and meaningful.',
  },

  morpheus: {
    portfolio:
      'A personal archive for recording and reflecting on dreams, treating the unconscious as meaningful signal.',
    full: 'Project Morpheus is a dream journal designed for serious reflection. It provides structure for recording dreams, tracking patterns, and exploring emotional resonance without interpretation. Built on the belief that dreams are psychological signal worth listening to—not for divination, but for self-understanding.',
  },

  ecologicalconstellation: {
    portfolio:
      'A personality framework mapping Big Five traits to ecological strategies rather than fixed types.',
    full: 'Project Ecological Constellation reimagines personality through an ecological lens. Instead of fixed types, it maps how Big Five traits function as adaptive strategies in different contexts. It reveals how your personality serves you and where it might limit you—emphasizing flexibility, context, and growth.',
  },
};
