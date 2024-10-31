/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Sidebar types
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

import { PanelLayoutTypes } from './IPanelLayouts'
import { LoadingType } from './Loading'

export interface SidebarProps<T = unknown> extends React.PropsWithChildren {
  items: SidebarItem<T>[]
  segments?: string[]
  subItems?: SidebarItem<T>[]
  loading?: boolean
  loadingMode?: SidebarLoadingModes
  type?: PanelLayoutTypes
  navItemHeight?: number
}

export type SidebarItem<T = unknown> = {
  id: string | number
  activeConditions?: SidebarActiveItemCondition[]
  label?: SidebarItemLabel
  link?: string
  onClick?: (item?: SidebarItem) => void
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  disabled?: boolean
  testId?: string
  children?: SidebarItem[]
  isVisible?: boolean
  data?: T
}

export type SidebarLoadingModes = LoadingType | 'skeleton'
export type SidebarItemLabel = string | React.ReactNode | (({ isActive }: { isActive?: boolean }) => React.ReactNode)
export interface SidebarActiveItemCondition {
  operator?: 'and' | 'or'
  index: number
  value: string | undefined
}