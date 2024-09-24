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
import { AnimatedFormError, inputVariants, labelVariants } from './Input'
import Typography from '../Typography'
import { InfoTooltip } from '../Tooltip'
import { copyToClipboard } from '../../utils/copy'
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'
import { TextareaProps } from '../../types'
import { Tooltip } from 'react-tooltip'

/**
 * Textarea component that allows for customization of appearance and behavior, including validation and additional styling options.
 *
 * @param {object} props - Textarea props.
 * @param {string} [props.id] - Unique identifier for the textarea element.
 * @param {InputTypes} [props.type] - Type of the textarea field.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea for custom styling.
 * @param {string} [props.placeholder] - Placeholder text to display when the textarea is empty.
 * @param {string} [props.label] - Label text to display above the textarea.
 * @param {boolean} [props.required] - Indicates if the textarea is required for form submission.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {string} [props.hint] - Hint text to provide additional guidance to the user.
 * @param {SizeTypes} [props.size] - Size of the textarea field.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display alongside the textarea.
 * @param {boolean} [props.copyable] - Indicates if the input value can be copied.
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

// const Textarea: React.FC<TextareaProps> = ({
//   id,
//   placeholder,
//   className,
//   label,
//   error,
//   required,
//   hint,
//   tooltip,
//   size,
//   type,
//   copyable,
//   ...props
// }) => {
//   const textareaRef = React.useRef<HTMLTextAreaElement>(null)

//   const handleCopyToClipboard = () => {
//     let textToCopy: string | number | null | undefined = ''
//     const inputValue = textareaRef.current?.value

//     if (typeof copyable === 'function') {
//       textToCopy = copyable(inputValue)
//     } else {
//       textToCopy = inputValue
//     }

//     if (typeof textToCopy === 'string' || typeof textToCopy === 'number') {
//       copyToClipboard(textToCopy)
//     }
//   }

//   return (
//     <div className='flex flex-col'>
//       <div
//         className={cn('flex mb-1 items-center', {
//           'justify-between': label,
//           'justify-end': !label,
//         })}
//       >
//         <label htmlFor={id} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
//           {label && (
//             <Typography.Text size='sm' uiType={error ? 'danger' : undefined}>
//               {label}
//             </Typography.Text>
//           )}
//           {required && (
//             <Typography.Text uiType='danger' className='h-5'>
//               *
//             </Typography.Text>
//           )}
//           <div className='flex items-center gap-1 !mt-3'>
//             {tooltip && <InfoTooltip tooltip={tooltip} />}
//             {typeof copyable !== 'undefined' && (
//               <CopyIcon
//                 onClick={handleCopyToClipboard}
//                 className={cn(
//                   'w-[18px] cursor-pointer hover:scale-110 text-slate-500 hover:text-primary-300 dark:text-slate-300 dark:hover:text-primary-300',
//                   { 'w-[15px]': size === 'small' },
//                 )}
//               />
//             )}
//           </div>
//         </label>
//         {hint && <span className='text-xs text-slate-500'>{hint}</span>}
//       </div>

//       <textarea
//         id={id}
//         ref={textareaRef}
//         className={cn(
//           inputVariants({
//             type,
//             hasError: error ? 'yes' : 'no',
//             size,
//             copyable: typeof copyable === 'undefined' ? 'no' : 'yes',
//           }),
//           className,
//         )}
//         placeholder={placeholder}
//       />

//       <AnimatedFormError error={error} />
//     </div>
//   )
// }
const Textarea: React.FC<TextareaProps> = ({
  id,
  placeholder,
  className,
  label,
  error,
  required,
  hint,
  tooltip,
  uiSize,
  type,
  copyable,
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

        setTimeout(() => {
          setTooltipText(tooltipTexts[0])
          setIcon(icons[0])
        }, 2000)
      })
    }
  }, [copyable, tooltipTexts, icons])

  return (
    <div className='flex flex-col'>
      <div
        className={cn('flex mb-1 items-center', {
          'justify-between': label,
          'justify-end': !label,
        })}
      >
        <label htmlFor={id} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
          {label && (
            <Typography.Text size='sm' uiType={error ? 'danger' : undefined}>
              {label}
            </Typography.Text>
          )}
          {required && (
            <Typography.Text uiType='danger' className='h-5'>
              *
            </Typography.Text>
          )}
          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>

        {typeof copyable !== 'undefined' && (
          <div className='flex items-center ml-2'>
            <div
              onClick={handleCopyToClipboard}
              className={cn(
                'cursor-pointer hover:scale-110 text-slate-500 hover:text-primary-300 dark:text-slate-300 dark:hover:text-primary-300',
                { 'w-[15px]': uiSize === 'small' },
              )}
            >
              <Tooltip content={tooltipText}>{icon}</Tooltip>
            </div>
          </div>
        )}
      </div>

      {hint && <span className='text-xs text-slate-500'>{hint}</span>}

      <textarea
        id={id}
        ref={textareaRef}
        className={cn(
          inputVariants({
            type,
            hasError: error ? 'yes' : 'no',
            uiSize,
            copyable: typeof copyable === 'undefined' ? 'no' : 'yes',
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
