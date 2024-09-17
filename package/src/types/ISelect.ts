/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type SelectOption<ExtraDataType = any> = {
  label: string | React.ReactNode
  value: string
  extraElement?: React.ReactNode
  extraData?: ExtraDataType
  disabled?: boolean
}

export interface SelectBaseProps {
  className?: string
  buttonClassName?: string
  optionsClassName?: string
  label?: string
  error?: string
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

export interface SelectProps<ExtraDataType = any> extends SelectBaseProps {
  id?: string
  value?: string
  onChange?: (value: string | undefined) => void
  defaultValue?: string
  options: SelectOption<ExtraDataType>[]
}

export interface MultiSelectProps<ExtraDataType = any> extends SelectBaseProps {
  id?: string
  values?: Array<string>
  onChange?: (values: Array<string> | undefined) => void
  defaultValues?: Array<string>
  options: Array<SelectOption<ExtraDataType>>
}
