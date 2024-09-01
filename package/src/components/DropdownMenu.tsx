/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Card Component
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
import * as React from 'react'
import { cn } from '../utils/cn'
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg'

import { useFloating, shift, flip } from '@floating-ui/react-dom'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Button from './Button'
import { DropdownMenuDivider, DropdownMenuElement, DropdownMenuItem, DropdownMenuProps } from '../types/DropdownMenu'

/**
 * DropdownMenu component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - DropdownMenu props.
 * @param {React.ReactNode} [props.children] - The content inside the DropdownMenu.
 * @param {string} [props.menu] - menu of the DropdownMenu.
 * @param {string} [props.title] -  title of the DropdownMenu.
 * @param {string} [props.type] - type of the DropdownMenu.
 * @param {string} [props.positionClassName] - Additional positionClassName to apply to the DropdownMenu.
 * @param {string} [props.itemsClassName] - Additional itemsClassName to apply to the DropdownMenu.
 * @param {string} [props.buttonClassName] - Additional buttonClassName to apply to the DropdownMenu.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the DropdownMenu, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the DropdownMenu is in a loading state.
 *
 * @returns {React.ReactNode} Rendered DropdownMenu component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#dropdownmenu
 *
 * @example
 * // Example usage of DropdownMenu component:
 *
 * function MyComponent() {
 *   return (
 *      <DropdownMenu
 *       menu={DropdownItems}
 *       title="Options"
 *       type="default"
 *       positionClassName="custom-position-class"
 *       buttonClassName="custom-button-class"
 *       itemsClassName="custom-items-class"
 *     />
 *   );
 * }
 */

const DropdownMenu = (DropdownProps: React.PropsWithChildren<DropdownMenuProps>) => {
  const itemGroups = groupArrayByDivider(DropdownProps.menu || [])
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [flip(), shift()],
  })
  return (
    <>
      <Menu as='div' className='dj-text-left dj-w-full dj-h-full dj-inline-block dj-justify-center dj-items-center'>
        <div className='dj-flex dj-items-center dj-justify-center'>
          <MenuButton
            onClick={(e) => e.stopPropagation()}
            ref={refs.setReference}
            className={cn(
              DropdownProps.buttonClassName,

              {
                '': DropdownProps.type === 'default' || typeof DropdownProps.type === 'undefined',
                '': DropdownProps.type === 'simple',
              },
            )}
            as='div'
          >
            <Button>
              {' '}
              {DropdownProps.children}
              {DropdownProps.type !== 'simple' && (
                <div className='dj-h-6 dj-flex dj-items-center dj-ml-auto'>
                  <ArrowDownIcon className='dj-h-4 dj-w-4' />
                </div>
              )}
            </Button>
          </MenuButton>
        </div>

        {itemGroups.length > 0 && (
          <Transition
            as={React.Fragment}
            enter='dj-transition-opacity dj-duration-75'
            enterFrom='dj-transform opacity-0 dj-scale-95'
            enterTo='dj-transform opacity-100 dj-scale-100'
            leave='dj-transition dj-ease-in dj-duration-75'
            leaveFrom='dj-transform dj-opacity-100 dj-scale-100'
            leaveTo='dj-transform dj-opacity-0 dj-scale-95'
          >
            <MenuItems
              ref={refs.setFloating}
              style={floatingStyles}
              // style={{ clip: "rect(auto, auto, auto, auto)" }}
              className={cn(
                'dj-absolute dj-z-50 dj-w-56 dj-origin-top-right dj-divide-y dj-divide-dark-100 dark:dj-divide-dark-600 dj-rounded-md dj-bg-white dark:dj-bg-dark-800 dj-shadow-lg  dj-ring-1 dark:dj-ring-dark-600 focus:dj-outline-none',
                {
                  [DropdownProps.positionClassName || '']: DropdownProps.positionClassName,
                  [DropdownProps.itemsClassName || '']: DropdownProps.itemsClassName,
                },
              )}
            >
              {DropdownProps.title && (
                <div className='dj-w-full dj-px-3 dj-text-xs dj-py-2 dj-text-secondary-600 dark:dj-text-secondary-300'>
                  {DropdownProps.title}
                </div>
              )}

              {itemGroups.map((items, groupIdx) => {
                return (
                  <div key={groupIdx} className='dj-px-1 dj-py-1 '>
                    {items.map((item, itemIdx) => (
                      <MenuItem key={itemIdx}>
                        {({ active, close }) => (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (item.onClick && !item.disabled) {
                                item.onClick(item, close)
                              }
                            }}
                            className={cn(
                              'dj-group dj-flex dj-w-full dj-items-center dj-rounded-md dj-px-2 dj-py-2 dj-text-sm',
                              {
                                'dj-bg-primary-50 dark:dj-bg-dark-700': active && !item.danger,
                                'dj-bg-red-100 dark:dj-bg-red-600/10': active && item.danger,
                                'dj-cursor-not-allowed dj-text-dark-400 dark:dj-text-secondary-500': item.disabled,
                                'dj-text-dark-900 dark:dj-text-secondary-100': !item.disabled && !item.danger,
                                'dj-text-red-900 dark:dj-text-red-600': !item.disabled && item.danger,
                                'dj-animate-bounce': item.loading,
                              },
                            )}
                          >
                            {item.label}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                )
              })}
            </MenuItems>
          </Transition>
        )}
      </Menu>
    </>
  )
}

function groupArrayByDivider(inputArray: DropdownMenuElement[]): DropdownMenuItem[][] {
  let groupedArrays: DropdownMenuItem[][] = []
  let currentGroup: DropdownMenuItem[] = []

  for (const item of inputArray) {
    if (isDivider(item)) {
      if (currentGroup.length > 0) {
        groupedArrays.push(currentGroup)
        currentGroup = []
      }
    } else {
      currentGroup.push(item)
    }
  }

  if (currentGroup.length > 0) {
    groupedArrays.push(currentGroup)
  }

  return groupedArrays
}

function isDivider(element: DropdownMenuElement): element is DropdownMenuDivider {
  return (element as DropdownMenuDivider).type === 'divider'
}

export default DropdownMenu
