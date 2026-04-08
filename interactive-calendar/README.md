# 🌌 Lumina Workspace Calendar

Welcome to the **Lumina Workspace Calendar** – a beautifully crafted, highly interactive, wall-styled calendar built for modern workspaces. Designed to function as both a seamless productivity tool and a visually stunning aesthetic experience, this calendar natively blends single-day journaling, multi-day range planning, and dynamic thematic UI into one frictionless application.

## 📖 Comprehensive Overview

Lumina is not just a standard calendar; it's a dynamic workspace designed to handle complex note-taking seamlessly. By leveraging the power of React and Framer Motion, it offers a 3D-flipping, glassmorphism-inspired UI with ambient lighting and seasonal themes. 
Whether you are jotting down a quick reminder for tomorrow, or mapping out a 3-week continuous block for a development sprint, Lumina intuitively adapts perfectly to your workflow.

---

## ✨ Core Features inside Lumina

### 1. Dual-Mode Selection System 🎯
- **Single Mode:** Simply click on any day to open a flipped-in detailed view. Here you can write specific personal notes. If the day lands on a registered holiday, you will see a prominent red badge detailing the occasion right below the date!
- **Range Mode:** Toggle the "RANGE" button at the bottom (or hold `Shift + Click`) to drag and highlight a continuous block of cross-month dates. Perfect for planning vacations, sprints, or multi-day events.

### 2. Intelligent Notes Panel & Hover Mapping 📝
- When in Range Mode, a dedicated **Notes Panel** appears dynamically on the right side, showing a timeline of all the active notes currently spanning your month.
- **Hover Visualizations:** Hover your mouse over any saved note in the side panel, and watch the calendar instantly transition to display the exact physical bounds of that specific note!
- **Frictionless Reshaping:** Need to change the dates of a specific note? Click the "Edit" (pencil) icon on that note in the sidebar, and simply re-draw the dates forward or backward directly on the actual calendar layout. Your note text is preserved while its physical boundaries shift flawlessly.

### 3. Dynamic Seasonality & Ethereal Themes 🌸❄️
- As you navigate between from month to month, the calendar's backdrop, UI gradients, transparent overlays, and beautiful header images shift automatically. From frosty blues in January to warm autumn glows in October, Lumina keeps your workspace fresh.
- Included subtle "ambient orbs" rotate in the dark background for a modern, glassmorphic floating depth effect.

### 4. Interactive Details & Zoomable "Year" View 📅
- Utilize the clear `YEAR | MONTH` toggle located at the top navigation bar. Switch into "YEAR" view to zoom out and see all 12 months at a macroscopic level, then click any month to smoothly dive back in.
- Need to jump decades? Use the fast, hidden selector dropdowns hovering inside the aesthetic header image to warp backward or forward instantly.

### 5. Persistent Local Storage 💾
- Close the browser? Accidentally refresh? Power down your PC? No worries. All of your day notes and multi-day ranges are completely persistent, utilizing your browser's local `localStorage`. Your configurations and data will be exactly where you left them.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 19
- **Build Engine & Compilation:** Vite (Instantaneous Hot Module Replacement)
- **Styling Architecture:** Tailwind CSS v4 (Handling all highly complex utility coloring, backdrop-filtering, and responsive fluid styling)
- **Animation Framework:** Framer Motion (Orchestrating the fluid 3D UI flips, modal presence popups, and sliding panel animations)
- **Data Handling:** Vanilla JavaScript and embedded `localStorage`

---

## 🚀 Getting Started

Want to run Lumina Workspace Calendar on your local machine? Follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with `npm`.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/narayan123git/tuf-sde-intern-project.git
   ```
2. **Navigate into the directory:**
   ```bash
   cd interactive-calendar
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Spin up the development server:**
   ```bash
   npm run dev
   ```
5. Open your browser and head to the local URL (usually `http://localhost:5173`) to experience Lumina.

---

## 📚 Built-In Application Guide 
If you ever get lost, simply click the **"ℹ️ GUIDE"** button located cleanly at the very top of the calendar interface during runtime. It launches an internal modal containing rich instructions detailing exactly how to use shift-clicks, execute single clicks, edit note bounds, and fluidly navigate the system.

---
*Crafted carefully for productivity, style, and extreme interactivity.* ✨
