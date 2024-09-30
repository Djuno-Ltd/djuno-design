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
const dividerVariants = cva('dd-w-full dd-border-secondary-400 dark:after:dd-border-gray-700 ', {
  variants: {
    uiType: {
      simple: 'dd-my-4',
      dotted: 'dd-border-dotted dd-my-4 ',
      dashed: 'dd-border-dashed dd-my-4 ',
    },
  },
  defaultVariants: {
    uiType: 'simple',
  },
})

/**
 * Divider component.
 *
 *
 * @param {object} props - Divider props.
 * @param {React.ReactNode} [props.children] - The content inside the divider.
 * @param {string} [props.className] - Additional classes to apply to the divider.
 * @param {string} [props.uiType] - Type of UI for the divder: 'simple' or 'dashed' or "dotted".
 * @param {string} [props.orientation] - Type of UI for the orientation: 'center' or 'right' or 'left'.
 * @param {string} [props.text] - text apply to the divider.
 * @param {string} [props.textClassName] - Additional classes to apply to the text.
 *
 * @returns {React.ReactNode} Rendered Divider component.
 *
 * @version 0.3.8
 * @see https://www.npmjs.com/package/djuno-design#divider
 *
 * @example
 * // Example usage of Button component:
 *
 * <Divider />
 * <Divider uiType="dashed" orientation="center" />
 *
 */

const Divider: React.FunctionComponent<DividerProps> = ({
  children,
  uiType,
  className,
  orientation = 'center', // default value for orientation
  text,
  textClassName,
  ...props
}) => {
  const dividerClass = dividerVariants({ uiType })
  const commonDividerClass = 'dd-border-t dd-w-full dd-h-0.5'
  const textClass = 'dd-text-base dd-text-dark-700 dd-whitespace-nowrap dark:dd-text-dark-100'
  const leftOrientationClass = 'dd-ml-4'
  const rightOrientationClass = 'dd-mr-4'

  const parentClassName = cn(dividerClass, className, {
    'dd-divider-using-text': text !== undefined,
    [`dd-divider-${orientation}`]: text !== undefined, //class based on orientation and usingText prop
  })

  return (
    <div {...props} className={parentClassName}>
      <div className='dd-flex dd-justify-center dd-items-center'>
        {text !== undefined ? (
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
