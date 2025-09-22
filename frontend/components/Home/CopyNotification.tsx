import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface CopyNotificationProps {
  show: boolean;
  color: string;
}

export const CopyNotification: React.FC<CopyNotificationProps> = ({ show, color }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#ff008a] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        >
          <Check size={20} />
          <span className="font-medium">Copied <strong>{color.toUpperCase()}</strong> to clipboard!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};