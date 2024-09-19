/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Select Component
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

import React from 'react'
import Typography from '../Typography'
import { MultiSelectProps, SelectProps } from '../../types/ISelect'
import { cn } from '../../utils/cn'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import Loading from '../Loading'
import EmptyState from '../EmptyState'
import { InfoTooltip } from '../Tooltip'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'
import { ReactComponent as ChevronUpDownIcon } from './../../assets/icons/chevron-up-down.svg'
import { ReactComponent as ClearIcon } from './../../assets/icons/close.svg'
import { cva } from 'class-variance-authority'
import { AnimatedFormError, labelVariants } from './Input'
import { uuid } from '../../utils/uuid'
const { Text } = Typography

/**
 * Define input variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const listboxVariants = cva(
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
        small: 'dj-rounded-lg dj-text-xs dj-px-1 dj-h-7 dj-pr-6',
        medium: 'dj-rounded-lg dj-text-sm dj-px-2 dj-h-9 dj-pr-6',
        large: 'dj-rounded-xl dj-text-base dj-px-2 dj-h-11 dj-pr-6',
      },
    },
    defaultVariants: {
      type: 'default',
      hasError: 'no',
      size: 'medium',
    },
  },
)

/**
 * Select component.
 *
 * A customizable dropdown select component that allows users to choose from a list of options.
 * The component supports various features such as custom styling, validation states, tooltips, loading indicators, and more.
 *
 * @template ExtraDataType
 * @param {object} props - Select component props.
 * @param {T} [props.value] - The currently selected value.
 * @param {(value: T | undefined) => void} [props.onChange] - Callback function triggered when the selected value changes.
 * @param {T} [props.defaultValue] - The default value of the select component.
 * @param {SelectOption<T, ET>[]} props.options - Array of options available for selection.
 * @param {string} [props.className] - Additional CSS classes for custom styling of the select component.
 * @param {string} [props.buttonClassName] - Additional CSS classes for custom styling of the select button.
 * @param {string} [props.optionsClassName] - Additional CSS classes for custom styling of the options list.
 * @param {string| React.ReactNode} [props.label] - The label displayed above the select component.
 * @param {string|boolean| React.ReactNode} [props.error] - Error message to display if there is a validation issue.
 * @param {boolean} [props.required] - Indicates if the select component is required.
 * @param {SelectTypes} [props.type] - The type of the select component (e.g., single select, multi-select).
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display additional information.
 * @param {string| React.ReactNode} [props.hint] - Hint text to provide additional context or instructions.
 * @param {boolean} [props.loading] - Indicates if the select component is in a loading state.
 * @param {LoadingType} [props.loadingType] - Type of loading indicator to display when the select component is loading.
 * @param {string} [props.emptyString] - Text to display when there are no options available.
 * @param {boolean} [props.clearable] - If true, allows the user to clear the selected value.
 * @param {boolean} [props.disabled] - If true, disables the select component.
 * @param {SizeTypes} [props.size] - Size of the select component (e.g., small, medium, large).
 * @param {(e: FocusEvent) => void} [props.onBlur] - Callback function triggered when the select component loses focus.
 * @param {string} [props.labelClassName] - Additional classes to apply to the label element
 *
 * @returns {React.ReactNode} Rendered Select component.
 *
 * @version 0.4.5
 * @see https://www.npmjs.com/package/djuno-design#select
 *
 * @example
 * // Example usage of Select component:
 * const selectOptions: SelectOption<string>[] = [
 *     { label: "option 1", value: "option1" },
 *     { label: "option 2", value: "option2" },
 *   ];
 * const [value, setValue] = useState<string | undefined>(selectOptions[0].value);
 *
 * <Select
 *   value={value}
 *   onChange={setValue}
 *   options={selectOptions}
 *   label="Choose an option"
 *   error="This field is required"
 *   required={true}
 *   clearable={true}
 * />
 */
const Select = <ExtraDataType extends string>({
  id,
  className,
  buttonClassName,
  optionsClassName,
  label,
  error,
  required,
  tooltip,
  hint,
  loading,
  loadingType,
  type,
  size,
  emptyString,
  clearable,
  disabled,
  value,
  defaultValue,
  onChange,
  options,
  labelClassName,
}: SelectProps<ExtraDataType>) => {
  const innerId = React.useMemo(() => {
    return id || uuid(10)
  }, [id])

  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    onChange && onChange(undefined)
  }

  const selectedOption = React.useMemo(() => {
    return options.find((o) => o.value === value)
  }, [options, value])

  return (
    <div className={cn('dj-flex dj-flex-col', className)}>
      <div
        className={cn('dj-flex dj-items-center', {
          'dj-justify-between': label,
          'dj-justify-end': !label,
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
            <Typography.Text uiType='danger' className='dj-h-5'>
              *
            </Typography.Text>
          )}
          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>
        {hint && <span className='dj-text-xs dj-mb-1 dj-text-slate-500'>{hint}</span>}
      </div>
      <Listbox defaultValue={defaultValue || null} value={value || null} onChange={onChange} disabled={disabled}>
        <ListboxButton
          className={cn(
            listboxVariants({
              type,
              hasError: error ? 'yes' : 'no',
              size,
            }),
            buttonClassName,
            'dj-relative dj-block dj-w-full',
          )}
        >
          <span
            className={cn('dj-block dj-truncate dj-text-slate-800 dark:dj-text-slate-200 dj-text-start', {
              'dj-text-slate-300 dark:dj-text-secondary-600': loading,
            })}
          >
            {value ? (
              selectedOption?.label
            ) : (
              <Text className='dj-text-sm' uiType='secondary'>
                {emptyString
                  ? emptyString
                  : label
                    ? `Select a ${typeof label === 'string' && label.toLowerCase()}`
                    : ''}
              </Text>
            )}
          </span>
          <span className='dj-absolute dj-inset-y-0 dj-right-0 dj-flex dj-items-center dj-pr-2 dj-gap-1'>
            {clearable && value && (
              <ClearIcon
                onClick={handleClear}
                className='dj-w-4 dj-cursor-pointer hover:dj-scale-110 dj-duration-300 dj-text-slate-400 hover:dj-text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='dj-h-4 dj-w-4 dj-text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='dj-absolute dj-inset-y-0 dj-left-0 dj-flex dj-items-center dj-pl-2'>
              <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'dj-w-[var(--button-width)] dj-mt-1 dj-max-h-60 dj-overflow-auto dj-rounded-lg dj-bg-white dark:dj-bg-dark-800 dj-p-1 dj-text-base dj-shadow-lg dj-border dj-border-dark-100 dark:dj-border-dark-600 focus:dj-outline-none sm:dj-text-sm',
            { [optionsClassName || '']: optionsClassName },
            'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                `dj-relative dj-cursor-default dj-select-none dj-py-2 dj-pl-5 dj-pr-4 dj-rounded-md ${
                  focus
                    ? 'dj-bg-primary-50 dark:dj-bg-dark-900 dj-text-primary-600 dark:dj-bg-dark-2 dark:dj-text-primary-300'
                    : 'dj-text-gray-900 dark:dj-text-slate-300'
                }`
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'dj-cursor-not-allowed dj-opacity-50': disabled,
                  })}
                >
                  <span className={`dj-block dj-truncate ${selected ? 'dj-font-medium' : 'dj-font-normal'}`}>
                    {option.label}
                  </span>
                  {selected ? (
                    <span className='dj-absolute dj-inset-y-0 dj-left-0 dj-flex dj-items-center dj-pl-1 dj-text-primary-600 dark:dj-text-primary-300'>
                      <CheckIcon className='dj-h-3 dj-w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && (
            <EmptyState
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE className='dj-w-9' />}
              textClassName='dj-font-normal dj-text-xs'
            />
          )}
        </ListboxOptions>
      </Listbox>
      <AnimatedFormError error={error} />
    </div>
  )
}

const MultiSelect = <ExtraDataType extends string>({
  id,
  className,
  buttonClassName,
  optionsClassName,
  label,
  error,
  required,
  tooltip,
  hint,
  loading,
  loadingType,
  type,
  size,
  emptyString,
  clearable,
  disabled,
  values,
  defaultValues,
  onChange,
  options,
}: MultiSelectProps<ExtraDataType>) => {
  const innerId = React.useMemo(() => {
    return id || uuid(10)
  }, [id])

  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    onChange && onChange([])
  }

  return (
    <div className={cn('dj-flex dj-flex-col', className)}>
      <div
        className={cn('dj-flex dj-items-center', {
          'dj-justify-between': label,
          'dj-justify-end': !label,
        })}
      >
        <label htmlFor={innerId} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
          {label && (
            <Typography.Text size='sm' uiType='transparent'>
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
        {hint && <span className='dj-text-xs dj-mb-1 dj-text-slate-500'>{hint}</span>}
      </div>
      <Listbox
        defaultValue={defaultValues || null}
        value={values || null}
        onChange={onChange}
        disabled={disabled}
        multiple
      >
        <ListboxButton
          className={cn(
            listboxVariants({
              type,
              hasError: error ? 'yes' : 'no',
              size,
            }),
            buttonClassName,
            'dj-relative dj-block dj-w-full',
          )}
        >
          <span
            className={cn('dj-block dj-truncate dj-text-slate-800 dark:dj-text-slate-200 dj-text-start', {
              'dj-text-slate-300 dark:dj-text-secondary-600': loading,
            })}
          >
            {values && values.length > 0 ? (
              values.join(' , ')
            ) : (
              <Text size='sm' uiType='secondary'>
                {emptyString || ''}
              </Text>
            )}
          </span>
          <span className='dj-absolute dj-inset-y-0 dj-right-0 dj-flex dj-items-center dj-pr-2 dj-gap-1'>
            {clearable && values && (
              <ClearIcon
                onClick={handleClear}
                className='dj-w-4 dj-cursor-pointer hover:dj-scale-110 dj-duration-300 dj-text-slate-400 hover:dj-text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='dj-h-4 dj-w-4 dj-text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='dj-absolute dj-inset-y-0 dj-left-0 dj-flex dj-items-center dj-pl-2'>
              <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'dj-w-[var(--button-width)] dj-mt-1 dj-max-h-60 dj-overflow-auto dj-rounded-lg dj-bg-white dark:dj-bg-dark-800 dj-p-1 dj-text-base dj-shadow-lg dj-border dj-border-dark-100 dark:dj-border-dark-600 focus:dj-outline-none sm:dj-text-sm',
            { [optionsClassName || '']: optionsClassName },
            'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                `dj-relative dj-cursor-default dj-select-none dj-py-2 dj-pl-5 dj-pr-4 dj-rounded-md ${
                  focus
                    ? 'dj-bg-primary-50 dark:dj-bg-dark-900 dj-text-primary-600 dark:dj-bg-dark-2 dark:dj-text-primary-300'
                    : 'dj-text-gray-900 dark:dj-text-slate-300'
                }`
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'dj-cursor-not-allowed dj-opacity-50': disabled,
                  })}
                >
                  <span className={`dj-block dj-truncate ${selected ? 'dj-font-medium' : 'dj-font-normal'}`}>
                    {option.label}
                  </span>
                  {selected ? (
                    <span className='dj-absolute dj-inset-y-0 dj-left-0 dj-flex dj-items-center dj-pl-1 dj-text-primary-600 dark:dj-text-primary-300'>
                      <CheckIcon className='dj-h-3 dj-w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && (
            <EmptyState
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE className='dj-w-9' />}
              textClassName='dj-font-normal dj-text-xs'
            />
          )}
        </ListboxOptions>
      </Listbox>
      <AnimatedFormError error={error} />
    </div>
  )
}

export { MultiSelect }
export default Select
