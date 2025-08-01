import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 shadow-lg hover:shadow-xl",
     outline:
      "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-500/10",
    ghost: " text-blue-600 hover:bg-blue-50 dark:text-purple-400 dark:hover:bg-purple-500/10",
    secondary:
      "bg-gary-700 text-slate-900 hover:bg-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-900",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105",
        variants[variant],
        sizes[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
