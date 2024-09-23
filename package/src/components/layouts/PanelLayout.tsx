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
import Typography from '../Typography'
import { AnimatePresence, motion } from 'framer-motion'

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
 * @param {boolean} [props.enableGoToTopAfterScroll] - Showing a button to go to the top of the page after a little scrolling
 * @param {boolean} [props.enableGoToTopAfterChangeRoute] - Scrolling to the top after changing pathname prop.
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
  enableGoToTopAfterScroll = true,
  enableGoToTopAfterChangeRoute = true,
}) => {
  const [isShowSidebar, { hide: handleHideSidebar, show: handleShowSidebar }] = useShow(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerParentHeight, setContainerParentHeight] = React.useState(100)
  const [showGoTopButton, setShowGoTopButton] = React.useState(false)

  const segments = React.useMemo(() => {
    if (!pathname) return ['']
    return pathname
      .split('/')
      .filter((segment) => segment !== '')
      .filter(Boolean)
  }, [pathname])

  React.useEffect(() => {
    const container = containerRef.current
    if (container && enableGoToTopAfterChangeRoute) {
      setTimeout(() => {
        container.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }, 10)
    }
  }, [pathname])

  const handleScroll = () => {
    if (containerRef.current && enableGoToTopAfterScroll) {
      setShowGoTopButton(containerRef.current.scrollTop > containerParentHeight)
    }
  }

  React.useEffect(() => {
    const container = containerRef.current
    if (container && enableGoToTopAfterScroll) {
      const cph = container.parentElement?.clientHeight
      setContainerParentHeight(cph ? cph - 100 : 100)
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleGoToTop = () => {
    if (containerRef.current && enableGoToTopAfterScroll) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={cn('flex flex-col h-full md:flex-row relative', className)} style={style}>
      {renderSidebar && renderSidebar({ segments, isShowSidebar, type: type || 'normal' })}
      <div
        className={cn('min-h-full w-full ml-auto transition-all duration-200 relative', {
          'lg:w-[calc(100%-300px)]': type === 'normal' || type === undefined,
          'lg:w-[calc(100%-130px)]': type === 'mini',
        })}
      >
        {renderHeader && renderHeader({ handleHideSidebar, handleShowSidebar, isShowSidebar })}
        <div className='max-w-7xl mx-auto min-w-full h-[calc(100%-4rem)] overflow-auto' ref={containerRef}>
          {children}
        </div>

        {enableGoToTopAfterScroll && (
          <AnimatePresence>
            {showGoTopButton && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={handleGoToTop}
                className='absolute bottom-4 right-4 bg-primary-500 text-white rounded-full p-2 w-[32px] h-[32px] aspect-square shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center whitespace-nowrap'
              >
                <Typography.Text uiType='transparent' size='xs'>
                  ↑
                </Typography.Text>
              </motion.button>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default PanelLayout
