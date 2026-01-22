/* project-descriptions.js */

/**
 * Complete project data for the portfolio
 * Contains all project information including metadata, themes, and descriptions
 */

export const projectsData = [
  {
    title: "Skywalker",
    tag: "Movie-Narrative Guide",
    desc: "An immersive mythic companion for personal reflection and growth, using Luke Skywalker's journey as a timeless mirror. Transforms film narrative into guided self-discovery through prompts and symbolism.",
    href: "https://benwassa.github.io/Skywalker/",
    img: "Skywalker.png",
    alt: "Skywalker - Personal systems & UX playground",
    theme: {
      primary: "#3B82F6",
      secondary: "#1F2937",
      tertiary: "#151720",
      bg: "#0A0B14"
    },
    status: "green",
    type: "narrative"
  },
  {
    title: "Sankofa",
    tag: "Scientific-Narrative Guide",
    desc: "A unified framework addressing the Modern Meaning Crisis - weaving mythic storytelling, cultural critique, and research into emotionally resonant narratives of purpose, soul, and moral compass.",
    href: "https://benwassa.github.io/sankofa/",
    img: "Sankofa.png",
    alt: "Sankofa - Mythic psychology narrative site",
    theme: {
      primary: "#d4af37",
      secondary: "#2d2520",
      tertiary: "#1a1a1a",
      bg: "#0a0a0a"
    },
    status: "green",
    type: "narrative"
  },
  {
    title: "Dukkha", 
    tag: "Scientific-Narrative Guide",
    desc: "A field guide and manifesto on dopamine as a cultural force. Exposes misconceptions, charts how temptation systems shape modern crises, and offers practical tools for clarity, calm, and autonomy.",
    href: "https://benwassa.github.io/dukkha/",
    img: "Dukkha.png",
    alt: "Dukkha - Digital well-being & dopamine craft",
    theme: {
      primary: "#10b981",
      secondary: "#1f2937",
      tertiary: "#111827",
      bg: "#0f172a"
    },
    status: "yellow",
    type: "psychology"
  },
  {
    title: "Agoge",
    tag: "Scientific-Narrative Guide",
    desc: "A cross-cultural study of rites of passage. Blends history, myth, psychology, and research into a modern narrative framework reimagining authentic initiation for resilience and transformation.",
    href: "https://benwassa.github.io/agoge/",
    img: "Agoge.png", 
    alt: "Agoge - Rites of passage research",
    theme: {
      primary: "#dc2626",
      secondary: "#7f1d1d",
      tertiary: "#1c1917",
      bg: "#0c0a09"
    },
    status: "yellow",
    type: "narrative"
  },
  {
    title: "Orpheus",
    tag: "Music Research Tool",
    desc: "A lyrical lantern into memory and emotion, decoding the themes in your listening patterns. Transforms music into a framework for reflection, self-discovery, and mapping emotional currents.",
    href: null,
    img: "Orpheus.png", 
    alt: "Orpheus - Audio experiments",
    theme: {
      primary: "#8B5CF6",
      secondary: "#1e1b4b",
      tertiary: "#1e293b",
      bg: "#0f0f23"
    },
    status: "red",
    type: "narrative"
  },
  {
    title: "drop",
    tag: "Daily Domain Tracker",
    desc: "A minimalist Progressive Web App for tracking daily life domains - Sleep, Fitness, Mind, and Spirit - with a mindful scoring system that rewards consistency over perfection.",
    href: "https://benwassa.github.io/drop/",
    img: "drop.png",
    alt: "drop - Daily Domain Tracker",
    theme: {
      primary: "#3b82f6",
      secondary: "#1c1c21",
      tertiary: "#0b0b0f",
      bg: "#09090b"
    },
    status: "green",
    type: "app"
  },
  {
    title: "STARK",
    tag: "Fitness Intelligence PWA",
    desc: "A Progressive Web App that transforms physiological data into a clear visual story of fitness and recovery - a personal dashboard for strength, endurance, and overall performance.",
    href: "https://benwassa.github.io/STARK/",
    img: "STARK.png",
    alt: "STARK - Fitness Intelligence PWA",
    theme: {
      primary: "#06b6d4",
      secondary: "#0f172a",
      tertiary: "#1e293b",
      bg: "#0a0f18"
    },
    status: "green",
    type: "app"
  },
  {
    title: "Vox",
    tag: "Language Learning Tracker",
    desc: "Vox is a lean, offline-first vocabulary tracker designed for focused study in Spanish and Mandarin. Featuring CSV import and export, practice counters, and responsive table and card views, making it easy to manage and review progress.",
    href: "https://benwassa.github.io/Vox_Showcase/",
    img: "Vox.png",
    alt: "Vox - Language-learning dashboard",
    theme: {
      primary: "#3b82f6",
      secondary: "#1f2937",
      tertiary: "#374151",
      bg: "#111827"
    },
    status: "green",
    type: "app"
  },
  {
    title: "Punchbuggy",
    tag: "Game PWA",
    desc: "A minimalist game PWA with simple mechanics and instant feedback. No punchbacks—just pure play designed for quick sessions and genuine enjoyment.",
    href: "https://benwassa.github.io/punchbuggy/",
    img: "Punchbuggy.png",
    alt: "Punchbuggy - Game PWA",
    theme: {
      primary: "#f59e0b",
      secondary: "#b45309",
      tertiary: "#92400e",
      bg: "#451a03"
    },
    status: "green",
    type: "app"
  },
  {
    title: "Hearth",
    tag: "Shared Watchlist PWA",
    desc: "A calm, shared watchlist PWA designed to help couples decide what to watch together without endless scrolling or algorithmic pressure.",
    href: "https://benwassa.github.io/hearthMVP/",
    img: "Hearth.png",
    alt: "Hearth - Shared Watchlist PWA",
    theme: {
      primary: "#ec4899",
      secondary: "#be185d",
      tertiary: "#831843",
      bg: "#3f0f4d"
    },
    status: "green",
    type: "app"
  },
  {
    title: "PushUp Challenge",
    tag: "Fitness Challenge App",
    desc: "A time-bound Progressive Web App built to support participants during the Pushup Challenge with tracking, community, and sustainable progression.",
    href: "https://benwassa.github.io/the-pushup-challenge-2025/",
    img: "PushUpChallenge.png",
    alt: "PushUp Challenge - Fitness App",
    theme: {
      primary: "#ef4444",
      secondary: "#b91c1c",
      tertiary: "#7f1d1d",
      bg: "#4c0519"
    },
    status: "green",
    type: "app"
  },
  {
    title: "Wrestle",
    tag: "Grappling Training Log",
    desc: "An offline-first training log for wrestlers focused on honest tracking without accounts or gamification. Built for serious grapplers who value clarity.",
    href: "https://benwassa.github.io/wrestlePWA/",
    img: "Wrestle.png",
    alt: "Wrestle - Grappling Training Tool",
    theme: {
      primary: "#8b5cf6",
      secondary: "#6d28d9",
      tertiary: "#4c1d95",
      bg: "#2e1065"
    },
    status: "green",
    type: "app"
  },
  {
    title: "Narrative",
    tag: "Travel Photo Organizer",
    desc: "A fast, offline-first travel photo organizer that sorts images by story role instead of chronology—turning moments into narrative.",
    href: "https://benwassa.github.io/Narrative/",
    img: "Narrative.png",
    alt: "Narrative - Travel Photo Organizer",
    theme: {
      primary: "#84cc16",
      secondary: "#65a30d",
      tertiary: "#4b5320",
      bg: "#202601"
    },
    status: "green",
    type: "app"
  }
];

export const projectDescriptions = {
  skywalker: {
    portfolio: "A comprehensive UX playground for personal systems and compounding routines with advanced interaction patterns.",
    full: "The Skywalker Quest Map is an immersive mythic companion for personal reflection and philosophical growth, using Luke Skywalker's journey as a timeless mirror for your own. It transforms passive listening into active self-discovery through structured prompts, symbolic insight, and guided questions - weaving classic mythic stages into modern psychological reflection. Thoughtfully designed for slow, deliberate use, it invites you to map your inner conflicts, inheritances, shadows, and redemptions, all within a poetic, soul-centered framework that honors myth not as fantasy but as a living guide for becoming."
  },

  sankofa: {
    portfolio: "An immersive mythic psychology narrative experience with podcast scaffolding in a living document environment.",
    full: "Project Sankofa is an overarching narrative framework to tackle the Modern Meaning Crisis. It weaves mythic storytelling, cultural critique, and deep research into a unified exploration of how contemporary life lost cohesive meaning - and how people might find soul, purpose, and moral compass again. Sankofa ties together dopamine work, rites of passage concepts, and narrative design into a podcast or multimedia experience that blends rigorous insight with emotionally resonant mythic arcs."
  },

  dukkha: {
    portfolio: "A comprehensive field guide for digital discipline - featuring live HTML experiences & systematic UX patterns.",
    full: "Project Dukkha is a field guide and manifesto for understanding dopamine not just as a neurotransmitter but as a living, mythic force shaping human culture, motivation, habits, and collective drift. It aims to reveal misconceptions, chart how dopamine-driven systems fuel modern temptations and crises, and offer practical tools to navigate daily life with more clarity and autonomy."
  },

  vox: {
    portfolio: "Advanced language-learning dashboard with progress tracking, analytics, and adaptive learning algorithms (in development).",
    full: "Project Vox is a pilot framework for building a rigorous, self-directed language learning system. It emphasizes grammar mastery, transparent vocab tracking, and real-world sentence production - eschewing gamified fluff in favor of deliberate, adaptive practice. Designed to function fully offline with clean JSON architecture, Vox visualizes progress like a growing reservoir of knowledge, where vocabulary adds volume, grammar shapes the container, and output waters the fields of fluency. It serves as both prototype and proof-of-concept for a learner-first, data-transparent alternative to mainstream apps."
  },

  orpheus: {
    portfolio: "Experimental audio interfaces and sonic interaction patterns - exploring the intersection of sound and digital experience.",
    full: "Project Orpheus is a lyrical lantern into the underworld of memory and emotion. By tracing the songs you play on repeat - the fixations, the phases, the sudden crescendos - it reveals the hidden narratives shaping your life. Like Orpheus descending with music as his guide, this framework transforms passive listening into active self-discovery through structured analysis, mythic symbolism, and reflective prompts. Thoughtfully designed for slow, deliberate exploration, it lets you chart emotional currents, pivotal transitions, and unmet needs inside a poetic, soul-centered map where every refrain becomes a clue to becoming more wholly yourself."
  },

  agoge: {
    portfolio: "A narrative research project exploring traditional rites of passage and authentic initiation for the modern world.",
    full: "Project Agoge is a narrative research project exploring how traditional rites transformed boys into grounded, resilient men. It blends cross-cultural history, mythic symbolism, and modern psychology to uncover timeless insights on confidence, moral strength, and belonging - laying the groundwork for a podcast and supporting framework that reimagines authentic initiation for today's world."
  },

  stark: {
    portfolio: "A data visualization PWA that unifies strength, endurance, mobility, and recovery into one elegant Fitness Index, complete with VO2 max and trend insights.",
    full: "Project STARK is a static Progressive Web App built with React and TailwindCSS, designed to turn physiological data into a clear visual story of fitness and recovery. It blends performance metrics, VO2 max estimation, and normative comparisons into an elegant offline dashboard that values transparency, simplicity, and privacy. All calculations are client-side, data is stored in IndexedDB, and users can install it as a PWA - no logins, no servers, just insight."
  },

  drop: {
    portfolio: "A mindful daily tracker for Sleep, Fitness, Mind, and Spirit - built as a pure vanilla JavaScript PWA that values quality, reflection, and sustained growth over streaks or perfection.",
    full: "Project drop is a minimalist, framework-free Progressive Web App designed for reflective self-tracking across four life domains: Sleep, Fitness, Mind, and Spirit. It integrates a philosophically grounded scoring model based on weighted trends and intrinsic motivation, emphasizing balance, consistency, and self-awareness. The app runs fully offline, includes IndexedDB auto-backups, and features an elegant interface optimized for touch and accessibility. It's a digital companion for maintaining mindful engagement with your growth - not a habit tracker, but a quality tracker."
  },

  punchbuggy: {
    portfolio: "A minimalist game PWA—no punchbacks, just instant feedback and genuine enjoyment.",
    full: "Project Punchbuggy is a game designed for pure play. It strips away gamification, accounts, and complexity to deliver immediate, honest fun. Built for quick sessions and infinite replayability, it proves that elegance and engagement don't require addiction mechanics."
  },

  hearth: {
    portfolio: "A calm, shared watchlist PWA that helps couples decide what to watch together without algorithmic noise.",
    full: "Project Hearth is a two-player watchlist designed for couples who want to decide what to watch without endless scrolling or recommendations. It's about shared intent, simple browsing, and actual human decision-making. Clean, focused, and built with intimacy in mind."
  },

  pushupchallenge: {
    portfolio: "A time-bound fitness app supporting the Pushup Challenge with tracking and community accountability.",
    full: "Project PushUp Challenge is a specialized app built for the annual Pushup Challenge. It provides clean tracking of daily progress, community leaderboards, and sustainable progression without gamification. Designed for participants who take the challenge seriously and want transparent data."
  },

  wrestle: {
    portfolio: "An offline-first training log for wrestlers—honest tracking without accounts or gamification.",
    full: "Project Wrestle is built for grapplers. It strips away social features and focuses on what matters: honest, structured tracking of techniques, matches, and improvements. No accounts, no notifications, no algorithms—just a reliable record of your training and progress."
  },

  narrative: {
    portfolio: "A fast, offline-first travel photo organizer that sorts images by story role instead of time.",
    full: "Project Narrative transforms how you organize travel photos. Instead of chronological sorting, it categorizes images by their role in your story: opening moments, key scenes, unexpected details, climax, reflection. It turns a photo library into a narrative arc, making memories more vivid and meaningful."
  },

  morpheus: {
    portfolio: "A personal archive for recording and reflecting on dreams, treating the unconscious as meaningful signal.",
    full: "Project Morpheus is a dream journal designed for serious reflection. It provides structure for recording dreams, tracking patterns, and exploring emotional resonance without interpretation. Built on the belief that dreams are psychological signal worth listening to—not for divination, but for self-understanding."
  },

  ecologicalconstellation: {
    portfolio: "A personality framework mapping Big Five traits to ecological strategies rather than fixed types.",
    full: "Project Ecological Constellation reimagines personality through an ecological lens. Instead of fixed types, it maps how Big Five traits function as adaptive strategies in different contexts. It reveals how your personality serves you and where it might limit you—emphasizing flexibility, context, and growth."
  }
};
