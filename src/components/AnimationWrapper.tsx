import React from "react";
import { motion } from "motion/react";

const AnimationWrapper = ({
  children,
  index,
  transitionDuration,
  delay,
  className,
  viewportMargin,
  viewportAmount,
}: {
  children: React.ReactNode;
  index?: number;
  transitionDuration?: number;
  delay?: number;
  className?: string;
  viewportMargin?: string;
  viewportAmount?: number;
}) => {
  const DEFAULT_DELAY = 0.2;

  return (
    <motion.div
      className={className}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: transitionDuration ? transitionDuration : 0.5,
        delay:
          index && delay
            ? index * delay
            : index && !delay
              ? index * DEFAULT_DELAY
              : !index && delay
                ? delay
                : !index && !delay
                  ? DEFAULT_DELAY
                  : 0,
      }}
      viewport={{
        margin: viewportMargin ? viewportMargin : "-100px",
        amount: viewportAmount ? viewportAmount : 0.3,
        once: true,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
