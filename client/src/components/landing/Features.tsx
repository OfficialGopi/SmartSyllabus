import { motion } from "framer-motion";
import {
  BookOpen,
  Bot,
  BarChart3,
  ListChecks,
  Sparkles,
  Timer,
} from "lucide-react";

const features = [
  {
    title: "AI Roadmap Generator",
    description:
      "Enter your syllabus and exam date, and let SmartSyllabus generate a personalized day-by-day roadmap tailored to you.",
    icon: ListChecks,
  },
  {
    title: "Curated Resources",
    description:
      "Access trusted PDFs, videos, and notes mapped to every topic and subtopic so you can study efficiently.",
    icon: BookOpen,
  },
  {
    title: "AI Mentor",
    description:
      "Get instant explanations and doubt solving with your 24/7 AI mentor — always ready to help.",
    icon: Bot,
  },
  {
    title: "Progress Tracking",
    description:
      "Stay disciplined with progress dashboards, reminders, and streaks that keep you on track.",
    icon: BarChart3,
  },
  {
    title: "Smart Reminders",
    description:
      "Never miss a study session with adaptive reminders and notifications tuned to your progress.",
    icon: Timer,
  },
  {
    title: "Adaptive Learning",
    description:
      "Your roadmap evolves based on performance, focusing on weak areas and reinforcing strengths.",
    icon: Sparkles,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20  "
    >
      {/* Background accents */}
      <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-space-grotesk text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 drop-shadow-sm"
        >
          Powerful Features for Smarter Prep
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-inter mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg"
        >
          Everything you need in one place: from personalized study plans to AI
          mentorship, SmartSyllabus is built to help you succeed.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            layoutId={`feature-card-${i}`}
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="relative flex flex-col items-start justify-between rounded-3xl border border-neutral-500/50 backdrop-blur-xl p-10 shadow-xl  group overflow-hidden"
          >
            {/* Glow effect behind card on hover */}
            <motion.div
              layout
              className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-neutral-300/20 to-neutral-600/10 dark:from-neutral-700/20 dark:to-neutral-950/10 opacity-0 group-hover:opacity-100 transition duration-500"
            />

            {/* Icon orb */}
            <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 shadow-inner shadow-neutral-400/30 dark:shadow-black/30 mb-6 group-hover:scale-105 transition-transform duration-300">
              <feature.icon className="w-8 h-8 text-neutral-900 dark:text-neutral-200" />
            </div>

            {/* Text */}
            <div className="relative z-10 space-y-3">
              <h3 className="font-space-grotesk text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {feature.title}
              </h3>
              <p className="font-inter text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Glow line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-400/40 via-neutral-300/40 to-neutral-400/40 dark:from-neutral-700/40 dark:via-neutral-800/40 dark:to-neutral-700/40" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
