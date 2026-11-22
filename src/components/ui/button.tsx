import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "utama" | "sekunder" | "navy" | "outline-navy" | "bahaya" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "utama",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]";

    const variantStyles = {
      utama:
        "bg-orange-500 text-navy-900 hover:bg-[#e27618] active:bg-[#cf6910] shadow-sm",
      sekunder:
        "bg-card text-content-primary border border-divider hover:bg-page hover:border-navy-100",
      navy:
        "bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-900 shadow-sm",
      "outline-navy":
        "bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-100/50",
      bahaya:
        "bg-[#912020] text-white hover:bg-[#7c1a1a] active:bg-[#681414] shadow-sm",
      ghost:
        "bg-transparent text-content-primary hover:bg-navy-100/40 hover:text-navy-900",
    };

    const sizeStyles = {
      sm: "h-[36px] px-3.5 text-label gap-1.5",
      md: "h-[42px] px-5 text-tombol gap-2",
      lg: "h-[48px] px-6 text-h3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
