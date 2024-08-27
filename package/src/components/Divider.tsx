/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Divider Component
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
import { cva } from 'class-variance-authority'
import { DividerProps } from '../types/Divider'

/**
 * Define divider variants using the `cva` utility function.
 * This function generates CSS classes for divider styles based on specified variants.
 */

const dividerVariants = cva('dj-w-full dj-border-secondary-400 dark:after:dj-border-gray-700 ', {
  variants: {
    uiType: {
      simple: 'dj-my-4',
      dotted: 'dj-border-dotted dj-my-4 ',
      dashed: 'dj-border-dashed dj-my-4 ',
    },
  },
  defaultVariants: {
    uiType: 'simple',
  },
})

/**
 * Divider component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - Divider props.
 * @param {React.ReactNode} [props.children] - The content inside the divider.
 * @param {string} [props.className] - Additional classes to apply to the divider.
 * @param {string} [props.uiType] - Type of UI for the divder: 'simple' or 'dashed' or "dotted".
 * @param {string} [props.orientation] - Type of UI for the orientation: 'center' or 'right' or 'left'.
 * @param {string} [props.text] - text apply to the divider.
 * @param {string} [props.textClassName] - Additional classes to apply to the text.
 * @param {boolean} [props.usingText] - Additional classes to apply to the text.
 *
 * @returns {React.ReactNode} Rendered Divider component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#divider
 *
 * @example
 * // Example usage of Button component:
 *
 *
 *
 *
 */

const Divider: React.FunctionComponent<DividerProps> = ({
  children,
  uiType,
  className,
  orientation = 'center', // default value for orientation
  text,
  textClassName,
  usingText = false, // default value for usingText
  ...props
}) => {
  const dividerClass = dividerVariants({ uiType })
  const commonDividerClass = 'dj-border-t dj-w-full dj-h-0.5'
  const textClass = 'dj-text-base dj-text-dark-700 dj-whitespace-nowrap dark:dj-text-dark-100'
  const leftOrientationClass = 'dj-ml-4'
  const rightOrientationClass = 'dj-mr-4'

  const parentClassName = cn(dividerClass, className, {
    'dj-divider-using-text': usingText,
    [`dj-divider-${orientation}`]: usingText, //class based on orientation and usingText prop
  })

  return (
    <div {...props} className={parentClassName}>
      <div className='dj-flex dj-justify-center dj-items-center'>
        {usingText ? (
          <>
            {orientation === 'left' && (
              <>
                <span className={cn(textClass, textClassName)}>{text || 'Djuno Design'}</span>
                <div className={cn(dividerClass, commonDividerClass, leftOrientationClass)}></div>
              </>
            )}
            {orientation === 'center' && (
              <>
                <div className={cn(dividerClass, commonDividerClass, rightOrientationClass)}></div>
                <span className={cn(textClass, textClassName)}>{text || 'Djuno Design'}</span>
                <div className={cn(dividerClass, commonDividerClass, leftOrientationClass)}></div>
              </>
            )}
            {orientation === 'right' && (
              <>
                <div className={cn(dividerClass, commonDividerClass, rightOrientationClass)}></div>
                <span className={cn(textClass, textClassName)}>{text || 'Djuno Design'}</span>
              </>
            )}
          </>
        ) : (
          <div className={cn(dividerClass, commonDividerClass)}></div>
        )}
      </div>
      {children}
    </div>
  )
}
//TODO orientationMargin
export default Divider
