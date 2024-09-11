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
import { useTheme } from '../hooks/useTheme'
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg'
import { ReactComponent as MoonIcon } from '../assets/icons//moon.svg'
import { ReactComponent as SystemIcon } from '../assets/icons//computer-desktop.svg'
import { ThemeChangerProps } from '../types/IThemeChanger'
import Switcher from './form/Switcher'

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
  const { mode, modeRefrence, changeMode } = useTheme()
  return (
    <Menu as='div' className='dj-relative dj-text-left dj-flex dj-justify-center'>
      <MenuButton className='dj-inline-flex dj-w-full dj-justify-center dj-items-center dj-text-sm dj-font-medium focus:dj-outline-none focus-visible:dj-ring-0 dj-text-slate-800 dark:dj-text-slate-200'>
        {mode === 'light' && <SunIcon className='dj-w-6 dj-h-6 hover:dj-scale-110' />}
        {mode === 'dark' && <MoonIcon className='dj-w-6 dj-h-6 hover:dj-scale-110' />}
      </MenuButton>

      <Transition
        as={React.Fragment}
        enter='dj-transition dj-ease-out dj-duration-100'
        enterFrom='dj-transform dj-opacity-0 dj-scale-95'
        enterTo='dj-transform dj-opacity-100 dj-scale-100'
        leave='dj-transition dj-ease-in dj-duration-75'
        leaveFrom='dj-transform dj-opacity-100 dj-scale-100'
        leaveTo='dj-transform dj-opacity-0 dj-scale-95'
      >
        <MenuItems
          className={cn(
            'dj-absolute dj-bg-white dark:dj-bg-zinc-900 dj-ring-slate-900/10 dark:dj-ring-black dj-z-50 dj-top-full dj-rounded-lg dj-ring-1 dj-shadow-lg dj-overflow-hidden dj-w-36 dj-py-1 dj-text-sm dj-font-semibold dark:dj-highlight-white/5 dj-mt-1',
            {
              [itemsClassName || '']: itemsClassName,
              'dj-left-0': !itemsClassName,
            },
          )}
        >
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('light')}
                className={cn(
                  'dj-group dj-flex dj-w-full dj-items-center dj-rounded-md dj-px-2 dj-py-1 dj-text-sm dj-cursor-pointer ',
                  {
                    'dj-bg-slate-50 dark:dj-bg-zinc-800': focus,
                    'dj-text-gray-900 dark:dj-text-slate-300':
                      modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'dark'),
                    'dj-text-sky-500 dark:dj-text-sky-500': mode === 'light' && modeRefrence === 'manual',
                  },
                )}
              >
                <SunIcon className='dj-w-5 dj-h-5 dj-mr-2' />
                Light
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('dark')}
                className={cn(
                  'dj-group dj-flex w-full dj-items-center dj-rounded-md dj-px-2 dj-py-1 dj-text-sm dj-cursor-pointer',
                  {
                    'dj-bg-slate-50 dark:dj-bg-zinc-800': focus,
                    'dj-text-gray-900 dark:dj-text-slate-300':
                      modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'light'),
                    'dark:dj-text-sky-500': mode === 'dark' && modeRefrence === 'manual',
                  },
                )}
              >
                <MoonIcon className='dj-w-5 dj-h-5 dj-mr-2' />
                Dark
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('system')}
                className={cn(
                  'dj-group dj-flex dj-w-full dj-items-center dj-rounded-md dj-px-2 dj-py-1 dj-text-sm dj-cursor-pointer',
                  {
                    'dj-bg-slate-50 dark:dj-bg-zinc-800': focus,
                    'dj-text-gray-900 dark:dj-text-slate-300': modeRefrence !== 'system',
                    'dj-text-sky-500 dark:dj-text-sky-500': modeRefrence === 'system',
                  },
                )}
              >
                <SystemIcon className='dj-w-5 dj-h-5 dj-mr-2' />
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
  const { mode, changeMode } = useTheme()
  return <Switcher size='medium' on={mode === 'dark'} onToggle={(v) => changeMode(v ? 'dark' : 'light')} />
  return null
}

export { ThemeSwitcher }
export default ThemeChanger
