import { useCallback, useMemo, useRef, useState } from 'react';
import { CALENDAR_LAYOUT, CALENDAR_THEMES, STATIC_HOLIDAYS } from '../constants/calendar.constants';
import { createCalendarDays } from '../utils/dateHelpers';

export function useCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartRef = useRef(null);

  const today = useMemo(() => new Date(), []);

  const currentDate = useMemo(() => (
    new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  ), [monthOffset, today]);

  const currentTheme = useMemo(() => (
    CALENDAR_THEMES[Math.abs(monthOffset) % CALENDAR_THEMES.length]
  ), [monthOffset]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarDays = useMemo(() => (
    createCalendarDays(currentYear, currentMonth, today, STATIC_HOLIDAYS)
  ), [currentMonth, currentYear, today]);

  const changeMonth = useCallback((direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setMonthOffset((previousMonthOffset) => previousMonthOffset + direction);
    }, CALENDAR_LAYOUT.monthTransitionDelayMs);

    setTimeout(() => {
      setIsAnimating(false);
    }, CALENDAR_LAYOUT.monthTransitionResetMs);
  }, [isAnimating]);

  const handleTouchStart = useCallback((event) => {
    touchStartRef.current = event.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (touchStartRef.current === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const swipeDistance = touchStartRef.current - touchEnd;

    if (swipeDistance > CALENDAR_LAYOUT.swipeThreshold) {
      changeMonth(1);
    } else if (swipeDistance < -CALENDAR_LAYOUT.swipeThreshold) {
      changeMonth(-1);
    }

    touchStartRef.current = null;
  }, [changeMonth]);

  return {
    today,
    currentDate,
    currentYear,
    currentMonth,
    currentTheme,
    calendarDays,
    monthOffset,
    isAnimating,
    changeMonth,
    handleTouchStart,
    handleTouchEnd,
  };
}
