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
import Tooltip from '../Tooltip'
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
export const listboxVariants = cva(
  'dd-bg-secondary-100 focus:dd-ring-0 dd-text-sm dd-block dd-w-full dark:dd-bg-dark-800 dd-outline-none disabled:dd-cursor-not-allowed disabled:dd-bg-secondary-200 dark:disabled:dd-bg-gray-700 dark:disabled:dd-text-secondary-400 disabled:dd-text-secondary-500 disabled:dd-border-secondary-300 disabled:dark:dd-border-gray-600',
  {
    variants: {
      uiType: {
        simple: 'dd-text-secondary-600 dd-bg-transparent',
        default: 'dd-border-2',
      },
      hasError: {
        yes: 'dd-border dd-border-red-500 dd-text-red-900 dd-placeholder-red-700 focus:dd-border-red-500 dark:dd-text-red-500 dark:dd-placeholder-red-500 dark:dd-border-red-500',
        no: 'dark:dd-border-dark-2 dark:dd-text-slate-50 dark:dd-placeholder-gray-500 dd-border-secondary-100 focus:dd-bg-secondary-50 focus:dd-border-secondary-200 dark:dd-border-dark-700 dark:focus:dd-bg-dark-700 dark:focus:dd-border-dark-600',
      },
      uiSize: {
        small: 'dd-rounded-lg dd-text-xs dd-px-1 dd-h-7 dd-pr-6',
        medium: 'dd-rounded-lg dd-text-sm dd-px-2 dd-h-9 dd-pr-6',
        large: 'dd-rounded-xl dd-text-base dd-px-2 dd-h-11 dd-pr-6',
      },
    },
    defaultVariants: {
      uiType: 'default',
      hasError: 'no',
      uiSize: 'medium',
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
 * @param {string} [props.id] - The unique identifier.
 * @param {(value: T | undefined) => void} [props.onChange] - Callback function triggered when the selected value changes.
 * @param {T} [props.defaultValue] - The default value of the select component.
 * @param {SelectOption<T, ET>[]} props.options - Array of options available for selection.
 * @param {string} [props.className] - Additional CSS classes for custom styling of the select component.
 * @param {string} [props.buttonClassName] - Additional CSS classes for custom styling of the select button.
 * @param {string} [props.optionsClassName] - Additional CSS classes for custom styling of the options list.
 * @param {string} [props.optionClassName] - Additional CSS classes for custom styling of the each option.
 * @param {string| React.ReactNode} [props.label] - The label displayed above the select component.
 * @param {string|boolean| React.ReactNode} [props.error] - Error message to display if there is a validation issue.
 * @param {boolean} [props.required] - Indicates if the select component is required.
 * @param {SelectTypes} [props.uiType] - The type of the select component (e.g., single select, multi-select).
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display additional information.
 * @param {string| React.ReactNode} [props.hint] - Hint text to provide additional context or instructions.
 * @param {boolean} [props.loading] - Indicates if the select component is in a loading state.
 * @param {LoadingType} [props.loadingType] - Type of loading indicator to display when the select component is loading.
 * @param {string} [props.emptyString] - Text to display when there are no options available.
 * @param {boolean} [props.clearable] - If true, allows the user to clear the selected value.
 * @param {boolean} [props.disabled] - If true, disables the select component.
 * @param {SizeTypes} [props.uiSize] - Size of the select component (e.g., small, medium, large).
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
 *   { label: "Option 1", value: "option1" },
 *   { label: "Option 2", value: "option2" },
 *   { label: "Option 3", value: "option3" }
 * ];
 *
 * const [value, setValue] = useState<string | undefined>(selectOptions[0].value);
 *
 * <Select
 *   id="optionId"
 *   value={value}
 *   onChange={setValue}
 *   options={selectOptions}
 *   label="Choose an option"
 *   error="This field is required"
 *   required={true}
 *   tooltip="Select one of the options from the list"
 *   hint="This choice will affect your settings"
 *   clearable={true}
 *   emptyString="No option selected"
 *   loading={false}
 *   loadingType="spinner"
 *   uiType="dropdown"
 *   uiSize="medium"
 *   disabled={false}
 *   buttonClassName="customButtonClassName"
 * />
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Select = <ExtraDataType extends unknown>({
  id,
  className,
  labelClassName,
  buttonClassName,
  optionsClassName,
  optionClassName,
  label,
  error,
  required,
  tooltip,
  hint,
  loading,
  loadingType,
  uiType,
  uiSize,
  emptyString,
  clearable,
  disabled,
  value,
  defaultValue,
  onChange,
  options,
}: SelectProps<ExtraDataType>) => {
  // const innerId = React.useMemo(() => {
  //   return id || uuid(10)
  // }, [id])

  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    if (typeof clearable === 'function') {
      clearable()
    } else {
      onChange && onChange(undefined)
    }
  }

  const selectedOption = React.useMemo(() => {
    return options.find((o) => o.value === value)
  }, [options, value])

  return (
    <div className={cn('dd-flex dd-flex-col', className)}>
      <div
        className={cn('dd-flex dd-items-center', {
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
            <Typography.Text uiType='danger' className='dd-h-5 dd-ml-0.5'>
              *
            </Typography.Text>
          )}
          {tooltip && <Tooltip.Info {...tooltip} />}
        </label>
        {hint && <span className='dd-text-xs dd-mb-1 dd-text-slate-500'>{hint}</span>}
      </div>
      <Listbox defaultValue={defaultValue || null} value={value || null} onChange={onChange} disabled={disabled}>
        <ListboxButton
          className={cn(
            listboxVariants({
              uiType,
              hasError: error ? 'yes' : 'no',
              uiSize,
            }),
            'dd-relative dd-block dd-w-full',
            buttonClassName,
          )}
        >
          <span
            className={cn('dd-block dd-truncate dd-text-slate-800 dark:dd-text-slate-200 dd-text-start', {
              'dd-text-slate-300 dark:dd-text-secondary-600': loading,
            })}
          >
            {value ? (
              selectedOption?.label
            ) : (
              <Text className='dd-text-sm' uiType='secondary'>
                {emptyString
                  ? emptyString
                  : label
                    ? `Select a ${typeof label === 'string' && label.toLowerCase()}`
                    : ''}
              </Text>
            )}
          </span>
          <span className='dd-absolute dd-inset-y-0 dd-right-0 dd-flex dd-items-center dd-pr-2 dd-gap-1'>
            {clearable && value && (
              <ClearIcon
                onClick={handleClear}
                className='dd-w-4 dd-cursor-pointer hover:dd-scale-110 dd-duration-300 dd-text-slate-400 hover:dd-text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='dd-h-4 dd-w-4 dd-text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='dd-absolute dd-inset-y-0 dd-left-0 dd-flex dd-items-center dd-pl-2'>
              <Loading uiType={loadingType || 'simple'} borderSize={1.5} uiSize={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'dd-w-[var(--button-width)] dd-mt-1 dd-max-h-60 dd-overflow-auto dd-rounded-lg dd-bg-white dark:dd-bg-dark-800 dd-p-1 dd-text-base dd-shadow-lg dd-border dd-border-dark-100 dark:dd-border-dark-600 focus:dd-outline-none sm:dd-text-sm',
            { [optionsClassName || '']: optionsClassName },
            'dd-origin-top dd-transition dd-duration-200 dd-ease-out data-[closed]:dd-scale-95 data-[closed]:dd-opacity-0',
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                cn(
                  'dd-relative dd-cursor-default dd-select-none dd-py-2 dd-pl-5 dd-pr-4 dd-rounded-md',
                  {
                    'dd-bg-primary-50 dark:dd-bg-dark-900 dd-text-primary-600 dark:dd-text-primary-300': focus,
                    'dd-text-gray-900 dark:dd-text-slate-300': !focus,
                  },
                  optionClassName,
                )
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'dd-cursor-not-allowed dd-opacity-50': disabled,
                  })}
                >
                  <span className={`dd-block dd-truncate ${selected ? 'dd-font-medium' : 'dd-font-normal'}`}>
                    {option.label}
                  </span>
                  {selected ? (
                    <span className='dd-absolute dd-inset-y-0 dd-left-0 dd-flex dd-items-center dd-pl-1 dd-text-primary-600 dark:dd-text-primary-300'>
                      <CheckIcon className='dd-h-3 dd-w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && <EmptyState textClassName='dd-font-normal dd-text-xs' />}
        </ListboxOptions>
      </Listbox>
      <AnimatedFormError error={error} />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const MultiSelect = <ExtraDataType extends unknown>({
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
  uiType,
  uiSize,
  emptyString,
  clearable,
  disabled,
  values,
  defaultValues,
  onChange,
  options,
  optionClassName,
}: MultiSelectProps<ExtraDataType>) => {
  const innerId = React.useMemo(() => {
    return id || uuid(10)
  }, [id])

  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    if (typeof clearable === 'function') {
      clearable()
    } else {
      onChange && onChange([])
    }
  }

  const selectedOptions = React.useMemo(() => {
    if (values?.length && options.length) {
      return options.filter((o) => values.includes(o.value))
    }
  }, [values, options])

  return (
    <div className={cn('dd-flex dd-flex-col', className)}>
      <div
        className={cn('dd-flex dd-items-center', {
          'dd-justify-between': label,
          'dd-justify-end': !label,
        })}
      >
        <label htmlFor={innerId} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
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
          {tooltip && <Tooltip.Info {...tooltip} />}
        </label>
        {hint && <span className='dd-text-xs dd-mb-1 dd-text-slate-500'>{hint}</span>}
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
              uiType,
              hasError: error ? 'yes' : 'no',
              uiSize,
            }),
            buttonClassName,
            'dd-relative dd-block dd-w-full',
          )}
        >
          <span
            className={cn('dd-block dd-truncate dd-text-slate-800 dark:dd-text-slate-200 dd-text-start', {
              'dd-text-slate-300 dark:dd-text-secondary-600': loading,
            })}
          >
            {selectedOptions && selectedOptions.length > 0 ? (
              selectedOptions.map((o) => o.label).join(' , ')
            ) : (
              <Text size='sm' uiType='secondary'>
                {emptyString || ''}
              </Text>
            )}
          </span>
          <span className='dd-absolute dd-inset-y-0 dd-right-0 dd-flex dd-items-center dd-pr-2 dd-gap-1'>
            {clearable && values && (
              <ClearIcon
                onClick={handleClear}
                className='dd-w-4 dd-cursor-pointer hover:dd-scale-110 dd-duration-300 dd-text-slate-400 hover:dd-text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='dd-h-4 dd-w-4 dd-text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='dd-absolute dd-inset-y-0 dd-left-0 dd-flex dd-items-center dd-pl-2'>
              <Loading uiType={loadingType || 'simple'} borderSize={1.5} uiSize={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'dd-w-[var(--button-width)] dd-mt-1 dd-max-h-60 dd-overflow-auto dd-rounded-lg dd-bg-white dark:dd-bg-dark-800 dd-p-1 dd-text-base dd-shadow-lg dd-border dd-border-dark-100 dark:dd-border-dark-600 focus:dd-outline-none sm:dd-text-sm',
            'dd-origin-top dd-transition dd-duration-200 dd-ease-out data-[closed]:dd-scale-95 data-[closed]:dd-opacity-0',
            optionsClassName,
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                cn(
                  'dd-relative dd-cursor-default dd-select-none dd-py-2 dd-pl-5 dd-pr-4 dd-rounded-md',
                  {
                    'dd-bg-primary-50 dark:dd-bg-dark-900 dd-text-primary-600 dark:dd-text-primary-300': focus,
                    'dd-text-gray-900 dark:dd-text-slate-300': !focus,
                  },
                  optionClassName,
                )
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'dd-cursor-not-allowed dd-opacity-50': disabled,
                  })}
                >
                  <span
                    className={cn('dd-block dd-truncate', { 'dd-font-medium': selected, 'dd-font-normal': !selected })}
                  >
                    {option.label}
                  </span>
                  {selected ? (
                    <span className='dd-absolute dd-inset-y-0 dd-left-0 dd-flex dd-items-center dd-pl-1 dd-text-primary-600 dark:dd-text-primary-300'>
                      <CheckIcon className='dd-h-3 dd-w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && <EmptyState textClassName='font-normal dd-text-xs' />}
        </ListboxOptions>
      </Listbox>
      <AnimatedFormError error={error} />
    </div>
  )
}

export { MultiSelect }
export default Select
