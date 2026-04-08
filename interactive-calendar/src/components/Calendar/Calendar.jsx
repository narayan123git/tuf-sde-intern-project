import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCalendar } from '../../hooks/useCalendar';
import { useDateRange } from '../../hooks/useDateRange';
import { formatDateForUI, getActiveNoteKey } from '../../utils/dateHelpers';
import Header from './Header';
import CalendarGrid from './CalendarGrid';
import NotesPanel from '../Notes/NotesPanel';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const pageFlipVariants = {
  initial: (direction) => ({ opacity: 0, rotateX: direction > 0 ? 86 : -86, y: direction > 0 ? -14 : 14, scale: 0.99 }),
  animate: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  exit: (direction) => ({ opacity: 0, rotateX: direction > 0 ? -96 : 96, y: direction > 0 ? 20 : -20, scale: 0.985 }),
};

const YearView = ({ currentYear, calendarDays, onMonthClick }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-[60vh] overflow-y-auto custom-scrollbar">
      {months.map((month, i) => (
        <div key={month} onClick={() => onMonthClick(i)} className="bg-white/5 border border-white/10 rounded-xl p-4 glassmorphism cursor-pointer hover:border-blue-400/50 transition-colors">
          <h4 className="text-center text-sm font-bold text-blue-300 mb-2">{month} {currentYear}</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-[8px] text-gray-500">
            {['S','M','T','W','T','F','S'].map((d, di) => <div key={d+di}>{d}</div>)}
            {/* Mocking mini days for preview structure */}
            {Array.from({length: 31}).map((_, di) => (
              <div key={di} className="h-4 w-4 mx-auto flex items-center justify-center rounded-full text-slate-300 bg-white/5 hover:bg-blue-500/30 transition-colors">
                {di+1}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const DayDetailsModal = ({ dayDetails, notesData, setNotesData, onClose, currentTheme }) => {
  const dateKey = dayDetails.date.toISOString();
  const [inputText, setInputText] = useState('');
  
  // Safe default if not array
  const dayNotes = Array.isArray(notesData[dateKey]) ? notesData[dateKey] : [];

  const handleAddNote = () => {
    if (!inputText.trim()) return;
    const newNote = {
      id: generateId(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      updatedAt: new Date().toISOString()
    };
    setNotesData(prev => ({ ...prev, [dateKey]: [...(Array.isArray(prev[dateKey]) ? prev[dateKey] : []), newNote] }));
    setInputText('');
  };

  const handleDelete = (id) => {
    setNotesData(prev => ({ ...prev, [dateKey]: dayNotes.filter(n => n.id !== id) }));
  };

  // Find overlapping range notes
  const activeEvents = Object.entries(notesData).filter(([key, val]) => {
    if (key.includes('_to_') && typeof val === 'string') {
      const [startStr, endStr] = key.split('_to_');
      const start = new Date(startStr);
      const end = new Date(endStr);
      return dayDetails.date >= start && dayDetails.date <= end;
    }
    return false;
  }).map(([k, v]) => ({ key: k, text: v }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-800/60">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Day details
          </h3>
          <p className="text-xs text-slate-400 mt-1">{formatDateForUI(dayDetails.date)}</p>
          {dayDetails.holiday && (
            <div className="mt-2 inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg shadow-sm">
              <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">🎉 Holiday: {dayDetails.holiday}</span>
            </div>
          )}
          {dayDetails.holiday && (
            <div className="mt-2 inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg shadow-sm">
              <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">🎉 Holiday: {dayDetails.holiday}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm font-bold text-gray-200 bg-white/5 px-3 py-1 rounded-lg border border-white/10 shadow-sm">
            {currentTheme.weather}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition-colors border border-white/10">✕</button>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        {activeEvents.length > 0 && (
          <div className="flex flex-col gap-2">
             <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-widest border-b border-purple-500/20 pb-2">Active Events</h4>
             {activeEvents.map(evt => (
               <div key={evt.key} className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-100">
                  {evt.text}
               </div>
             ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">Notes & Context</h4>
          <div className="flex flex-col gap-2">
            {dayNotes.map(n => (
              <div key={n.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-start group hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-sm text-slate-200">{n.text}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{n.timestamp}</p>
                </div>
                <button onClick={() => handleDelete(n.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded">Delete</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddNote()} placeholder="New note..." className="flex-grow bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            <button onClick={handleAddNote} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Save</button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">Hourly Agenda (Static)</h4>
          <div className="flex flex-col gap-3">
            {['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'].map((time) => (
              <div key={time} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="text-xs font-bold text-blue-300 whitespace-nowrap pt-0.5 w-16">{time}</div>
                <div className="flex-grow">
                  <div className="h-4 w-3/4 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-slate-700/30 rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

const GuideModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
  >
    <div className="w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-4 relative my-8">
      <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition-colors border border-white/10">✕</button>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2">
        Lumina Workspace Guide
      </h3>
      <div className="text-sm text-slate-300 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        <section>
          <h4 className="font-semibold text-blue-400 mb-1">📅 Navigating the Calendar</h4>
          <p className="pl-4 border-l border-blue-500/20">Use the top-right arrows or bottom-left dropdowns to rapidly skip through Months and Years. Alternatively, switch to "YEAR" mode from the top-center toggle to see 12 months at once.</p>
        </section>
        <section>
          <h4 className="font-semibold text-blue-400 mb-1">📝 Single Day Notes</h4>
          <p className="pl-4 border-l border-blue-500/20">Click any specific date to open the Day Details window. Here you can write personal notes for that day. If it's a holiday, the holiday name will be displayed too!</p>
        </section>
        <section>
          <h4 className="font-semibold text-blue-400 mb-1">🎯 Range Selection Mode</h4>
          <p className="pl-4 border-l border-blue-500/20">Looking to plan a holiday or block off several days? Toggle the "RANGE" button below the calendar or use <kbd className="px-1 py-0.5 bg-slate-800 rounded">Shift + Click</kbd> to drag a continuous block of dates.</p>
        </section>
        <section>
          <h4 className="font-semibold text-blue-400 mb-1">🛠️ Editing Date Ranges</h4>
          <p className="pl-4 border-l border-blue-500/20">While in Range mode, your notes appear instantly in the right-side panel! Hover over any saved note to instantly visualize its span on the calendar. Need to shift the dates? Click the "Edit" (pencil) icon on that note, and re-draw the dates directly on the calendar to seamlessly move your note without retyping it.</p>
        </section>
        <section>
          <h4 className="font-semibold text-blue-400 mb-1">✨ Dynamic Themes</h4>
          <p className="pl-4 border-l border-blue-500/20">As you navigate through the year, the calendar dynamically shifts its background and colors to match the seasonality of the month.</p>
        </section>
      </div>
      <button onClick={onClose} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors self-end shadow-lg shadow-blue-500/20">Start Exploring</button>
    </div>
  </motion.div>
);

const Calendar = () => {
  const [showGuide, setShowGuide] = useState(false);
  const { today, currentDate, currentYear, currentMonth, currentTheme, calendarDays, monthOffset, monthDirection, isAnimating, changeMonth, goToDate, handleTouchStart, handleTouchEnd } = useCalendar();
  const { startDate, endDate, hoverDate, selectionMode, setHoverDate, selectSingleMode, selectRangeMode, applyPreset, clearHover, handleDayClick, handleDayDoubleClick, handleKeyDown, activeRangeLabel, setRange } = useDateRange({ calendarDays, isAnimating });

  const handleChangeYear = (year) => { goToDate(year, currentMonth); setViewMode('year'); };
  const handleChangeMonth = (month) => { goToDate(currentYear, month); setViewMode('month'); };

  const [notesData, setNotesData] = useLocalStorage('calendar-notes-v2', {});
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);
  const [viewMode, setViewMode] = useState('month');

  const activeNoteKey = useMemo(() => getActiveNoteKey({ startDate, endDate, currentDate }), [currentDate, endDate, startDate]);

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

  return (
    <div className="min-h-screen wall-bg flex items-center justify-center p-4 sm:p-10 lg:p-14 overflow-hidden transition-colors duration-700" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb ambient-orb-left" />
        <div className="ambient-orb ambient-orb-right" />
      </div>

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex bg-gray-900/60 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
        {['year', 'month'].map(mode => (
          <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${viewMode === mode ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`}>
            {mode}
          </button>
        ))}
        <button onClick={() => setShowGuide(true)} className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 text-blue-400 hover:text-white hover:bg-blue-500/20">
          GUIDE
        </button>
      </div>

      <AnimatePresence>
        {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      </AnimatePresence>

      <div className="relative w-full max-w-5xl calendar-shell rounded-2xl overflow-hidden shadow-[0_30px_120px_-20px_rgba(2,6,23,0.85)] mt-10 mb-2 mx-auto border border-slate-700/40">
        <div className="absolute -top-28 left-0 right-0 flex justify-between px-12 sm:px-24 z-40 pointer-events-none">
          <div className="flex flex-col items-center"><div className="hanger-pin" /><div className="hanger-line" /><div className="hanger-knot" /></div>
          <div className="flex flex-col items-center"><div className="hanger-pin" /><div className="hanger-line" /><div className="hanger-knot" /></div>
        </div>

        <div className="absolute -top-4 left-0 right-0 flex justify-around px-8 sm:px-16 z-30 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => <div key={`coil-${i}`} className="spiral-loop shadow-xl shadow-black/40" />)}
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'month' && (
            <motion.div key={`hero-${currentYear}-${currentMonth}`} variants={pageFlipVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2, ease: 'easeOut' }}>
              <Header currentDate={currentDate} currentTheme={currentTheme} onPreviousMonth={() => changeMonth(-1)} onNextMonth={() => changeMonth(1)} onChangeYear={handleChangeYear} onChangeMonth={handleChangeMonth} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="calendar-binding-strip" />

        <AnimatePresence mode="sync">
          <motion.section key={`body-${currentYear}-${viewMode === 'month' ? currentMonth : 'year'}`} className={`calendar-page-surface flex flex-col lg:flex-row gap-0 bg-slate-950/55 transform-gpu ${isAnimating ? 'calendar-page-turn' : ''}`} custom={monthDirection} variants={pageFlipVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
            {viewMode === 'year' ? (
              <YearView currentYear={currentYear} calendarDays={calendarDays} onMonthClick={(i) => { goToDate(currentYear, i); setViewMode('month'); }} />
            ) : (
              <>
                <NotesPanel currentYear={currentYear} currentMonth={currentMonth} currentTheme={currentTheme} title={title} placeholder={placeholder} activeNoteKey={activeNoteKey} notesData={notesData} setNotesData={setNotesData} selectionMode={selectionMode} rangeLabel={rangeLabel} activeRangeLabel={activeRangeLabel} setRange={setRange} />
                <CalendarGrid calendarDays={calendarDays} currentTheme={currentTheme} selectionMode={selectionMode} startDate={startDate} endDate={endDate} hoverDate={hoverDate} notesData={notesData} isAnimating={isAnimating} onMouseEnter={setHoverDate} onMouseLeave={clearHover} onDayClick={handleDayClick} onOpenDetails={setSelectedDayDetails} onModeChange={(action) => { if (action === 'single-mode') selectSingleMode(); if (action === 'range-mode') selectRangeMode(); }} onPresetSelect={applyPreset} onDoubleClick={(day, e) => { if (selectionMode === 'single') setSelectedDayDetails(day); else handleDayDoubleClick(day, e); }} onKeyDown={handleKeyDown} />
              </>
            )}
          </motion.section>
        </AnimatePresence>

        <AnimatePresence>
          {selectedDayDetails && <DayDetailsModal dayDetails={selectedDayDetails} notesData={notesData} setNotesData={setNotesData} onClose={() => setSelectedDayDetails(null)} currentTheme={currentTheme} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar;
