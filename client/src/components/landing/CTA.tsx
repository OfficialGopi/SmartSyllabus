import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative w-full py-28 px-6 md:px-12 lg:px-20 " id="cta">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-space-grotesk text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 drop-shadow-xl"
        >
          Ready to ace your exams?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-inter text-neutral-600 dark:text-neutral-400 mt-4 text-lg"
        >
          Start with SmartSyllabus today and make studying effortless.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 px-10 py-4 rounded-2xl font-space-grotesk text-lg cursor-pointer shadow-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:opacity-90 transition"
        >
          Get Started Free
        </motion.button>
      </div>
    </section>
  );
}
