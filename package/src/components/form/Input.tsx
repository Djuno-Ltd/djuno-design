/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Input Component
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
import Typography from './../Typography'
import { cva } from 'class-variance-authority'
import { InputProps } from '../../types/Input'
import Tooltip, { InfoTooltip } from '../Tooltip'
import Loading from '../Loading'
import { copyToClipboard } from '../../utils/copy'
import { motion, AnimatePresence } from 'framer-motion'
import { uuid } from '../../utils/uuid'
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'

/**
 * Define input variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
export const inputVariants = cva(
  'bg-secondary-100 focus:ring-0 text-sm block w-full dark:bg-dark-800 outline-none disabled:cursor-not-allowed disabled:bg-secondary-200 dark:disabled:bg-gray-700 dark:disabled:text-secondary-400 disabled:text-secondary-500 disabled:border-secondary-300 disabled:dark:border-gray-600',
  {
    variants: {
      type: {
        simple: 'text-secondary-600 bg-transparent',
        default: 'border-2',
      },
      hasError: {
        yes: 'border border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
        no: 'dark:border-dark-2 dark:focus:border-slate-600 dark:text-slate-50 dark:placeholder-gray-500 border-secondary-100 focus:bg-secondary-50 focus:border-secondary-200 dark:border-dark-700 dark:focus:bg-dark-700 dark:focus:border-dark-600',
      },
      size: {
        small: 'rounded-lg text-xs px-1',
        medium: 'rounded-lg text-sm px-2',
        large: 'rounded-xl text-base px-2',
      },
      copyable: {
        yes: 'pr-7',
        no: '',
      },
    },
    defaultVariants: {
      type: 'default',
      hasError: 'no',
      size: 'medium',
      copyable: 'no',
    },
  },
)

/**
 * Define label variants using the `cva` utility function.
 * This function generates CSS classes for input label styles based on specified variants.
 */

export const labelVariants = cva(
  'flex items-center gap-1 text-sm whitespace-nowrap text-black/85 dark:text-secondary-100',
  {
    variants: {
      hasError: {
        yes: '!text-red-700 dark:!text-red-500',
        no: '',
      },
    },
    defaultVariants: {
      hasError: 'no',
    },
  },
)

/**
 * Input component.
 *
 * @param {object} props - Input component props.
 * @param {string | React.ReactNode} [props.label] - Label of the input.
 * @param {React.HTMLProps<HTMLInputElement>} [props.inputProps] - HTML properties for the input element.
 * @param {boolean} [props.loading] - Indicates if the input should display a loading state.
 * @param {LoadingType} [props.loadingType] - The type of loading indicator to show.
 * @param {InputTypes} [props.type] - Type of the input field (e.g., 'default', 'simple').
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.className] - Additional classes to apply to the input element.
 * @param {string} [props.labelClassName] - Additional classes to apply to the label element.
 * @param {boolean} [props.required] - Indicates if the input is required.
 * @param {string | boolean| React.ReactNode} [props.error] - Error message or boolean to indicate input validity.
 * @param {string | React.ReactNode} [props.hint] - Hint or description for the input.
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display alongside the input.
 * @param {SizeTypes} [props.size] - Size of the input field.
 * @param {React.ReactNode} [props.AfterComponent] - Component to render after the input field.
 * @param {boolean | ((inputCurrentValue: string | undefined) => string | number | null | undefined) | InputCopyableProp} [props.copyable] - Indicates if the input value can be copied. It can be a boolean, a function to handle the copy operation, or an object for custom copy functionality.
 *
 * @returns {React.ReactNode} Rendered Input component.
 *
 * @version 0.3.6
 * @see https://www.npmjs.com/package/djuno-design#input
 *
 * @example
 * // Example usage of Input component:
 * <Input
 *   label="Username"
 *   placeholder="Enter your username"
 *   required
 *   error="Username is required"
 *   copyable={{
 *     text: "Copy this username",
 *     icon: [<CustomCopyIcon />, <CustomCopiedIcon />],
 *     tooltips: ["Click to copy", "Copied!"]
 *   }}
 * />
 */

const Input: React.FunctionComponent<InputProps> = ({
  label,
  inputProps,
  className,
  labelClassName,
  loading,
  loadingType,
  type,
  required,
  error,
  hint,
  placeholder,
  tooltip,
  size,
  AfterComponent,
  copyable,
}) => {
  const id = uuid(10)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const value = inputProps?.value
  const onChange = inputProps?.onChange

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
    const inputValue = inputRef.current?.value

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
    <div className='flex flex-col'>
      <div
        className={cn('flex items-center px-1', {
          [labelClassName || '']: labelClassName,
          'justify-between': label || required,
          'justify-end': !label && !required,
          'mb-0.5': label || required || tooltip || hint,
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
            <Typography.Text uiType='danger' className='h-5 ml-1'>
              *
            </Typography.Text>
          )}

          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>

        {hint && <span className='text-[11px] text-slate-500'>{hint}</span>}
      </div>
      <div className='w-full relative block z-0'>
        {typeof copyable !== 'undefined' && !loading && (
          <div className='absolute z-30 inset-y-0 end-0 flex items-center pe-2'>
            <div
              onClick={handleCopyToClipboard}
              className={cn(
                'w-[18px] cursor-pointer hover:scale-110 text-slate-500 hover:text-primary-300 dark:text-slate-300 dark:hover:text-primary-300',
                { 'w-[15px]': size === 'small' },
              )}
            >
              <Tooltip content={tooltipText}> {icon}</Tooltip>
            </div>
          </div>
        )}
        <input
          id={id}
          ref={inputRef}
          {...inputProps}
          value={value}
          onChange={onChange ? onChange : () => {}}
          className={cn(
            inputVariants({
              type,
              hasError: error ? 'yes' : 'no',
              size,
              copyable: typeof copyable === 'undefined' ? 'no' : 'yes',
            }),
            {
              'h-7': size === 'small',
              'h-9': size === 'medium' || size === undefined,
              'h-11': size === 'large',
            },
            className,
          )}
          placeholder={placeholder}
        />
        {loading && (
          <div className='absolute z-40 inset-y-0 end-0 flex items-center pe-2.5'>
            <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
          </div>
        )}
        <div className='absolute inset-y-0 end-0 flex'>{AfterComponent}</div>
      </div>
      <AnimatedFormError error={error} />
    </div>
  )
}
const AnimatedFormError: React.FC<{ error?: string | boolean | React.ReactNode }> = ({ error }) => {
  return (
    <AnimatePresence>
      {error && typeof error !== 'boolean' && typeof error === 'string' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className='mt-0.5 text-xs text-error dark:text-error px-1'>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { AnimatedFormError }
export default Input
