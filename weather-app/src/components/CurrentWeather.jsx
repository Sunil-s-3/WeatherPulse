import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, AlertCircle } from 'lucide-react';
import WeatherCard, { TempDisplay, DataRow } from './WeatherCard';
import Loader from './Loader';

export default function CurrentWeather({ data, loading, error }) {
  if (loading) {
    return <Loader message="Loading weather data..." />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/10 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center gap-3"
      >
        <AlertCircle className="w-12 h-12 text-red-400" />
        <p className="text-red-400 text-lg font-medium">Unable to load weather</p>
        <p className="text-white/70 text-sm text-center">{error}</p>
      </motion.div>
    );
  }

  if (!data?.location) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center"
      >
        <p className="text-white/70 text-lg">Search for a location to see current weather</p>
      </motion.div>
    );
  }

  const { location, current } = data;
  const weatherIcon = current?.weather_icons?.[0] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <WeatherCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {location?.name}, {location?.country}
            </h2>
            <p className="text-white/60 text-sm">{location?.localtime}</p>
          </div>
          <div className="flex items-center gap-4">
            {weatherIcon && (
              <img
                src={weatherIcon}
                alt={current?.weather_descriptions?.[0]}
                className="w-20 h-20 object-contain"
              />
            )}
            <div>
              <TempDisplay value={current?.temperature} size="text-5xl sm:text-6xl" />
              <p className="text-white/80 mt-1">{current?.weather_descriptions?.[0]}</p>
            </div>
          </div>
        </div>
      </WeatherCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCard className="p-6">
          <h3 className="text-white/80 font-medium mb-4 text-sm uppercase tracking-wider">Details</h3>
          <div className="space-y-0">
            <DataRow label="Humidity" value={`${current?.humidity}%`} icon={Droplets} />
            <DataRow label="Wind Speed" value={`${current?.wind_speed} km/h`} icon={Wind} />
            <DataRow label="Pressure" value={`${current?.pressure} mb`} icon={Gauge} />
          </div>
        </WeatherCard>
      </div>
    </motion.div>
  );
}
