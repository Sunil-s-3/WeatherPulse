import { motion } from 'framer-motion';

const getTempColor = (temp) => {
  if (temp == null) return 'text-white';
  if (temp <= 0) return 'text-blue-300';
  if (temp <= 10) return 'text-cyan-300';
  if (temp <= 20) return 'text-emerald-300';
  if (temp <= 30) return 'text-amber-300';
  return 'text-red-400';
};

export default function WeatherCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl
        hover:bg-white/15 hover:border-white/30 transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export function TempDisplay({ value, unit = '°C', size = 'text-4xl', className = '' }) {
  const colorClass = getTempColor(value);
  return (
    <span className={`font-bold ${colorClass} ${size} ${className}`}>
      {value != null ? `${value}${unit}` : '--'}
    </span>
  );
}

export function DataRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-2 text-white/80">
        {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-white font-semibold">{value ?? '--'}</span>
    </div>
  );
}

export { getTempColor };
