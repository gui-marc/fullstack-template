import {} from 'react';
import { ToastIcon, Toaster, resolveValue } from 'react-hot-toast';

import { AnimatePresence, motion } from 'framer-motion';

export default function TailwindToaster() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <AnimatePresence mode="wait">
          {t.visible && (
            <motion.div
              transition={{ duration: 0.15 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              className="transform p-4 flex bg-white dark:bg-gray-900 rounded shadow-lg"
            >
              <ToastIcon toast={t} />
              <p className="px-2">{resolveValue(t.message, t)}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
}
