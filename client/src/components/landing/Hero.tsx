import { motion } from "framer-motion";
import mockupIllustration from "/mockup_illustration.png"; // ensure the path matches your project structure
import { Button } from "../ui/button";
import Badge from "./Badge";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen  flex flex-col justify-center items-center   px-6 md:px-12 lg:px-20 gap-4"
    >
      {/* Background gradients */}
      <Badge />
      <div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-15%] right-[5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center ">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h1 className="font-space-grotesk text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Smarter Exam Prep with{" "}
              <span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </h1>

            <p className="font-inter text-sm md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0">
              SmartSyllabus transforms your syllabus into a personalized
              roadmap. Get curated resources, progress tracking, and a 24/7 AI
              mentor to guide you from chaos to clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary">Start Free</Button>
              <Button variant="outline">▶ Watch Demo</Button>
            </div>
          </motion.div>

          {/* Illustration with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, rotateY: 20, rotateX: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 15, rotateX: 3, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end perspective-[2000px]"
          >
            <motion.img
              src={mockupIllustration}
              alt="SmartSyllabus Dashboard Mockup"
              className="w-full max-w-lg lg:max-w-xl rounded-2xl shadow-2xl"
              whileHover={{ rotateY: 10, rotateX: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
