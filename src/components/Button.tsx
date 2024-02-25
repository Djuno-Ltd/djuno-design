import * as React from 'react'
import { ButtonHTMLAttributes } from 'react'
import cn from './../utils/cn'
import Tooltip, { TooltipProps } from './Tooltip'
import { Size } from '../types'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  uiType?: ButtonTypes
  size?: Size
  tooltip?: TooltipProps
}
export type ButtonTypes = 'simple' | 'primary' | 'light' | 'icon' | 'danger'

const Button: React.FunctionComponent<ButtonProps> = ({ children, className, uiType, size, tooltip, ...props }) => {
  const renderButton = () => (
    <button
      {...props}
      className={cn(
        'dj-rounded-xl focus:dj-outline-none dj-transition-all disabled:dj-cursor-not-allowed dj-w-max',
        {
          'dj-text-primary-500 dj-bg-transparent hover:dj-bg-primary-50 hover:dj-text-primary-500 hover:dj-border-primary-100 dj-border-2 dj-border-slate-200 dark:dj-bg-secondary-800 dark:hover:dj-bg-secondary-700 dark:dj-text-white dark:dj-border-secondary-700 disabled:dj-border-secondary-400 disabled:hover:dj-bg-transparent disabled:dj-text-secondary-400 disabled:dark:dj-text-secondary-400':
            uiType === 'simple' || uiType === undefined,
          'dj-text-white dj-bg-primary-500 hover:dj-bg-primary-500 hover:dj-shadow-lg hover:dj-shadow-primary-200 dark:hover:dj-shadow-lg dark:hover:dj-shadow-secondary-700 border-2 dj-border-primary-500 focus:dj-ring-2 focus:dj-ring-primary-300 dark:focus:dj-ring-secondary-600 disabled:dj-border-secondary-300 disabled:dj-bg-secondary-300 disabled:dj-text-secondary-400 disabled:dark:dj-bg-secondary-500 disabled:dark:dj-border-secondary-500 disabled:dark:dj-text-secondary-300 disabled:hover:dj-shadow-none':
            uiType === 'primary',
          'dj-text-xs dj-px-3 dj-h-7': size === 'small',
          'dj-text-sm dj-px-4 dj-h-9': size === 'medium' || size === undefined,
          'dj-text-base dj-px-5 dj-h-11': size === 'large',
        },
        className,
      )}
    >
      {children}
    </button>
  )
  if (tooltip?.content) return <Tooltip {...tooltip}>{renderButton()}</Tooltip>
  return renderButton()
}

export default Button
