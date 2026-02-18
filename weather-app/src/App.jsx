import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import { getCurrentWeather } from './services/api';

const SUGGESTIONS = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
  'Berlin',
  'Mumbai',
  'Dubai',
  'Singapore',
  'Toronto',
  'Los Angeles',
  'Chicago',
];

export default function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [location, setLocation] = useState('London');
  const [searchInput, setSearchInput] = useState('London');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentWeather = useCallback(async (query) => {
    if (!query?.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(query.trim());
      if (data?.error) {
        throw new Error(data.error?.info || 'Failed to fetch weather');
      }
      setCurrentData(data);
    } catch (err) {
      const msg = err.response?.data?.error?.info || err.message || 'Something went wrong';
      setError(msg);
      setCurrentData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'current') {
      fetchCurrentWeather(location);
    }
  }, [location, activeTab, fetchCurrentWeather]);

  const handleSearch = (value) => {
    setLocation(value);
    setSearchInput(value);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Location Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search location..."
                className="w-full pl-12 pr-24 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-lg shadow-xl"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(searchInput)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-cyan-500/40 border border-cyan-400/50 text-white text-sm font-medium hover:bg-cyan-500/60 transition-all shadow-neon hover:shadow-neon-hover flex items-center gap-2"
              >
                Search
              </motion.button>
            </div>

            {showSuggestions && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl z-50 max-h-60 overflow-y-auto"
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => handleSearch(s)}
                        className="w-full px-5 py-3 text-left text-white hover:bg-white/10 transition-colors"
                      >
                        {s}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-white/60 text-sm">
                    No suggestions. Type and press Search.
                  </li>
                )}
              </motion.ul>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'current' && (
            <motion.div
              key="current"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentWeather data={currentData} loading={loading} error={error} />
            </motion.div>
          )}

          {activeTab === 'historical' && (
            <motion.div
              key="historical"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <HistoricalWeather location={location} />
            </motion.div>
          )}

          {activeTab === 'marine' && (
            <motion.div
              key="marine"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <MarineWeather />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
