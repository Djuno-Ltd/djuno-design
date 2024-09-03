/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Textarea Component
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
import { TextareaProps } from '../types/ITextarea'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Textarea component that allows for customization of appearance and behavior, including validation and additional styling options.
 *
 * @param {object} props - Textarea props.
 * @param {string} [props.id] - Unique identifier for the textarea element.
 * @param {React.HTMLProps<HTMLTextAreaElement>} [props.textareaProps] - Standard HTML textarea attributes, such as `rows`, `cols`, etc.
 * @param {string} [props.textareaClassName] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.placeholder] - Placeholder text to display when the textarea is empty.
 * @param {string} [props.label] - Label text to display above the textarea.
 * @param {boolean} [props.required] - Indicates if the textarea is required for form submission.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {string} [props.hint] - Hint text to provide additional guidance to the user.
 *
 * @returns {React.ReactNode} Rendered Textarea component.
 *
 * @version 0.4.8
 * @see https://www.npmjs.com/package/djuno-design#textarea
 *
 * @example
 * // Example usage of Accordion component:
 *
 * function MyComponent() {
 *   return (
 *    <Textarea
 *         id="description"
 *         textareaProps={{ rows: 5, cols: 50, maxLength: 500 }}
 *         textareaClassName="custom-textarea"
 *         placeholder="Enter your description here"
 *         label="label"
 *         required={true}
 *         error={error}
 *         hint="Provide a detailed description"
 *       />
 *   );
 * }
 */

const Textarea: React.FC<TextareaProps> = ({
  id,
  textareaProps,
  placeholder,
  textareaClassName,
  label,
  error,
  required,
  hint,
}) => {
  return (
    <div className='dj-flex dj-flex-col'>
      <div
        className={cn('dj-flex mb-1 dj-items-center', {
          'dj-justify-between': label,
          'dj-justify-end': !label,
        })}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn('dj-block dj-text-sm dj-text-slate-800 dark:dj-text-slate-50 dj-whitespace-nowrap', {
              'dj-text-red-700 dark:dj-text-red-500': error,
            })}
          >
            {label}
            {required && <span className='dj-text-red-500 dj-mx-1'>*</span>}
          </label>
        )}
        {hint && <span className='dj-text-xs dj-text-slate-500'>{hint}</span>}
      </div>
      <textarea
        id={id}
        {...textareaProps}
        className={cn(
          textareaClassName,
          ' dj-text-sm dj-rounded-lg dj-block dj-w-full dj-p-2.5 dj-bg-secondary-100 focus:dj-ring-2 focus:dj-ring-slate-200 focus:dj-bg-slate-50  dark:dj-bg-dark-800 dark:focus:dj-ring-slate-600 dj-outline-none',
          {
            ' dj-border-red-500 dj-text-red-900 dj-placeholder-red-700 focus:dj-ring-red-500 focus:dj-border-red-500 dark:dj-text-red-500 dark:dj-placeholder-red-500 dark:dj-border-red-500':
              error,
            'dark:dj-border-zinc-600 dark:dj-text-slate-50 dark:dj-placeholder-gray-500 focus:dj-ring-secondary-200 focus:dj-border-blue-500  dark:focus:dj-border-slate-600 ':
              !error,
          },
        )}
        placeholder={placeholder}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className='dj-mt-2 dj-text-xs dj-text-red-600 dark:dj-text-red-500'>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Textarea
