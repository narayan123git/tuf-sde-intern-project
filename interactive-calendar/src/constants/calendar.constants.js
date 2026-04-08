export const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const STATIC_HOLIDAYS = {
  '1-26': 'Republic Day',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '12-25': 'Christmas',
};

export const CALENDAR_LAYOUT = {
  columnCount: 7,
  swipeThreshold: 50,
  monthTransitionDelayMs: 280,
  monthTransitionResetMs: 650,
};

export const CALENDAR_THEMES = [
  {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    colors: {
      bg: 'bg-indigo-700',
      overlay: 'bg-indigo-900/75',
      text: 'text-indigo-300',
      highlightBg: 'bg-indigo-400/18',
      highlightText: 'text-indigo-100',
      selectedBg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
      holidayDot: 'bg-indigo-300',
      todayRing: 'ring-2 ring-indigo-300 ring-offset-2 ring-offset-slate-900',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    colors: {
      bg: 'bg-violet-700',
      overlay: 'bg-violet-900/75',
      text: 'text-violet-300',
      highlightBg: 'bg-violet-400/18',
      highlightText: 'text-violet-100',
      selectedBg: 'bg-gradient-to-br from-violet-500 to-indigo-600',
      holidayDot: 'bg-violet-300',
      todayRing: 'ring-2 ring-violet-300 ring-offset-2 ring-offset-slate-900',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80',
    colors: {
      bg: 'bg-indigo-700',
      overlay: 'bg-indigo-950/75',
      text: 'text-indigo-300',
      highlightBg: 'bg-indigo-400/18',
      highlightText: 'text-indigo-100',
      selectedBg: 'bg-gradient-to-br from-indigo-500 to-fuchsia-600',
      holidayDot: 'bg-indigo-300',
      todayRing: 'ring-2 ring-indigo-300 ring-offset-2 ring-offset-slate-900',
    },
  },
];
