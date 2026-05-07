import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#040610',
        minHeight: '100vh',

        // FIX 1: Creates a new stacking context so the exiting page's
        // canvas/DOM animations cannot paint over the incoming page.
        position: 'relative',
        isolation: 'isolate',

        // FIX 2: Only clip horizontal bleed (matrix chars drifting sideways).
        // Do NOT use overflow:'hidden' — it cuts off vertically scrollable content.
        overflowX: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}