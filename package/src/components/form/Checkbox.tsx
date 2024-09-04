/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Checkbox Component
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

import { motion, AnimatePresence } from 'framer-motion'
import { CheckboxProps } from '../../types/ICheckbox'
import { cn } from '../../utils/cn'

/**
 * Checkbox component that allows for customization of UI behavior, labeling, validation, and more.
 *
 * @param {object} props - Checkbox props.
 * @param {string} [props.id] - The unique identifier for the checkbox input element.
 * @param {React.HTMLProps<HTMLInputElement>} [props.inputProps] - Additional HTML props to apply to the input element.
 * @param {React.ReactNode} [props.label] - The label to display next to the checkbox.
 * @param {boolean} [props.required] - Specifies if the checkbox is required.
 * @param {string} [props.error] - An error message to display if there's an issue with the checkbox.
 *
 * @returns {React.ReactNode} Rendered Checkbox component.
 *
 * @version 0.4.8
 * @see https://www.npmjs.com/package/djuno-design#checkbox
 *
 * @example
 * // Example usage of Checkbox component:
 *
 * function MyComponent() {
 *
 *   return (
 *     <Checkbox
 *       id="checkbox-id"
 *       inputProps={{}}
 *       label="checkboc-label"
 *       required={true}
 *       error="checkbox-error"
 *     />
 *   );
 * }
 */
const Checkbox: React.FC<CheckboxProps> = ({ id, inputProps, label, error, required }) => {
  return (
    <div className='dj-flex dj-flex-col'>
      <div className='dj-flex dj-gap-1 dj-cursor-pointer'>
        <input
          type='checkbox'
          id={id}
          {...inputProps}
          className={cn(
            'dj-border dj-text-sm dj-rounded-lg  dj-block dj-w-4 dj-h-4 dark:dj-bg-zinc-800 dj-outline-none dj-mt-[0.1rem] dj-cursor-pointer',
            {
              'dj-bg-red-50 dj-border-red-500 dj-text-red-900 dj-placeholder-red-700  focus:dj-ring-red-500 focus:dj-border-red-500 dark:dj-text-red-500 dark:dj-placeholder-red-500 dark:dj-border-red-500':
                error,
              'dark:dj-border-zinc-600 dark:dj-text-slate-50 dark:dj-placeholder-gray-500  dark:focus:dj-ring-blue-500 dark:focus:dj-border-blue-500':
                !error,
            },
          )}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'dj-block dj-text-sm dj-text-slate-800 dark:dj-text-slate-50 dj-select-none dj-cursor-pointer',
              {
                'dj-text-red-700 dark:dj-text-red-500': error,
              },
            )}
          >
            {label}
            {required && <span className='dj-text-red-500 dj-mx-1'>*</span>}
          </label>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'dj-auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className='dj-mt-2 dj-text-xs dj-text-red-600 dark:dj-text-red-500'>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Checkbox
