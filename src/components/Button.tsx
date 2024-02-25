import * as React from 'react'
import { ButtonHTMLAttributes } from 'react'
import cn from './../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasError?: boolean
}

const Button: React.FunctionComponent<ButtonProps> = ({ children, className, hasError = false, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'dj-p-1 dj-rounded-md dj-flex dj-justify-center dj-items-center dj-text-sm dj-text-white',
        {
          'dj-bg-violet-500': !hasError,
          'dj-bg-red-500': hasError,
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
