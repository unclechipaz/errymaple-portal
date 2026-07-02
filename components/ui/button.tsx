import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-blue disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        default: "bg-school-blue text-white hover:bg-school-blue-light shadow-md hover:shadow-lg hover:shadow-school-blue/20 hover:-translate-y-0.5",
        gold: "bg-school-gold text-white hover:bg-school-gold-light shadow-md hover:shadow-lg hover:shadow-school-gold/20 hover:-translate-y-0.5",
        outline: "border-2 border-school-blue text-school-blue bg-transparent hover:bg-school-blue hover:text-white",
        outlineGold: "border-2 border-school-gold text-school-gold bg-transparent hover:bg-school-gold hover:text-white",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-school-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
