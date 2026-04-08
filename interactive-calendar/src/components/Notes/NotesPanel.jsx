import React, { useState } from 'react';
import { motion } from 'framer-motion';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const NotesPanel = React.memo(function NotesPanel({
  currentYear,
  currentMonth,
  currentTheme,
  title,
  placeholder,
  selectionMode,
  rangeLabel,
  activeRangeLabel,
  activeNoteKey,
  notesData,
  setNotesData,
  setRange,
}) {
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingNoteKey, setEditingNoteKey] = useState(null);

  const currentNotes = Array.isArray(notesData[activeNoteKey]) ? notesData[activeNoteKey] : [];

  const allMonthNotes = React.useMemo(() => {
    if (selectionMode !== 'range') return currentNotes;

    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

    let mergedNotes = [];

    Object.entries(notesData).forEach(([key, notes]) => {
      if (!Array.isArray(notes)) return;

      let isRelevant = (key === activeNoteKey);

      if (!isRelevant && key.includes('Z') && !key.includes('_to_')) {
        const date = new Date(key);
        if (date >= startOfMonth && date <= endOfMonth) isRelevant = true;
      } else if (!isRelevant && key.includes('_to_')) {
        const [startStr, endStr] = key.split('_to_');
        const start = new Date(startStr);
        const end = new Date(endStr);
        if (start <= endOfMonth && end >= startOfMonth) isRelevant = true;
      }

      if (isRelevant) {
        const enriched = notes.map(n => ({ ...n, noteKey: key }));
        mergedNotes.push(...enriched);
      }
    });

    const uniqueMap = new Map();
    mergedNotes.forEach(note => {
      if (!uniqueMap.has(note.id)) {
        uniqueMap.set(note.id, note);
      }
    });

    const uniqueNotes = Array.from(uniqueMap.values());
    uniqueNotes.sort((a, b) => new Date(a.updatedAt || 0) - new Date(b.updatedAt || 0));

    return uniqueNotes;
  }, [selectionMode, currentNotes, notesData, currentYear, currentMonth, activeNoteKey]);

  const handleSave = () => {
    if (!inputText.trim()) return;

    if (editingId) {
      setNotesData((prev) => {
        const updatedData = { ...prev };
        
        const timestampFields = {
           text: inputText,
           updatedAt: new Date().toISOString(),
           timeSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           dateSaved: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        if (editingNoteKey === activeNoteKey) {
           updatedData[activeNoteKey] = (updatedData[activeNoteKey] || []).map((n) =>
             n.id === editingId ? { ...n, ...timestampFields } : n
           );
        } else {
           let movedNote = null;
           if (updatedData[editingNoteKey]) {
             movedNote = updatedData[editingNoteKey].find((n) => n.id === editingId);
             updatedData[editingNoteKey] = updatedData[editingNoteKey].filter((n) => n.id !== editingId);
           }
           if (movedNote) {
             updatedData[activeNoteKey] = [...(updatedData[activeNoteKey] || []), { ...movedNote, ...timestampFields }];
           }
        }
        return updatedData;
      });
      setEditingId(null);
      setEditingNoteKey(null);
    } else {
      const newNote = {
        id: generateId(),
        text: inputText,
        timeSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateSaved: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        updatedAt: new Date().toISOString(),
      };
      setNotesData((prev) => ({
        ...prev,
        [activeNoteKey]: [...(prev[activeNoteKey] || []), newNote],
      }));
    }
    setInputText('');
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setInputText(note.text);
    setEditingNoteKey(note.noteKey);
    
    if (note.noteKey) {
      const pts = note.noteKey.split('_to_');
      setRange({ start: new Date(pts[0]), end: pts[1] ? new Date(pts[1]) : null });
    }
  };

  const handleDelete = (note) => {
    setNotesData((prev) => {
       const key = note.noteKey || activeNoteKey;
       return {
         ...prev,
         [key]: (prev[key] || []).filter((n) => n.id !== note.id)
       };
    });
  };

  return (
    <div className="lg:w-[34%] flex flex-col p-6 sm:p-8 bg-gray-800/60 backdrop-blur-md bg-white/5 border-l border-white/5 order-2 lg:order-2 transition-all duration-300 shadow-inner h-full max-h-screen overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.18em]">Timeline Notes</h4>
        <span
          className={`text-[10px] font-semibold px-2 py-1 rounded-md ${currentTheme.colors.highlightBg} ${currentTheme.colors.highlightText} transition-colors duration-700 uppercase tracking-[0.15em] shrink-0 text-center ml-2`}
        >
          {title}
        </span>
      </div>

      <p className="text-[11px] text-slate-400 mb-4 leading-tight shrink-0">
        {selectionMode === 'single'
          ? 'Single dates open in a detailed modal. Select a date range to add range-scoped notes here.'
          : 'Manage notes for this specific date range.'}
      </p>

      <div className="space-y-2 mb-4 shrink-0 mt-2">
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className="text-base font-bold text-white px-4 py-3 rounded-xl border border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 ease-out hover:border-blue-400 hover:bg-blue-500/20"
        >
          <span className="text-blue-300 text-xs uppercase tracking-wider block mb-1">Selected Region</span>
          {activeRangeLabel}
        </motion.div>
      </div>

      {selectionMode === 'range' ? (
        <div className="flex-grow flex flex-col min-h-0 overflow-hidden gap-4 mt-2">
          <div className="shrink-0 flex flex-col gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-24 bg-slate-950/50 ring-1 ring-white/10 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/60 text-slate-200 text-sm z-10 transition-all duration-300 placeholder-slate-500"
              placeholder={placeholder}
            />
            <button
              onClick={handleSave}
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full"
            >
              {editingId ? 'Update Note' : 'Save Note'}
            </button>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-2 pb-2 pr-1">
            {allMonthNotes.length === 0 && (
              <div className="text-center text-slate-500 text-xs italic mt-4">
                No notes found for this range.
              </div>
            )}
            {allMonthNotes.map((note) => {
              const dateLabel = note.noteKey && note.noteKey.includes('_to_') 
                ? note.noteKey.split('_to_').map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).join(' - ')
                : (note.noteKey ? new Date(note.noteKey).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : note.dateSaved);

              return (
                <div
                  key={note.id}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col gap-2 group hover:bg-white/10 transition-colors shrink-0"
                  onMouseEnter={() => { if(note.noteKey) { const pts = note.noteKey.split('_to_'); setRange({ start: new Date(pts[0]), end: pts[1] ? new Date(pts[1]) : null }) } }}
                >
                  <span className="text-[10px] text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded mb-1 w-max">{dateLabel}</span>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap">{note.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-slate-500">
                      {note.dateSaved} at {note.timeSaved}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(note)}
                        className="text-xs text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 px-2 py-1 rounded transition-colors"
                      >
                        Edit
                      </button>
                    <button
                      onClick={() => handleDelete(note)}
                      className="text-xs text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center min-h-[150px] border border-dashed border-white/10 rounded-xl bg-slate-900/30">
          <p className="text-slate-500 text-xs text-center px-6">
            Click any date on the calendar to open its detailed modal window.
          </p>
        </div>
      )}
    </div>
  );
});

export default NotesPanel;
