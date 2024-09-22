/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview ThemeChanger Component
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
import { cn } from './../utils/cn'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg'
import { ReactComponent as MoonIcon } from '../assets/icons//moon.svg'
import { ReactComponent as SystemIcon } from '../assets/icons//computer-desktop.svg'
import { ThemeChangerProps } from '../types/IThemeChanger'
import Switcher from './form/Switcher'
import { useDjunoDesign } from '../hooks/useDjunoDesign'

/**
 * ThemeChanger component.
 *
 *
 * @param {object} props - ThemeChanger props.
 * @param {string} [props.itemsClassName] - Additional classes to apply to the items within the ThemeChanger.
 *
 * @returns {React.ReactNode} Rendered ThemeChanger component.
 *
 * @version 0.6.0
 * @see https://www.npmjs.com/package/djuno-design#themeChanger
 *
 * @example
 * // Example usage of ThemeChanger component:
 *
 *
 * <ThemeChanger itemsClassName="custom-theme"/>
 *
 */
const ThemeChanger: React.FC<ThemeChangerProps> = ({ itemsClassName }) => {
  const {
    theme: { mode, changeMode, modeRefrence },
  } = useDjunoDesign({ stric: false })

  return (
    <Menu as='div' className='relative text-left flex justify-center'>
      <MenuButton className='inline-flex w-full justify-center items-center text-sm font-medium focus:outline-none focus-visible:ring-0 text-slate-800 dark:text-slate-200'>
        {mode === 'light' && <SunIcon className='w-6 h-6 hover:scale-110' />}
        {mode === 'dark' && <MoonIcon className='w-6 h-6 hover:scale-110' />}
      </MenuButton>

      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems
          className={cn(
            'absolute bg-white dark:bg-zinc-900 ring-slate-900/10 dark:ring-black z-50 top-full rounded-lg ring-1 shadow-lg overflow-hidden w-36 py-1 text-sm font-semibold dark:highlight-white/5 mt-1',
            {
              [itemsClassName || '']: itemsClassName,
              'left-0': !itemsClassName,
            },
          )}
        >
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('light')}
                className={cn('group flex w-full items-center rounded-md px-2 py-1 text-sm cursor-pointer ', {
                  'bg-slate-50 dark:bg-zinc-800': focus,
                  'text-gray-900 dark:text-slate-300':
                    modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'dark'),
                  'text-sky-500 dark:text-sky-500': mode === 'light' && modeRefrence === 'manual',
                })}
              >
                <SunIcon className='w-5 h-5 mr-2' />
                Light
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('dark')}
                className={cn('group flex w-full items-center rounded-md px-2 py-1 text-sm cursor-pointer', {
                  'bg-slate-50 dark:bg-zinc-800': focus,
                  'text-gray-900 dark:text-slate-300':
                    modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'light'),
                  'dark:text-sky-500': mode === 'dark' && modeRefrence === 'manual',
                })}
              >
                <MoonIcon className='w-5 h-5 mr-2' />
                Dark
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('system')}
                className={cn('group flex w-full items-center rounded-md px-2 py-1 text-sm cursor-pointer', {
                  'bg-slate-50 dark:bg-zinc-800': focus,
                  'text-gray-900 dark:text-slate-300': modeRefrence !== 'system',
                  'text-sky-500 dark:text-sky-500': modeRefrence === 'system',
                })}
              >
                <SystemIcon className='w-5 h-5 mr-2' />
                System
              </div>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

/**
 * ThemeSwitcher component.
 *
 *
 * @param {object} props - ThemeSwitcher props.
 * @param {string} [props.itemsClassName] - Additional classes to apply to the items within the ThemeChanger.
 *
 * @returns {React.ReactNode} Rendered ThemeSwitcher component.
 *
 * @version 0.6.0
 * @see https://www.npmjs.com/package/djuno-design#themeSwicher
 *
 * @example
 * // Example usage of ThemeSwitcher component:
 *
 *
 * <ThemeSwitcher itemsClassName="custom-theme"/>
 *
 */
const ThemeSwitcher: React.FC<ThemeChangerProps> = () => {
  const {
    theme: { mode, changeMode },
  } = useDjunoDesign({ stric: false })

  return <Switcher size='medium' value={mode === 'dark'} onChange={(v) => changeMode(v ? 'dark' : 'light')} />
}

export { ThemeSwitcher }
export default ThemeChanger
