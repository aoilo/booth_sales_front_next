import * as React from 'react'
import { cn } from '@/lib/utils'

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CustomCard: React.FC<CustomCardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CustomCardHeader: React.FC<CustomCardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const CustomCardTitle: React.FC<CustomCardProps> = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export const CustomCardDescription: React.FC<CustomCardProps> = ({ className, children, ...props }) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export const CustomCardContent: React.FC<CustomCardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}