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
import { useEffect, useState } from 'react'
import { CheckboxProps } from '../../types/ICheckbox'
import { cn } from '../../utils/cn'
import { AnimatedFormError, labelVariants } from './Input'
import { Checkbox as HeadlessCheckbox } from '@headlessui/react'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import Typography from './../Typography'
import { InfoTooltip } from '../Tooltip'

/**
 * Checkbox component that allows for customization of UI behavior, labeling, validation, and more.
 *
 * @param {object} props - Checkbox props.
 * @param {string} [props.id] - The unique identifier for the checkbox input element.
 * @param {React.HTMLProps<HTMLInputElement>} [props.inputProps] - Additional HTML props to apply to the input element.
 * @param {React.ReactNode} [props.label] - The label to display next to the checkbox.
 * @param {boolean} [props.checked] - Specifies if the checkbox is initially checked.
 * @param {Function} [props.onChangeCheckbox] - Callback function called when the checkbox state changes.
 * @param {boolean} [props.required] - Specifies if the checkbox is required.
 * @param {boolean} [props.disabled] - Disables the checkbox interaction.
 * @param {string} [props.error] - An error message to display if there's an issue with the checkbox.
 * @param {React.ReactNode} [props.tooltip] - Additional information to display in a tooltip next to the checkbox.
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
 *       inputProps={{ 'aria-label': 'custom-checkbox' }}
 *       label="Checkbox Label"
 *       checked={false}
 *       required={true}
 *       onChangeCheckbox={handleCheckboxChange}
 *       error="This field is required."
 *       tooltip="Additional information about this checkbox."
 *     />
 *   );
 * }
 */
const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps>> = ({
  id,
  inputProps,
  label,
  error,
  required,
  tooltip,
  checked = false,
  onChangeCheckbox,
  disabled,
}) => {
  const [checkedState, setCheckedState] = React.useState<boolean>(checked)

  React.useEffect(() => {
    setCheckedState(checked)
  }, [checked])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const newCheckedState = !checkedState
      setCheckedState(newCheckedState)
      onChangeCheckbox && onChangeCheckbox(newCheckedState)
    }
  }

  return (
    <div className='dj-flex dj-flex-col dj-gap-1'>
      <div className='dj-flex dj-items-center dj-gap-2 ' onClick={handleClick}>
        <HeadlessCheckbox
          checked={checkedState}
          className={cn('dj-group dj-flex dj-items-center dj-justify-center dj-rounded dj-border dj-w-4 dj-h-4', {
            'dj-bg-white dj-border-dark-500 dark:dj-bg-dark-800 dark:dj-border-dark-700 dark:dj-border-2':
              !checkedState,
            'dj-bg-primary-600 dj-border-primary-600 dj-text-white': checkedState,
            'dj-bg-primary-200 dj-border-primary-200 dark:dj-bg-dark-400 dark:dj-border-dark-700 dj-text-white dj-cursor-not-allowed':
              checkedState && disabled,
            'dj-w-4 dj-h-4': true,
          })}
        >
          <CheckIcon
            className={cn('dj-hidden', { 'dj-block dj-text-white': checkedState })}
            style={{
              strokeWidth: '2.5',
            }}
          />
        </HeadlessCheckbox>
        <label
          htmlFor={id}
          className={cn(
            'dj-flex dj-items-center dj-cursor-pointer',
            labelVariants({ hasError: error ? 'yes' : 'no' }),
            {
              ' dj-cursor-not-allowed': disabled,
            },
          )}
        >
          {label && (
            <Typography.Text size='sm' uiType={error ? 'danger' : undefined}>
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
      </div>
      <AnimatedFormError error={error} />
    </div>
  )
}

export default Checkbox
