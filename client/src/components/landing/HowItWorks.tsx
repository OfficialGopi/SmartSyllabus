import { motion } from "framer-motion";
import { Calendar, Cpu, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Input Your Syllabus",
    description:
      "Upload or paste your syllabus and set your exam date. SmartSyllabus understands the scope and timeline.",
    icon: Calendar,
  },
  {
    title: "AI Generates Roadmap",
    description:
      "Our AI instantly builds a personalized day-by-day study plan tailored to your schedule and goals.",
    icon: Cpu,
  },
  {
    title: "Track & Learn with Mentor",
    description:
      "Follow the plan, monitor progress, and ask the AI mentor anytime you need clarity or help.",
    icon: GraduationCap,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20  "
    >
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-space-grotesk text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-inter mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg"
        >
          From syllabus to success in three simple steps.
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800" />

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative pl-20 flex flex-col gap-3"
            >
              {/* Icon bubble */}
              <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 shadow-lg">
                <step.icon className="w-7 h-7 text-neutral-900 dark:text-neutral-100" />
              </div>

              <h3 className="font-space-grotesk text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {step.title}
              </h3>
              <p className="font-inter text-neutral-600 dark:text-neutral-400 max-w-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
