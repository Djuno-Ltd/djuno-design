import * as React from 'react'
import { ButtonHTMLAttributes } from 'react'
import cn from './../utils/cn'
// import Tooltip, { TooltipProps } from './Tooltip'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  uiType?: ButtonTypes
  // tooltipProps?: TooltipProps
}
export type ButtonTypes = 'default' | 'primary' | 'light' | 'icon' | 'danger'

const Button: React.FunctionComponent<ButtonProps> = ({ children, className, uiType, ...props }) => {
  return (
    // <Tooltip {...tooltipProps}>
    <button
      {...props}
      className={cn(
        'focus:dj-ring-2 focus:dj-ring-primary-50 dj-rounded-xl focus:dj-outline-none dj-transition-all disabled:dj-cursor-not-allowed dark:focus:dj-ring-secondary-600 dj-w-max',
        {
          'dj-text-primary-500 dj-bg-transparent hover:dj-bg-primary-50 hover:dj-text-primary-500 hover:dj-border-primary-100 dj-border-2 dj-border-slate-200 dark:dj-bg-secondary-800 dark:hover:dj-bg-secondary-700 dark:dj-text-white dark:dj-border-secondary-700 disabled:dj-border-secondary-400 disabled:hover:dj-bg-transparent disabled:dj-text-secondary-400 disabled:dark:dj-text-secondary-400':
            uiType === 'default' || uiType === undefined,
          'dj-text-white dj-bg-primary-500 hover:dj-bg-primary-500 hover:dj-shadow-lg hover:dj-shadow-primary-200 dark:hover:dj-shadow-lg dark:hover:dj-shadow-secondary-700 disabled:dj-bg-secondary-300 border-2 dj-border-primary-500 disabled:dj-border-secondary-300  disabled:dj-text-secondary-400 disabled:dark:dj-bg-secondary-500 disabled:dark:dj-border-secondary-500 disabled:dark:dj-text-secondary-300 disabled:hover:dj-shadow-none':
            uiType === 'primary',
        },
        className,
      )}
    >
      {children}
    </button>
    // </Tooltip>
  )
}

export default Button
