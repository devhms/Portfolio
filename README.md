# Senior Frontend Architect Portfolio

A high-performance, immersive developer portfolio built with a focus on precision engineering, meaningful motion, and atomic design principles.

![Portfolio Preview](https://devhms.vercel.app)

## 🏗 Architectural Foundation

This project is built on a modern, scalable stack designed for maximum performance and fluid user experiences.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) for optimized SSR and routing.
- **3D Engine**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/) for hardware-accelerated visuals.
- **Motion**: [GSAP](https://gsap.com/) for complex timelines and [React Spring](https://www.react-spring.dev/) for physics-based interactions.
- **State**: [Zustand](https://docs.pmnd.rs/zustand) for lightweight, reactive global state management.
- **Styling**: Vanilla CSS & Tailwind CSS for a utility-first, performant UI.

## 🚀 Key Features

### 1. Immersive 3D Interactions
- **Optimized R3F Scene**: Uses `MeshMatcapMaterial` and specific GL parameters to achieve high visual fidelity with zero lighting overhead.
- **Dynamic Magnetic Physics**: Global [data-magnetic] attribute system that calculates center offsets and applies GSAP lerping for a premium "sticky" cursor feel.
- **Debug Mode**: Toggle wireframes, rolling average FPS, and live store state via the `#debug` hash.

### 2. Interactive Terminal Interface
- **Recursive Typewriter**: A custom hook-based CLI simulation with precise character-speed control.
- **History & Logic**: Full command history navigation (Up/Down arrows) and strict regex-validated contact flow.

### 3. Performance First
- **Core Web Vitals**: Optimized for LCP and CLS via font preconnecting, image format prioritization (AVIF/WebP), and smart code-splitting.
- **Accessibility**: ARIA-compliant interactive elements, semantic HTML5 structure, and support for `prefers-reduced-motion`.

## 🛠 Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 💎 Engineering Standards
- **Atomic Components**: Highly modular, reusable component architecture.
- **Typescript**: Strict type safety across the entire codebase.
- **Vercel Best Practices**: Implements `text-wrap: balance`, tabular numbers, and optimized CSS delivery via `critters`.

---
*Created with intent by [Ibrahim Salman](https://github.com/hafizmuhammadibrahimsalman-create)*
