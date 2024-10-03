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
 * @param {string} [props.anchor] -
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
const ThemeChanger: React.FC<ThemeChangerProps> = ({ itemsClassName, anchor = 'bottom start' }) => {
  const {
    theme: { mode, changeMode, modeRefrence },
  } = useDjunoDesign({ stric: false })

  return (
    <Menu as='div' className='dd-relative dd-text-left dd-flex dd-justify-center'>
      <MenuButton className='dd-inline-flex dd-w-full dd-justify-center dd-items-center dd-text-sm dd-font-medium focus:dd-outline-none focus-visible:dd-ring-0 dd-text-slate-800 dark:dd-text-slate-200'>
        {mode === 'light' && <SunIcon className='dd-w-6 dd-h-6 hover:dd-scale-110' />}
        {mode === 'dark' && <MoonIcon className='dd-w-6 dd-h-6 hover:dd-scale-110' />}
      </MenuButton>

      <Transition
        as={React.Fragment}
        enter='dd-transition dd-ease-out dd-duration-100'
        enterFrom='dd-transform dd-opacity-0 dd-scale-95'
        enterTo='dd-transform dd-opacity-100 dd-scale-100'
        leave='dd-transition dd-ease-in dd-duration-75'
        leaveFrom='dd-transform dd-opacity-100 dd-scale-100'
        leaveTo='dd-transform dd-opacity-0 dd-scale-95'
      >
        <MenuItems
          anchor={anchor}
          className={cn(
            'dd-absolute dd-bg-white dark:dd-bg-zinc-900 dd-ring-slate-900/10 dark:dd-ring-black dd-z-50 dd-top-full dd-rounded-lg dd-ring-1 dd-shadow-lg dd-overflow-hidden dd-w-36 dd-py-1 dd-text-sm dd-font-semibold dark:dd-highlight-white/5 dd-mt-1',
            {
              [itemsClassName || '']: itemsClassName,
              'dd-left-0': !itemsClassName,
            },
          )}
        >
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('light')}
                className={cn(
                  'dd-group dd-flex dd-w-full dd-items-center dd-rounded-md dd-px-2 dd-py-1 dd-text-sm dd-cursor-pointer ',
                  {
                    'dd-bg-slate-50 dark:dd-bg-zinc-800': focus,
                    'dd-text-gray-900 dark:dd-text-slate-300':
                      modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'dark'),
                    'dd-text-sky-500 dark:dd-text-sky-500': mode === 'light' && modeRefrence === 'manual',
                  },
                )}
              >
                <SunIcon className='dd-w-5 dd-h-5 dd-mr-2' />
                Light
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('dark')}
                className={cn(
                  'dd-group dd-flex dd-w-full dd-items-center dd-rounded-md dd-px-2 dd-py-1 dd-text-sm dd-cursor-pointer',
                  {
                    'dd-bg-slate-50 dark:dd-bg-zinc-800': focus,
                    'dd-text-gray-900 dark:dd-text-slate-300':
                      modeRefrence !== 'manual' || (modeRefrence === 'manual' && mode === 'light'),
                    'dark:dd-text-sky-500': mode === 'dark' && modeRefrence === 'manual',
                  },
                )}
              >
                <MoonIcon className='dd-w-5 dd-h-5 dd-mr-2' />
                Dark
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => changeMode('system')}
                className={cn(
                  'dd-group dd-flex dd-w-full dd-items-center dd-rounded-md dd-px-2 dd-py-1 dd-text-sm dd-cursor-pointer',
                  {
                    'dd-bg-slate-50 dark:dd-bg-zinc-800': focus,
                    'dd-text-gray-900 dark:dd-text-slate-300': modeRefrence !== 'system',
                    'dd-text-sky-500 dark:dd-text-sky-500': modeRefrence === 'system',
                  },
                )}
              >
                <SystemIcon className='dd-w-5 dd-h-5 dd-mr-2' />
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

  return <Switcher uiSize='medium' value={mode === 'dark'} onChange={(v) => changeMode(v ? 'dark' : 'light')} />
}

export { ThemeSwitcher }
export default ThemeChanger
