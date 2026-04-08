export const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const STATIC_HOLIDAYS = {
  '1-1': 'New Year',
  '1-26': 'Republic Day',
  '4-8': 'Ramadan / Eid al-Fitr',
  '4-13': 'Baisakhi',
  '4-14': 'Ambedkar Jayanti',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '10-31': 'Halloween',
  '12-25': 'Christmas',
};

export const CALENDAR_LAYOUT = {
  columnCount: 7,
  swipeThreshold: 50,
  monthTransitionDelayMs: 280,
  monthTransitionResetMs: 650,
};

const defaultColors = {
  bg: 'bg-slate-900',
  overlay: 'bg-gray-900/80',
  text: 'text-gray-200',
  highlightBg: 'bg-blue-900/30',
  highlightText: 'text-blue-200',
  selectedBg: 'ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-blue-900/50 backdrop-blur-md',
  holidayDot: 'bg-blue-400',
  todayRing: 'ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900',
};

export const CALENDAR_THEMES = [
  { name: 'Jan', image: '/months/jan.png', colors: defaultColors, weather: '❄️ -2°C' },
  { name: 'Feb', image: '/months/feb.png', colors: defaultColors, weather: '🌨️ 1°C' },
  { name: 'Mar', image: '/months/march.png', colors: defaultColors, weather: '🌦️ 8°C' },
  { name: 'Apr', image: '/months/april.png', colors: defaultColors, weather: '🌸 15°C' },
  { name: 'May', image: '/months/may.png', colors: defaultColors, weather: '🌷 19°C' },
  { name: 'Jun', image: '/months/june.png', colors: defaultColors, weather: '☀️ 24°C' },
  { name: 'Jul', image: '/months/july.png', colors: defaultColors, weather: '🏖️ 28°C' },
  { name: 'Aug', image: '/months/august.png', colors: defaultColors, weather: '🥵 30°C' },
  { name: 'Sep', image: '/months/september.png', colors: defaultColors, weather: '🌤️ 22°C' },
  { name: 'Oct', image: '/months/october.png', colors: defaultColors, weather: '🍁 14°C' },
  { name: 'Nov', image: '/months/nov.png', colors: defaultColors, weather: '🍂 8°C' },
  { name: 'Dec', image: '/months/dec.png', colors: defaultColors, weather: '🎄 0°C' },
];
