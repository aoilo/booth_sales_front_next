import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variant === 'default'
          ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
          : variant === 'outline'
          ? 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white'
          : 'bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button