import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const transition = { duration: 0.4 };

export function SectionFade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
