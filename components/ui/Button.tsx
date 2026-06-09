interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "cta" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = "font-bold rounded-full transition-all active:scale-95 inline-flex items-center justify-center";

  const variants = {
    primary:   "bg-[var(--color-primary)] text-white",
    cta:       "bg-[var(--color-fresh-green)] text-white",
    secondary: "bg-white border border-[var(--color-primary)] text-[var(--color-primary)]",
    ghost:     "text-[var(--color-fresh-green)]",
  };

  const sizes = {
    sm: "text-[12px] px-4 py-2",
    md: "text-[14px] px-6 py-2.5",
    lg: "text-[16px] px-8 py-3 w-full",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
