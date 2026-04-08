export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type SelectionMode = 'single' | 'range';

export type CalendarDay = {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  holiday: string | null;
  isToday: boolean;
};

export type CalendarTheme = {
  image: string;
  colors: {
    bg: string;
    overlay: string;
    text: string;
    highlightBg: string;
    highlightText: string;
    selectedBg: string;
    holidayDot: string;
    todayRing: string;
  };
};

export type DayDisplayState = {
  isStart: boolean;
  isEnd: boolean;
  isBetween: boolean;
  isHovering: boolean;
  isSelected: boolean;
};

export type NotesMap = Record<string, string>;
