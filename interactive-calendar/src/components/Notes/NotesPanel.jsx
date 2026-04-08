import React from 'react';
import { motion } from 'framer-motion';

const NotesPanel = React.memo(function NotesPanel({
  currentTheme,
  title,
  placeholder,
  value,
  onChange,
  selectionMode,
  rangeLabel,
  activeRangeLabel,
}) {
  return (
    <div className="lg:w-[34%] flex flex-col p-6 sm:p-8 bg-slate-900/65 border-l-0 lg:border-l border-slate-700/50 order-2 lg:order-2 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.18em]">Timeline Notes</h4>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${currentTheme.colors.highlightBg} ${currentTheme.colors.highlightText} transition-colors duration-700 uppercase tracking-[0.15em]`}>
          {title}
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mb-4 leading-tight">
        {selectionMode === 'single'
          ? 'Notes are automatically saved to this specific date selection.'
          : 'Select a date range to save notes to that event.'}
      </p>

      <div className="space-y-2 mb-4">
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }} className="text-[11px] text-slate-300/90 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-900/50 transition-all duration-300 ease-out hover:border-indigo-400/40 hover:bg-indigo-500/10">
          Selection: {activeRangeLabel}
        </motion.div>
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }} className="text-[11px] text-slate-300/90 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-900/50 transition-all duration-300 ease-out hover:border-violet-400/40 hover:bg-violet-500/10">
          Range: {rangeLabel}
        </motion.div>
      </div>

      <div className="relative flex-grow min-h-[150px]">
        <textarea
          value={value}
          onChange={onChange}
          className="notebook-lines w-full h-full bg-slate-950/50 ring-1 ring-white/10 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)] text-slate-200 text-sm leading-[2rem] z-10 relative placeholder-slate-500 transition-all duration-300 ease-out"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
});

export default NotesPanel;
