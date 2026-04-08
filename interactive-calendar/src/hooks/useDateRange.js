import { useCallback, useMemo, useState } from 'react';
import { getFocusableIndex, isSameDay, normalizeDateRange } from '../utils/dateHelpers';

export function useDateRange({ calendarDays = [], isAnimating = false } = {}) {
  const [range, setRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);
  const [selectionMode, setSelectionMode] = useState('single');

  const startDate = range.start;
  const endDate = range.end;

  const clearHover = useCallback(() => {
    setHoverDate(null);
  }, []);

  const selectSingleMode = useCallback(() => {
    setSelectionMode('single');
    setRange((previousRange) => ({
      start: previousRange.start,
      end: null,
    }));
    setHoverDate(null);
  }, []);

  const selectRangeMode = useCallback(() => {
    setSelectionMode('range');
  }, []);

  const applyPreset = useCallback((daysOut) => {
    setSelectionMode('range');
    const presetStart = new Date();
    const presetEnd = new Date();
    presetEnd.setDate(presetStart.getDate() + daysOut);
    setRange(normalizeDateRange(presetStart, presetEnd));
    setHoverDate(null);
  }, []);

  const handleDayClick = useCallback((day, event = null) => {
    if (!day.isCurrentMonth || isAnimating) return;

    const clickedTime = day.date.getTime();
    const isShiftKey = Boolean(event?.shiftKey);

    if (selectionMode === 'single' && !isShiftKey) {
      setRange({ start: day.date, end: null });
      setHoverDate(null);
      return;
    }

    setSelectionMode('range');

    setRange((previousRange) => {
      if (!previousRange.start || previousRange.end) {
        return { start: day.date, end: null };
      }

      if (clickedTime >= previousRange.start.getTime()) {
        return { start: previousRange.start, end: day.date };
      }

      return normalizeDateRange(day.date, previousRange.start);
    });

    setHoverDate(null);
  }, [isAnimating, selectionMode]);

  const handleDayDoubleClick = useCallback((day) => {
    if (!day.isCurrentMonth || isAnimating || selectionMode !== 'range') return;

    setRange((previousRange) => {
      if (previousRange.start && !previousRange.end && isSameDay(previousRange.start, day.date)) {
        return { start: previousRange.start, end: day.date };
      }

      return previousRange;
    });
  }, [isAnimating, selectionMode]);

  const handleKeyDown = useCallback((event, day, index) => {
    if (!day.isCurrentMonth) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDayClick(day, event);
      return;
    }

    const targetIndex = getFocusableIndex(index, event.key, calendarDays.length);
    if (targetIndex === null) return;

    event.preventDefault();
    const targetElement = document.querySelector(`[data-index="${targetIndex}"]`);
    if (targetElement) targetElement.focus();

    if (event.shiftKey && selectionMode === 'range') {
      if (!startDate) {
        setRange({ start: day.date, end: null });
        return;
      }

      if (startDate && !endDate) {
        setHoverDate(calendarDays[targetIndex].date);
      }
    }
  }, [calendarDays, endDate, handleDayClick, selectionMode, startDate]);

  const activeRangeLabel = useMemo(() => {
    if (startDate && endDate) return 'Range Selected';
    if (startDate) return 'Start Selected';
    return 'General Memos';
  }, [endDate, startDate]);

  return {
    range,
    setRange,
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
  };
}
