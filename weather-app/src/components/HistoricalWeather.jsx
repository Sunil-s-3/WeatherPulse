import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wind, AlertCircle } from 'lucide-react';
import WeatherCard, { TempDisplay, DataRow } from './WeatherCard';
import Loader from './Loader';
import { getHistoricalWeather } from '../services/api';

export default function HistoricalWeather({ location }) {
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!location?.trim()) {
      setError('Please enter a location first');
      return;
    }
    if (!date) {
      setError('Please select a date');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getHistoricalWeather(location, date);
      if (result?.error) {
        throw new Error(result.error?.info || 'Failed to fetch historical data');
      }
      setData(result);
    } catch (err) {
      const message = err.response?.data?.error?.info || err.message || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const historical = data?.historical?.[date];
  const hasData = historical && Object.keys(historical).length > 0;
  const windSpeed = historical?.hourly?.[0]?.windspeed ?? historical?.hourly?.[12]?.windspeed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <WeatherCard className="p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Select Date & Location
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
          />
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFetch}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan-500/30 border border-cyan-400/50 text-white font-medium hover:bg-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-neon hover:shadow-neon-hover"
          >
            {loading ? 'Loading...' : 'Get Historical Data'}
          </motion.button>
        </div>
      </WeatherCard>

      {loading && <Loader message="Fetching historical weather..." />}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-red-500/20 border border-red-500/30 rounded-2xl p-6 flex items-center gap-3"
        >
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      {!loading && hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <WeatherCard className="p-6">
            <h3 className="text-white font-semibold mb-4">
              {data?.location?.name} — {date}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-white/70 text-sm mb-2">Temperature</p>
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <p className="text-white/60 text-xs">Avg</p>
                    <TempDisplay value={historical?.avgtemp} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Min</p>
                    <TempDisplay value={historical?.mintemp} size="text-2xl" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Max</p>
                    <TempDisplay value={historical?.maxtemp} size="text-2xl" />
                  </div>
                </div>
              </div>
              <div className="space-y-0">
                <DataRow label="Description" value={historical?.hourly?.[0]?.weather_descriptions?.[0] || historical?.condition || '--'} />
                <DataRow label="Wind Speed" value={windSpeed != null ? `${windSpeed} km/h` : '--'} icon={Wind} />
                <DataRow label="Humidity" value={historical?.hourly?.[0]?.humidity != null ? `${historical.hourly[0].humidity}%` : '--'} />
              </div>
            </div>
          </WeatherCard>
        </motion.div>
      )}

      {!loading && !hasData && !error && location && date && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center"
        >
          <p className="text-white/70">Click "Get Historical Data" to load weather for {date}</p>
        </motion.div>
      )}

      {!location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center"
        >
          <p className="text-white/70">Search for a location above to view historical weather</p>
        </motion.div>
      )}
    </motion.div>
  );
}
