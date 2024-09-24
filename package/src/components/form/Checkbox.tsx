/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Checkbox Component
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
import { CheckboxProps } from '../../types/ICheckbox'
import { cn } from '../../utils/cn'
import { AnimatedFormError, labelVariants } from './Input'
import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import Typography from './../Typography'
import { InfoTooltip } from '../Tooltip'

/**
 * Checkbox component that allows for customization of UI behavior, labeling, validation, and more.
 *
 * @param {object} props - Checkbox props.
 * @param {string} [props.id] - The unique identifier for the checkbox input element.
 * @param {React.ReactNode} [props.label] - The label to display next to the checkbox.
 * @param {boolean} [props.checked] - Specifies if the checkbox is initially checked.
 * @param {Function} [props.onChangeCheckbox] - Callback function called when the checkbox state changes.
 * @param {boolean} [props.required] - Specifies if the checkbox is required.
 * @param {boolean} [props.disabled] - Disables the checkbox interaction.
 * @param {string|boolean| React.ReactNode} [props.error] - An error message to display if there's an issue with the checkbox.
 * @param {React.ReactNode} [props.tooltip] - Additional information to display in a tooltip next to the checkbox.
 * @param {string} [props.labelClassName] - Additional classes to apply to the label element
 *
 * @returns {React.ReactNode} Rendered Checkbox component.
 *
 * @version 0.4.8
 * @see https://www.npmjs.com/package/djuno-design#checkbox
 *
 * @example
 * // Example usage of Checkbox component:
 *
 * function MyComponent() {
 *   const handleCheckboxChange = (isChecked) => {
 *     console.log('Checkbox checked:', isChecked);
 *   };
 *
 *   return (
 *     <Checkbox
 *       id="checkbox-id"
 *       label="Checkbox Label"
 *       value={false}
 *       required={true}
 *       onChange={handleCheckboxChange}
 *       error="This field is required."
 *       tooltip="Additional information about this checkbox."
 *     />
 *   );
 * }
 */
const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps>> = ({
  id,
  label,
  error,
  required,
  tooltip,
  value,
  onChange,
  disabled,
  labelClassName,
}) => {
  const [checkedState, setCheckedState] = React.useState<boolean>(value || false)

  React.useEffect(() => {
    setCheckedState(value || false)
  }, [value])

  const handleChange = (v: boolean) => {
    if (!disabled) {
      onChange && onChange(v)
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      <Field className='flex items-center gap-2'>
        <HeadlessCheckbox
          checked={checkedState}
          onChange={handleChange}
          className={cn('group flex items-center justify-center rounded border w-4 h-4 cursor-pointer', {
            'bg-white border-dark-500 dark:bg-dark-800 dark:border-dark-700 dark:border-2': !checkedState,
            'bg-primary-600 border-primary-600 text-white': checkedState,
            'bg-primary-200 border-primary-200 dark:bg-dark-400 dark:border-dark-700 text-white cursor-not-allowed':
              checkedState && disabled,
            'bg-white border-dark-500 dark:bg-dark-800 dark:border-dark-700 dark:border-2 cursor-not-allowed':
              !checkedState && disabled,

            'w-4 h-4': true,
          })}
        >
          <CheckIcon
            className={cn('hidden', { 'block text-white': checkedState })}
            style={{
              strokeWidth: '2.5',
            }}
          />
        </HeadlessCheckbox>
        <Label
          htmlFor={id}
          className={cn(
            'flex items-center cursor-pointer',
            labelVariants({
              hasError: error ? 'yes' : 'no',
            }),
            {
              ' cursor-not-allowed': disabled,
            },
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
        </Label>
      </Field>

      <AnimatedFormError error={error} />
    </div>
  )
}

export default Checkbox
