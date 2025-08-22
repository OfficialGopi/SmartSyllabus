import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col">
      <nav className="w-full border-b h-[60px] border-neutral-500/50"></nav>
      <div className="flex flex-1 w-full">
        <aside className="hidden md:flex w-1/4 border-r border-neutral-500/50 h-full"></aside>
        <main>
          <Outlet />
        </main>
      </div>
    </main>
  );
};

export default MainLayout;
