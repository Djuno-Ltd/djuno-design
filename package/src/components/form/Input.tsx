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
// import { uuid } from '../../utils/uuid'
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'
import { uuid } from '../../utils/uuid'

/**
 * Define input variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
export const inputVariants = cva(
  'dd-bg-secondary-100 focus:dd-ring-0 dd-text-sm dd-block dd-w-full dark:dd-bg-dark-800 dd-outline-none disabled:dd-cursor-not-allowed disabled:dd-bg-secondary-200 dark:dd-disabled:bg-gray-700 dark:disabled:dd-text-secondary-400 disabled:dd-text-secondary-500 disabled:dd-border-secondary-300 disabled:dark:dd-border-gray-600',
  {
    variants: {
      uiType: {
        simple: 'dd-text-secondary-600 dd-bg-transparent',
        default: 'dd-border-2',
      },
      hasError: {
        yes: 'dd-border dd-border-red-500 dd-text-red-900 dd-placeholder-red-700 focus:dd-border-red-500 dark:dd-text-red-500 dark:dd-placeholder-red-500 dark:dd-border-red-500',
        no: 'dd-border-secondary-100 focus:dd-bg-secondary-50 focus:dd-border-secondary-200 dark:dd-border-dark-800 dark:dd-focus:bg-dark-700 dark:focus:dd-border-dark-600 dark:dd-text-slate-50 dark:dd-placeholder-gray-500',
      },
      uiSize: {
        small: 'dd-rounded-lg dd-text-xs dd-px-1',
        medium: 'dd-rounded-lg dd-text-sm dd-px-2',
        large: 'dd-rounded-xl dd-text-base dd-px-2',
      },
      copyable: {
        yes: 'dd-pr-7',
        no: '',
      },
    },
    defaultVariants: {
      uiType: 'default',
      hasError: 'no',
      uiSize: 'medium',
      copyable: 'no',
    },
  },
)

/**
 * Define label variants using the `cva` utility function.
 * This function generates CSS classes for input label styles based on specified variants.
 */

export const labelVariants = cva(
  'dd-flex dd-items-center dd-gap-1 dd-text-sm dd-whitespace-nowrap dd-text-black/85 dark:dd-text-secondary-100',
  {
    variants: {
      hasError: {
        yes: '!dd-text-red-700 dark:!dd-text-red-500',
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
 * @param {InputTypes} [props.uiType] - Type of the input field (e.g., 'default', 'simple').
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.className] - Additional classes to apply to the input element.
 * @param {string} [props.labelClassName] - Additional classes to apply to the label element.
 * @param {string} [props.containerClassName] - Additional classes to apply to the input container.
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
 *    containerClassName="custom-containerClassName"
 *   copyable={{
 *     text: "Copy this username",
 *     icon: [<CustomCopyIcon />, <CustomCopiedIcon />],
 *     tooltips: ["Click to copy", "Copied!"]
 *   }}
 * />
 */

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    containerClassName,
    labelClassName,
    label,
    hint,
    loading,
    loadingType,
    copyable,
    error,
    uiSize,
    uiType,
    required,
    tooltip,
    placeholder,
    AfterComponent,
    ...inputProps
  } = props

  const innerId = React.useMemo(() => uuid(), [])

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
    const input = window.document.getElementById(props.id || innerId) as HTMLInputElement
    if (input) {
      const inputValue = input.value
      let textToCopy: string | number | null | undefined = ''
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
    }
    // if (ref && 'current' in ref && ref.current) {
    //   inputValue = ref.current.value
    // } else if (internalRef.current) {
    //   inputValue = internalRef.current.value
    // } else if (typeof inputProps?.value === 'string') {
    //   inputValue = inputProps.value
    // }
  }, [copyable, tooltipTexts, icons, props.id, innerId])

  return (
    <div className={cn('dd-flex dd-flex-col', containerClassName)}>
      <div
        className={cn(
          'dd-flex dd-items-center dd-px-1',
          {
            'dd-justify-between': label || required,
            'dd-justify-end': !label && !required,
            'dd-mb-0.5': label || required || tooltip || hint,
          },
          labelClassName,
        )}
      >
        <label
          htmlFor={props.id}
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
            <Typography.Text uiType='danger' className='dd-h-5 dd-ml-1'>
              *
            </Typography.Text>
          )}

          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>

        {hint && <span className='dd-text-[11px] dd-text-slate-500'>{hint}</span>}
      </div>
      <div className='dd-w-full dd-relative dd-block dd-z-0'>
        {typeof copyable !== 'undefined' && !loading && (
          <div className='dd-absolute dd-z-30 dd-inset-y-0 dd-end-0 dd-flex dd-items-center dd-pe-2'>
            <div
              onClick={handleCopyToClipboard}
              className={cn(
                'dd-w-[18px] dd-cursor-pointer dd-text-slate-500 hover:dd-text-primary-300 dark:dd-text-slate-300 dark:hover:dd-text-primary-300 dd-text-xs',
                { 'dd-w-[15px]': uiSize === 'small' },
              )}
            >
              <Tooltip content={tooltipText}> {icon}</Tooltip>
            </div>
          </div>
        )}
        <input
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
            {
              'dd-h-7': uiSize === 'small',
              'dd-h-9': uiSize === 'medium' || uiSize === undefined,
              'dd-h-11': uiSize === 'large',
            },
            className,
          )}
          placeholder={placeholder}
          {...inputProps}
        />
        {loading && (
          <div className='dd-absolute dd-z-40 dd-inset-y-0 dd-end-0 dd-flex dd-items-center dd-pe-2.5'>
            <Loading uiType={loadingType || 'simple'} borderSize={1.5} uiSize={14} theme={'primary'} />
          </div>
        )}
        <div className='dd-absolute dd-inset-y-0 dd-end-0 dd-flex'>{AfterComponent}</div>
      </div>
      <AnimatedFormError error={error} />
    </div>
  )
})

const AnimatedFormError: React.FC<{ error?: string | boolean | React.ReactNode }> = ({ error }) => {
  return (
    <AnimatePresence>
      {error && typeof error !== 'boolean' && typeof error === 'string' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className='dd-mt-0.5 dd-text-xs dd-text-error dark:dd-text-error dd-px-1'>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Input.displayName = 'Input'
export { AnimatedFormError }
export default Input
