import { cn } from "@/util/cn";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles =
    "font-inter relative inline-flex items-center justify-center px-6 py-3 text-lg rounded-xl font-medium cursor-pointer transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950/5 dark:focus:ring-offset-neutral-100/5 active:scale-95";

  const variants = {
    primary:
      "bg-neutral-900 text-white shadow-md hover:bg-neutral-800 hover:shadow-lg dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:shadow-neutral-800/30",
    outline:
      "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
    ghost:
      "text-neutral-700 dark:text-neutral-300 bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
