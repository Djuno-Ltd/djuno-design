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
        small: 'rounded-lg text-xs px-1 h-7 pr-6',
        medium: 'rounded-lg text-sm px-2 h-9 pr-6',
        large: 'rounded-xl text-base px-2 h-11 pr-6',
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
  itemClassName,
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
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn('flex items-center', {
          'justify-between': label,
          'justify-end': !label,
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
            <Typography.Text uiType='danger' className='h-5'>
              *
            </Typography.Text>
          )}
          {tooltip && <InfoTooltip tooltip={tooltip} />}
        </label>
        {hint && <span className='text-xs mb-1 text-slate-500'>{hint}</span>}
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
            'relative block w-full',
          )}
        >
          <span
            className={cn('block truncate text-slate-800 dark:text-slate-200 text-start', {
              'text-slate-300 dark:text-secondary-600': loading,
            })}
          >
            {value ? (
              selectedOption?.label
            ) : (
              <Text className='text-sm' uiType='secondary'>
                {emptyString
                  ? emptyString
                  : label
                    ? `Select a ${typeof label === 'string' && label.toLowerCase()}`
                    : ''}
              </Text>
            )}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 gap-1'>
            {clearable && value && (
              <ClearIcon
                onClick={handleClear}
                className='w-4 cursor-pointer hover:scale-110 duration-300 text-slate-400 hover:text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='h-4 w-4 text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'w-[var(--button-width)] mt-1 max-h-60 overflow-auto rounded-lg bg-white dark:bg-dark-800 p-1 text-base shadow-lg border border-dark-100 dark:border-dark-600 focus:outline-none sm:text-sm',
            { [optionsClassName || '']: optionsClassName },
            'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                `relative cursor-default select-none py-2 pl-5 pr-4 rounded-md ${
                  focus
                    ? 'bg-primary-50 dark:bg-dark-900 text-primary-600 dark:bg-dark-2 dark:text-primary-300'
                    : 'text-gray-900 dark:text-slate-300'
                }${itemClassName || ''}`
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'cursor-not-allowed opacity-50': disabled,
                  })}
                >
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                  {selected ? (
                    <span className='absolute inset-y-0 left-0 flex items-center pl-1 text-primary-600 dark:text-primary-300'>
                      <CheckIcon className='h-3 w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && (
            <EmptyState
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE className='w-9' />}
              textClassName='font-normal text-xs'
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
  itemClassName,
}: MultiSelectProps<ExtraDataType>) => {
  const innerId = React.useMemo(() => {
    return id || uuid(10)
  }, [id])

  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    onChange && onChange([])
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn('flex items-center', {
          'justify-between': label,
          'justify-end': !label,
        })}
      >
        <label htmlFor={innerId} className={cn(labelVariants({ hasError: error ? 'yes' : 'no' }))}>
          {label && (
            <Typography.Text size='sm' uiType='transparent'>
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
        {hint && <span className='text-xs mb-1 text-slate-500'>{hint}</span>}
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
            'relative block w-full',
          )}
        >
          <span
            className={cn('block truncate text-slate-800 dark:text-slate-200 text-start', {
              'text-slate-300 dark:text-secondary-600': loading,
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
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 gap-1'>
            {clearable && values && (
              <ClearIcon
                onClick={handleClear}
                className='w-4 cursor-pointer hover:scale-110 duration-300 text-slate-400 hover:text-slate-800'
              />
            )}

            <ChevronUpDownIcon className='h-4 w-4 text-gray-400' aria-hidden='true' />
          </span>
          {loading && (
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <Loading type={loadingType || 'simple'} borderSize={1.5} size={14} theme={'primary'} />
            </span>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'w-[var(--button-width)] mt-1 max-h-60 overflow-auto rounded-lg bg-white dark:bg-dark-800 p-1 text-base shadow-lg border border-dark-100 dark:border-dark-600 focus:outline-none sm:text-sm',
            { [optionsClassName || '']: optionsClassName },
            'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          )}
        >
          {options.map((option, optionIdx) => (
            <ListboxOption
              disabled={option.disabled}
              key={optionIdx}
              className={({ focus }) =>
                `relative cursor-default select-none py-2 pl-5 pr-4 rounded-md ${
                  focus
                    ? 'bg-primary-50 dark:bg-dark-900 text-primary-600 dark:bg-dark-2 dark:text-primary-300'
                    : 'text-gray-900 dark:text-slate-300'
                }${itemClassName || ''}`
              }
              value={option.value}
            >
              {({ selected, disabled }) => (
                <div
                  className={cn({
                    'cursor-not-allowed opacity-50': disabled,
                  })}
                >
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                  {selected ? (
                    <span className='absolute inset-y-0 left-0 flex items-center pl-1 text-primary-600 dark:text-primary-300'>
                      <CheckIcon className='h-3 w-3' aria-hidden='true' />
                    </span>
                  ) : null}
                </div>
              )}
            </ListboxOption>
          ))}
          {options.length === 0 && (
            <EmptyState
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE className='w-9' />}
              textClassName='font-normal text-xs'
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
