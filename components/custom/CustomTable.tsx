import * as React from 'react'
import { cn } from '@/lib/utils'

interface CustomTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export const CustomTable: React.FC<CustomTableProps> = ({ className, children, ...props }) => {
  return (
    <table
      className={cn('w-full table-auto text-left', className)}
      {...props}
    >
      {children}
    </table>
  )
}

interface CustomTableSectionProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export const CustomTableHeader: React.FC<CustomTableSectionProps> = ({ className, children, ...props }) => {
  return (
    <thead
      className={cn('border-b', className)}
      {...props}
    >
      {children}
    </thead>
  )
}

export const CustomTableBody: React.FC<CustomTableSectionProps> = ({ className, children, ...props }) => {
  return (
    <tbody
      className={cn('divide-y divide-muted-foreground', className)}
      {...props}
    >
      {children}
    </tbody>
  )
}

interface CustomTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export const CustomTableRow: React.FC<CustomTableRowProps> = ({ className, children, ...props }) => {
  return (
    <tr
      className={cn('hover:bg-muted', className)}
      {...props}
    >
      {children}
    </tr>
  )
}

interface CustomTableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
}

export const CustomTableHead: React.FC<CustomTableHeadProps> = ({ className, children, ...props }) => {
  return (
    <th
      className={cn('px-4 py-2 font-medium', className)}
      {...props}
    >
      {children}
    </th>
  )
}

interface CustomTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export const CustomTableCell: React.FC<CustomTableCellProps> = ({ className, children, ...props }) => {
  return (
    <td
      className={cn('px-4 py-2', className)}
      {...props}
    >
      {children}
    </td>
  )
}
