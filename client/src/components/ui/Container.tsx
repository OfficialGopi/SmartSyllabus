import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-smooth relative w-full">
      <div className="absolute -left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent dark:via-neutral-200/50" />
      <div className="absolute -right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent dark:via-neutral-200/50" />
      {children}
    </div>
  );
};

export default Container;
