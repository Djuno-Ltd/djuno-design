/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Tabs types
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

import React, { PropsWithChildren } from 'react'

export interface TabsProps extends PropsWithChildren {
  options: TabOptions
  selectedIndex?: number
  onChange?: ({ option, index }: { option?: TabOption; index?: number }) => void
  listClassName?: string
  panelClassName?: string
  tabType?: TabType
}
export type TabType = 'default' | 'creamy'

export interface TabOption<T = undefined> {
  label: React.ReactNode
  url?: string
  element?: string | React.ReactNode
  icon?: string | React.ReactNode
  setting?: T
  disabled?: boolean
  testId?: string
  isVisible?: boolean
}

export type TabOptions<T = undefined> = Array<TabOption<T>>
