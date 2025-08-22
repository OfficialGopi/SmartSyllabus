import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "SmartSyllabus made my exam prep stress-free. I knew exactly what to study each day, and the AI mentor was a lifesaver!",
    author: "Priya, Engineering Student",
  },
  {
    quote:
      "The personalized roadmap kept me disciplined and confident. I actually enjoyed studying for the first time.",
    author: "Arjun, Medical Student",
  },
  {
    quote:
      "I saved so much time not planning. SmartSyllabus handled it for me and I just focused on learning.",
    author: "Meera, Law Student",
  },
  {
    quote:
      "The progress tracking and reminders helped me stay on top of my syllabus without stress.",
    author: "Ravi, MBA Student",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-28 px-6 md:px-12 lg:px-20 ">
      <div className="max-w-6xl mx-auto text-center mb-12 ">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-space-grotesk text-4xl font-bold text-neutral-900 dark:text-neutral-50"
        >
          What Students Say
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="relative overflow-x-hidden">
        <div className="flex space-x-6 animate-marquee  ">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative min-w-[350px] max-w-sm p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-500/50 dark:border-neutral-800/40 backdrop-blur-xl    group"
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />

              <p className="relative text-sm md:text-base font-inter text-neutral-700 dark:text-neutral-300 z-10">
                “{t.quote}”
              </p>
              <footer className="relative mt-4 font-space-grotesk text-sm text-neutral-500 dark:text-neutral-400 z-10">
                — {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-neutral-50 dark:from-neutral-950 via-transparent to-transparent blur-md" />
        <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-neutral-50 dark:from-neutral-950 via-transparent to-transparent blur-md" />
      </div>
    </section>
  );
}
