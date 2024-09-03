/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview PanelHeader Component
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
import { ReactComponent as MenuIcon } from './../../assets/icons/menu.svg'
import useWindowOnClick from '../../hooks/useWindowOnClick'
import { PanelHeaderProps } from '../../types/IPanelLayouts'

/**
 * PanelHeader component.
 *
 * A header component designed to be used within a panel layout. It supports responsive behavior, allowing
 * the sidebar to be toggled open or closed. The header can include custom content and a mobile menu icon.
 *
 * @param {object} props - PanelHeader component props.
 * @param {() => void} [props.handleHideSidebar] - Callback function to hide the sidebar.
 * @param {() => void} [props.handleShowSidebar] - Callback function to show the sidebar.
 * @param {React.ReactNode} [props.mobileIcon] - An optional icon or element to display in the mobile view.
 * @param {React.ReactNode} [props.children] - The content to be displayed within the header.
 *
 * @returns {React.ReactNode} Rendered PanelHeader component.
 *
 * @version 0.5.0
 * @see https://www.npmjs.com/package/djuno-design#panelHeader
 *
 * @example
 * // Example usage of PanelHeader component:
 * <PanelHeader
 *   handleHideSidebar={() => console.log('Hide sidebar')}
 *   handleShowSidebar={() => console.log('Show sidebar')}
 *   mobileIcon={<MobileMenuIcon />}
 * >
 *   <HeaderContent />
 * </PanelHeader>
 */
const PanelHeader: React.FC<PanelHeaderProps> = ({ children, handleHideSidebar, handleShowSidebar, mobileIcon }) => {
  useWindowOnClick(
    () => {
      if (handleHideSidebar) handleHideSidebar()
    },
    [],
    { capture: true },
  )

  return (
    <div className='dj-w-full dj-h-16 dj-px-6 dj-flex dj-items-center dj-bg-white dark:dj-bg-dark-900 dj-top-0 dj-z-30 dj-sticky dj-border-b-2 dj-border-slate-200 dark:dj-border-dark-800'>
      <div className='dj-w-full lg:dj-max-w-7xl dj-mx-auto dj-flex dj-items-center dj-justify-between'>
        <div className='lg:dj-hidden dj-flex dj-items-center dj-gap-2'>
          <MenuIcon
            className='dj-text-slate-800 dark:dj-text-slate-200 dj-w-7 dj-h-7 dj-cursor-pointer'
            onClick={handleShowSidebar}
            test-cy='menu-icon'
          />
          {mobileIcon}
        </div>
        <div className='dj-flex dj-flex-1'>{children}</div>
      </div>
    </div>
  )
}
export default PanelHeader
