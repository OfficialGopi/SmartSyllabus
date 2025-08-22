import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";

const plans = [
  {
    name: "Free",
    description: "Perfect to get started",
    price: "$0",
    features: [
      "Personalized Roadmap",
      "Limited AI Mentor Access",
      "Basic Resources",
    ],
    button: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    description: "Unlock your full potential",
    price: "$9/mo",
    features: [
      "Unlimited AI Mentor",
      "Full Resource Library",
      "Advanced Analytics",
      "Smart Reminders",
    ],
    button: "Go Premium",
    highlight: true,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  return (
    <section className="w-full py-28 px-6 md:px-12 lg:px-20 bg-neutral-100 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-space-grotesk text-4xl font-bold text-neutral-900 dark:text-neutral-50"
        >
          Simple Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-inter text-neutral-600 dark:text-neutral-400 mt-4"
        >
          Choose the plan that works best for you.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`relative p-10 rounded-3xl backdrop-blur-xl border shadow-xl transition duration-500 ${
              plan.highlight
                ? "bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 border-neutral-300/50 dark:border-neutral-700/50"
                : "bg-neutral-50/70 dark:bg-neutral-900/70 border-neutral-200/40 dark:border-neutral-800/40"
            }`}
          >
            {/* Glow highlight */}
            {plan.highlight && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent blur-2xl" />
            )}

            <div className="relative z-10">
              <h3 className="font-space-grotesk text-2xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
                {plan.name}
              </h3>
              <p className="font-inter text-neutral-600 dark:text-neutral-400 mb-6">
                {plan.description}
              </p>
              <p className="text-3xl font-space-grotesk font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                {plan.price}
              </p>
              <ul className="space-y-3 mb-6 text-left">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="font-inter text-neutral-700 dark:text-neutral-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-space-grotesk cursor-pointer shadow-md transition ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
                }`}
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/transactions");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {plan.button}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
