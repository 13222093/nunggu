/**
 * Alert Component - KITA Design System
 *
 * ExportReadyAI-inspired alert with hard shadows
 * Adapted for KITA's color palette
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

const alertIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertCircle,
};

type AlertVariant = "default" | "destructive" | "success" | "warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", showIcon = true, children, ...props }, ref) => {
    const Icon = alertIcons[variant];

    const variantClasses = {
      default: "bg-primary-50 text-primary-900 border-primary-200 shadow-[0_4px_0_0_rgba(2,132,199,0.2)] [&>svg]:text-primary-500",
      destructive: "bg-red-50 text-red-900 border-red-200 shadow-[0_4px_0_0_rgba(239,68,68,0.2)] [&>svg]:text-danger-500",
      success: "bg-green-50 text-green-900 border-green-200 shadow-[0_4px_0_0_rgba(34,197,94,0.2)] [&>svg]:text-success-500",
      warning: "bg-amber-50 text-amber-900 border-amber-200 shadow-[0_4px_0_0_rgba(245,158,11,0.2)] [&>svg]:text-secondary-500",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-2xl border-2 p-4",
          "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-8",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {showIcon && <Icon className="h-5 w-5" />}
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
