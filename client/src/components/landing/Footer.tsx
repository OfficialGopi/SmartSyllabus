import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full py-16 px-6 md:px-12 lg:px-20 bg-neutral-100 dark:bg-neutral-950 overflow-hidden mask-bottom">
      {/* Background big text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-7xl md:text-9xl font-space-grotesk font-bold text-neutral-200 dark:text-neutral-900 opacity-20 tracking-wide">
          SMART SYLLABUS
        </h1>
      </div>

      {/* Background glow */}
      <div className="absolute top-[-10%] left-[5%] w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Links */}
        <div className="flex flex-col md:flex-row gap-6 font-inter text-neutral-600 dark:text-neutral-400 text-sm">
          <a
            href="#about"
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition"
          >
            Contact
          </a>
          <a
            href="#privacy"
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition"
          >
            Terms
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 hover:bg-neutral-300 dark:hover:bg-neutral-700 shadow-md transition"
          >
            <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 hover:bg-neutral-300 dark:hover:bg-neutral-700 shadow-md transition"
          >
            <Linkedin className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 hover:bg-neutral-300 dark:hover:bg-neutral-700 shadow-md transition"
          >
            <Twitter className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center font-inter text-neutral-500 dark:text-neutral-400 text-xs relative z-10">
        © {new Date().getFullYear()} SmartSyllabus. All rights reserved.
      </div>
    </footer>
  );
}
