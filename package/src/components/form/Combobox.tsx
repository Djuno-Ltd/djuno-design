/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Combobox Component
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

import React, { useMemo } from 'react'
import Typography from '../Typography'
import { cn } from '../../utils/cn'
import {
  ComboboxOptions,
  ComboboxOption,
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxButton,
} from '@headlessui/react'
import Loading from '../Loading'
import EmptyState from '../EmptyState'
import Tooltip from '../Tooltip'
import { ReactComponent as CheckIcon } from './../../assets/icons/check.svg'
import { ReactComponent as ChevronDownIcon } from './../../assets/icons/chevron-down.svg'
import { ReactComponent as ClearIcon } from './../../assets/icons/close.svg'
import { AnimatedFormError, labelVariants } from './Input'
import { ComboboxProps } from '../../types/ICombobox'
import { listboxVariants } from './Select'

/**
 * Combobox component.
 *
 * A customizable dropdown Combobox component that integrates a search input for filtering options.
 * It supports dynamic filtering, validation states, tooltips, loading indicators, and customizable styling.
 *
 * @template ExtraDataType
 * @param {object} props - Combobox component props.
 * @param {string} [props.id] - The unique identifier for the combobox.
 * @param {string} [props.value] - The currently selected value.
 * @param {(value: string | undefined) => void} [props.onChange] - Callback triggered when the selected value changes.
 * @param {string} [props.defaultValue] - The default value of the combobox.
 * @param {string} [props.query] - The current search query.
 * @param {(value: string | undefined) => void} [props.onChangeQuery] - Callback triggered when the search query changes.
 * @param {ComboboxOption<ExtraDataType>[]} props.options - Array of options available for selection.
 * @param {string} [props.className] - Additional CSS classes for custom styling of the combobox container.
 * @param {string} [props.labelClassName] - Additional CSS classes for styling the label element.
 * @param {string} [props.inputClassName] - Additional CSS classes for styling the input field.
 * @param {string} [props.buttonClassName] - Additional CSS classes for styling the combobox button.
 * @param {string} [props.optionsClassName] - Additional CSS classes for styling the options list.
 * @param {string} [props.optionClassName] - Additional CSS classes for styling each option.
 * @param {string | React.ReactNode} [props.label] - The label displayed above the combobox.
 * @param {string | boolean | React.ReactNode} [props.error] - Error message to display if there is a validation issue.
 * @param {boolean} [props.required] - Indicates whether the combobox is required.
 * @param {SelectTypes} [props.uiType] - The visual style of the combobox (e.g., single select, multi-select).
 * @param {TooltipProps} [props.tooltip] - Tooltip properties to display additional information.
 * @param {string | React.ReactNode} [props.hint] - Hint text providing additional context or instructions.
 * @param {boolean} [props.loading] - Indicates if the combobox is in a loading state.
 * @param {LoadingType} [props.loadingType] - The type of loading indicator to display.
 * @param {boolean | (() => void)} [props.clearable] - Allows the user to clear the selected value. If a function, it is called when clearing.
 * @param {boolean} [props.disabled] - If true, disables the combobox.
 * @param {SizeTypes} [props.uiSize] - The size of the combobox (e.g., small, medium, large).
 * @param {boolean} [props.clearQueryOnClose=true] - If true, clears the query when the combobox is closed.
 * @param {string} [props.placeholder] - Placeholder text displayed in the input field.
 * @param {(e: FocusEvent) => void} [props.onBlur] - Callback triggered when the combobox loses focus.
 *
 * @returns {React.ReactNode} Rendered Combobox component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#combobox
 *
 * @example
 * // Example usage of Combobox component:
 * const comboOptions: ComboboxOption[] = [
 *   { label: "Option 1", value: "option1" },
 *   { label: "Option 2", value: "option2" },
 *   { label: "Option 3", value: "option3" }
 * ];
 *
 * const [value, setValue] = useState<string | undefined>(comboOptions[0].value);
 * const [query, setQuery] = useState<string | undefined>();
 *
 * <Combobox
 *   options={comboOptions}
 *   value={value}
 *   onChange={setValue}
 *   query={query}
 *   onChangeQuery={setQuery}
 * />
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Combobox = <ExtraDataType extends unknown>({
  id,
  className,
  labelClassName,
  inputClassName,
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
  clearable,
  disabled,
  value,
  defaultValue,
  onChange,
  query,
  onChangeQuery,
  options,
  clearQueryOnClose = true,
  placeholder,
}: ComboboxProps<ExtraDataType>) => {
  const handleClear = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    if (typeof clearable === 'function') {
      clearable()
    } else {
      onChange && onChange(undefined)
    }
  }

  const filteredOptions = useMemo(() => {
    if (!query || query === '') return options
    return options.filter((option) => {
      return option.value?.toString().toLowerCase().includes(query.toLowerCase())
    })
  }, [options, query])

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
      <HeadlessCombobox
        defaultValue={defaultValue || null}
        value={value || null}
        onChange={(v) => {
          //   console.log({ v })
          onChange && onChange(v || undefined)
        }}
        disabled={disabled}
        onClose={() => {
          if (onChangeQuery && clearQueryOnClose) {
            onChangeQuery('')
          }
        }}
      >
        <div className='dd-relative'>
          <ComboboxInput
            className={cn(
              listboxVariants({
                uiType,
                hasError: error ? 'yes' : 'no',
                uiSize,
              }),
              'dd-block dd-w-full',
              inputClassName,
            )}
            // displayValue={(option) => option}
            value={query}
            onChange={(event) => onChangeQuery && onChangeQuery(event.target.value)}
            placeholder={placeholder}
          />

          <span className='dd-absolute dd-inset-y-0 dd-right-0 dd-flex dd-items-center dd-pr-2 dd-gap-1'>
            {clearable && value && (
              <ClearIcon
                onClick={handleClear}
                className='dd-w-4 dd-cursor-pointer hover:dd-scale-110 dd-duration-300 dd-text-slate-400 hover:dd-text-slate-800'
              />
            )}

            <ComboboxButton
              className={cn(
                'dd-block dd-truncate dd-text-slate-800 dark:dd-text-slate-200 dd-text-start',
                {
                  'dd-text-slate-300 dark:dd-text-secondary-600': loading,
                },
                buttonClassName,
              )}
            >
              <ChevronDownIcon className='dd-h-4 dd-w-4 dd-text-gray-400' aria-hidden='true' />
            </ComboboxButton>
          </span>
          {loading && (
            <span className='dd-absolute dd-inset-y-0 dd-left-0 dd-flex dd-items-center dd-pl-2'>
              <Loading uiType={loadingType || 'simple'} borderSize={1.5} uiSize={14} theme={'primary'} />
            </span>
          )}
        </div>

        <ComboboxOptions
          anchor='bottom start'
          transition
          className={cn(
            'dd-w-[var(--input-width)] dd-mt-1 dd-max-h-60 dd-overflow-auto dd-rounded-lg dd-bg-white dark:dd-bg-dark-800 dd-p-1 dd-text-base dd-shadow-lg dd-border dd-border-dark-100 dark:dd-border-dark-600 focus:dd-outline-none sm:dd-text-sm',
            { [optionsClassName || '']: optionsClassName },
            'dd-origin-top dd-transition dd-duration-200 dd-ease-out data-[closed]:dd-scale-95 data-[closed]:dd-opacity-0',
          )}
        >
          {filteredOptions.map((option, optionIdx) => (
            <ComboboxOption
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
            </ComboboxOption>
          ))}
          {filteredOptions.length === 0 && <EmptyState textClassName='dd-font-normal dd-text-xs' />}
        </ComboboxOptions>
      </HeadlessCombobox>
      <AnimatedFormError error={error} />
    </div>
  )
}

export default Combobox
