import { Outlet } from "react-router-dom";
import MainLayoutNavbar from "@/components/shared/MainLayoutNavbar"; // The improved Navbar we discussed earlier

const MainLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col  ">
      {/* Navbar at the top */}
      <MainLayoutNavbar />

      {/* Body */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar (only visible on md and above) */}
        <aside className="hidden md:flex w-1/4 h-full border-r border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-4">
          {/* You can add your sidebar items here */}
          <nav className="flex flex-col gap-4 w-full">
            <a
              href="#"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Sidebar Item 1
            </a>
            <a
              href="#"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Sidebar Item 2
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </main>
  );
};

export default MainLayout;
