import React from 'react';
import { WEEKDAY_LABELS } from '../../constants/calendar.constants';
import { getDayDisplayState } from '../../utils/dateHelpers';
import DateCell from './DateCell';

const CalendarGrid = React.memo(function CalendarGrid({
  calendarDays,
  currentTheme,
  selectionMode,
  startDate,
  endDate,
  hoverDate,
  notesData,
  isAnimating,
  onMouseEnter,
  onMouseLeave,
  onDayClick,
  onModeChange,
  onPresetSelect,
  onDoubleClick,
  onOpenDetails,
  onKeyDown,
}) {
  return (
    <div className="lg:w-[66%] z-30 flex flex-col p-6 sm:p-8 order-1 lg:order-1 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex gap-2 mb-2 bg-gray-800/80 p-1 rounded-full shadow-inner border border-white/10 backdrop-blur-md bg-white/5 transition-all">
          <button
            type="button"
            onClick={() => onModeChange('single-mode')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${selectionMode === 'single' ? currentTheme.colors.selectedBg + ' text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Single Day
          </button>
          <button
            type="button"
            onClick={() => onModeChange('range-mode')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${selectionMode === 'range' ? currentTheme.colors.selectedBg + ' text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Date Range
          </button>
        </div>

        <p className="text-[11px] text-gray-500 italic text-center h-4">
          {selectionMode === 'single'
            ? 'Click any day to view or add its specific notes.'
            : 'Click a start day, then an end day to mark a continuous event.'}
        </p>
      </div>

      {selectionMode === 'range' && (
        <div className="flex gap-2 justify-center mb-4 animate-[fadeIn_0.3s_ease-in-out]">
          <button type="button" onClick={() => onPresetSelect(7)} className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 hover:text-blue-300 transition-colors duration-300">Next 7 Days</button>
          <span className="text-gray-700 text-[10px]">|</span>
          <button type="button" onClick={() => onPresetSelect(14)} className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 hover:text-blue-300 transition-colors duration-300">Next 14 Days</button>
        </div>
      )}

      <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-bold text-gray-500 mb-5 tracking-[0.18em] uppercase">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className={label === 'SAT' || label === 'SUN' ? `${currentTheme.colors.text} transition-colors duration-700` : ''}>{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center relative p-2 rounded-2xl border border-white/5 bg-gray-800/40 backdrop-blur-sm" onMouseLeave={onMouseLeave}>
        {calendarDays.map((day, index) => {
          const displayState = getDayDisplayState({
            day,
            startDate,
            endDate,
            hoverDate,
            selectionMode,
          });

          const dayNoteKey = day.date.toISOString();
          const dayNotes = notesData[dayNoteKey];
          let noteLength = 0;
          if (Array.isArray(dayNotes)) {
            noteLength = dayNotes.length * 50; // multiply to trigger heatmap logic
          } else if (typeof dayNotes === 'string') {
            noteLength = dayNotes.trim().length;
          }

          return (
            <DateCell
              key={day.date.toISOString()}
              index={index}
              day={day}
              currentTheme={currentTheme}
              displayState={displayState}
              selectionMode={selectionMode}
              isAnimating={isAnimating}
              noteLength={noteLength}
              onMouseEnter={onMouseEnter}
              onClick={onDayClick}
              onOpenDetails={onOpenDetails}
              onDoubleClick={onDoubleClick}
              onKeyDown={onKeyDown}
            />
          );
        })}
      </div>
    </div>
  );
});

export default CalendarGrid;
