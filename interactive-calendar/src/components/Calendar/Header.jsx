import React from 'react';
import { motion } from 'framer-motion';

const Header = React.memo(function Header({ currentDate, currentTheme, onPreviousMonth, onNextMonth, onChangeYear, onChangeMonth }) {
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-200/90 font-semibold mb-2">Lumina Workspace Calendar</p>
        <div className="flex items-baseline gap-3 mb-1">
          <select
            value={currentDate.getMonth()}
            onChange={(e) => onChangeMonth?.(Number(e.target.value))}
            className="bg-slate-900/60 border border-white/20 rounded-lg px-2 py-1 text-xs font-semibold text-slate-200 hover:border-white/40 focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-sm cursor-pointer"
            title="Select Month"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i} className="text-slate-900">
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={currentDate.getFullYear()}
            onChange={(e) => onChangeYear?.(Number(e.target.value))}
            className="bg-slate-900/60 border border-white/20 rounded-lg px-2 py-1 text-xs font-semibold text-slate-200 hover:border-white/40 focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-sm cursor-pointer"
            title="Select Year"
          >
            {Array.from({ length: 20 }, (_, i) => currentDate.getFullYear() - 10 + i).map(year => (
              <option key={year} value={year} className="text-slate-900">{year}</option>
            ))}
          </select>
        </div>
      </motion.div>
    </section>
  );
});

export default Header;
