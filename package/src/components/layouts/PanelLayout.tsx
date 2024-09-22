/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview PanelLayout Component
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
import { useShow } from '../../hooks/useShow'
import { PanelLayoutProps } from '../../types/IPanelLayouts'

/**
 * PanelLayout component.
 *
 * A layout component designed to provide a flexible structure for pages with a sidebar and header.
 * The component allows customization of sidebar and header rendering and handles responsive layouts.
 *
 * @param {object} props - PanelLayout component props.
 * @param {PanelLayoutTypes} [props.type] - Defines the layout type, such as 'normal' or 'mini'.
 * @param {string} [props.pathname] - The current pathname used to generate segments for the sidebar.
 * @param {({ segments, isShowSidebar, type }: { segments: string[], isShowSidebar: boolean, type: PanelLayoutTypes }) => React.ReactNode} [props.renderSidebar] - A function to render the sidebar, receiving segments, sidebar visibility state, and layout type.
 * @param {({ handleHideSidebar, handleShowSidebar,isShowSidebar }: { handleHideSidebar: () => void, handleShowSidebar: () => void, isShowSidebar: boolean }) => React.ReactNode} [props.renderHeader] - A function to render the header, receiving callbacks to show or hide the sidebar.
 * @param {React.ReactNode} [props.children] - The content to be displayed within the layout's main area.
 *
 * @returns {React.ReactNode} Rendered PanelLayout component.
 *
 * @version 0.5.0
 * @see https://www.npmjs.com/package/djuno-design#panelLayout
 *
 * @example
 * // Example usage of PanelLayout component:
 * <PanelLayout
 *   type="normal"
 *   pathname="/dashboard/settings"
 *   renderSidebar={({ segments, isShowSidebar, type }) => (
 *     <Sidebar segments={segments} isShowSidebar={isShowSidebar} type={type} />
 *   )}
 *   renderHeader={({ handleHideSidebar, handleShowSidebar }) => (
 *     <Header onHideSidebar={handleHideSidebar} onShowSidebar={handleShowSidebar} />
 *   )}
 * >
 *   <MainContent />
 * </PanelLayout>
 */
const PanelLayout: React.FC<PanelLayoutProps> = ({
  className,
  style,
  type,
  children,
  pathname,
  renderSidebar,
  renderHeader,
}) => {
  const [isShowSidebar, { hide: handleHideSidebar, show: handleShowSidebar }] = useShow(false)

  const segments = React.useMemo(() => {
    if (!pathname) return ['']
    return pathname
      .split('/')
      .filter((segment) => segment !== '')
      .filter(Boolean)
  }, [pathname])

  return (
    <div className={cn('flex flex-col h-full md:flex-row relative', className)} style={style}>
      {renderSidebar && renderSidebar({ segments, isShowSidebar, type: type || 'normal' })}
      <div
        className={cn('min-h-full w-full ml-auto transition-all duration-200', {
          'lg:w-[calc(100%-300px)]': type === 'normal' || type === undefined,
          'lg:w-[calc(100%-130px)]': type === 'mini',
        })}
      >
        {renderHeader && renderHeader({ handleHideSidebar, handleShowSidebar, isShowSidebar })}
        <div className='max-w-7xl mx-auto min-w-full  h-[calc(100%-4rem)] overflow-auto'>{children}</div>
      </div>
    </div>
  )
}

export default PanelLayout
