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
import Tooltip, { InfoTooltip } from '../Tooltip'
import { copyToClipboard } from '../../utils/copy'
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'
import Loading from '../Loading'

/**
 * Textarea component that allows for customization of appearance and behavior, including validation, additional styling options, and copyable functionality.
 *
 * @param {object} props - Textarea component props.
 * @param {string} [props.id] - Unique identifier for the textarea element.
 * @param {React.HTMLProps<HTMLTextAreaElement>} [props.textareaProps] - Standard HTML textarea attributes, such as `rows`, `cols`, `maxLength`, etc.
 * @param {InputTypes} [props.type] - Type of the textarea field, which can be 'default' or 'simple'.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.placeholder] - Placeholder text to display when the textarea is empty.
 * @param {string| React.ReactNode} [props.label] - Label text to display above the textarea.
 * @param {boolean} [props.required] - Indicates if the textarea is required for form submission.
 * @param {string|boolean| React.ReactNode} [props.error] - Error message or boolean flag to indicate whether there is a validation error.
 * @param {string| React.ReactNode} [props.hint] - Hint text to provide additional guidance or information to the user.
 * @param {SizeTypes} [props.size] - The size of the textarea field, which can be 'small', 'medium', or 'large'.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display additional information or help text when the user hovers over an icon.
 * @param {boolean | ((inputCurrentValue: string | undefined) => string | number | null | undefined) | TextareaCopyableProp} [props.copyable] - Determines if the textarea value can be copied. It can be a boolean for simple copy, a function for custom copy behavior, or an object to define custom icons, tooltips, and text.
 * @param {boolean} [props.loading] - Indicates if the input should display a loading state.
 * @param {LoadingType} [props.loadingType] - The type of loading indicator to show.
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

const Textarea: React.FC<React.PropsWithChildren<TextareaProps>> = ({
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
  copyable,
  loading,
  loadingType,
  labelClassName,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const tooltipTexts: [string, string] = React.useMemo(() => {
    const defaultTexts: [string, string] = ['Copy', 'Copied']
    const emptyTexts: [string, string] = ['', '']

    if (typeof copyable === 'object') {
      if (copyable?.tooltips === false) {
        return emptyTexts
      } else if (copyable?.tooltips) {
        return typeof copyable?.tooltips === 'boolean' ? defaultTexts : copyable.tooltips
      }
    }

    return defaultTexts
  }, [copyable])

  const icons: [React.ReactNode, React.ReactNode] = React.useMemo(() => {
    const defaultIcons: [React.ReactNode, React.ReactNode] = [
      <CopyIcon key='copy-icon' />,
      <CheckIcon key='copied-icon' />,
    ]
    if (typeof copyable === 'object' && copyable?.icon) {
      return copyable.icon
    }
    return defaultIcons
  }, [copyable])

  const [tooltipText, setTooltipText] = React.useState(tooltipTexts[0])
  const [icon, setIcon] = React.useState(icons[0])

  const handleCopyToClipboard = React.useCallback(() => {
    let textToCopy: string | number | null | undefined = ''
    const inputValue = textareaRef.current?.value

    if (typeof copyable === 'function') {
      textToCopy = copyable(inputValue)
    } else {
      textToCopy = inputValue
    }

    if (typeof textToCopy === 'string' || typeof textToCopy === 'number') {
      copyToClipboard(textToCopy.toString()).then(() => {
        setTooltipText(tooltipTexts[1])
        setIcon(icons[1])

        // Revert back after some time
        setTimeout(() => {
          setTooltipText(tooltipTexts[0])
          setIcon(icons[0])
        }, 2000)
      })
    }
  }, [copyable, tooltipTexts, icons])

  return (
    <div className='dj-flex dj-flex-col'>
      <div
        className={cn('dj-flex mb-1 dj-items-center', {
          'dj-justify-between': label,
          'dj-justify-end': !label,
        })}
      >
        <label
          htmlFor={id}
          className={cn(
            labelVariants({
              hasError: error ? 'yes' : 'no',
              hasCustomLabel: labelClassName ? 'yes' : 'no',
              className: labelClassName, // Pass the labelClassName prop
            }),
          )}
        >
          {label && !labelClassName ? (
            <Typography.Text size='sm' uiType={error ? 'danger' : undefined}>
              {label}
            </Typography.Text>
          ) : (
            label
          )}
          {required && (
            <Typography.Text uiType='danger' className='dj-h-5'>
              *
            </Typography.Text>
          )}
          <div className='dj-flex dj-items-center dj-gap-1'>
            {tooltip && <InfoTooltip tooltip={tooltip} />}
            {typeof copyable !== 'undefined' && (
              <Tooltip content={tooltipText}>
                <span
                  onClick={handleCopyToClipboard}
                  className={cn(
                    'dj-inline-flex dj-items-center dj-cursor-pointer hover:dj-scale-110 dj-text-slate-500 hover:dj-text-primary-300 dark:dj-text-slate-300 dark:hover:dj-text-primary-300',
                    { 'dj-w-[15px]': size === 'small' },
                  )}
                >
                  {icon && <span className='dj-w-4 dj-h-4'>{icon}</span>}
                </span>
              </Tooltip>
            )}
          </div>
        </label>
        {hint && <span className='dj-text-xs dj-text-slate-500'>{hint}</span>}
      </div>
      <div className='dj-relative dj-w-full'>
        <textarea
          id={id}
          ref={textareaRef}
          {...textareaProps}
          className={cn(
            inputVariants({
              type,
              hasError: error ? 'yes' : 'no',
              size,
              copyable: typeof copyable === 'undefined' ? 'no' : 'yes',
            }),
            className,
          )}
          placeholder={placeholder}
        />
        {loading && (
          <div className='dj-absolute dj-top-0 dj-right-0 dj-m-2 dj-flex dj-items-center dj-justify-center'>
            <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
          </div>
        )}
      </div>
      <AnimatedFormError error={error} />
    </div>
  )
}

export default Textarea
