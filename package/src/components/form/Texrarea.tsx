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
import { cn } from './../../utils/cn'
import { TextareaProps } from './../../types/ITextarea'
import { AnimatedFormError, inputVariants, labelVariants } from './Input'
import Typography from '../Typography'
import { InfoTooltip } from '../Tooltip'

/**
 * Textarea component that allows for customization of appearance and behavior, including validation and additional styling options.
 *
 * @param {object} props - Textarea props.
 * @param {string} [props.id] - Unique identifier for the textarea element.
 * @param {React.HTMLProps<HTMLTextAreaElement>} [props.textareaProps] - Standard HTML textarea attributes, such as `rows`, `cols`, etc.
 * @param {InputTypes} [props.type] - Type of the textarea field.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.placeholder] - Placeholder text to display when the textarea is empty.
 * @param {string} [props.label] - Label text to display above the textarea.
 * @param {boolean} [props.required] - Indicates if the textarea is required for form submission.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {string} [props.hint] - Hint text to provide additional guidance to the user.
 * @param {SizeTypes} [props.size] - Size of the textarea field.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display alongside the textarea.
 *
 * @returns {React.ReactNode} Rendered Textarea component.
 *
 * @version 0.5.2
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
 *         className="custom-textarea"
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
  className,
  label,
  error,
  required,
  hint,
  tooltip,
  size,
  type,
}) => {
  return (
    <div className='dj-flex dj-flex-col'>
      <div
        className={cn('dj-flex mb-1 dj-items-center', {
          'dj-justify-between': label,
          'dj-justify-end': !label,
        })}
      >
        <label htmlFor={id} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
          {label && (
            <Typography.Text size='sm' uiType={error ? 'danger' : undefined}>
              {label}
            </Typography.Text>
          )}
          {required && (
            <Typography.Text uiType='danger' className='dj-h-5'>
              *
            </Typography.Text>
          )}
          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>
        {hint && <span className='dj-text-xs dj-text-slate-500'>{hint}</span>}
      </div>
      <textarea
        id={id}
        {...textareaProps}
        className={cn(
          inputVariants({
            type,
            hasError: error ? 'yes' : 'no',
            size,
            copyable: 'no', //typeof copyable === 'undefined' ? 'no' : 'yes',
          }),
          className,
        )}
        placeholder={placeholder}
      />
      <AnimatedFormError error={error} />
    </div>
  )
}

export default Textarea
