import * as React from "react";
import { cn } from "@/lib/utils";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * VisuallyHidden component
 * 
 * This component makes content invisible to sighted users but still accessible to screen readers.
 * It's useful for providing additional context to screen reader users without cluttering 
 * the visual interface.
 */
export function VisuallyHidden({
  children,
  className,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
        "clip-[rect(0,0,0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * VisuallyHiddenInput component
 * 
 * This component makes form inputs invisible to sighted users but still accessible
 * to screen readers. Useful for creating custom form controls that maintain accessibility.
 */
export function VisuallyHiddenInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
        "clip-[rect(0,0,0,0)]",
        className
      )}
      type="text"
      aria-hidden={false}
      {...props}
    />
  );
}