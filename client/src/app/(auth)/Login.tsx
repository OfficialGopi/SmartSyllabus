import { motion } from "framer-motion";
import { Github, Chrome } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full animate-pulse" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/40 dark:border-neutral-800/40 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="rounded-lg" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-space-grotesk font-bold text-center text-neutral-900 dark:text-neutral-50">
          Welcome Back
        </h1>
        <p className="mt-2 text-center font-inter text-neutral-600 dark:text-neutral-400 text-sm max-w-xs mx-auto">
          Sign in to <span className="font-semibold">SmartSyllabus</span> and
          get your personalized AI-powered exam roadmap today.
        </p>

        {/* Buttons */}
        <div className="mt-8 space-y-5">
          <button
            onClick={() =>
              window.open("http://localhost:8000/api/v1/user/google", "_self")
            }
            className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl cursor-pointer font-space-grotesk text-base bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl cursor-pointer font-space-grotesk text-base bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition">
            <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            Continue with GitHub
          </button>
        </div>
      </motion.div>
    </div>
  );
}
