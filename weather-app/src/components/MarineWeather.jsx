import { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Thermometer, Wind, Eye, AlertCircle } from 'lucide-react';
import WeatherCard, { DataRow } from './WeatherCard';
import Loader from './Loader';
import { getMarineWeather } from '../services/api';

export default function MarineWeather() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      setError('Enter a valid latitude (-90 to 90)');
      return;
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      setError('Enter a valid longitude (-180 to 180)');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getMarineWeather(latitude, longitude);
      if (result?.error) {
        throw new Error(result.error?.info || 'Failed to fetch marine data');
      }
      setData(result);
    } catch (err) {
      const message = err.response?.data?.error?.info || err.message || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const marine = data?.marine?.data?.[0];
  const hasData = marine && Object.keys(marine).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <WeatherCard className="p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-400" />
          Enter Coordinates
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Latitude (e.g. 51.5)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
          />
          <input
            type="text"
            placeholder="Longitude (e.g. -0.1)"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
          />
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFetch}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan-500/30 border border-cyan-400/50 text-white font-medium hover:bg-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-neon hover:shadow-neon-hover"
          >
            {loading ? 'Loading...' : 'Get Marine Data'}
          </motion.button>
        </div>
      </WeatherCard>

      {loading && <Loader message="Fetching marine conditions..." />}

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
        >
          <WeatherCard className="p-6">
            <h3 className="text-white font-semibold mb-4">Marine Conditions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataRow label="Wave Height" value={`${marine?.swell_height_m ?? marine?.swell_height ?? '--'} m`} icon={Waves} />
              <DataRow label="Water Temperature" value={`${marine?.water_temp ?? '--'}°C`} icon={Thermometer} />
              <DataRow label="Wind Speed" value={`${marine?.wind_speed ?? '--'} km/h`} icon={Wind} />
              <DataRow label="Visibility" value={`${marine?.visibility ?? '--'} km`} icon={Eye} />
              <DataRow label="Weather Description" value={marine?.weather_description ?? '--'} />
            </div>
          </WeatherCard>
        </motion.div>
      )}

      {!loading && !hasData && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center"
        >
          <p className="text-white/70">Enter latitude and longitude, then click "Get Marine Data"</p>
        </motion.div>
      )}
    </motion.div>
  );
}
