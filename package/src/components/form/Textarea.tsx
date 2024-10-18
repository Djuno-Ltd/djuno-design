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
 * @param {InputTypes} [props.uiType] - Type of the textarea field, which can be 'default' or 'simple'.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.containerClassName] - Additional classes to apply to the input container.
 * @param {string} [props.placeholder] - Placeholder text to display when the textarea is empty.
 * @param {string| React.ReactNode} [props.label] - Label text to display above the textarea.
 * @param {boolean} [props.required] - Indicates if the textarea is required for form submission.
 * @param {string|boolean| React.ReactNode} [props.error] - Error message or boolean flag to indicate whether there is a validation error.
 * @param {string| React.ReactNode} [props.hint] - Hint text to provide additional guidance or information to the user.
 * @param {SizeTypes} [props.size] - The size of the textarea field, which can be 'small', 'medium', or 'large'.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display additional information or help text when the user hovers over an icon.
 * @param {CopyableProp} [props.copyable] - Indicates if the textarea value can be copied. It can be a boolean, a function to handle the copy operation, or an object for custom copy functionality.
 * @param {boolean} [props.loading] - Indicates if the input should display a loading state.
 * @param {LoadingType} [props.loadingType] - The type of loading indicator to show.
 * @param {string} [props.labelClassName] - Additional classes to apply to the label element
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
 *   return (
 *     <Textarea
 *       id="description"
 *       textareaProps={{ rows: 5, cols: 50, maxLength: 500 }}
 *       className="custom-textarea"
 *       containerClassName="custom-containerClassName"
 *       placeholder="Enter your description here"
 *       label="Description"
 *       required={true}
 *       error="This field is required"
 *       hint="Provide a detailed description"
 *       size="large"
 *       copyable={{ text: "Copy this text", icon: [<CopyIcon />, <CheckIcon />], tooltips: ["Copy", "Copied"] }}
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

  const { copy, icon, tooltipText, textToCopy } = useCopyable({ copyable })

  const innerId = React.useMemo(() => uuid(), [])

  const value = textareaProps?.value
  const onChange = textareaProps?.onChange

  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()

    const input = window.document.getElementById(props.id || innerId) as HTMLTextAreaElement
    const textAreaValue = input.value

    console.log('textAreaValue', textAreaValue)

    if (typeof copyable === 'object' && copyable !== null && typeof copyable.text === 'function') {
      const finalText = copyable.text({ value: textAreaValue })
      console.log('finalText', finalText)
      copy(finalText)
    } else {
      copy(textAreaValue)
    }
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
          htmlFor={id}
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
            <Typography.Text uiType='danger' className='dd-h-5'>
              *
            </Typography.Text>
          )}
          <div className='dd-flex dd-items-center dd-gap-1'>
            {tooltip && <Tooltip.Info {...tooltip} />}
            {typeof copyable !== 'undefined' && (
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
          id={props.id || innerId}
          ref={ref}
          value={value}
          onChange={onChange ? onChange : () => {}}
          className={cn(
            inputVariants({
              uiType,
              hasError: error ? 'yes' : 'no',
              uiSize,
              copyable: typeof copyable === 'undefined' ? 'no' : 'yes',
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
