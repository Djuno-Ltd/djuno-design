/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Textarea types
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

import { TooltipProps } from './Tooltip'
import { CopyableOptionsProp, InputTypes, LoadingType, SizeTypes } from '.'
import { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string
  className?: string
  placeholder?: string
  label?: string | React.ReactNode
  required?: boolean
  error?: string | boolean | React.ReactNode
  hint?: string | React.ReactNode
  tooltip?: TooltipProps
  uiSize?: SizeTypes
  type?: InputTypes
  copyable?: boolean | ((value: string | undefined) => string | number | null | undefined) | CopyableOptionsProp
  loading?: boolean
  loadingType?: LoadingType
  labelClassName?: string
  containerClassName?: string
}
