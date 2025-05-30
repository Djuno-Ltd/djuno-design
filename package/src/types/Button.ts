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

import { ButtonHTMLAttributes } from 'react'
import { LoadingType, SizeTypes, TooltipProps } from '.'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  uiType?: ButtonTypes
  uiSize?: SizeTypes
  tooltip?: TooltipProps
  loading?: boolean
  loadingType?: LoadingType
  className?: string
  style?: React.CSSProperties
}

export type ButtonTypes = 'simple' | 'primary' | 'light' | 'danger' | 'dangerLight' | 'icon'
