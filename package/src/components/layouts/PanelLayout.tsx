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
import Loading from '../Loading'
import Flex from '../Flex'
import { useWindowOnClick } from '../../hooks/useWindowOnClick'

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
 * @param {boolean} [props.globalLoading] - Controls whether the global loading state is active.
 * @param {boolean} [props.globalLoadingContent] - Custom content to display within the global loading overlay.
 * @param {boolean} [props.contentLoading] - Controls whether the content loading state is active.
 * @param {boolean} [props.contentLoadingContent] - Custom content to display within the content loading overlay.
 * @param {boolean} [props.loadingsContainerClassName] - A custom CSS class applied to the container of both global and content loading overlays.
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
 *   renderHeader={({ handleShowSidebar }) => (
 *     <Header onShowSidebar={handleShowSidebar} />
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
  globalLoading = false,
  contentLoading = false,
  loadingsContainerClassName,
  globalLoadingContent,
  contentLoadingContent,
  enableGoToTopAfterScroll = true,
  enableGoToTopAfterChangeRoute = true,
  loadingsContainerStyle,
}) => {
  const [isShowSidebar, { hide: handleHideSidebar, show: handleShowSidebar }] = useShow(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerParentHeight, setContainerParentHeight] = React.useState(100)
  const [showGoTopButton, setShowGoTopButton] = React.useState(false)

  const sidebarContainerRef = React.useRef<HTMLDivElement>(null)
  const ignoreElementsOfClosingSidebar = [sidebarContainerRef.current].filter(Boolean) as Element[]

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

  // console.log(typeof children)
  useWindowOnClick(
    () => {
      if (handleHideSidebar) handleHideSidebar()
    },
    { ignore: ignoreElementsOfClosingSidebar, capture: true },
  )

  return (
    <div className={cn('dd-flex dd-flex-col dd-h-full md:dd-flex-row dd-relative', className)} style={style}>
      {renderSidebar && renderSidebar({ segments, isShowSidebar, type: type || 'normal', ref: sidebarContainerRef })}
      <div
        className={cn('dd-min-h-full dd-w-full dd-ml-auto dd-transition-all dd-duration-200 dd-relative', {
          'lg:dd-w-[calc(100%-300px)]': type === 'normal' || type === undefined,
          'lg:dd-w-[calc(100%-130px)]': type === 'mini',
        })}
      >
        <div className='dd-relative dd-z-30 dd-w-full'>{renderHeader && renderHeader({ handleShowSidebar })}</div>
        <div
          className='dd-max-w-7xl dd-mx-auto dd-min-w-full dd-h-[calc(100%-4rem)] dd-overflow-auto'
          ref={containerRef}
        >
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
                className='dd-absolute dd-bottom-4 dd-right-4 dd-bg-primary-500 dd-text-white dd-rounded-full dd-p-2 dd-w-[32px] dd-h-[32px] dd-aspect-square dd-shadow-lg hover:dd-bg-primary-600 dd-transition-colors dd-flex dd-items-center dd-justify-center dd-whitespace-nowrap'
              >
                <Typography.Text uiType='transparent' size='xs'>
                  ↑
                </Typography.Text>
              </motion.button>
            )}
          </AnimatePresence>
        )}
        <AnimatePresence>
          {contentLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                'dd-w-full dd-h-full dd-flex dd-justify-center dd-items-center dd-absolute dd-inset-0 dd-bg-slate-50 dark:dd-bg-dark-900 dd-z-30',
                loadingsContainerClassName,
              )}
              style={loadingsContainerStyle}
            >
              {contentLoadingContent ? (
                contentLoadingContent
              ) : (
                <Flex direction='col' items='center' className='dd-gap-1'>
                  <Loading uiType='elastic' />
                </Flex>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'dd-w-full dd-h-full dd-flex dd-justify-center dd-items-center dd-absolute dd-inset-0 dd-bg-slate-50 dark:dd-bg-dark-900 dd-z-50',
              loadingsContainerClassName,
            )}
            style={loadingsContainerStyle}
          >
            {globalLoadingContent ? (
              globalLoadingContent
            ) : (
              <Flex direction='col' items='center' className='dd-gap-1'>
                <Loading uiType='elastic' />
                <Typography.Text size='xs'>Just a moment</Typography.Text>
              </Flex>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PanelLayout
