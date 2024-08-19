/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Card Component
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
// import Typography from './../Typography'
import { cva } from 'class-variance-authority'
import { InputProps } from '../../types/Input'
import Tooltip from '../Tooltip'
import Loading from '../Loading'
import { copyToClipboard } from '../../utils/copy'
// import Flex from './Flex'
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg'
import { uuid } from '../../utils/uuid'
// import { ReactComponent as SuccessIcon } from './../assets/icons/check-circle.svg'
// import { ReactComponent as InfoIcon } from './../assets/icons/information-circle.svg'
// import { ReactComponent as WarningIcon } from './../assets/icons/exclamation-circle.svg'

// const { Text } = Typography

/**
 * Define input variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const inputVariants = cva(
  'dj-bg-secondary-100 dark:dj-bg-zinc-700 focus:dj-ring-0 dj-text-sm dj-rounded-lg dj-block dj-w-full dj-p-2.5 dark:dj-bg-dark-2 dj-outline-none disabled:dj-cursor-not-allowed disabled:dj-bg-secondary-200 dark:disabled:dj-bg-gray-700 dark:disabled:dj-text-secondary-400 disabled:dj-text-secondary-500 disabled:dj-border-secondary-300 disabled:dark:dj-border-gray-600',
  {
    variants: {
      type: {
        simple: 'dj-text-secondary-600 dj-bg-transparent',
        default: 'dj-border-2',
      },
      hasError: {
        yes: 'dj-border dj-border-red-500 dj-text-red-900 dj-placeholder-red-700 focus:dj-border-red-500 dark:dj-text-red-500 dark:dj-placeholder-red-500 dark:dj-border-red-500',
        no: 'dark:dj-border-dark-2 dark:dj-focus:border-slate-600 dark:dj-text-slate-50 dark:dj-placeholder-gray-500 dj-border-secondary-100 focus:dj-bg-secondary-50 focus:dj-border-secondary-200',
      },
    },
    defaultVariants: {
      type: 'default',
      hasError: 'no',
    },
  },
)

/**
 * Define label variants using the `cva` utility function.
 * This function generates CSS classes for input label styles based on specified variants.
 */
const labelVariants = cva(
  'dj-flex dj-items-center dj-gap-1 dj-text-sm dj-text-slate-800 dark:dj-text-slate-50 dj-whitespace-nowrap',
  {
    variants: {
      hasError: {
        yes: 'dj-text-red-700 dark:dj-text-red-500',
        no: '',
      },
    },
    defaultVariants: {
      hasError: 'no',
    },
  },
)

/**
 * Inpt component.
 *
 * @param {object} props - Input props.
 * @param {string} [props.className] - Additional classes to apply to the input.
 * @param {string | React.ReactNode} [props.message] - Message of the alert
 * @param {string | React.ReactNode} [props.description] - Description of the alert
 * @param {string} [props.type] - Type of UI for the alert.
 * @param {boolean} [props.showIcon] - Indicates if the alert has the icon.
 * @param {boolean} [props.banner] - Indicates if the alert is a banner or not.
 *
 * @returns {React.ReactNode} Rendered Alert component.
 *
 * @version 0.1.2
 * @see https://www.npmjs.com/package/djuno-design#alert
 *
 * @example
 * // Example usage of Input component:
 * <Input  />
 *
 *
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
  AfterComponent,
  copyableFn,
}) => {
  const id = uuid(10)
  const handleCopyToClipboard = () => {
    if (copyableFn) {
      const value = copyableFn()
      if (typeof value === 'string' || typeof value === 'number') {
        copyToClipboard(value)
      }
    }
  }

  return (
    <div className='dj-flex dj-flex-col'>
      <div
        className={cn('dj-flex dj-items-center', {
          [labelClassName || '']: labelClassName,
          'dj-justify-between': label,
          'dj-justify-end': !label,
          'dj-mb-1': label || required || tooltip || hint,
        })}
      >
        <label htmlFor={id} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
          {label}
          {required && <span className='dj-text-red-500'>*</span>}
          {tooltip && <Tooltip {...tooltip}>i</Tooltip>}
        </label>
        {hint && <span className='dj-text-[11px] dj-text-slate-500'>{hint}</span>}
      </div>
      <div className='dj-w-full dj-relative dj-block dj-z-0'>
        {copyableFn && (
          <div className='dj-absolute dj-z-30 dj-inset-y-0 dj-end-0 dj-flex dj-items-center dj-pe-3'>
            <CopyIcon
              onClick={handleCopyToClipboard}
              className='dj-w-5 dj-cursor-pointer hover:dj-scale-110 dj-text-slate-500 hover:dj-text-primary-300 dark:dj-text-slate-300 dark:hover:dj-text-primary-300'
            />
          </div>
        )}
        <input
          id={id}
          {...inputProps}
          className={cn(inputVariants({ type, hasError: error ? 'yes' : 'no' }), className, {
            'dj-pr-10': copyableFn,
          })}
          placeholder={placeholder}
        />
        {loading && (
          <div className='dj-absolute dj-z-40 dj-inset-y-0 dj-end-0 dj-flex dj-items-center dj-pe-2.5'>
            <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
          </div>
        )}
        <div className='dj-absolute dj-inset-y-0 dj-end-0 dj-flex'>{AfterComponent}</div>
      </div>
      {/* <AnimatePresence>
        {error && typeof error === 'string' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className='mt-2 text-xs text-red-600 dark:text-red-500'>{error}</p>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

export default Input
