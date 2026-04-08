import React from 'react';
import { motion } from 'framer-motion';

const Header = React.memo(function Header({ currentDate, currentTheme, onPreviousMonth, onNextMonth }) {
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <section className={`relative h-64 sm:h-96 w-full ${currentTheme.colors.bg} overflow-hidden z-10`}>
      <img src={currentTheme.image} alt="Calendar mood background" className="absolute inset-0 w-full h-full object-cover wall-hero-image" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
      <div className={`absolute bottom-0 left-0 w-full h-1/3 ${currentTheme.colors.overlay} opacity-95 transition-colors duration-300`} />

      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <button type="button" onClick={onPreviousMonth} className="calendar-nav-btn">&larr;</button>
        <button type="button" onClick={onNextMonth} className="calendar-nav-btn">&rarr;</button>
      </div>

      <motion.div
        className="absolute bottom-7 left-8 text-white text-left z-20 drop-shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-200/90 font-semibold mb-2">Ethereal Workspace Calendar</p>
        <h3 className="text-3xl sm:text-5xl font-black mb-1 tracking-tight leading-none font-headline bg-gradient-to-r from-indigo-100 via-violet-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(129,140,248,0.35)]">
          {monthName}
        </h3>
        <h2 className="text-xl sm:text-3xl font-light tracking-[0.12em] text-indigo-200/95">{currentDate.getFullYear()}</h2>
      </motion.div>
    </section>
  );
});

export default Header;
