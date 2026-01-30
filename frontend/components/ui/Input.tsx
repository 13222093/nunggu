/**
 * Input Component - KITA Design System
 *
 * ExportReadyAI-inspired input with hard shadows
 * Adapted for KITA's blue-teal primary color palette
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles - ExportReadyAI pattern
          "flex h-12 w-full rounded-xl border-2 bg-white px-4 py-3",
          "text-base font-medium text-stone-900",

          // KITA colors (primary blue border)
          "border-primary-100 shadow-[0_2px_0_0_#e0f2fe]",

          // Focus state (primary blue)
          "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
          "focus:shadow-[0_2px_0_0_#0284c7]",

          // Placeholder
          "placeholder:text-primary-300 placeholder:font-normal",

          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-primary-50",

          // Transition
          "transition-all duration-150",

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
