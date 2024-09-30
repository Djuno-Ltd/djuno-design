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
import { useWindowOnClick } from '../../hooks/useWindowOnClick'
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
 * @param {boolean} [props.isShowSidebar] - An optional icon or element to display in the mobile view.
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
const PanelHeader: React.FC<PanelHeaderProps> = ({
  children,
  handleHideSidebar,
  handleShowSidebar,
  mobileIcon,
  // isShowSidebar,
}) => {
  // console.log(typeof children)
  useWindowOnClick(
    () => {
      if (handleHideSidebar) handleHideSidebar()
    },
    [],
    { capture: true },
  )

  return (
    <div className='dd-w-full dd-h-16 dd-px-6 dd-flex dd-items-center dd-bg-white dark:dd-bg-dark-900 dd-top-0 dd-z-30 dd-sticky dd-border-b-2 dd-border-slate-200 dark:dd-border-dark-800'>
      <div className='dd-w-full lg:dd-max-w-7xl dd-mx-auto dd-flex dd-items-center dd-justify-between'>
        <div className='lg:dd-hidden dd-flex dd-items-center dd-gap-2'>
          <MenuIcon
            className='dd-text-slate-800 dark:dd-text-slate-200 dd-w-7 dd-h-7 dd-cursor-pointer'
            onClick={handleShowSidebar}
            test-cy='menu-icon'
          />
          {mobileIcon}
        </div>
        <div className='dd-flex dd-flex-1'>{children}</div>
      </div>
    </div>
  )
}
export default PanelHeader
