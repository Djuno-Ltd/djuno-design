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
import { TextareaProps } from './../../types/ITexrarea'
import { AnimatedFormError, inputVariants, labelVariants } from './Input'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Loading from '../Loading'
import { uuid } from '../../utils/uuid'
import { useCopyable } from '../../hooks/useCopyable'
import { CopyableText } from '../../types'

/**
 * Textarea component that allows for customization of appearance and behavior, including validation, additional styling options, and copyable functionality.
 *
 * @param {object} props - Textarea component props.
 * @param {string} [props.id] - Unique identifier for the textarea element.
 * @param {InputTypes} [props.uiType] - Type of the textarea field, determining its appearance, such as 'default' or 'simple'.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.containerClassName] - Additional classes to apply to the container wrapping the textarea.
 * @param {string} [props.placeholder] - Placeholder text displayed when the textarea is empty, providing guidance on what to enter.
 * @param {string|React.ReactNode} [props.label] - Label text or element displayed above the textarea.
 * @param {boolean} [props.required] - Marks the textarea as a required field for form submission.
 * @param {string|boolean|React.ReactNode} [props.error] - Error message, boolean flag, or node to indicate a validation error.
 * @param {string|React.ReactNode} [props.hint] - Hint text or element providing additional guidance or information to the user.
 * @param {SizeTypes} [props.uiSize] - The size of the textarea, which can be 'small', 'medium', or 'large' for custom scaling.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties for showing additional information or help text when the user hovers over an associated icon.
 * @param {CopyableProp} [props.copyable] - Configures copy functionality, which can be a boolean, function for handling the copy operation, or an object specifying custom copy behavior.
 * @param {boolean} [props.loading] - Indicates if the textarea should display a loading state, often used when data is being fetched or processed.
 * @param {LoadingType} [props.loadingType] - Type of loading indicator shown when `loading` is true, such as 'spinner'.
 * @param {string} [props.labelClassName] - Additional CSS classes to style the label element associated with the textarea.
 * @param {string} [props.containerClassName] - CSS classes to style the container around the textarea, useful for layout customization.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} [textareaProps] - Additional native textarea properties such as `rows`, `cols`, and `maxLength`.
 *
 * @returns {React.ReactNode} Rendered Textarea component.
 *
 * @version 0.5.2
 * @see https://www.npmjs.com/package/djuno-design#textarea
 *
 * @example
 * // Example usage of Textarea component:
 *
 * function MyComponent() {
 *
 *   return (
 *     <Textarea
 *       value={value}
 *       onChange={onChange}
 *       placeholder="Enter your description here"
 *       label="Description"
 *       required={true}
 *       error="This field is required"
 *       hint="Provide a detailed description"
 *       tooltip="Describe your item or service here"
 *       uiSize="large"
 *       uiType="outlined"
 *       loading={false}
 *       loadingType="spinner"
 *       copyable={{
 *         text: "Copy this text",
 *         icon: [<CopyIcon />, <CheckIcon />],
 *         tooltips: ["Copy", "Copied"]
 *       }}
 *     />
 *   );
 * }
 */

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    id,
    placeholder,
    className,
    label,
    error,
    required,
    hint,
    tooltip,
    uiSize,
    uiType,
    copyable,
    loading,
    loadingType,
    labelClassName,
    containerClassName,
    ...textareaProps
  } = props

  const innerId = React.useMemo(() => id || uuid(), [id])
  const { copy, icon, tooltipText, textToCopy, isCopyable } = useCopyable({ copyable })

  const value = textareaProps?.value
  const onChange = textareaProps?.onChange

  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    let finalText: CopyableText = ''

    const textareaElement = window.document.getElementById(innerId)
    const element = textareaElement as HTMLTextAreaElement | null
    const textAreaValue = element ? element.value : null

    if (textToCopy) {
      if (typeof textToCopy === 'function') {
        finalText = textToCopy({ value: textAreaValue, element: textareaElement })
      } else {
        finalText = textToCopy
      }
    } else {
      finalText = textAreaValue
    }
    copy(finalText)
  }

  return (
    <div className={cn('dd-flex dd-flex-col', containerClassName)}>
      <div
        className={cn('dd-flex dd-mb-1 dd-items-center', {
          'dd-justify-between': label,
          'dd-justify-end': !label,
        })}
      >
        <label
          htmlFor={innerId}
          className={cn(
            labelVariants({
              hasError: error ? 'yes' : 'no',
            }),
            labelClassName,
          )}
        >
          {label && (
            <Typography.Text size='sm' uiType='transparent'>
              {label}
            </Typography.Text>
          )}
          {required && (
            <Typography.Text uiType='danger' className='dd-h-5 dd-ml-0.5'>
              *
            </Typography.Text>
          )}
          <div className='dd-flex dd-items-center dd-gap-1'>
            {tooltip && <Tooltip.Info {...tooltip} />}
            {isCopyable && (
              <div
                onClick={handleCopyToClipboard}
                className={cn(
                  'dd-w-[18px] dd-cursor-pointer dd-text-slate-500 hover:dd-text-primary-300 dark:dd-text-slate-300 dark:hover:dd-text-primary-300 dd-text-xs',
                  { 'dd-w-[15px]': uiSize === 'small' },
                )}
              >
                <Tooltip content={tooltipText}>{icon}</Tooltip>
              </div>
            )}
          </div>
        </label>
        {hint && <span className='dd-text-xs dd-text-slate-500'>{hint}</span>}
      </div>
      <div className='dd-relative dd-w-full'>
        <textarea
          id={innerId}
          ref={ref}
          value={value}
          onChange={onChange ? onChange : () => {}}
          className={cn(
            inputVariants({
              uiType,
              hasError: error ? 'yes' : 'no',
              uiSize,
              copyable: isCopyable ? 'no' : 'yes',
            }),
            className,
          )}
          placeholder={placeholder}
          {...textareaProps}
        />
        {loading && (
          <div className='dd-absolute dd-top-0 dd-right-0 dd-m-2 dd-flex dd-items-center dd-justify-center'>
            <Loading uiType={loadingType || 'simple'} borderSize={1.5} uiSize={14} theme={'primary'} />
          </div>
        )}
      </div>
      <AnimatedFormError error={error} />
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
