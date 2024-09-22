/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Button Component
 * @copyright Djuno Design 2024
 *
 * Copyright 2024 Djuno Design
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react'
import { cn } from './../utils/cn'
import Tooltip from './Tooltip'
import Loading from './Loading'
import { ButtonProps } from '../types'
import { cva } from 'class-variance-authority'

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for button styles based on specified variants.
 */
const buttonVariants = cva(
  'focus:outline-0 transition-all disabled:cursor-not-allowed w-max flex items-center gap-1 duration-400 border-2 focus:ring-4',
  {
    variants: {
      uiType: {
        simple:
          'bg-transparent text-primary-400 hover:bg-primary-50 hover:text-primary-500 border-slate-200 hover:border-primary-100 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-dark-700 dark:hover:text-dark-50 dark:border-dark-700 dark:hover:border-dark-600 disabled:hover:bg-transparent disabled:text-secondary-300 disabled:border-secondary-200 disabled:dark:bg-dark-900 disabled:dark:text-dark-400 disabled:dark:hover:border-dark-700 focus:ring-primary-100/20 dark:focus:ring-dark-700/50',
        primary:
          'bg-primary-400 text-white hover:bg-primary-500 border-primary-400 hover:border-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 dark:border-primary-500 dark:hover:border-primary-600 disabled:border-secondary-300 disabled:bg-secondary-200 disabled:text-secondary-400 disabled:dark:bg-primary-300 disabled:dark:text-white disabled:dark:border-primary-300 focus:ring-primary-100 dark:focus:ring-primary-600/50',
        light:
          'bg-primary-50 text-primary-400 hover:bg-primary-100 hover:text-primary-500 border-primary-100 hover:border-primary-100 dark:bg-primary-600/20 dark:text-dark-100 dark:hover:bg-primary-600/30 dark:hover:text-dark-50 dark:border-primary-400 dark:hover:border-primary-500 disabled:bg-transparent disabled:text-secondary-300 disabled:border-primary-100/60 disabled:dark:bg-dark-900 disabled:dark:text-dark-400 disabled:dark:border-primary-300/60 focus:ring-primary-100/20 dark:focus:ring-dark-700/50',
        danger:
          'bg-red-500 text-white hover:bg-red-600 border-red-500 hover:border-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:border-red-500 dark:hover:border-red-600 disabled:border-red-400 disabled:bg-red-400 disabled:text-white disabled:dark:bg-red-400 disabled:dark:text-secondary-200 disabled:dark:border-red-400 focus:ring-red-100 dark:focus:ring-red-600/50',
      },
      size: {
        small: 'rounded-lg text-xs px-3 h-7',
        medium: 'rounded-lg text-sm px-4 h-9',
        large: 'rounded-xl text-base px-5 h-11',
      },
    },
    defaultVariants: {
      uiType: 'simple',
      size: 'medium',
    },
  },
)

/**
 * Button component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - Button props.
 * @param {React.ReactNode} [props.children] - The content inside the button.
 * @param {string} [props.className] - Additional classes to apply to the button.
 * @param {string} [props.uiType] - Type of UI for the button: 'simple' or 'primary'.
 * @param {string} [props.size] - Size of the button: 'small', 'medium', or 'large'.
 * @param {object} [props.tooltip] - Tooltip configuration for the button.
 * @param {React.ReactNode} [props.tooltip.content] - Content of the tooltip.
 * @param {boolean} [props.loading] - Indicates if the button is in a loading state.
 * @param {string} [props.loadingType] - Type of loading indicator: 'simple' or custom.
 *
 * @returns {React.ReactNode} Rendered Button component.
 *
 * @version 0.0.1
 * @see https://www.npmjs.com/package/djuno-design#button
 *
 * @example
 * // Example usage of Button component:
 * <Button onClick={() => console.log("Button clicked")} uiType="primary" size="large">
 *   Submit
 * </Button>
 *
 * @example
 * // Example usage of Button component with loading state:
 * <Button loading={true} loadingType="simple" uiType="simple">
 *   Save Changes
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  uiType,
  size,
  tooltip,
  loading,
  loadingType,
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <button {...props} className={cn(buttonVariants({ uiType, size }), className)}>
        {loading && (
          <Loading
            type={loadingType || 'simple'}
            borderSize={1.5}
            size={size === 'medium' || size === undefined ? 14 : size === 'small' ? 12 : 18}
            theme={uiType === 'primary' ? 'white' : 'transparent'}
          />
        )}
        {children}
      </button>
    </Tooltip>
  )
}

export default Button
