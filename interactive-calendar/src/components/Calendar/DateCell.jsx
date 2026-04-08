import React from 'react';
import { motion } from 'framer-motion';

const DateCell = React.memo(function DateCell({
  day,
  index,
  currentTheme,
  displayState,
  selectionMode,
  isAnimating,
  hasNote,
  onMouseEnter,
  onClick,
  onDoubleClick,
  onKeyDown,
}) {
  const baseClasses = 'w-9 h-9 sm:w-11 sm:h-11 mx-auto flex items-center justify-center font-semibold transition-all duration-300 ease-out cursor-pointer relative z-10 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-400/80 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full';

  const cellClasses = (() => {
    if (!day.isCurrentMonth) {
      return `${baseClasses} text-slate-600/80 bg-transparent cursor-not-allowed`;
    }

    if (displayState.isStart || displayState.isEnd) {
      return `${baseClasses} ${currentTheme.colors.selectedBg} text-white rounded-full shadow-[0_0_26px_rgba(99,102,241,0.55)] border border-white/20`;
    }

    if (displayState.isBetween || displayState.isHovering) {
      return `${baseClasses} ${currentTheme.colors.highlightBg} ${currentTheme.colors.highlightText} rounded-full backdrop-blur-[1px]`;
    }

    if (day.isToday) {
      return `${baseClasses} ${currentTheme.colors.todayRing} text-white bg-white/5 rounded-full animate-[todayPulse_2.2s_ease-in-out_infinite]`;
    }

    return `${baseClasses} text-slate-200 hover:bg-white/12 rounded-full`;
  })();

  return (
    <motion.div
      className="relative group py-1 flex flex-col items-center"
      onMouseEnter={() => onMouseEnter(day.date)}
      onClick={(event) => onClick(day, event)}
      onDoubleClick={(event) => onDoubleClick(day, event)}
      onKeyDown={(event) => onKeyDown(event, day, index)}
      layout
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {displayState.isStart && (displayState.isEnd || displayState.isHovering) && selectionMode === 'range' && (
        <motion.div
          layout
          className={`absolute top-1 right-0 w-1/2 h-[calc(100%-8px)] ${currentTheme.colors.highlightBg} -z-0 transition-all duration-300 rounded-r-full`}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}

      {displayState.isEnd && selectionMode === 'range' && (
        <motion.div
          layout
          className={`absolute top-1 left-0 w-1/2 h-[calc(100%-8px)] ${currentTheme.colors.highlightBg} -z-0 transition-all duration-300 rounded-l-full`}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}

      <motion.button
        type="button"
        className={cellClasses}
        tabIndex={day.isCurrentMonth ? 0 : -1}
        aria-label={day.isCurrentMonth ? day.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
        aria-selected={displayState.isSelected}
        data-index={index}
        whileHover={day.isCurrentMonth && !isAnimating ? { scale: 1.05 } : undefined}
        whileTap={day.isCurrentMonth && !isAnimating ? { scale: 0.96 } : undefined}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {day.dayNumber}
      </motion.button>

      <div className="absolute bottom-0 flex gap-1">
        {day.holiday && (
          <motion.div className="group/holiday relative flex justify-center" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.colors.holidayDot} shadow-sm transition-colors duration-700`} />
            <div className="absolute bottom-full mb-1 w-max px-2 py-1 bg-slate-900 text-slate-100 text-[10px] font-medium rounded shadow-xl opacity-0 group-hover/holiday:opacity-100 transition-opacity z-50 pointer-events-none transform -translate-y-1 border border-slate-700">
              {day.holiday}
            </div>
          </motion.div>
        )}

        {hasNote && !displayState.isStart && !displayState.isEnd && (
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.7)]" title="Contains notes" />
        )}
      </div>
    </motion.div>
  );
});

export default DateCell;
