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
const Sidebar: React.FC<SidebarProps> = ({
  segments,
  items,
  subItems,
  loading,
  loadingMode,
  type,
  children,
  navItemHeight = 36,
}) => {
  const [hover, setHover] = React.useState<string | number | undefined>()
  const [expandedItems, setExpandedItems] = React.useState<Array<string | number>>([])

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
        const item = items.find((i) => i.id === id)
        const { expandedChildIds } = calcExpandedChilds(item, expandedItems)
        const ids = [id, ...expandedChildIds]
        return prevExpandedItems.filter((expandedId) => !ids.includes(expandedId)) // Collapse item
      } else {
        return [...prevExpandedItems]
      }
    })
  }

  const activeItem = useMemo(() => {
    return items.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  const activeSubItem = useMemo(() => {
    return subItems?.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  console.log({ activeItem })
  const [pointerPosition, setPointerPosition] = React.useState<undefined | number>(undefined)

  const calculatePointerPosition = React.useCallback(() => {
    let topOffset = 0
    let ended = false
    items.forEach((item) => {
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
  }, [hover, activeItem, items, expandedItems])

  React.useEffect(() => {
    calculatePointerPosition()
  }, [hover, activeItem, items, expandedItems])

  const handleMouseEnter = (id: string | number) => {
    setHover(id)
  }

  const handleMouseLeave = () => {
    setHover(undefined)
  }

  return (
    <div className='flex flex-col flex-grow justify-between overflow-y-auto w-full transition-height h-full pb-3'>
      <div className='my-2 w-full relative'>
        {pointerPosition !== undefined && !loading && activeItem && (
          <span
            className='w-1 block bg-primary-400 absolute transition-all top-0 rounded-r-md'
            style={{ top: pointerPosition, height: navItemHeight }}
          />
        )}

        <div className='flex flex-col'>
          {!loading &&
            items.map((item, index) => (
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
          {renderLoading(loading, loadingMode)}
        </div>
      </div>
      {!loading && (
        <div className='d-w-full'>
          {children}
          {subItems && subItems.length && (
            <div className='px-2 space-y-4 mb-5 mt-2'>
              <div className='w-full h-[1px] bg-slate-200 dark:bg-slate-700 rounded-sm' />
              <div className='my-2 flex flex-col space-y-1'>
                {subItems.map((item, index) => (
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
    return <div className='text-sm whitespace-nowrap w-full'>{label}</div>
  }
}

const renderLoading = (loading?: boolean, loadingMode?: SidebarLoadingModes) => {
  if (loading && loadingMode === 'skeleton') {
    return (
      <Flex direction='col' className='gap-1.5 '>
        <Skeleton className='h-[33px] bg-gradient-to-t opacity-80' />
        <Skeleton className='h-[33px] bg-gradient-to-t opacity-60' />
        <Skeleton className='h-[33px] bg-gradient-to-t opacity-50' />
        <Skeleton className='h-[33px] bg-gradient-to-t opacity-30' />
      </Flex>
    )
  }
  if (loading && loadingMode !== 'skeleton') {
    return (
      <Flex items='center' justify='center' className='min-h-[150px]'>
        <Loading borderSize={2} type={loadingMode} />
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

  React.useEffect(() => {
    if (item.children && item.children.length > 0) {
      if (isActive && !isExpanded) addToExpand(item.id)
      if (!isActive && isExpanded) deleteFromExpand(item.id)
    }
  }, [segments])

  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick(item)
    }

    if (item.children && item.children.length > 0) {
      if (isExpanded) {
        deleteFromExpand(item.id)
      } else {
        addToExpand(item.id)
      }
    }
  }

  const activeItem = useMemo(() => {
    return item.children?.find((item) => isActiveItem(item, segments || []))
  }, [segments])

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(item.id) : {})}
      className={cn('', { 'group/item': depth === 0 })}
    >
      <div
        onClick={handleClick}
        style={{ height }}
        className={cn('py-2 select-none flex transition duration-150 items-center gap-1 text-base font-medium', {
          'border-l border-l-slate-200 dark:border-l-slate-600': depth !== 0,
          //not-active
          'group-hover/item:bg-primary-50 text-slate-400 dark:text-slate-300 group-hover/item:text-primary-500 dark:group-hover/item:bg-primary-400/10 dark:group-hover/item:text-primary-400':
            !isActive && depth === 0,
          'hover: text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover: dark:hover:text-slate-200 hover:border-l-primary-400 dark:hover:border-l-primary-300':
            !isActive && depth !== 0,

          //active
          'bg-primary-50 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400 !font-semibold':
            isActive && depth === 0,
          'text-primary-400 dark:text-primary-300 !font-semibold  border-l-primary-400 dark:border-l-primary-300':
            isActive && depth !== 0,

          'cursor-pointer': !item.disabled,
          'cursor-not-allowed': item.disabled,
          'px-4': type === undefined || type === 'normal',
          'px-2': type === 'mini',
        })}
        // eslint-disable-next-line react/no-unknown-property
        test-cy={props.dataTestId}
      >
        <div className='flex flex-1 items-center gap-1'>
          {item.icon && (
            <item.icon
              className={cn('w-6 h-6', {
                'group-hover/item:text-primary-400': !isActive,
                'text-primary-400': isActive,
              })}
            />
          )}
          <div className='text-sm whitespace-nowrap w-full'>{renderLabel(item.label, isActive)}</div>
        </div>
        {item.children && item.children.length > 0 && (
          <ArrowRightIcon
            className={cn('w-[14px] h-[14px] transition-all duration-200', {
              'rotate-90': isExpanded,
            })}
          />
        )}
      </div>
      <AnimatePresence>
        {isExpanded && item.children && item.children.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className={cn('ml-1 pl-1 overflow-hidden')}
          >
            {item.children.map((child, index) => (
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
      className={cn('px-2 rounded-md select-none flex gap-1 transition duration-150 items-center text-sm', {
        'hover:bg-primary-50 text-slate-400 hover:text-slate-800 dark:hover:bg-primary-400/10 dark:hover:text-slate-100 ':
          !props.isActive,
        'bg-white dark:bg-primary-400/10 dark:text-primary-400  shadow-sm drop-shadow-md ring-1 ring-gray-200 dark:ring-0':
          props.isActive,
        'cursor-pointer': !item.disabled,
        'cursor-not-allowed': item.disabled,
      })}
      // eslint-disable-next-line react/no-unknown-property
      test-cy={props.dataTestId}
    >
      {item.icon && (
        <item.icon
          className={cn('w-5 h-5', {
            'dark:text-slate-400 hover:dark:text-slate-100': !props.isActive,
            'text-primary-300': props.isActive,
          })}
        />
      )}
      <div className='text-sm font-medium whitespace-nowrap'>{renderLabel(item.label, props.isActive)}</div>
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

// const isActiveItem = (item: SidebarItem, segments: string[]): boolean => {
//   if (
//     item.activeCondition &&
//     segments[item.activeCondition.segmentIndex] &&
//     segments[item.activeCondition.segmentIndex] === item.activeCondition.activeString
//   ) {
//     return true
//   }

//   if (item.children && item.children.length > 0) {
//     for (const child of item.children) {
//       if (isActiveItem(child, segments)) {
//         return true
//       }
//     }
//   }

//   return false
// }

const calcExpandedChilds = (item: SidebarItem | undefined, expandedItems: Array<string | number>) => {
  let count = 0
  let expandedChildIds: Array<string | number> = []

  const getCalc = (_item: SidebarItem) => {
    if (expandedItems.includes(_item.id) && _item.children && _item.children.length > 0) {
      count += _item.children.length
      expandedChildIds = [...expandedChildIds, _item.id]
    }

    if (_item.children && _item.children.length > 0) {
      for (const child of _item.children) {
        getCalc(child)
      }
    }
  }

  item && getCalc(item)
  return { count, expandedChildIds }
}
export default Sidebar
