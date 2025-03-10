/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Card Component
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
import Typography from './Typography'
import { StepsProps } from '../types'
import { ReactComponent as CheckIcon } from './../assets/icons/check-circle.svg'
const { Text } = Typography

/**
 * Steps component.
 *
 * @param {object} props - Alert props.
 * @param {string} [props.className] - Additional classes to apply to the allert.
 * @param {Array<{ value: T, label: React.ReactNode, callback?: (value: T) => void }>} props.steps - Array of steps, where each step contains a value, label, and optional callback function.
 * @param {T} props.step - Currently active step value.
 * @returns {React.ReactNode} Rendered Alert component.
 *
 * @version 0.1.3
 * @see https://www.npmjs.com/package/djuno-design#steps
 *
 * @example
 * // Example usage:
 * <Steps
 *   steps={[
 *     { value: 'step1', label: 'Step 1', callback: handleStep1 },
 *     { value: 'step2', label: 'Step 2', callback: handleStep2 },
 *     { value: 'step3', label: 'Step 3', callback: handleStep3 },
 *   ]}
 *   step="step2"
 * />
 */
const Steps = <T extends string>({ className, style, ...props }: StepsProps<T>): React.JSX.Element => {
  const { steps, step } = props
  const stepsKeys = steps.map((s) => s.value)

  const [activeLevels, checkedLevels] = handleSelectedSteps(step, stepsKeys)

  return (
    <ol className={cn('dd-flex dd-items-center dd-w-full dd-text-center dd-py-6', className)} style={style}>
      {steps.map((step, i) => (
        <li
          key={i}
          className={cn(`dd-flex dd-items-center`, {
            "md:dd-w-full md:after:dd-content-[''] after:dd-w-full after:dd-h-1 after:dd-border-b after:dd-hidden md:after:dd-inline-block after:dd-mx-4 xl:after:dd-mx-6 after:dd-border-secondary-300 dark:after:dd-border-gray-700":
              steps.length !== i + 1,
            'dd-cursor-pointer': checkedLevels.includes(step.value) && step.callback,
          })}
          onClick={() => (step.callback && checkedLevels.includes(step.value) ? step.callback(step.value) : null)}
        >
          <span
            className={cn('dd-flex dd-items-center dd-text-dark-700 dark:dd-text-dark-100', {
              "after:dd-content-['/'] md:after:dd-hidden after:dd-mx-1 after:dd-text-gray-200 dark:after:dd-text-gray-500":
                steps.length !== i + 1,
              '!dd-text-primary-500 dark:!dd-text-primary-500 dd-font-medium': activeLevels?.includes(step.value),
            })}
          >
            <span className='dd-me-1'>
              {checkedLevels?.includes(step.value) ? (
                <CheckIcon className='dd-w-[20px] dd-aspect-square' />
              ) : (
                <Text className='dd-whitespace-nowrap' size='base' uiType='transparent'>
                  {i + 1} .
                </Text>
              )}
            </span>

            <Text className='dd-whitespace-nowrap' uiType='transparent'>
              {step.label}
            </Text>
          </span>
        </li>
      ))}
    </ol>
  )
}

const handleSelectedSteps = <T extends string>(step: T, stepsKey: T[]): [T[], T[]] => {
  const index = stepsKey.indexOf(step)

  if (index !== -1) {
    return [stepsKey.slice(0, index + 1), stepsKey.slice(0, index)]
  } else {
    return [[], []]
  }
}

export default Steps
