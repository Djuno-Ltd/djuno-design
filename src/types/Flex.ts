/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Flex types
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

import { HTMLAttributes } from 'react'
import { IMediaQuery } from '.'

export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverce'
export type FlexItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection | IMediaQuery<FlexDirection>
  items?: FlexItems | IMediaQuery<FlexItems>
  justify?: FlexJustify | IMediaQuery<FlexJustify>
}
