/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Skeleton Component
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
import { cn } from '../utils/cn'
import { cva } from 'class-variance-authority'
import { SkeletonProps } from '../types/ISkeleton'

/**
 * Define Skeleton variants using the `cva` utility function.
 * This function generates CSS classes for skeleton styles based on specified variants.
 */
const skeletonVariants = cva('dd-bg-slate-200/80 dark:dd-bg-white/10 dd-rounded-sm', {
  variants: {
    shape: {
      rectangle: 'dd-w-full',
      circle: 'dd-rounded-full dd-aspect-square',
      square: 'dd-aspect-square',
    },
    uiSize: {
      small: 'dd-h-7',
      medium: 'dd-h-9',
      large: 'dd-h-11',
    },
    animation: {
      none: '',
      wave: '',
      pulse: 'dd-animate-pulse',
    },
  },
  defaultVariants: {
    shape: 'rectangle',
    uiSize: 'medium',
    animation: 'pulse',
  },
})

/**
 * Skeleton component for displaying loading placeholders.
 *
 * @param {object} props - Properties for configuring the Skeleton component.
 * @param {SizeTypes} [props.uiSize] - Size of the skeleton, such as 'small', 'medium', or 'large'.
 * @param {string} [props.className] - CSS classes for custom styling of the skeleton component.
 * @param {React.CSSProperties} [props.style] - Inline styles for additional customization of the skeleton's appearance.
 * @param {SkeletonShapes} [props.shape] - Shape of the skeleton placeholder, with options of 'rectangle', 'circle', or 'square'.
 * @param {SkeletonAnimations} [props.animation] - Animation style for the skeleton, either 'none' for no animation or 'pulse' for a pulsing effect.
 *
 * @returns {React.ReactNode} Rendered Skeleton component.
 *
 * @version 0.3.5
 * @see https://www.npmjs.com/package/djuno-design#skeleton
 *
 * @example
 * // Example usage of Skeleton component:
 * <Skeleton shape="circle" size="large" />
 */
const Skeleton: React.FunctionComponent<SkeletonProps> = ({ shape, uiSize, animation, className, style }) => {
  return <div className={cn(skeletonVariants({ shape, uiSize, animation }), className)} style={style} />
}

export default Skeleton
