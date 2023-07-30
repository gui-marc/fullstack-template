import {} from 'react';
import { ToastIcon, Toaster, resolveValue } from 'react-hot-toast';

import { AnimatePresence, motion } from 'framer-motion';

export default function TailwindToaster() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              transition={{ duration: 0.15 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              className="flex max-w-sm p-4 origin-top-right transform bg-white rounded shadow-lg dark:bg-gray-900"
            >
              <div className="w-4 h-4">
                <ToastIcon toast={t} />
              </div>
              <p className="px-2 ml-2 text-sm">{resolveValue(t.message, t)}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
}
