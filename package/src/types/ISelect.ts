/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Select types
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

import { SizeTypes } from '.'
import { InputTypes } from './Input'
import { LoadingType } from './Loading'
import { TooltipProps } from './Tooltip'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectOption<T = string | number, ET = any> = {
  label: string | React.ReactNode
  value: T
  extraElement?: React.ReactNode
  extraData?: ET
  disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectProps<T, ET = any> = {
  value?: T
  onChange?: (value: T | undefined) => void
  defaultValue?: T
  options: SelectOption<T, ET>[]
  className?: string
  buttonClassName?: string
  optionsClassName?: string
  label?: string
  error?: string | boolean
  required?: boolean
  type?: SelectTypes
  tooltip?: TooltipProps
  hint?: string
  loading?: boolean
  loadingType?: LoadingType
  emptyString?: string
  clearable?: boolean
  disabled?: boolean
  size?: SizeTypes
  onBlur?: (e: FocusEvent) => void
}

export type SelectTypes = InputTypes
