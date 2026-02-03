# 🌸 Flower Lab - Landing Page

A beautiful, responsive landing page for a flower store, built with React + Vite + TypeScript + Tailwind CSS.

**Design Source:** [Figma - Flowers Store Landing Page](https://www.figma.com/design/dUYrknUsALSVXx5hrvLStn/Flowers-Store-Landing-Page-%7C-Free-E-Commerce-Template--Community-)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   │   ├── Button.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ProductCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── FeatureCard.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/        # Feature/Section components
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── BestsellersSection.tsx
│       ├── DiscountBanner.tsx
│       ├── ReviewsSection.tsx
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       ├── AppDownloadSection.tsx
│       └── InstagramSection.tsx
├── pages/
│   └── HomePage.tsx
├── styles/
│   ├── tokens.css       # Design tokens from Figma
│   └── globals.css      # Global styles + Tailwind
├── App.tsx
└── main.tsx
```

## 🎨 Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#282C2F` | Primary dark color, buttons, text |
| `--color-white` | `#FFFFFF` | Backgrounds |
| `--color-gray` | `#737373` | Secondary text |
| `--color-gray-light` | `#F5F1ED` | Background cream |
| `--color-accent` | `#F9E7B9` | Accent yellow |

### Typography
| Font | Usage |
|------|-------|
| **Lora** | Headings, display text |
| **Lato** | Body text, buttons, navigation |

## 🔧 Tech Stack

- **React 18** - UI Library
- **Vite 5** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling

## 📱 Responsive Design

Three breakpoints:
- **Mobile (320px+)**: Single column layout
- **Tablet (600px+)**: Two column grid
- **Desktop (1024px+)**: Full layout with navigation

---

Made with ❤️ using React, Vite, and Tailwind CSS
