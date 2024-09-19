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
  'dj-bg-secondary-100 focus:dj-ring-0 dj-text-sm dj-block dj-w-full dark:dj-bg-dark-800 dj-outline-none disabled:dj-cursor-not-allowed disabled:dj-bg-secondary-200 dark:disabled:dj-bg-gray-700 dark:disabled:dj-text-secondary-400 disabled:dj-text-secondary-500 disabled:dj-border-secondary-300 disabled:dark:dj-border-gray-600',
  {
    variants: {
      type: {
        simple: 'dj-text-secondary-600 dj-bg-transparent',
        default: 'dj-border-2',
      },
      hasError: {
        yes: 'dj-border dj-border-red-500 dj-text-red-900 dj-placeholder-red-700 focus:dj-border-red-500 dark:dj-text-red-500 dark:dj-placeholder-red-500 dark:dj-border-red-500',
        no: 'dark:dj-border-dark-2 dark:dj-focus:border-slate-600 dark:dj-text-slate-50 dark:dj-placeholder-gray-500 dj-border-secondary-100 focus:dj-bg-secondary-50 focus:dj-border-secondary-200 dark:dj-border-dark-700 dark:focus:dj-bg-dark-700 dark:focus:dj-border-dark-600',
      },
      size: {
        small: 'dj-rounded-lg dj-text-xs dj-px-1',
        medium: 'dj-rounded-lg dj-text-sm dj-px-2',
        large: 'dj-rounded-xl dj-text-base dj-px-2',
      },
      copyable: {
        yes: 'dj-pr-7',
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

export const labelVariants = cva('dj-flex dj-items-center dj-gap-1 dj-text-sm dj-whitespace-nowrap ', {
  // dj-text-black/85 dark:dj-text-secondary-100
  variants: {
    hasError: {
      yes: '!dj-text-red-700 dark:!dj-text-red-500',
      no: '',
    },
  },
  defaultVariants: {
    hasError: 'no',
  },
})

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
    <div className='dj-flex dj-flex-col'>
      <div
        className={cn('dj-flex dj-items-center dj-px-1', {
          [labelClassName || '']: labelClassName,
          'dj-justify-between': label || required,
          'dj-justify-end': !label && !required,
          'dj-mb-0.5': label || required || tooltip || hint,
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
            <Typography.Text uiType='danger' className='dj-h-5 dj-ml-1'>
              *
            </Typography.Text>
          )}

          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>

        {hint && <span className='dj-text-[11px] dj-text-slate-500'>{hint}</span>}
      </div>
      <div className='dj-w-full dj-relative dj-block dj-z-0'>
        {typeof copyable !== 'undefined' && !loading && (
          <div className='dj-absolute dj-z-30 dj-inset-y-0 dj-end-0 dj-flex dj-items-center dj-pe-2'>
            <div
              onClick={handleCopyToClipboard}
              className={cn(
                'dj-w-[18px] dj-cursor-pointer hover:dj-scale-110 dj-text-slate-500 hover:dj-text-primary-300 dark:dj-text-slate-300 dark:hover:dj-text-primary-300',
                { 'dj-w-[15px]': size === 'small' },
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
              'dj-h-7': size === 'small',
              'dj-h-9': size === 'medium' || size === undefined,
              'dj-h-11': size === 'large',
            },
            className,
          )}
          placeholder={placeholder}
        />
        {loading && (
          <div className='dj-absolute dj-z-40 dj-inset-y-0 dj-end-0 dj-flex dj-items-center dj-pe-2.5'>
            <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
          </div>
        )}
        <div className='dj-absolute dj-inset-y-0 dj-end-0 dj-flex'>{AfterComponent}</div>
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
          <p className='dj-mt-0.5 dj-text-xs dj-text-error dark:dj-text-error dj-px-1'>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { AnimatedFormError }
export default Input
