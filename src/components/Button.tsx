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
import cn from './../utils/cn'
import Tooltip from './Tooltip'
import Loading from './Loading'
import { ButtonProps } from '../types'
import { cva } from 'class-variance-authority'

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for button styles based on specified variants.
 */
const buttonVariants = cva(
  'dj-rounded-xl focus:dj-outline-0 dj-transition-all disabled:dj-cursor-not-allowed dj-w-max dj-flex dj-items-center dj-gap-1 dj-duration-400 dj-border-2 focus:dj-ring-4',
  {
    variants: {
      uiType: {
        simple:
          'dj-bg-transparent dj-text-primary-400 hover:dj-bg-primary-50 hover:dj-text-primary-500 dj-border-slate-200 hover:dj-border-primary-100 dark:dj-bg-dark-800 dark:dj-text-dark-100 dark:hover:dj-bg-dark-700 dark:hover:dj-text-dark-50 dark:dj-border-dark-700 dark:hover:dj-border-dark-600 disabled:hover:dj-bg-transparent disabled:dj-text-secondary-300 disabled:dj-border-secondary-200 disabled:dark:dj-bg-dark-900 disabled:dark:dj-text-dark-400 disabled:dark:hover:dj-border-dark-700 focus:dj-ring-primary-100/20 dark:focus:dj-ring-dark-700/50',
        primary:
          'dj-bg-primary-400 dj-text-white hover:dj-bg-primary-500 dj-border-primary-400 hover:dj-border-primary-500 dark:dj-bg-primary-500 dark:hover:dj-bg-primary-600 dark:dj-border-primary-500 dark:hover:dj-border-primary-600 disabled:dj-border-secondary-300 disabled:dj-bg-secondary-200 disabled:dj-text-secondary-400 disabled:dark:dj-bg-primary-300 disabled:dark:dj-text-white disabled:dark:dj-border-primary-300 focus:dj-ring-primary-100 dark:focus:dj-ring-primary-600/50',
        light:
          'dj-bg-primary-50 dj-text-primary-400 hover:dj-bg-primary-100 hover:dj-text-primary-500 dj-border-primary-100 hover:dj-border-primary-100 dark:dj-bg-primary-600/20 dark:dj-text-dark-100 dark:hover:dj-bg-primary-600/30 dark:hover:dj-text-dark-50 dark:dj-border-primary-400 dark:hover:dj-border-primary-500 disabled:dj-bg-transparent disabled:dj-text-secondary-300 disabled:dj-border-primary-100/60 disabled:dark:dj-bg-dark-900 disabled:dark:dj-text-dark-400 disabled:dark:dj-border-primary-300/60 focus:dj-ring-primary-100/20 dark:focus:dj-ring-dark-700/50',
        danger:
          'dj-bg-red-500 dj-text-white hover:dj-bg-red-600 dj-border-red-500 hover:dj-border-red-600 dark:dj-bg-red-500 dark:hover:dj-bg-red-600 dark:dj-border-red-500 dark:hover:dj-border-red-600 disabled:dj-border-red-400 disabled:dj-bg-red-400 disabled:dj-text-white disabled:dark:dj-bg-red-400 disabled:dark:dj-text-secondary-200 disabled:dark:dj-border-red-400 focus:dj-ring-red-100 dark:focus:dj-ring-red-600/50',
      },
      size: {
        small: 'dj-text-xs dj-px-3 dj-h-7',
        medium: 'dj-text-sm dj-px-4 dj-h-9',
        large: 'dj-text-base dj-px-5 dj-h-11',
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
const Button: React.FunctionComponent<ButtonProps> = ({
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
