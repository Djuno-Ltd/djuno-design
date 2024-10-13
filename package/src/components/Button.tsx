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
  'focus:dd-outline-0 dd-transition-all disabled:dd-cursor-not-allowed dd-w-max dd-flex dd-items-center dd-gap-1 dd-duration-400 dd-border-2 focus:dd-ring-4',
  {
    variants: {
      uiType: {
        simple:
          'dd-bg-transparent dd-text-primary-400 hover:dd-bg-primary-50 hover:dd-text-primary-500 dd-border-slate-200 hover:dd-border-primary-100 dark:dd-bg-dark-800 dark:dd-text-dark-100 dark:hover:dd-bg-dark-700 dark:hover:dd-text-dark-50 dark:dd-border-dark-700 dark:hover:dd-border-dark-600 disabled:hover:dd-bg-transparent disabled:dd-text-secondary-300 disabled:dd-border-secondary-200 disabled:dark:dd-bg-dark-900 disabled:dark:dd-text-dark-400 disabled:dark:hover:dd-border-dark-700 focus:dd-ring-primary-100/20 dark:focus:dd-ring-dark-700/50',
        primary:
          'dd-bg-primary-400 dd-text-white hover:dd-bg-primary-500 dd-border-primary-400 hover:dd-border-primary-500 dark:dd-bg-primary-500 dark:hover:dd-bg-primary-600 dark:dd-border-primary-500 dark:hover:dd-border-primary-600 disabled:dd-border-secondary-300 disabled:dd-bg-secondary-200 disabled:dd-text-secondary-400 disabled:dark:dd-bg-primary-300 disabled:dark:dd-text-white disabled:dark:dd-border-primary-300 focus:dd-ring-primary-100 dark:focus:dd-ring-primary-600/50',
        light:
          'dd-bg-primary-50 dd-text-primary-400 hover:dd-bg-primary-100 hover:dd-text-primary-500 dd-border-primary-100 hover:dd-border-primary-100 dark:dd-bg-primary-600/20 dark:dd-text-dark-100 dark:hover:dd-bg-primary-600/30 dark:hover:dd-text-dark-50 dark:dd-border-primary-400 dark:hover:dd-border-primary-500 disabled:dd-bg-transparent disabled:dd-text-secondary-300 disabled:dd-border-primary-100/60 disabled:dark:dd-bg-dark-900 disabled:dark:dd-text-dark-400 disabled:dark:dd-border-primary-300/60 focus:dd-ring-primary-100/20 dark:focus:dd-ring-dark-700/50',
        danger:
          'dd-bg-red-500 dd-text-white hover:dd-bg-red-600 dd-border-red-500 hover:dd-border-red-600 dark:dd-bg-red-500 dark:hover:dd-bg-red-600 dark:dd-border-red-500 dark:hover:dd-border-red-600 disabled:dd-border-red-400 disabled:dd-bg-red-400 disabled:dd-text-white disabled:dark:dd-bg-red-400 disabled:dark:dd-text-secondary-200 disabled:dark:dd-border-red-400 focus:dd-ring-red-100 dark:focus:dd-ring-red-600/50',
        dangerLight:
          'dd-focus:ring-2 focus:dd-ring-primary-50 dd-rounded-xl focus:dd-outline-none dd-transition-all disabled:dd-cursor-not-allowed dark:focus:dd-ring-secondary-600  dd-w-max  dd-text-red-500 dd-bg-transparent hover:dd-bg-red-500/10 dd-border-2 dd-border-red-500 disabled:dd-border-secondary-400 disabled:hover:dd-bg-transparent disabled:dd-text-secondary-400 disabled:dark:dd-text-secondary-400 dd-font-medium dd-text-sm dd-px-4 ',
        icon: 'focus:dd-outline-0 dd-transition-all disabled:dd-cursor-not-allowed dd-w-max dd-flex dd-items-center dd-gap-1 dd-duration-400 dd-border-0 focus:dd-ring-4 dd-bg-transparent dd-text-black hover:dd-bg-secondary-200 dark:dd-bg-transparent dark:dd-text-white dark:hover:dd-bg-dark-700  disabled:hover:dd-bg-transparent disabled:dd-text-secondary-300 disabled:dark:dd-bg-dark-900 disabled:dark:dd-text-dark-400 dark:focus:dd-ring-dark-700/50 dd-rounded-lg dd-text-sm dd-px-2 ',
      },
      uiSize: {
        small: 'dd-rounded-lg dd-text-xs dd-px-3 dd-h-7',
        medium: 'dd-rounded-lg dd-text-sm dd-px-4 dd-h-9',
        large: 'dd-rounded-xl dd-text-base dd-px-5 dd-h-11',
      },
    },
    defaultVariants: {
      uiType: 'simple',
      uiSize: 'medium',
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
  uiSize,
  tooltip,
  loading,
  loadingType,
  type,
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <button type={type || 'button'} {...props} className={cn(buttonVariants({ uiType, uiSize }), className)}>
        {loading && (
          <Loading
            uiType={loadingType || 'simple'}
            borderSize={1.5}
            uiSize={uiSize === 'medium' || uiSize === undefined ? 14 : uiSize === 'small' ? 12 : 18}
            theme={uiType === 'primary' ? 'white' : 'transparent'}
          />
        )}
        {children}
      </button>
    </Tooltip>
  )
}

export default Button
