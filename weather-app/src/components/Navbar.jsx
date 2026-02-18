import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const tabs = [
  { id: 'current', label: 'Current Weather' },
  { id: 'historical', label: 'Historical Weather' },
  { id: 'marine', label: 'Marine Weather' },
];

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Cloud className="w-8 h-8 text-cyan-400" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Weather App
            </span>
          </motion.div>

          <div className="flex gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-white shadow-neon'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/20 rounded-xl border border-white/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                <span className="relative z-10 sm:hidden">
                  {tab.id === 'current' ? 'Current' : tab.id === 'historical' ? 'History' : 'Marine'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
