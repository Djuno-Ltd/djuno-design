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
import { CopyableProp, SizeTypes } from '.'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  loading?: boolean
  loadingType?: LoadingType
  uiType?: InputTypes
  placeholder?: string
  className?: string
  labelClassName?: string
  style?: React.CSSProperties
  labelStyle?: React.CSSProperties
  required?: boolean
  error?: string | React.ReactNode | boolean
  hint?: string | React.ReactNode
  tooltip?: TooltipProps
  AfterComponent?: React.ReactNode
  copyable?: CopyableProp
  uiSize?: SizeTypes
  containerClassName?: string
  containerStyle?: React.CSSProperties
}

export type InputTypes = 'default' | 'simple'
