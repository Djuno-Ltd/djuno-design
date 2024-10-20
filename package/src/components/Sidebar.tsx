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
import { motion, AnimatePresence } from 'framer-motion'
import { ReactComponent as ArrowRightIcon } from './../assets/icons/arrow-right.svg'

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
 * @param {number} [props.navItemHeight] - Specifies the sidebar items height.
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
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Sidebar = <T extends unknown>({
  segments,
  items,
  subItems,
  loading,
  loadingMode,
  type,
  children,
  navItemHeight = 36,
}: SidebarProps<T>) => {
  const [hover, setHover] = React.useState<string | number | undefined>()
  const [expandedItems, setExpandedItems] = React.useState<Array<string | number>>([])

  const visibleMainItems = useMemo(() => {
    return items ? items.filter((item) => item.isVisible === undefined || item.isVisible) : []
  }, [items])

  const visibleSubItems = useMemo(() => {
    return subItems ? subItems.filter((item) => item.isVisible === undefined || item.isVisible) : []
  }, [subItems])

  const addToExpand = (id: string | number) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(id)) {
        return [...prevExpandedItems]
      } else {
        return [...prevExpandedItems, id]
      }
    })
  }

  const deleteFromExpand = (id: string | number) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(id)) {
        const item = visibleMainItems.find((i) => i.id === id)
        const { expandedChildIds } = calcExpandedChilds(item, expandedItems)
        const ids = [id, ...expandedChildIds]
        return prevExpandedItems.filter((expandedId) => !ids.includes(expandedId)) // Collapse item
      } else {
        return [...prevExpandedItems]
      }
    })
  }

  const activeItem = useMemo(() => {
    return visibleMainItems.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  const activeSubItem = useMemo(() => {
    return subItems?.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  const [pointerPosition, setPointerPosition] = React.useState<undefined | number>(undefined)

  const calculatePointerPosition = React.useCallback(() => {
    let topOffset = 0
    let ended = false
    visibleMainItems.forEach((item) => {
      if (item.id === hover || (hover === undefined && item.id === activeItem?.id)) {
        ended = true
      }
      if (!ended) {
        topOffset += navItemHeight
        const { count } = calcExpandedChilds(item, expandedItems)
        topOffset += count * navItemHeight
      }
    })
    setPointerPosition(topOffset)
  }, [hover, activeItem, visibleMainItems, expandedItems])

  React.useEffect(() => {
    calculatePointerPosition()
  }, [hover, activeItem, visibleMainItems, expandedItems])

  const handleMouseEnter = (id: string | number) => {
    setHover(id)
  }

  const handleMouseLeave = () => {
    setHover(undefined)
  }

  return (
    <div className='dd-flex dd-flex-col dd-flex-grow dd-justify-between dd-overflow-y-auto dd-w-full dd-transition-height dd-h-full dd-pb-3'>
      <div className='dd-my-2 dd-w-full dd-relative'>
        {pointerPosition !== undefined && !loading && activeItem && (
          <span
            className='dd-w-1 dd-block dd-bg-primary-400 dd-absolute dd-transition-all dd-top-0 dd-rounded-r-md'
            style={{ top: pointerPosition, height: navItemHeight }}
          />
        )}

        <div className='dd-flex dd-flex-col'>
          {!loading &&
            visibleMainItems.map((item, index) => (
              <SidebarMenuItem
                height={navItemHeight}
                item={item}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
                segments={segments}
                isActive={activeItem?.id === item.id}
                dataTestId={item.testId}
                expandedItems={expandedItems}
                isExpanded={expandedItems.includes(item.id)}
                addToExpand={addToExpand}
                deleteFromExpand={deleteFromExpand}
                type={type}
                depth={0}
              />
            ))}
          {renderLoading(navItemHeight, loading, loadingMode)}
        </div>
      </div>
      {!loading && (
        <div className='dd-w-full'>
          {children}
          {visibleSubItems.length > 0 && (
            <div className='dd-px-2 dd-space-y-4 dd-mt-2'>
              <div className='dd-w-full dd-h-[1px] dd-bg-slate-200 dark:dd-bg-slate-700 dd-rounded-sm' />
              <div className='dd-my-2 dd-flex dd-flex-col dd-space-y-1'>
                {visibleSubItems.map((item, index) => (
                  <SidebarSubMenuItem
                    height={navItemHeight}
                    key={index}
                    item={item}
                    isActive={activeSubItem?.id === item.id}
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
    return <div className='dd-text-sm dd-whitespace-nowrap dd-w-full'>{label}</div>
  }
}

const renderLoading = (height: number, loading?: boolean, loadingMode?: SidebarLoadingModes) => {
  if (loading && loadingMode === 'skeleton') {
    return (
      <Flex direction='col' className='dd-gap-1.5'>
        <Skeleton style={{ height }} className='dd-bg-gradient-to-t dd-opacity-80' />
        <Skeleton style={{ height }} className='dd-bg-gradient-to-t dd-opacity-60' />
        <Skeleton style={{ height }} className='dd-bg-gradient-to-t dd-opacity-50' />
        <Skeleton style={{ height }} className='dd-bg-gradient-to-t dd-opacity-30' />
      </Flex>
    )
  }
  if (loading && loadingMode !== 'skeleton') {
    return (
      <Flex items='center' justify='center' className='dd-min-h-[150px]'>
        <Loading borderSize={2} uiType={loadingMode} />
      </Flex>
    )
  }
  return null
}

const SidebarMenuItem = (props: {
  height: number
  item: SidebarItem
  isActive?: boolean
  isExpanded: boolean
  expandedItems: Array<string | number>
  addToExpand: (id: string | number) => void
  deleteFromExpand: (id: string | number) => void
  onMouseEnter?: (id: string | number) => void
  onMouseLeave?: () => void
  dataTestId?: string
  type?: PanelLayoutTypes
  segments?: string[]
  depth?: number
}) => {
  const {
    item,
    height,
    depth,
    isActive,
    segments,
    expandedItems,
    isExpanded,
    addToExpand,
    deleteFromExpand,
    onMouseEnter,
    onMouseLeave,
    type,
  } = props

  const visibleChildItems = useMemo(() => {
    return item.children ? item.children.filter((item) => item.isVisible === undefined || item.isVisible) : []
  }, [item.children])

  React.useEffect(() => {
    if (visibleChildItems.length > 0) {
      if (isActive && !isExpanded) addToExpand(item.id)
      if (!isActive && isExpanded) deleteFromExpand(item.id)
    }
  }, [segments])

  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick(item)
    }

    if (visibleChildItems.length > 0) {
      if (isExpanded) {
        deleteFromExpand(item.id)
      } else {
        addToExpand(item.id)
      }
    }
  }

  const activeItem = useMemo(() => {
    return visibleChildItems?.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(item.id) : {})}
      className={cn('', { 'dd-group/item': depth === 0 })}
    >
      <div
        onClick={handleClick}
        style={{ height }}
        className={cn(
          'dd-py-2 dd-select-none dd-flex dd-transition dd-duration-150 dd-items-center dd-gap-1 dd-text-base dd-font-medium',
          {
            'dd-border-l dd-border-l-slate-200 dark:dd-border-l-slate-600': depth !== 0,
            //not-active
            'group-hover/item:dd-bg-primary-50 dd-text-slate-400 dark:dd-text-slate-300 group-hover/item:dd-text-primary-500 dark:group-hover/item:dd-bg-primary-400/10 dark:group-hover/item:dd-text-primary-400':
              !isActive && depth === 0,
            'dd-text-slate-400 hover:dd-text-slate-600 dark:dd-text-slate-300 dark:hover:dd-text-slate-200 hover:dd-border-l-primary-400 dark:hover:dd-border-l-primary-300':
              !isActive && depth !== 0,

            //active
            'dd-bg-primary-50 dd-text-primary-500 dark:dd-bg-primary-400/10 dark:dd-text-primary-400 !dd-font-semibold':
              isActive && depth === 0,
            'dd-text-primary-400 dark:dd-text-primary-300 !dd-font-semibold  dd-border-l-primary-400 dark:dd-border-l-primary-300':
              isActive && depth !== 0,

            'dd-cursor-pointer': !item.disabled,
            'dd-cursor-not-allowed': item.disabled,
            'dd-px-4': type === undefined || type === 'normal',
            'dd-px-2': type === 'mini',
          },
        )}
        // eslint-disable-next-line react/no-unknown-property
        test-cy={props.dataTestId}
      >
        <div className='dd-flex dd-flex-1 dd-items-center dd-gap-1'>
          {item.icon && (
            <item.icon
              className={cn('dd-w-5 dd-h-5', {
                'group-hover/item:dd-text-primary-400': !isActive,
                'dd-text-primary-400': isActive,
              })}
            />
          )}
          <div className='dd-text-sm dd-whitespace-nowrap dd-w-full'>{renderLabel(item.label, isActive)}</div>
        </div>
        {visibleChildItems.length > 0 && (
          <ArrowRightIcon
            className={cn('dd-w-[14px] dd-h-[14px] dd-transition-all dd-duration-200', {
              'dd-rotate-90': isExpanded,
            })}
          />
        )}
      </div>
      <AnimatePresence>
        {isExpanded && visibleChildItems.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className={cn('dd-ml-1 dd-pl-1 dd-overflow-hidden')}
          >
            {visibleChildItems.map((child, index) => (
              <SidebarMenuItem
                key={index}
                height={height}
                item={child}
                isActive={activeItem?.id === child.id}
                expandedItems={expandedItems}
                isExpanded={expandedItems.includes(child.id)}
                addToExpand={addToExpand}
                deleteFromExpand={deleteFromExpand}
                type={type}
                segments={segments}
                depth={1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SidebarSubMenuItem = (props: { height: number; item: SidebarItem; isActive?: boolean; dataTestId?: string }) => {
  const { height, item } = props
  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick(item)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{ height }}
      className={cn(
        'dd-px-2 dd-rounded-md dd-select-none dd-flex dd-gap-1 dd-transition dd-duration-150 dd-items-center dd-text-sm',
        {
          'hover:dd-bg-primary-50 dd-text-slate-400 hover:dd-text-slate-800 dark:hover:dd-bg-primary-400/10 dark:hover:dd-text-slate-100 ':
            !props.isActive,
          'dd-bg-white dark:dd-bg-primary-400/10 dark:dd-text-primary-400  dd-shadow-sm dd-drop-shadow-md dd-ring-1 dd-ring-gray-200 dark:dd-ring-0':
            props.isActive,
          'dd-cursor-pointer': !item.disabled,
          'dd-cursor-not-allowed': item.disabled,
        },
      )}
      // eslint-disable-next-line react/no-unknown-property
      test-cy={props.dataTestId}
    >
      {item.icon && (
        <item.icon
          className={cn('dd-w-5 dd-h-5', {
            'dark:dd-text-slate-400 hover:dark:dd-text-slate-100': !props.isActive,
            'dd-text-primary-300': props.isActive,
          })}
        />
      )}
      <div className='dd-text-sm dd-font-medium dd-whitespace-nowrap'>{renderLabel(item.label, props.isActive)}</div>
    </div>
  )
}

const isActiveItem = (item: SidebarItem, segments: string[]): boolean => {
  if (item.activeConditions && item.activeConditions.length > 0) {
    let result = true

    for (let i = 0; i < item.activeConditions.length; i++) {
      const condition = item.activeConditions[i]
      const segmentValue = segments[condition.index]
      const conditionMet = segmentValue === condition.value

      // If there's an 'or' operator, we return true if any condition is true
      if (condition.operator === 'or') {
        result = result || conditionMet
      }
      // If the operator is 'and' (or undefined), we only return true if all conditions are true
      else {
        result = result && conditionMet
      }
    }

    if (result) return true
  }

  // Recursively check children if the item has any
  if (item.children && item.children.length > 0) {
    for (const child of item.children) {
      if (isActiveItem(child, segments)) {
        return true
      }
    }
  }

  return false
}

const calcExpandedChilds = (item: SidebarItem | undefined, expandedItems: Array<string | number>) => {
  let count = 0
  let expandedChildIds: Array<string | number> = []

  const getCalc = (_item: SidebarItem) => {
    const activeChildren = _item.children
      ? _item.children.filter((item) => item.isVisible === undefined || item.isVisible)
      : []

    if (expandedItems.includes(_item.id) && activeChildren && activeChildren.length > 0) {
      count += activeChildren.length
      expandedChildIds = [...expandedChildIds, _item.id]
    }

    if (activeChildren && activeChildren.length > 0) {
      for (const child of activeChildren) {
        getCalc(child)
      }
    }
  }

  item && getCalc(item)
  return { count, expandedChildIds }
}
export default Sidebar
