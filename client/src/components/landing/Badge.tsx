import { motion } from "motion/react";

const Badge = () => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="inline-block text-sm font-inter font-medium px-4 py-1.5 rounded-full  mt-20
             border border-neutral-300 dark:border-neutral-700 
             bg-neutral-100/60 dark:bg-neutral-800/60 
             text-neutral-700 dark:text-neutral-300 
             shadow-sm hover:shadow-md 
             transition-all duration-300 backdrop-blur-sm"
    >
      🚀 Trusted by 500+ students
    </motion.span>
  );
};

export default Badge;
