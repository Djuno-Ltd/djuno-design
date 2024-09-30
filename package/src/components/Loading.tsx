/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Loading Component
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
import { LoadingProps } from '../types'

/**
 * Loading component that displays a loading indicator based on the specified type and theme.
 *
 * @param {object} props - Loading props.
 * @param {string} [props.className] - Additional classes to apply to the loading component.
 * @param {LoadingType} [props.type] - Type of loading indicator: 'simple' or 'elastic'.
 * @param {number} [props.size] - Size of the loading indicator.
 * @param {number} [props.borderSize] - Size of the loading indicator's border.
 * @param {LoadingThemeTypes} [props.theme] - Theme of the loading indicator, defining its appearance.
 *
 * @returns {React.ReactNode} Rendered Loading component.
 *
 * @version 0.0.3
 * @see https://www.npmjs.com/package/djuno-design#loading
 *
 * @example
 * // Example usage of Loading component:
 * <Loading type="simple" size={20} theme="primary" />
 *
 * @example
 * // Example usage of Loading component with elastic type:
 * <Loading type="elastic" size={32} borderSize={2} theme="error" />
 */
const Loading: React.FunctionComponent<LoadingProps> = ({ className, type, size, borderSize, theme }) => {
  if (type === 'elastic') {
    return (
      <div>
        <svg
          className={cn(className)}
          style={{ ...(size ? { width: size, height: size } : { width: 24, height: 24 }) }}
          viewBox='0 0 16 16'
        >
          <g className='dd-animate-rotate' style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <path
              className={cn({
                'dd-fill-primary-50 dark:dd-fill-dark-800': theme === 'primary' || theme === undefined,
                'dd-fill-red-50 dark:dd-fill-red-700/10': theme === 'error',
                'dd-fill-transparent dark:dd-fill-transparent': theme === 'transparent' || theme === 'white',
              })}
              d='M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z'
            ></path>
            <circle
              className={cn('dd-animate-stroke-dash dd-fill-none', {
                'dd-stroke-white': theme === 'white',
                'dd-stroke-primary-500': theme === 'primary' || theme === 'transparent' || theme === undefined,
                'dd-stroke-red-500': theme === 'error',
              })}
              style={{
                ...(borderSize && { strokeWidth: borderSize }),
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeDasharray: '67, 100',
                strokeDashoffset: '46',
                transformOrigin: 'center',
              }}
              cx='8'
              cy='8'
              r='7'
            ></circle>
          </g>
        </svg>
      </div>
    )
  }
  return (
    <div>
      <div
        style={{
          ...(size ? { width: size, height: size } : { width: 24, height: 24 }),
          ...(borderSize && { borderWidth: borderSize }),
        }}
        className={cn(
          'dd-rounded-full dd-border-[0.125rem]',
          {
            // specify animation type
            'dd-animate-spin': type === undefined || type === 'simple',
            'dd-animate-cutoff-spin': type === 'cutoff',

            // specify theme
            'dd-border-transparent dd-border-t-white': theme === 'white',
            'dd-border-primary-50 dd-border-t-primary-500 dark:dd-border-dark-800 dark:dd-border-t-primary-300':
              theme === 'primary' || theme === undefined,
            'dd-border-red-50 dd-border-t-red-500 dark:dd-border-red-700/10 dark:dd-border-t-red-500':
              theme === 'error',
            'dd-border-transparent dd-border-t-primary-500': theme === 'transparent',
          },
          className,
        )}
      />
    </div>
  )
}

export default Loading
