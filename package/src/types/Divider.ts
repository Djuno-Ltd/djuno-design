/**
 * @author Sanaz Zerrati <szeraati69@gmail.com>
 * @fileoverview Divider types
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

export interface DividerProps extends PropsWithChildren {
  uiType?: DividerTypes
  className?: string
  style?: React.CSSProperties
  orientation?: OrientationTypes
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  usingText?: boolean
  //   orientationMargin?:number
}

export type DividerTypes = 'simple' | 'dotted' | 'dashed'
export type OrientationTypes = 'left' | 'right' | 'center'
