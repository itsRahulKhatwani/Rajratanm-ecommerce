import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider overflow-hidden relative group";

  const variants = {
    primary:
      "gold-gradient text-navy-dark hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] active:scale-[0.98] border border-gold-light/50 font-bold",
    secondary:
      "bg-emerald text-ivory hover:bg-emerald-light hover:shadow-[0_0_20px_rgba(46,107,94,0.4)] active:scale-[0.98]",
    outline:
      "border border-gold/50 text-gold hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)] active:scale-[0.98] backdrop-blur-sm",
    ghost:
      "text-ivory/80 hover:text-gold hover:bg-ivory/10 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
