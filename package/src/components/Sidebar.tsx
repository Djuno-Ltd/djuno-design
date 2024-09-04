/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Sidebar Component
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

import React, { useMemo } from 'react'
import { cn } from '../utils/cn'
import Loading from './Loading'
import Flex from './Flex'
import Skeleton from './Skeleton'
import { PanelLayoutTypes, SidebarItem, SidebarItemLabel, SidebarLoadingModes, SidebarProps } from '../types'

/**
 * Sidebar component.
 *
 * A versatile sidebar component that supports active item highlighting, dynamic item rendering,
 * and multiple loading modes. It can handle different types of layouts and includes support for
 * sub-items and custom content.
 *
 * @param {object} props - Sidebar component props.
 * @param {SidebarItem[]} props.items - List of items to be displayed in the sidebar.
 * @param {string[]} [props.segments] - Array of URL segments used to determine the active item.
 * @param {SidebarItem[]} [props.subItems] - Additional items to be displayed below the main items.
 * @param {boolean} [props.loading] - Indicates whether the sidebar is in a loading state.
 * @param {SidebarLoadingModes} [props.loadingMode] - Determines the visual loading state (e.g., spinner, skeleton).
 * @param {PanelLayoutTypes} [props.type] - Specifies the sidebar layout type (e.g., 'normal' or 'mini').
 * @param {React.ReactNode} [props.children] - Additional content to be rendered at the bottom of the sidebar.
 *
 * @returns {React.ReactNode} Rendered Sidebar component.
 *
 * @version 0.5.1
 * @see https://www.npmjs.com/package/djuno-design#sidebar
 *
 * @example
 * // Example usage of Sidebar component:
 * <Sidebar
 *   items={sidebarItems}
 *   segments={['home', 'dashboard']}
 *   loading={false}
 *   type="normal"
 * >
 *   <CustomContent />
 * </Sidebar>
 */
const Sidebar: React.FC<SidebarProps> = ({ segments, items, subItems, loading, loadingMode, type, children }) => {
  const [hover, setHover] = React.useState<string | number | undefined>()
  const activeItem = useMemo(() => {
    return items.find((item) => {
      if (item.activeCondition && segments) {
        return segments[item.activeCondition.segmentIndex] === item.activeCondition.activeString
      } else {
        return
      }
    })
  }, [])

  const [pointerPosition, setPointerPosition] = React.useState(() => {
    if (!activeItem) return activeItem
    return items.indexOf(activeItem) * 36
  })

  React.useEffect(() => {
    const item = items.find((item) => item.id === hover) || activeItem
    if (item) {
      setPointerPosition(items.indexOf(item) * 36)
    }
  }, [activeItem, hover, items])

  const handleMouseEnter = (id: string | number) => {
    setHover(id)
  }

  const handleMouseLeave = () => {
    setHover(undefined)
  }

  return (
    <div className='dj-flex dj-flex-col dj-flex-grow dj-justify-between dj-overflow-y-auto dj-w-full dj-transition-height dj-h-full dj-pb-3'>
      <div className='dj-my-2 dj-w-full dj-relative'>
        {pointerPosition !== undefined && !loading && (
          <span
            className='dj-w-1 dj-h-9 dj-block dj-bg-primary-400 dj-absolute dj-transition-all dj-top-0 dj-rounded-r-md'
            style={{ top: pointerPosition }}
          />
        )}

        <div className='dj-flex dj-flex-col'>
          {!loading &&
            items.map((item, index) => (
              <SidebarMenuItem
                item={item}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
                isActive={activeItem?.id === item.id}
                dataTestId={item.testId}
                type={type}
              />
            ))}
          {renderLoading(loading, loadingMode)}
        </div>
      </div>
      {!loading && (
        <div className='d-w-full'>
          {children}
          {subItems && subItems.length && (
            <div className='dj-px-6 dj-space-y-4 dj-mb-5 dj-mt-2'>
              <div className='dj-w-full dj-h-[1px] dj-bg-slate-200 dark:dj-bg-slate-700 dj-rounded-sm' />
              <div className='dj-my-2 dj-flex dj-flex-col dj-space-y-1'>
                {subItems.map((item, index) => (
                  <SidebarSubMenuItem
                    key={index}
                    item={item}
                    isActive={activeItem?.id === item.id}
                    dataTestId={item.testId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const renderLabel = (label: SidebarItemLabel, isActive: boolean | undefined) => {
  if (typeof label === 'function') {
    return label({ isActive })
  } else {
    return <div className='dj-text-sm dj-whitespace-nowrap dj-w-full'>{label}</div>
  }
}

const renderLoading = (loading?: boolean, loadingMode?: SidebarLoadingModes) => {
  if (loading && loadingMode === 'skeleton') {
    return (
      <Flex direction='col' className='dj-gap-1.5 '>
        <Skeleton className='dj-h-[33px] dj-bg-gradient-to-t dj-opacity-80' />
        <Skeleton className='dj-h-[33px] dj-bg-gradient-to-t dj-opacity-60' />
        <Skeleton className='dj-h-[33px] dj-bg-gradient-to-t dj-opacity-50' />
        <Skeleton className='dj-h-[33px] dj-bg-gradient-to-t dj-opacity-30' />
      </Flex>
    )
  }
  if (loading && loadingMode !== 'skeleton') {
    return (
      <Flex items='center' justify='center' className='dj-min-h-[150px]'>
        <Loading borderSize={2} type={loadingMode} />
      </Flex>
    )
  }
  return null
}

const SidebarMenuItem = (props: {
  item: SidebarItem
  isActive?: boolean
  onMouseEnter?: (id: string | number) => void
  onMouseLeave?: () => void
  dataTestId?: string
  type?: PanelLayoutTypes
}) => {
  const { item } = props
  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick(item)
    }
  }

  return (
    <div
      onClick={handleClick}
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={() => (props.onMouseEnter ? props.onMouseEnter(item.id) : {})}
      className={cn(
        'dj-py-2 dj-select-none dj-flex dj-transition dj-duration-150 dj-items-center dj-gap-4 dj-text-base dj-font-medium group/sidebar-nav',
        {
          'hover:dj-bg-primary-50 dj-text-slate-400 hover:dj-text-primary-500 dark:hover:dj-bg-primary-400/10 dark:hover:dj-text-primary-400':
            !props.isActive,
          'dj-bg-primary-50 dj-text-primary-500 dark:dj-bg-primary-400/10 dark:dj-text-primary-400 !dj-font-semibold':
            props.isActive,
          'dj-cursor-pointer': !item.disabled,
          'dj-cursor-not-allowed': item.disabled,
          'dj-px-8': props.type === undefined || props.type === 'normal',
          'dj-px-3': props.type === 'mini',
        },
      )}
      // eslint-disable-next-line react/no-unknown-property
      test-cy={props.dataTestId}
    >
      {item.icon && (
        <item.icon
          className={cn('dj-w-6 dj-h-6', {
            'group-hover/sidebar-nav:dj-text-primary-400': !props.isActive,
            'dj-text-primary-400': props.isActive,
          })}
        />
      )}
      <div className='dj-text-sm dj-whitespace-nowrap dj-w-full'>{renderLabel(item.label, props.isActive)}</div>
    </div>
  )
}

const SidebarSubMenuItem = (props: { item: SidebarItem; isActive?: boolean; dataTestId?: string }) => {
  const { item } = props
  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick(item)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'dj-h-8 dj-px-2 dj-rounded-md dj-select-none dj-flex dj-transition dj-duration-150 dj-space-x-2 dj-items-center dj-text-sm',
        {
          'hover:dj-bg-primary-50 dj-text-slate-400 hover:dj-text-slate-800 dark:hover:dj-bg-primary-400/10 dark:hover:dj-text-slate-100 ':
            !props.isActive,
          'dj-bg-white dark:dj-bg-primary-400/10 dark:dj-text-primary-400  dj-shadow-sm dj-drop-shadow-md dj-ring-1 dj-ring-gray-200 dark:dj-ring-0':
            props.isActive,
          'dj-cursor-pointer': !item.disabled,
          'dj-cursor-not-allowed': item.disabled,
        },
      )}
      // eslint-disable-next-line react/no-unknown-property
      test-cy={props.dataTestId}
    >
      {item.icon && (
        <item.icon
          className={cn('w-5 h-5', {
            'dark:dj-text-slate-400 hover:dark:dj-text-slate-100': !props.isActive,
            'dj-text-primary-300': props.isActive,
          })}
        />
      )}
      <div className='dj-text-sm dj-font-medium dj-whitespace-nowrap'>{renderLabel(item.label, props.isActive)}</div>
    </div>
  )
}

export default Sidebar
