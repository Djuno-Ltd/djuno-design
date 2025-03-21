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
import Tooltip from '../Tooltip'
import { uuid } from '../../utils/uuid'

/**
 * Checkbox component that allows for customization of UI behavior, labeling, validation, and more.
 *
 * @param {object} props - Checkbox props.
 * @param {string} [props.id] - The unique identifier.
 * @param {React.ReactNode} [props.label] - The label to display next to the checkbox.
 * @param {boolean} [props.value] - Specifies if the checkbox is initially checked.
 * @param {Function} [props.onChange] - Callback function called when the checkbox state changes.
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
 *       tooltip="Additional information about this
 *       checkbox."
 *       labelClassName="CustomLabelClassName"
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
  labelStyle,
}) => {
  const [checkedState, setCheckedState] = React.useState<boolean>(value || false)

  const innerId = React.useMemo(() => id || uuid(), [])

  React.useEffect(() => {
    setCheckedState(value || false)
  }, [value])

  const handleChange = (v: boolean) => {
    if (!disabled) {
      onChange && onChange(v)
    }
  }

  return (
    <div className='dd-flex dd-flex-col dd-gap-1'>
      <Field className='dd-flex dd-items-center dd-gap-2'>
        <HeadlessCheckbox
          id={innerId}
          checked={checkedState}
          onChange={handleChange}
          className={cn(
            'dd-group dd-flex dd-items-center dd-justify-center dd-rounded dd-border dd-cursor-pointer',
            {
              'dd-bg-white dd-border-dark-500 dark:dd-bg-dark-800 dark:dd-border-dark-700 dark:dd-border-2':
                !checkedState,
              'dd-bg-primary-600 dd-border-primary-600 dd-text-white': checkedState,
              'dd-bg-primary-200 dd-border-primary-200 dark:dd-bg-dark-400 dark:dd-border-dark-700 dd-text-white dd-cursor-not-allowed':
                checkedState && disabled,
              'dd-bg-white dd-border-dark-500 dark:dd-bg-dark-800 dark:dd-border-dark-700 dark:dd-border-2 dd-cursor-not-allowed':
                !checkedState && disabled,
            },
            'dd-w-4 dd-h-4',
          )}
        >
          <CheckIcon
            className={cn('dd-hidden', { 'dd-block dd-text-white': checkedState })}
            style={{
              strokeWidth: '2.5',
            }}
          />
        </HeadlessCheckbox>

        <label
          htmlFor={innerId}
          className={cn(
            'dd-flex dd-items-center dd-cursor-pointer',
            labelVariants({
              hasError: error ? 'yes' : 'no',
            }),
            {
              'dd-cursor-not-allowed dd-opacity-80 dark:dd-opacity-65': disabled,
            },
            'dd-whitespace-normal dd-break-words dd-flex-1',
            labelClassName,
          )}
          style={labelStyle}
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
      </Field>
      <AnimatedFormError error={error} />
    </div>
  )
}

export default Checkbox
