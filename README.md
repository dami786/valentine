# Valentine's Proposal Web App ❤️

A romantic, cute, and modern Valentine's proposal built with **Next.js (App Router)** and **Tailwind CSS**.

## Features

- **Landing page** with heading "Will You Be My Valentine, Savera? ❤️" and subtext "From the bottom of my heart"
- **Floating hearts** animation in the background
- **Yes 💖** button – shows full-screen success message with heart animation and confetti
- **No 😜** button – moves randomly on hover so it's hard to click
- Soft romantic gradient (pink, red, purple)
- Responsive layout for mobile and desktop
- Smooth animations via Framer Motion and CSS

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Framer Motion
- canvas-confetti
- TypeScript

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
valentine/
├── app/
│   ├── globals.css      # Global styles, gradients, keyframes
│   ├── layout.tsx       # Root layout, fonts
│   └── page.tsx         # Main proposal page
├── components/
│   ├── Confetti.tsx     # Confetti effect on "Yes"
│   └── FloatingHearts.tsx # Background floating hearts
├── tailwind.config.ts
├── package.json
└── README.md
```

## Build for Production

```bash
npm run build
npm start
```

Enjoy your special moment! 💕
