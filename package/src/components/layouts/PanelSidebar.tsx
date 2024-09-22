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
 * @version 0.5.0
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
        ' bg-white dark:bg-dark-900 md:border-r dark:border-dark-800 h-full absolute border-r-2 border-slate-200 transition-all duration-500 ease-in-out z-40',
        {
          'w-[300px]': type === 'normal' || type === undefined,
          'w-[130px]': type === 'mini',
          '-left-[300px] lg:left-0': !isShowSidebar && (type === 'normal' || type === undefined),
          '-left-[130px] lg:left-0': !isShowSidebar && type === 'mini',
          '!left-0': isShowSidebar,
        },
      )}
    >
      {sidebarHeader && <div className='flex w-full justify-between h-16 items-center'>{sidebarHeader}</div>}
      <div className='flex flex-col flex-grow justify-between overflow-y-auto w-full transition-height h-[calc(100vh-5rem)] pb-3'>
        {children}
      </div>
    </div>
  )
}
export default PanelSidebar
