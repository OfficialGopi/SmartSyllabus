import { motion } from "framer-motion";
import { Clock, Sparkles, Smile } from "lucide-react";

const benefits = [
  {
    title: "Save Time & Stay Organized",
    description:
      "No more wasted hours planning — SmartSyllabus automatically creates your entire study roadmap.",
    icon: Clock,
  },
  {
    title: "Personalized Learning",
    description:
      "Your roadmap adapts to your syllabus, goals, and available time — tailored for maximum efficiency.",
    icon: Sparkles,
  },
  {
    title: "Reduce Stress & Overwhelm",
    description:
      "Know exactly what to study each day, so you stay calm, confident, and exam-ready.",
    icon: Smile,
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20  "
    >
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left side - illustration placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/why_smartsyllabus_illustration.png"
            alt="Why SmartSyllabus Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Right side - text and benefits */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-space-grotesk text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-8"
          >
            Why SmartSyllabus?
          </motion.h2>

          <div className="space-y-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex items-start gap-5"
              >
                <div className="p-2 flex items-center justify-center rounded-[100%]   ">
                  <benefit.icon className="w-7 h-7 text-neutral-900 dark:text-neutral-100 rounded-[100%]" />
                </div>
                <div>
                  <h3 className="font-space-grotesk text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                    {benefit.title}
                  </h3>
                  <p className="font-inter text-neutral-600 dark:text-neutral-400 mt-1">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
