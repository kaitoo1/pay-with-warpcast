import { motion } from "framer-motion";
import { FC, memo } from "react";

const FullScreenLoader: FC = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-screen flex items-center justify-center bg-black"
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        fill="#202020"
      >
        <circle
          cx="25"
          cy="25"
          r="18"
          stroke="#202020"
          strokeWidth="3"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );
});

export default FullScreenLoader;
