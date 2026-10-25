import { Project, BlogPost, Experience } from "./types";

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Lead Creative Technologist & Tech Lead",
    company: "Convergence Studio",
    location: "Paris, France / Remote",
    period: "2024 - Present",
    description: [
      "Pioneered spatial interactive UI systems and WebGL web portals for top luxury brand campaigns (LVMH, Cartier).",
      "Mentored a cross-functional squad of 5 developers and 3 visual designers, establishing automated Figma-to-code compiler pipelines.",
      "Re-engineered rendering engines to stream telemetry data at 120 FPS inside complex dashboard layers."
    ],
    skills: ["WebGL", "Three.js", "TypeScript", "Performance", "Team Leadership", "Figma API"]
  },
  {
    id: "exp2",
    role: "Senior Design Engineer & Developer",
    company: "Synthesize Labs",
    location: "San Francisco, CA / Hybrid",
    period: "2022 - 2024",
    description: [
      "Owned the core design system components used by 12+ product engines, driving 99.8% modular adoption.",
      "Collaborated deep in the trenches on WebAssembly data parsing components to render AST structural charts instantly.",
      "Crafted custom micromotion hooks and physics-inspired canvas components optimized for ultra-low latency inputs."
    ],
    skills: ["React", "Rust/WASM", "TailwindCSS", "Motion Design", "CI/CD Orchestration"]
  },
  {
    id: "exp3",
    role: "Full-Stack UI Engineer",
    company: "Metis Digital",
    location: "Paris, France",
    period: "2020 - 2022",
    description: [
      "Built, designed, and deployed bespoke SaaS applications focused on complex grid visualizations and collaborative real-time whiteboards.",
      "Optimized load times and reduced bundle sizes by 42% through lazy bundling and component shaking strategy.",
      "Collaborated on editorial visual branding guidelines to ensure Web Content Accessibility Guidelines (WCAG) AAA contrast compliance."
    ],
    skills: ["React", "Express", "D3.js", "Jest", "CSS Grid", "Accessbility systems"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "Aether Telemetry Visualizer",
    subtitle: "High-Performance Data Coordinates Engine",
    description: "An advanced network tracking dashboard mapping live server-side coordinates into fluid visual WebGL representations.",
    longDescription: "Aether is a live client-side telemetry module that streams and models up to 100,000 parallel sensor coordinate elements dynamically. Standard SVG libraries could not handle the processing, so we built a custom hardware-accelerated vertex layer with D3 scaling coordinates and WebGL shaders. Users can trace routes, inspect server loads, and toggle simulated package delivery channels instantly.",
    category: "Engineering",
    tags: ["React", "TypeScript", "WebGL", "D3.js", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metric: "120 FPS under 100k streams",
    role: "Lead Engineer & Graphics Architect",
    timeline: "4 Months",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "proj2",
    title: "Vivid Algorithmic Posters",
    subtitle: "Mathematical Typography Canvas Composer",
    description: "An interactive editorial workspace translating modular baseline coordinates into dynamic CSS layouts.",
    longDescription: "Vivid introduces dynamic layouts that recalculate the visual rhythm based on browser dimensions using geometric ratios. By combining the Golden Ratio with rigid Swiss design constraints, users can design, compose, and export high-resolution posters with perfectly scaled typography elements. Built using React Canvas and SVG layers.",
    category: "Design",
    tags: ["UI/UX Design", "Figma Sync", "SVG Math", "Swiss School"],
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80",
    metric: "14k+ exports worldwide",
    role: "Principal Visual Designer",
    timeline: "3 Months",
    githubUrl: "https://github.com"
  },
  {
    id: "proj3",
    title: "Synergy Friction Canvas",
    subtitle: "Responsive WASM Physics Playground",
    description: "An interactive, web-based physics model simulating realistic fluid and spring mechanical components.",
    longDescription: "Synergy bridges advanced mechanics calculations compiled in Rust and exposed via WebAssembly to React UI trigger layers. This allows users to test kinetic physics constraints, rubber-band spring elements, and responsive micro-actions without compromising browser main-thread frame rates.",
    category: "Hybrid",
    tags: ["React", "Rust/WASM", "Motion Canvas", "Mechanical UX"],
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    metric: "0.2ms trigger latency",
    role: "R&D Prototype Architect",
    timeline: "6 Months",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog1",
    title: "The Architecture of Kinetic Typography",
    excerpt: "Why the rhythm of typography in a digital space is bound directly to performance constraints, and how CSS baseline metrics shape interactions.",
    content: `
Typography in high-end web portals is far more than selecting a face and a weight—it is about timing, alignment, and physical response. 

## The Physics of Type

In static design, standard sizes guide hierarchy. In interactive spaces, typography must respond to user actions with realistic inertia. When a user hovers or scrolls, letters should stretch or scale according to velocity curves.

To implement this perfectly:
1. **Never use generic CSS transitions** like 'all 0.3s'—it destroys character legibility during transformation. Use cubic bezier curves matching natural pendulum actions.
2. **Synchronize line heights** with baseline metrics. If headings shift, the alignment should remain rigid across neighboring elements.
3. **Double-buffer letter actions**: Animate text by operating on cloned letter vectors inside local containers to prevent redraw friction on parent elements.

True typographic engineering preserves the integrity of letter strokes while introducing playful, responsive layouts.
    `,
    date: "May 24, 2026",
    readTime: "4 min read",
    category: "Typography",
    tags: ["Design Systems", "Typography", "CSS Performance"]
  },
  {
    id: "blog2",
    title: "Edge-State Compilation",
    excerpt: "Unpacking how compiling heavy data visualizers in WebAssembly removes UI jitter, allowing React trees to react to dense network data streams.",
    content: `
We often run into barriers trying to process big data sets within simple React states. Let's research how compiling data parsing routines inside Rust removes rendering lag.

## The Problem with JavaScript Trees

When streaming heavy coordinate packages over WebSockets, the main browser thread handles parsing JSON, updating component states, and recalculating CSS layout trees. Once you hit 10,000 updates per second, frame drops are guaranteed.

## The WebAssembly Alternative

By offloading calculations to a dedicated memory buffer in WebAssembly:
- Data packages are processed in a low-level binary buffer.
- Coordinate layouts are calculated outside of JavaScript.
- Direct pointer operations feed values into WebGL canvas context layers.

This architectural shift guarantees that your React UI remains light, responsive, and ready while the background manages complex real-time operations.
    `,
    date: "April 18, 2026",
    readTime: "7 min read",
    category: "Engineering",
    tags: ["Rust", "WASM", "React", "Optimization"]
  }
];
