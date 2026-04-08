import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCalendar } from '../../hooks/useCalendar';
import { useDateRange } from '../../hooks/useDateRange';
import { formatDateForUI, getActiveNoteKey } from '../../utils/dateHelpers';
import Header from './Header';
import CalendarGrid from './CalendarGrid';
import NotesPanel from '../Notes/NotesPanel';

const monthVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const Calendar = () => {
  const {
    currentDate,
    currentYear,
    currentMonth,
    currentTheme,
    calendarDays,
    isAnimating,
    changeMonth,
    handleTouchStart,
    handleTouchEnd,
  } = useCalendar();

  const {
    startDate,
    endDate,
    hoverDate,
    selectionMode,
    setHoverDate,
    selectSingleMode,
    selectRangeMode,
    applyPreset,
    clearHover,
    handleDayClick,
    handleDayDoubleClick,
    handleKeyDown,
    activeRangeLabel,
  } = useDateRange({ calendarDays, isAnimating });

  const [notesData, setNotesData] = useLocalStorage('calendar-notes-advanced', {});

  const activeNoteKey = useMemo(() => getActiveNoteKey({ startDate, endDate, currentDate }), [currentDate, endDate, startDate]);
  const noteValue = notesData[activeNoteKey] || '';

  const title = useMemo(() => {
    if (startDate && endDate) return `${formatDateForUI(startDate)} - ${formatDateForUI(endDate)}`;
    if (startDate) return formatDateForUI(startDate);
    return 'General Memos';
  }, [endDate, startDate]);

  const placeholder = useMemo(() => {
    if (startDate && endDate) return `Planning a trip between ${formatDateForUI(startDate)} and ${formatDateForUI(endDate)}?`;
    if (startDate) return `What's the plan for ${formatDateForUI(startDate)}?`;
    return 'Write down your overarching goals for this month...';
  }, [endDate, startDate]);

  const rangeLabel = useMemo(() => {
    if (startDate && endDate) return `${formatDateForUI(startDate)} - ${formatDateForUI(endDate)}`;
    if (startDate) return formatDateForUI(startDate);
    return 'Not selected';
  }, [endDate, startDate]);

  const handleNoteChange = (event) => {
    setNotesData((previousNotes) => ({
      ...previousNotes,
      [activeNoteKey]: event.target.value,
    }));
  };

  return (
    <div className="min-h-screen wall-bg flex items-center justify-center p-4 sm:p-10 lg:p-14 overflow-hidden transition-colors duration-700" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb ambient-orb-left" />
        <div className="ambient-orb ambient-orb-right" />
      </div>

      <div className="relative w-full max-w-5xl calendar-shell rounded-2xl overflow-hidden shadow-[0_30px_120px_-20px_rgba(2,6,23,0.85)] mt-16 mb-8 border border-slate-700/40">
        <div className="absolute -top-28 left-0 right-0 flex justify-between px-12 sm:px-24 z-40 pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="hanger-pin" />
            <div className="hanger-line" />
            <div className="hanger-knot" />
          </div>
          <div className="flex flex-col items-center">
            <div className="hanger-pin" />
            <div className="hanger-line" />
            <div className="hanger-knot" />
          </div>
        </div>

        <div className="absolute -top-4 left-0 right-0 flex justify-around px-8 sm:px-16 z-30 pointer-events-none">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={`coil-${index}`} className="spiral-loop shadow-xl shadow-black/40" />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-${currentYear}-${currentMonth}`}
            className="relative"
            variants={monthVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Header
              currentDate={currentDate}
              currentTheme={currentTheme}
              onPreviousMonth={() => changeMonth(-1)}
              onNextMonth={() => changeMonth(1)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="calendar-binding-strip" />

        <AnimatePresence mode="wait">
          <motion.section
            key={`body-${currentYear}-${currentMonth}`}
            className={`flex flex-col lg:flex-row gap-0 bg-slate-950/55 transform-gpu ${isAnimating ? 'calendar-page-turn' : ''}`}
            variants={monthVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <NotesPanel
              currentTheme={currentTheme}
              title={title}
              placeholder={placeholder}
              value={noteValue}
              onChange={handleNoteChange}
              selectionMode={selectionMode}
              rangeLabel={rangeLabel}
              activeRangeLabel={activeRangeLabel}
            />

            <CalendarGrid
              calendarDays={calendarDays}
              currentTheme={currentTheme}
              selectionMode={selectionMode}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              notesData={notesData}
              isAnimating={isAnimating}
              onMouseEnter={setHoverDate}
              onMouseLeave={clearHover}
              onDayClick={handleDayClick}
              onModeChange={(action) => {
                if (action === 'single-mode') selectSingleMode();
                if (action === 'range-mode') selectRangeMode();
              }}
              onPresetSelect={applyPreset}
              onDoubleClick={handleDayDoubleClick}
              onKeyDown={handleKeyDown}
            />
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar;
