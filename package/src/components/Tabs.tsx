/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Tabs Component
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
import { cn } from '../utils/cn'
import { TabOption, TabOptions, TabsProps } from '../types/ITab'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React, { useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
/**
 * Tabs component for managing tabbed navigation within an application.
 *
 * @param {object} props - Tabs props.
 * @param {TabOptions} props.options - Configuration object specifying the tabs to display. Each option should include a label and content.
 * @param {number} [props.selectedIndex] - Index of the initially selected tab. Defaults to the first tab.
 * @param {Function} [props.onChange] - Callback function triggered when the active tab changes.
 * @param {number} props.onChange.index - The index of the newly selected tab.
 * @param {boolean} [props.useUrl] - Indicates if the component should update the URL to reflect the selected tab. Defaults to false.
 * @param {string} [props.listClassName] - Additional CSS classes to apply to the tab list container.
 * @param {string} [props.panelClassName] - Additional CSS classes to apply to the tab panel container.
 * @param {'default' | 'creamy'} [props.tabType] - Type of tab style to apply. Defaults to 'default'. Options are 'default' and 'creamy'.
 *
 * @returns {React.ReactNode} Rendered Tabs component.
 *
 * @version 0.6.0
 * @see https://www.npmjs.com/package/djuno-design#tabs
 *
 * @example
 * // Example usage of Tabs component:
 *
 * import React from 'react';
 * import Tabs from './Tabs';
 *
 * const tabOptions = [
 *   { label: 'Tab 1', content: <div>Content for Tab 1</div> },
 *   { label: 'Tab 2', content: <div>Content for Tab 2</div> },
 *   { label: 'Tab 3', content: <div>Content for Tab 3</div> },
 * ];
 *
 * function App() {
 *   const handleTabChange = (index) => {
 *     console.log(`Selected tab index: ${index}`);
 *   };
 *
 *   return (
 *     <Tabs
 *       options={tabOptions}
 *       selectedIndex={0}
 *       onChange={handleTabChange}
 *       useUrl={true}
 *       listClassName="custom-tab-list"
 *       panelClassName="custom-tab-panel"
 *       tabType="creamy"
 *     />
 *   );
 * }
 *
 */

const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
  options,
  selectedIndex: propsSelectedIndex,
  onChange,
  useUrl,
  listClassName,
  panelClassName,
  tabType,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(propsSelectedIndex || 0)

  useEffect(() => {
    if (useUrl) {
      const si = getOptionIndexFromUrlString(location.pathname, options)
      setSelectedIndex(si)
    }
  }, [location, options, useUrl])

  useEffect(() => {
    if (typeof useUrl === 'undefined') setSelectedIndex(propsSelectedIndex)
  }, [propsSelectedIndex, useUrl])

  const onChangeTab = (i: number) => {
    // if (useUrl) {
    //   const selectedOption = getTabOptionFromIndex(i, options)
    // }

    if (onChange) {
      onChange(i)
    }
    setSelectedIndex(i)
  }

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={onChangeTab}>
      <TabList
        className={cn('flex overflow-x-auto', {
          [listClassName || '']: listClassName,
          'w-full md:w-auto ': !tabType || tabType === 'default',
          'bg-slate-500/10 p-1 rounded-lg': tabType === 'creamy',
        })}
      >
        {options.map((option, i) => (
          <Tab
            key={i}
            disabled={option.disabled}
            data-testid={option.testId}
            className={({ selected }) =>
              cn('hover:dark:text-slate-100 hover:text-gray-900 outline-none disabled:cursor-not-allowed', {
                'font-semibold bg-primary-50 dark:bg-dark-700 text-blue-500 hover:!text-blue-600 hover:dark:text-blue-600 rounded-lg':
                  selected && (!tabType || tabType === 'default'),
                'font-normal text-xs sm:text-sm whitespace-nowrap px-3 h-9 w-full': tabType === 'creamy',
                'bg-white dark:bg-dark-900 dark:text-slate-300 rounded-lg': tabType === 'creamy' && selected,
                'text-gray-400 dark:text-slate-400': !selected,
              })
            }
          >
            {(!tabType || tabType === 'default') && (
              <div className='rounded-md flex items-center transition-background duration-150 justify-center text-center sm:space-x-2 w-full px-3 py-1.5 '>
                <span className='text-xs sm:text-sm whitespace-nowrap'>{option.label}</span>
              </div>
            )}
            {tabType === 'creamy' && <>{option.label}</>}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {options.map((option, i) => (
          <TabPanel
            key={i}
            className={cn('bg-white dark:bg-dark-700 rounded-md', {
              'py-6': (!tabType || tabType === 'default') && option.element,
              [panelClassName || '']: panelClassName,
            })}
          >
            {option.element}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

export const getTabOptionFromIndex = (index: number, options: TabOptions): TabOption | undefined => {
  return options[index]
}

export const getOptionIndexFromUrlString = (url: string, options: TabOptions) => {
  let index = undefined

  options.forEach((element, i) => {
    if (element.url && url.includes(element.url)) index = i
  })

  return index
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default Tabs
