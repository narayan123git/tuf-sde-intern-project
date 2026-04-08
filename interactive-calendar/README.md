# Lumina Workspace Calendar 📅✨

A beautifully interactive and highly customizable wall-styled calendar built with React, Vite, and Tailwind CSS. The application is designed to act as a seamless workspace tool, featuring single-day journaling, multi-day range notes, local data persistence, and a highly polished UI.

## Features 🚀
- **Single & Range Mode Selection:** Switch between "SINGLE" and "RANGE" notes dynamically. Use single mode to drop notes on particular days, or switch to Range mode and hold `Shift + Click` to bracket multiple cross-month days for trips or prolonged projects.
- **Note Span Adjustments:** Edit range boundaries effortlessly! In Range Mode, click the edit button on an active note and simply re-click the calendar dates to reshape the span without losing your text.
- **Hover Visualizations:** See precisely where notes are located by hovering over them in the Notes Panel to trace their exact date bounds on the calendar.
- **Dynamic Ethereal UI:** Watch the calendar shift themes automatically using deep background gradients styled specifically for each unique month. Includes subtle ambient orbs!
- **Interactive Details Modal:** A smooth, flip-animated modal that opens details down to the day level, including highlighted tags if the day is an official Holiday.
- **Built-in Guide System:** A custom tutorial guide explains the calendar's inner workings right out of the box.

## How to Use 💡
1. **Navigating the Calendar:** Scroll through years and months instantly utilizing the native dropdowns hidden within the bottom-left header modal. Switch to 'YEAR' mode directly at the calendar's top peak.
2. **Adding A Note:** Click any particular day to throw down notes. If in "RANGE" mode, click and drag using Shift-Click! 
3. **Updating Holiday/Range Data:** If your note involves a holiday, you'll see a red badge tagging that day!
4. **Data Persistence:** Close the tab? Walk away? Not a problem, notes are automatically persisted natively to the browser's `localStorage`.

## Tech Stack 🛠️
- **Frontend:** React 19, JavaScript.
- **Styling:** Tailwind CSS v4, custom keyframe flip animations.
- **Build Tool:** Vite for instantaneous Hot Module Replacements.
- **Animation:** \`framer-motion\` applied to modal and panel transitions.

## Quick Start 🚀
\`\`\`bash
# Install dependencies
npm install

# Start the dev server
npm run dev
\`\`\`

---
*Created carefully with the developer experience in mind.* 🌌
