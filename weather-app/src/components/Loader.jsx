import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[300px] gap-4"
    >
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
        <p className="text-white/80 mt-4">{message}</p>
      </div>
    </motion.div>
  );
}
