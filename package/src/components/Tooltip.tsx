/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Tooltip Component
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
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { uuid } from '../utils/uuid'
import { cn } from '../utils/cn'
import { TooltipComponents, TooltipProps } from '../types'
import { cva } from 'class-variance-authority'
import { ReactComponent as InfoIcon } from './../assets/icons/question-mark-circle.svg'
import { ReactComponent as ErrorIcon } from './../assets/icons/exclamation-circle-outline.svg'

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for button styles based on specified variants.
 */
const tooltipVariants = cva('dd-text-white dd-max-w-[250px] !dd-px-2 !dd-py-1 !dd-whitespace-normal dd-z-40', {
  variants: {
    theme: {
      primary: '!dd-bg-primary-500 dark:!dd-bg-primary-400',
      error: '!dd-bg-red-500 dark:!dd-bg-red-500',
      black: '!dd-bg-black dark:!dd-bg-white dark:!dd-text-black',
    },
  },
  defaultVariants: {
    theme: 'primary',
  },
})

/**
 * Tooltip component that provides contextual information on hover or click events.
 *
 * @param {object} props - Tooltip props.
 * @param {React.ReactNode} props.children - The content to which the tooltip is attached.
 * @param {string | React.ReactNode} props.content - The content of the tooltip.
 * @param {boolean} [props.clickable] - Determines if the tooltip is clickable.
 * @param {TooltipPlaces} [props.place] - The placement of the tooltip relative to its parent element.
 * @param {TooltipThemeTypes} [props.theme] - The theme of the tooltip, defining its appearance.
 *
 * @returns {React.ReactNode} Rendered Tooltip component.
 *
 * @version 0.0.2
 * @see https://www.npmjs.com/package/djuno-design#tooltip
 *
 * @example
 * // Example usage of Tooltip component:
 * <Tooltip content="This is a tooltip" place="top" theme="primary">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * // Example usage of Tooltip component with custom content:
 * <Tooltip content={<div>This is a custom tooltip content</div>} clickable={true} place="bottom">
 *   <span>Click me</span>
 * </Tooltip>
 */
// eslint-disable-next-line react/prop-types
const Tooltip: React.FC<TooltipProps> & TooltipComponents = ({ children, ...props }): React.ReactNode => {
  return <BaseTooltip {...props}>{children}</BaseTooltip>
}

const BaseTooltip: React.FunctionComponent<TooltipProps> = ({
  children,
  content,
  clickable,
  place,
  theme,
  className,
}) => {
  if (!content) {
    return children
  }
  const randomKey = uuid(10)
  return (
    <>
      <span data-tooltip-id={randomKey}>{children}</span>
      <ReactTooltip
        id={randomKey}
        clickable={clickable}
        place={place}
        className={cn(tooltipVariants({ theme }), className)}
      >
        {content}
      </ReactTooltip>
    </>
  )
}

const InfoTooltip: React.FC<TooltipProps> = (props) => {
  return (
    <Tooltip {...props}>
      <InfoIcon className='dd-w-4 dd-text-slate-500 dark:dd-text-slate-300 dark:hover:dd-text-slate-100' />
    </Tooltip>
  )
}

const ErrorTooltip: React.FC<TooltipProps> = (props) => {
  return (
    <Tooltip {...props} theme='error'>
      <ErrorIcon className='dd-w-4 dd-text-red-500 hover:dd-text-red-700 dark:dd-text-red-500 dark:hover:dd-text-red-700' />
    </Tooltip>
  )
}

Tooltip.Info = InfoTooltip
Tooltip.Error = ErrorTooltip

export default Tooltip
