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
import { useFloating, shift, flip } from '@floating-ui/react-dom'
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
  buttonClassName,
  itemsClassName,
  children,
}) => {
  const itemGroups = groupArrayByDivider(menu || [])
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [flip(), shift()],
  })
  return (
    <Menu as='div' className='text-left w-full h-full inline-block justify-center items-center'>
      <div className='flex items-center justify-center'>
        <MenuButton
          onClick={(e) => e.stopPropagation()}
          ref={refs.setReference}
          className={cn(buttonClassName, {
            '': type === 'default' || typeof type === 'undefined',
            '': type === 'simple',
          })}
          as='div'
        >
          {type !== 'simple' ? (
            <Button>{children}</Button>
          ) : (
            <div className='h-6 flex items-center ml-auto cursor-pointer'>
              <ArrowDownIcon className='h-4 w-4 dark:text-secondary-100' />
            </div>
          )}
        </MenuButton>
      </div>

      {itemGroups.length > 0 && (
        <Transition
          as={React.Fragment}
          enter='transition-opacity duration-75'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <MenuItems
            ref={refs.setFloating}
            style={floatingStyles}
            // style={{ clip: "rect(auto, auto, auto, auto)" }}
            className={cn(
              'absolute z-50 mt-1 max-h-60 w-48 overflow-auto rounded-lg bg-white dark:bg-dark-800 p-1 text-base shadow-lg border border-dark-100 dark:border-dark-600 focus:outline-none sm:text-sm divide-y divide-dark-100 dark:divide-dark-600',
              {
                [itemsClassName || '']: itemsClassName,
              },
            )}
          >
            {title && (
              <div className='w-full px-3 text-xs py-2 text-secondary-600 dark:text-secondary-300'>{title}</div>
            )}

            {itemGroups.map((items, groupIdx) => {
              return (
                <div key={groupIdx} className='px-1 py-1 '>
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
                          className={cn('group flex w-full items-center rounded-md px-2 py-2 text-sm', {
                            'bg-primary-50 dark:bg-dark-700': focus && !item.danger,
                            'bg-red-100 dark:bg-red-600/10': focus && item.danger,
                            'cursor-not-allowed text-dark-400 dark:text-secondary-500': item.disabled,
                            'text-dark-900 dark:text-secondary-100': !item.disabled && !item.danger,
                            'text-red-900 dark:text-red-600': !item.disabled && item.danger,
                            'animate-bounce': item.loading,
                          })}
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
