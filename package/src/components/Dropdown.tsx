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
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Button from './Button'
import { DropdownDivider, DropdownElement, DropdownItem, DropdownProps } from '../types/IDropdown'
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg'

/**
 * DropdownMenu component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - DropdownMenu props.
 * @param {React.ReactNode} [props.children] - The content inside the DropdownMenu.
 * @param {string} [props.menu] - menu of the DropdownMenu.
 * @param {string} [props.title] -  title of the DropdownMenu.
 * @param {string} [props.type] - type of the DropdownMenu.
 * @param {string} [props.anchor] -
 * @param {string} [props.itemsClassName] - Additional itemsClassName to apply to the DropdownMenu.
 * @param {string} [props.buttonClassName] - Additional buttonClassName to apply to the DropdownMenu.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the DropdownMenu, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the DropdownMenu is in a loading state.
 *
 * @returns {React.ReactNode} Rendered DropdownMenu component.
 *
 * @version 0.4.6
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

const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({
  title,
  menu,
  type,
  anchor = 'bottom start',
  buttonClassName,
  itemsClassName,
  children,
}) => {
  const itemGroups = groupArrayByDivider(menu || [])
  return (
    <Menu as='div' className='dd-text-left dd-w-full dd-h-full dd-inline-block dd-justify-center dd-items-center'>
      <div className='dd-flex dd-items-center dd-justify-center'>
        <MenuButton
          onClick={(e) => e.stopPropagation()}
          className={cn(buttonClassName, {
            '': type === 'default' || typeof type === 'undefined',
            '': type === 'simple',
          })}
          as='div'
        >
          {type !== 'simple' ? (
            <Button>{children}</Button>
          ) : (
            <div className='dd-h-6 dd-flex dd-items-center dd-ml-auto dd-cursor-pointer'>
              <ArrowDownIcon className='dd-h-4 dd-w-4 dark:dd-text-secondary-100' />
            </div>
          )}
        </MenuButton>
      </div>

      {itemGroups.length > 0 && (
        <Transition
          as={React.Fragment}
          enter='dd-transition-opacity dd-duration-75'
          enterFrom='dd-transform dd-opacity-0 dd-scale-95'
          enterTo='dd-transform dd-opacity-100 dd-scale-100'
          leave='dd-transition dd-ease-in dd-duration-75'
          leaveFrom='dd-transform dd-opacity-100 dd-scale-100'
          leaveTo='dd-transform dd-opacity-0 dd-scale-95'
        >
          <MenuItems
            anchor={anchor}
            className={cn(
              'dd-absolute dd-z-50 dd-mt-1 dd-max-h-60 dd-w-48 dd-overflow-auto dd-rounded-lg dd-bg-white dark:dd-bg-dark-800 dd-p-1 dd-text-base dd-shadow-lg dd-border dd-border-dark-100 dark:dd-border-dark-600 focus:dd-outline-none sm:dd-text-sm dd-divide-y dd-divide-dark-100 dark:dd-divide-dark-600',
              {
                [itemsClassName || '']: itemsClassName,
              },
            )}
          >
            {title && (
              <div className='dd-w-full dd-px-3 dd-text-xs dd-py-2 dd-text-secondary-600 dark:dd-text-secondary-300'>
                {title}
              </div>
            )}

            {itemGroups.map((items, groupIdx) => {
              return (
                <div key={groupIdx} className='dd-px-1 dd-py-1 '>
                  {items.map((item, itemIdx) => (
                    <MenuItem key={itemIdx}>
                      {({ focus, close }) => (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (item.onClick && !item.disabled) {
                              item.onClick(item, close)
                            }
                          }}
                          className={cn(
                            'dd-group dd-flex dd-w-full dd-items-center dd-rounded-md dd-px-2 dd-py-2 dd-text-sm',
                            {
                              'dd-bg-primary-50 dark:dd-bg-dark-700': focus && !item.danger,
                              'dd-bg-red-100 dark:dd-bg-red-600/10': focus && item.danger,
                              'dd-cursor-not-allowed dd-text-dark-400 dark:dd-text-secondary-500': item.disabled,
                              'dd-text-dark-900 dark:dd-text-secondary-100': !item.disabled && !item.danger,
                              'dd-text-red-900 dark:dd-text-red-600': !item.disabled && item.danger,
                              'dd-animate-bounce': item.loading,
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
  )
}

function groupArrayByDivider(inputArray: DropdownElement[]): DropdownItem[][] {
  const groupedArrays: DropdownItem[][] = []
  let currentGroup: DropdownItem[] = []

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

function isDivider(element: DropdownElement): element is DropdownDivider {
  return (element as DropdownDivider).type === 'divider'
}

export default Dropdown
