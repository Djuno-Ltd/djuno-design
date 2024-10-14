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
import { useDjunoDesign } from '../hooks/useDjunoDesign'
// import { useNavigate, useLocation } from 'react-router-dom'
/**
 * Tabs component for managing tabbed navigation within an application.
 *
 * @param {object} props - Tabs props.
 * @param {TabOptions} props.options - Configuration object specifying the tabs to display. Each option should include a label and content.
 * @param {number} [props.selectedIndex] - Index of the initially selected tab. Defaults to the first tab.
 * @param {Function} [props.onChange] - Callback function triggered when the active tab changes.
 * @param {number} props.onChange.index - The index of the newly selected tab.
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
  listClassName,
  panelClassName,
  tabType,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(propsSelectedIndex || 0)

  const { navigator } = useDjunoDesign({ stric: false })

  useEffect(() => {
    if (propsSelectedIndex) {
      setSelectedIndex(propsSelectedIndex)
    } else {
      const si = getOptionIndexFromUrlString(location.pathname, options)
      setSelectedIndex(si)
    }
  }, [options, location.pathname, propsSelectedIndex])

  // const onChangeTab = (i: number, options: TabOptions) => {
  //   const selectedOption = getTabOptionFromIndex(i, options)
  //   if (onChange) {
  //     onChange(selectedOption)
  //   }
  //   if (navigator) {
  //     navigator(selectedOption?.url)
  //   }
  //   setSelectedIndex(i)
  // }
  const onChangeTab = (i: number, options: TabOptions) => {
    const selectedOption = getTabOptionFromIndex(i, options)
    if (onChange) {
      onChange({ option: selectedOption, index: i })
    }
    if (navigator) {
      navigator(selectedOption?.url)
    }
    setSelectedIndex(i)
  }

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={(i) => onChangeTab(i, options)}>
      <TabList
        className={cn(
          'dd-flex dd-overflow-x-auto',
          {
            'dd-w-full md:w-auto ': !tabType || tabType === 'default',
            'dd-bg-slate-500/10 dd-p-1 dd-rounded-lg': tabType === 'creamy',
          },
          listClassName,
        )}
      >
        {options
          .filter((option) => option.active !== true)
          .map((option, i) => (
            <Tab
              key={i}
              disabled={option.disabled}
              data-testid={option.testId}
              className={({ selected }) =>
                cn(
                  'hover:dark:dd-text-slate-100 hover:dd-text-gray-900 dd-outline-none disabled:dd-cursor-not-allowed',
                  {
                    'dd-font-semibold dd-bg-primary-50 dark:dd-bg-dark-700 dd-text-blue-500 hover:!dd-text-blue-600 hover:dark:dd-text-blue-600 dd-rounded-lg':
                      selected && (!tabType || tabType === 'default'),
                    'dd-font-normal dd-text-xs sm:dd-text-sm dd-whitespace-nowrap dd-px-3 dd-h-9 dd-w-full':
                      tabType === 'creamy',
                    'dd-bg-white dark:dd-bg-dark-900 dark:dd-text-slate-300 dd-rounded-lg':
                      tabType === 'creamy' && selected,
                    'dd-text-gray-400 dark:dd-text-slate-400': !selected,
                  },
                )
              }
            >
              {(!tabType || tabType === 'default') && (
                <div className='dd-rounded-md dd-flex dd-items-center dd-transition-background dd-duration-150 dd-justify-center dd-text-center sm:dd-space-x-2 dd-w-full dd-px-3 dd-py-1.5 '>
                  <span className='dd-text-xs sm:dd-text-sm dd-whitespace-nowrap'>{option.label}</span>
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
            className={cn('dd-bg-white dark:dd-bg-dark-700 dd-rounded-md', {
              'dd-py-6': (!tabType || tabType === 'default') && option.element,
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

export default Tabs
