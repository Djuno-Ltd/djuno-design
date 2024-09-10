/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Types index file
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

export * from './Button'
export * from './Tooltip'
export * from './Loading'
export * from './Flex'
export * from './Card'
export * from './Typography'
export * from './Alert'
export * from './Steps'
export * from './ISkeleton'
export * from './Input'
export * from './SimpleTable'
export * from './EmptyState'
export * from './Divider'
export * from './ISwitcher'
export * from './IModal'
export * from './ISelect'
export * from './IDropdown'
export * from './ISecureCopy'
export * from './IAccordion'
export * from './ITab'
export * from './IPagination'
export * from './IPanelLayouts'
export * from './ISidebar'
export * from './ITextarea'
export * from './IThemeChanger'
export * from './IJsonViewer'

export type SizeTypes = 'small' | 'medium' | 'large'
export interface IMediaQuery<T> {
  default?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}
