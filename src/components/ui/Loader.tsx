import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-light-500 dark:bg-dark-500 flex items-center justify-center z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-accent-500 mb-4"
        >
          <Code size={48} />
        </motion.div>
        
        <motion.div
          className="h-2 w-48 bg-light-300 dark:bg-dark-400 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-accent-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.p
          className="mt-4 text-sm text-dark-400 dark:text-light-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading portfolio...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;