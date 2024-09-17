/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Button types
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
import { TooltipProps } from './Tooltip'
import { LoadingType } from './Loading'
import { SizeTypes } from '.'

export interface InputProps {
  label?: React.ReactNode
  inputProps?: React.HTMLProps<HTMLInputElement>
  loading?: boolean
  loadingType?: LoadingType
  type?: InputTypes
  placeholder?: string
  className?: string
  labelClassName?: string
  required?: boolean
  error?: string | boolean
  hint?: string | React.ReactNode
  tooltip?: TooltipProps
  size?: SizeTypes
  AfterComponent?: React.ReactNode
  copyable?:
    | boolean
    | ((inputCurrentValue: string | undefined) => string | number | null | undefined)
    | InputCopyableProp
}

export type InputTypes = 'default' | 'simple'

export interface InputCopyableProp {
  text?: string
  icon?: [React.ReactNode, React.ReactNode]
  tooltips?: boolean | [string, string]
}
