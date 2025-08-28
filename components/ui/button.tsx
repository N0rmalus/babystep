import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg" | "xl";
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    variant = "primary",
    size = "md",
    ...props
}, ref) => {
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-3 text-base",
        lg: "px-7 py-4 text-lg",
        xl: "px-9 py-5 text-xl"
    };

    return (
        <button className={cn(
            "w-auto rounded-full font-semibold disabled:cursor-not-allowed transition",
            variant === "primary"
                ? "bg-black border-transparent text-white hover:opacity-75"
                : "bg-white border border-gray-300 text-black hover:bg-gray-100 hover:text-black",
            sizeClasses[size],
            className
        )} disabled={disabled} ref={ref} {...props}>
            {children}
        </button>
    );
})

export default Button;