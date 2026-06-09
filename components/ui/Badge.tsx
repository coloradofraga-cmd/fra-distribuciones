interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "orange" | "secondary";
}

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  const styles = {
    primary:   "bg-[var(--color-fresh-green)] text-white",
    orange:    "bg-[var(--color-error-red)] text-white",
    secondary: "bg-[var(--color-primary-fixed)] text-[var(--color-primary)]",
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}
