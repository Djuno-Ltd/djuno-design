/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Panel layout types
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

export type PanelLayoutTypes = 'normal' | 'mini'

export interface PanelLayoutProps extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
  type?: PanelLayoutTypes
  pathname?: string
  renderSidebar?: ({
    segments,
    isShowSidebar,
    type,
  }: {
    segments: string[]
    isShowSidebar: boolean
    type: PanelLayoutTypes
  }) => React.ReactNode
  renderHeader?: ({
    handleHideSidebar,
    handleShowSidebar,
  }: {
    handleHideSidebar: () => void
    handleShowSidebar: () => void
  }) => React.ReactNode
}

export interface PanelHeaderProps extends React.PropsWithChildren {
  handleHideSidebar?: () => void
  handleShowSidebar?: () => void
  mobileIcon?: React.ReactNode
}

export interface PanelSidebarProps extends React.PropsWithChildren {
  isShowSidebar?: boolean
  type?: PanelLayoutTypes
  sidebarHeader?: React.ReactNode
}
