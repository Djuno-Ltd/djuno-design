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
import { TooltipProps } from '../types'
import { cva } from 'class-variance-authority'

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for button styles based on specified variants.
 */
const tooltipVariants = cva('dj-text-white dj-max-w-[250px] !dj-px-2 !dj-py-1 !dj-whitespace-normal dj-z-40', {
  variants: {
    theme: {
      primary: '!dj-bg-primary-500 dark:dj-bg-primary-400',
      error: '!dj-bg-red-500 dark:dj-bg-red-500',
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
const Tooltip: React.FunctionComponent<TooltipProps> = ({ children, content, clickable, place, theme, className }) => {
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

export default Tooltip
