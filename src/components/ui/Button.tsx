import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          {
            "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-[0.98]":
              variant === "primary",
            "bg-[var(--color-dark)] text-white hover:bg-[var(--color-dark-2)] active:scale-[0.98]":
              variant === "secondary",
            "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-warm)] active:scale-[0.98]":
              variant === "ghost",
            "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]":
              variant === "outline",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
