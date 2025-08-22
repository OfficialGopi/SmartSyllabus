import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Map, TrendingUp, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import ToggleThemeBtn from "./ToggleThemeBtn";

const tabs = [
  { path: "/chats", label: "Chats", icon: BookOpen },
  { path: "/roadmaps", label: "Roadmaps", icon: Map },
  { path: "/progress", label: "Progress", icon: TrendingUp },
  { path: "/profile", label: "Profile", icon: Settings },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-500/50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="smartsyllabus"
            className="h-10 sm:h-12 rounded-md"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 relative">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `relative flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? ""
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2 relative z-[1] p-2">
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-0  bg-neutral-200/50  dark:bg-neutral-800/50  rounded-md"
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Theme Toggle + Hamburger */}
        <div className="flex items-center gap-3">
          <ToggleThemeBtn className="" />
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-500/50 shadow-inner overflow-hidden"
          >
            <div className="flex flex-col py-2 px-4 space-y-3">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    }`
                  }
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
