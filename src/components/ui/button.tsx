import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[13px] uppercase tracking-wide2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold text-noir hover:bg-gold-soft shadow-[0_18px_50px_-24px_rgba(176,139,90,0.9)]",
        outline:
          "border border-white/20 text-bone hover:border-gold hover:text-gold",
        ghost: "text-bone hover:text-gold",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        lg: "h-14 px-9 text-sm",
        sm: "h-10 px-5 text-[12px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
