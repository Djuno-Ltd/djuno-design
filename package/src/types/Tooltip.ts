/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Tooltip types
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

import { PropsWithChildren } from 'react'
export type TooltipPlaces =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
export type TooltipThemeTypes = 'primary' | 'error' | 'black'

export interface TooltipProps extends PropsWithChildren {
  content?: string | React.ReactNode
  clickable?: boolean
  place?: TooltipPlaces
  theme?: TooltipThemeTypes
  className?: string
}

export interface TooltipComponents {
  Info: React.FC<TooltipProps>
  Error: React.FC<TooltipProps>
}
