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
 * @param {boolean | ((inputCurrentValue: string | undefined) => string | number | null | undefined) | TextareaCopyableProp} [props.copyable] - Determines if the textarea value can be copied. It can be a boolean for simple copy, a function for custom copy behavior, or an object to define custom icons, tooltips, and text.
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

const Textarea: React.FC<React.PropsWithChildren<TextareaProps>> = ({
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
  ...props
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
            {tooltip && <InfoTooltip tooltip={tooltip} />}
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
          id={id}
          ref={textareaRef}
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
          {...props}
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
}

export default Textarea
