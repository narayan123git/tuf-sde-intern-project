import { CALENDAR_LAYOUT, STATIC_HOLIDAYS } from '../constants/calendar.constants';

export const isSameDay = (leftDate, rightDate) => {
  if (!leftDate || !rightDate) return false;
  return leftDate.getFullYear() === rightDate.getFullYear()
    && leftDate.getMonth() === rightDate.getMonth()
    && leftDate.getDate() === rightDate.getDate();
};

export const normalizeDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return { start: startDate || null, end: endDate || null };
  }

  return startDate.getTime() <= endDate.getTime()
    ? { start: startDate, end: endDate }
    : { start: endDate, end: startDate };
};

export const createCalendarDays = (year, month, today, holidays = STATIC_HOLIDAYS) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  let startDayIndex = firstDayOfMonth.getDay() - 1;

  if (startDayIndex === -1) {
    startDayIndex = 6;
  }

  const days = [];

  for (let index = startDayIndex - 1; index >= 0; index -= 1) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - index),
      dayNumber: daysInPrevMonth - index,
      isCurrentMonth: false,
      holiday: null,
      isToday: false,
    });
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const holidayKey = `${month + 1}-${dayNumber}`;
    const isToday = dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    days.push({
      date: new Date(year, month, dayNumber),
      dayNumber,
      isCurrentMonth: true,
      holiday: holidays[holidayKey] || null,
      isToday,
    });
  }

  const remainingSlots = CALENDAR_LAYOUT.columnCount - (days.length % CALENDAR_LAYOUT.columnCount);

  if (remainingSlots < CALENDAR_LAYOUT.columnCount) {
    for (let index = 1; index <= remainingSlots; index += 1) {
      days.push({
        date: new Date(year, month + 1, index),
        dayNumber: index,
        isCurrentMonth: false,
        holiday: null,
        isToday: false,
      });
    }
  }

  return days;
};

export const formatDateForUI = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const formatLongDate = (date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export const getActiveNoteKey = ({ startDate, endDate, currentDate }) => {
  if (startDate && endDate) {
    return `${startDate.toISOString()}_to_${endDate.toISOString()}`;
  }

  if (startDate) {
    return startDate.toISOString();
  }

  return `general_${currentDate.getFullYear()}_${currentDate.getMonth()}`;
};

export const getDayDisplayState = ({ day, startDate, endDate, hoverDate, selectionMode }) => {
  const dayTime = day.date.getTime();
  const startTime = startDate?.getTime();
  const endTime = endDate?.getTime();
  const hoverTime = hoverDate?.getTime();
  const isStart = Boolean(startTime && dayTime === startTime);
  const isEnd = Boolean(endTime && dayTime === endTime);
  const isBetween = Boolean(startDate && endDate && dayTime > startTime && dayTime < endTime);
  const isHovering = Boolean(
    selectionMode === 'range'
    && startDate
    && !endDate
    && hoverDate
    && ((dayTime > startTime && dayTime <= hoverTime) || (dayTime < startTime && dayTime >= hoverTime))
  );

  return {
    isStart,
    isEnd,
    isBetween,
    isHovering,
    isSelected: isStart || isEnd || isBetween,
  };
};

export const getFocusableIndex = (currentIndex, key, totalDays) => {
  let targetIndex = currentIndex;

  if (key === 'ArrowRight') targetIndex += 1;
  else if (key === 'ArrowLeft') targetIndex -= 1;
  else if (key === 'ArrowDown') targetIndex += CALENDAR_LAYOUT.columnCount;
  else if (key === 'ArrowUp') targetIndex -= CALENDAR_LAYOUT.columnCount;

  if (targetIndex < 0 || targetIndex >= totalDays) {
    return null;
  }

  return targetIndex;
};
