"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ToggleThemeBtn from "../shared/ToggleThemeBtn";
import { useNavigate } from "react-router-dom";

// Reusable Button (matches your Hero styles)

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={[
          "mx-auto max-w-7xl",
          "rounded-b-2xl",
          "border-b",
          "supports-[backdrop-filter]:backdrop-blur-xl",
          "bg-neutral-100/60 dark:bg-neutral-950/40",
          "border-neutral-200/60 dark:border-neutral-800/60",
          scrolled
            ? "shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "",
        ].join(" ")}
        role="navigation"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-md" />{" "}
            <span className="font-space-grotesk text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              SmartSyllabus
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="font-inter text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:opacity-80"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="font-inter text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:opacity-80"
            >
              How it works
            </a>
            <a
              href="#benefits"
              className="font-inter text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:opacity-80"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="font-inter text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:opacity-80"
            >
              Testimonials
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ToggleThemeBtn className="p-2 cursor-pointer" />
            <Button
              variant="ghost"
              className="px-3 py-2 text-base"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-10 rounded-xl border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 bg-neutral-100/60 dark:bg-neutral-900/40 cursor-pointer supports-[backdrop-filter]:backdrop-blur-xl"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile sheet */}
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
            filter: open ? "blur(0px)" : "blur(6px)",
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60"
        >
          <div className="px-4 py-4 grid gap-4 bg-neutral-100/70 dark:bg-neutral-950/50 supports-[backdrop-filter]:backdrop-blur-xl">
            <a
              onClick={() => setOpen(false)}
              href="#features"
              className="font-inter text-base text-neutral-800 dark:text-neutral-200 cursor-pointer"
            >
              Features
            </a>
            <a
              onClick={() => setOpen(false)}
              href="#how-it-works"
              className="font-inter text-base text-neutral-800 dark:text-neutral-200 cursor-pointer"
            >
              How it works
            </a>
            <a
              onClick={() => setOpen(false)}
              href="#testimonials"
              className="font-inter text-base text-neutral-800 dark:text-neutral-200 cursor-pointer"
            >
              Testimonials
            </a>

            <a
              onClick={() => setOpen(false)}
              href="#benefits"
              className="font-inter text-base text-neutral-800 dark:text-neutral-200 cursor-pointer"
            >
              Benefits
            </a>
            <div className="pt-2 flex gap-3">
              <ToggleThemeBtn className="p-2 cursor-pointer" />
              <Button
                variant="ghost"
                className="flex-1 px-2 py-1"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </header>
  );
}
