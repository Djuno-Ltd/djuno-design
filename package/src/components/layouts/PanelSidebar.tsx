/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview PanelSidebar Component
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
import { cn } from '../../utils/cn'
import { PanelSidebarProps } from '../../types/IPanelLayouts'

/**
 * PanelSidebar component.
 *
 * A sidebar component designed to be used within a panel layout. It supports different layout types and
 * can be toggled to show or hide. The sidebar can include a custom header and children content.
 *
 * @param {object} props - PanelSidebar component props.
 * @param {boolean} [props.isShowSidebar] - Determines whether the sidebar is visible or hidden.
 * @param {PanelLayoutTypes} [props.type] - The type of sidebar layout, such as 'normal' or 'mini'.
 * @param {React.ReactNode} [props.sidebarHeader] - Optional header content to display at the top of the sidebar.
 * @param {React.ReactNode} [props.children] - The content to be displayed within the sidebar.
 *
 * @returns {React.ReactNode} Rendered PanelSidebar component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#panelHeader
 *
 * @example
 * // Example usage of PanelSidebar component:
 * <PanelSidebar
 *   isShowSidebar={true}
 *   type="normal"
 *   sidebarHeader={<SidebarHeader />}
 * >
 *   <SidebarContent />
 * </PanelSidebar>
 */
const PanelSidebar: React.FC<PanelSidebarProps> = ({ children, isShowSidebar, type, sidebarHeader }) => {
  return (
    <div
      className={cn(
        ' dj-bg-white dark:dj-bg-dark-900 md:dj-border-r dark:dj-border-dark-800 dj-h-full dj-absolute dj-border-r-2 dj-border-slate-200 dj-transition-all dj-duration-500 dj-ease-in-out dj-z-40',
        {
          'dj-w-[300px]': type === 'normal' || type === undefined,
          'dj-w-[130px]': type === 'mini',
          '-dj-left-[300px] lg:dj-left-0': !isShowSidebar && (type === 'normal' || type === undefined),
          '-dj-left-[130px] lg:dj-left-0': !isShowSidebar && type === 'mini',
          '!dj-left-0': isShowSidebar,
        },
      )}
    >
      {sidebarHeader && (
        <div className='dj-flex dj-w-full dj-justify-between dj-h-16 dj-items-center'>{sidebarHeader}</div>
      )}
      <div className='dj-flex dj-flex-col dj-flex-grow dj-justify-between dj-overflow-y-auto dj-w-full dj-transition-height dj-h-[calc(100vh-5rem)] dj-pb-3'>
        {children}
      </div>
    </div>
  )
}
export default PanelSidebar
