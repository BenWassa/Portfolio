/* project-descriptions.js */

/**
 * Complete project data for the portfolio
 * Contains all project information including metadata, themes, and descriptions
 */

export const projectsData = [
  {
    title: "Skywalker",
    tag: "Movie-Narrative Guide",
    desc: "An immersive mythic companion for personal reflection and growth, using Luke Skywalker’s journey as a timeless mirror. Transforms film narrative into guided self-discovery through prompts and symbolism.",
    href: "https://benwassa.github.io/Skywalker/",
    img: "Project_Images/Skywalker.png",
    alt: "Skywalker — Personal systems & UX playground",
    theme: {
      primary: "#3B82F6", // accent-blue from Skywalker repo
      secondary: "#1F2937", // surface-elevated
      tertiary: "#151720", // secondary-background
      bg: "#0A0B14" // primary-background
    },
    status: "green"
  },
  {
    title: "Sankofa",
    tag: "Scientific-Narrative Guide",
    desc: "A unified framework addressing the Modern Meaning Crisis — weaving mythic storytelling, cultural critique, and research into emotionally resonant narratives of purpose, soul, and moral compass.",
    href: "https://benwassa.github.io/sankofa/",
    img: "Project_Images/Sankofa.png",
    alt: "Sankofa — Mythic psychology narrative site",
    theme: {
      primary: "#d4af37", // accent-gold from Sankofa repo
      secondary: "#2d2520", // papyrus-dark
      tertiary: "#1a1a1a", // secondary-dark
      bg: "#0a0a0a" // primary-dark
    },
    status: "green"
  },
  {
    title: "Dukkha", 
    tag: "Scientific-Narrative Guide",
    desc: "A field guide and manifesto on dopamine as a cultural force. Exposes misconceptions, charts how temptation systems shape modern crises, and offers practical tools for clarity, calm, and autonomy.",
    href: "https://benwassa.github.io/dukkha/",
    img: "Project_Images/Dukkha.png",
    alt: "Dukkha — Digital well-being & dopamine craft",
    theme: {
      primary: "#10b981", // green for "truth" sections from Dukkha
      secondary: "#1f2937", // dark secondary
      tertiary: "#111827", // darker tertiary
      bg: "#0f172a" // very dark background
    },
    status: "yellow"
  },
  {
    title: "Vox",
    tag: "Language Learning Tracker",
    desc: "Vox is a lean, offline-first vocabulary tracker designed for focused study in Spanish and Mandarin. Featuring CSV import and export, practice counters, and responsive table and card views, making it easy to manage and review progress.",
    href: "https://benwassa.github.io/Vox_Showcase/",
    img: "Project_Images/Vox.png",
    alt: "Vox — Language-learning dashboard",
    theme: {
      primary: "#3b82f6", // primary-color from Vox repo
      secondary: "#1f2937", // text-color-primary adapted to dark
      tertiary: "#374151", // darker gray
      bg: "#111827" // dark background adaptation
    },
    status: "yellow"
  },
  {
    title: "Orpheus",
    tag: "Music Research Tool",
    desc: "A lyrical lantern into memory and emotion, decoding the themes in your listening patterns. Transforms music into a framework for reflection, self-discovery, and mapping emotional currents.",
    href: null,
    img: "Project_Images/Orpheus.png", 
    alt: "Orpheus — Audio experiments",
    theme: {
      primary: "#8B5CF6", // purple accent for music/audio theme
      secondary: "#1e1b4b", // deep purple secondary
      tertiary: "#1e293b", // slate tertiary
      bg: "#0f0f23" // very dark purple-tinted bg
    },
    status: "red"
  },
  {
    title: "Agoge",
    tag: "Scientific-Narrative Guide",
    desc: "A cross-cultural study of rites of passage. Blends history, myth, psychology, and research into a modern narrative framework reimagining authentic initiation for resilience and transformation.",
    href: null,
    img: "Project_Images/Agoge.png", 
    alt: "Agoge — Rites of passage research",
    theme: {
      primary: "#dc2626", // strong red for Spartan/warrior theme
      secondary: "#7f1d1d", // darker red secondary
      tertiary: "#1c1917", // warm dark tertiary
      bg: "#0c0a09" // very dark warm background
    },
    status: "red"
  }
];

export const projectDescriptions = {
  skywalker: {
    portfolio: "A comprehensive UX playground for personal systems and compounding routines with advanced interaction patterns.",
    full: "The Skywalker Quest Map is your immersive mythic companion for personal reflection and philosophical growth, using Luke Skywalker's journey as a timeless mirror for your own. It transforms passive listening into active self-discovery through structured prompts, symbolic insight, and guided questions — weaving classic mythic stages into modern psychological reflection. Thoughtfully designed for slow, deliberate use, it invites you to map your inner conflicts, inheritances, shadows, and redemptions, all within a poetic, soul-centered framework that honors myth not as fantasy but as a living guide for becoming."
  },

  sankofa: {
    portfolio: "An immersive mythic psychology narrative experience with podcast scaffolding in a living document environment.",
    full: "Project Sankofa is your overarching narrative framework to tackle the Modern Meaning Crisis. It weaves mythic storytelling, cultural critique, and deep research into a unified exploration of how contemporary life lost cohesive meaning — and how people might find soul, purpose, and moral compass again. Sankofa ties together your dopamine work, rites of passage concepts, and narrative design into a podcast or multimedia experience that blends rigorous insight with emotionally resonant mythic arcs."
  },

  dukkha: {
    portfolio: "A comprehensive field guide for digital discipline—featuring live HTML experiences & systematic UX patterns.",
    full: "Project Dukkha is your field guide and manifesto for understanding dopamine not just as a neurotransmitter but as a living, mythic force shaping human culture, motivation, habits, and collective drift. It aims to reveal misconceptions, chart how dopamine-driven systems fuel modern temptations and crises, and offer practical tools to navigate daily life with more clarity and autonomy."
  },

  vox: {
    portfolio: "Advanced language-learning dashboard with progress tracking, analytics, and adaptive learning algorithms (in development).",
    full: "Project Vox is your pilot framework for building a rigorous, self-directed language learning system. It emphasizes grammar mastery, transparent vocab tracking, and real-world sentence production—eschewing gamified fluff in favor of deliberate, adaptive practice. Designed to function fully offline with clean JSON architecture, Vox visualizes progress like a growing reservoir of knowledge, where vocabulary adds volume, grammar shapes the container, and output waters the fields of fluency. It serves as both prototype and proof-of-concept for a learner-first, data-transparent alternative to mainstream apps."
  },

  orpheus: {
    portfolio: "Experimental audio interfaces and sonic interaction patterns — exploring the intersection of sound and digital experience.",
    full: "Project Orpheus is your lyrical lantern into the underworld of memory and emotion. By tracing the songs you play on repeat—the fixations, the phases, the sudden crescendos—it reveals the hidden narratives shaping your life. Like Orpheus descending with music as his guide, this framework transforms passive listening into active self-discovery through structured analysis, mythic symbolism, and reflective prompts. Thoughtfully designed for slow, deliberate exploration, it lets you chart emotional currents, pivotal transitions, and unmet needs inside a poetic, soul-centered map where every refrain becomes a clue to becoming more wholly yourself."
  },

  agoge: {
    portfolio: "A narrative research project exploring traditional rites of passage and authentic initiation for the modern world.",
    full: "Project Agoge is a narrative research project exploring how traditional rites transformed boys into grounded, resilient men. It blends cross-cultural history, mythic symbolism, and modern psychology to uncover timeless insights on confidence, moral strength, and belonging — laying the groundwork for a podcast and supporting framework that reimagines authentic initiation for today's world."
  }
};

/* 
Usage examples:
- Import all project data: import { projectsData } from './project-descriptions.js'
- Portfolio cards: projectDescriptions.skywalker.portfolio
- Detailed view: projectDescriptions.skywalker.full
- All projects: Object.keys(projectDescriptions)
*/
