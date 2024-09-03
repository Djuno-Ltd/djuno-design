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
import { TabOption, TabOptions, TabsProps } from '../types/ITabs'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React, { useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Tabs component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - Tabs props.
 * @param {React.ReactNode} [props.children] - The content inside the Tabs.
 * @param {string} [props.menu] - menu of the Tabs.
 * @param {string} [props.title] -  title of the Tabs.
 * @param {string} [props.type] - type of the Tabs.
 * @param {string} [props.positionClassName] - Additional positionClassName to apply to the Tabs.
 * @param {string} [props.itemsClassName] - Additional itemsClassName to apply to the Tabs.
 * @param {string} [props.buttonClassName] - Additional buttonClassName to apply to the Tabs.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the Tabs, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the Tab is in a loading state.
 *
 * @returns {React.ReactNode} Rendered Tabs component.
 *
 * @version 0.4.6
 * @see https://www.npmjs.com/package/djuno-design#tabs
 *
 * @example
 * // Example usage of Tabs component:
 *
 * function MyComponent() {
 *   return (
 *      <Tab
 *
 *     />
 *   );
 * }
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

  // useNavigate hook usage
  // const navigate = useNavigate()
  // const location = useLocation()

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
    if (useUrl) {
      const selectedOption = getTabOptionFromIndex(i, options)
      // if (selectedOption?.url) {
      //   navigate(selectedOption.url) // Correct usage of navigate
      // }
    }

    if (onChange) {
      onChange(i)
    }
    setSelectedIndex(i)
  }

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={onChangeTab}>
      <TabList
        className={cn('dj-flex dj-overflow-x-auto', {
          [listClassName || '']: listClassName,
          'dj-w-full md:dj-w-auto ': !tabType || tabType === 'default',
          'dj-bg-slate-500/10 dj-p-1 dj-rounded-lg': tabType === 'creamy',
        })}
      >
        {options.map((option, i) => (
          <Tab
            key={i}
            disabled={option.disabled}
            data-testid={option.testId}
            className={({ selected }) =>
              cn('dj-hover:dark:text-slate-100 dj-hover:text-gray-900 dj-outline-none dj-disabled:cursor-not-allowed', {
                'dj-font-semibold dj-bg-primary-50 dj-dark:bg-dark-2 dj-text-blue-500 dj-hover:!text-blue-600 dj-hover:dark:text-blue-600 dj-rounded-lg':
                  selected && (!tabType || tabType === 'default'),
                'dj-font-normal dj-text-xs sm:dj-text-sm dj-whitespace-nowrap dj-px-3 dj-h-9 dj-w-full':
                  tabType === 'creamy',
                'dj-bg-white dj-dark:bg-dark-3 dj-dark:text-slate-300 dj-rounded-lg': tabType === 'creamy' && selected,
                'dj-text-gray-400 dj-dark:text-slate-400': !selected,
              })
            }
          >
            {(!tabType || tabType === 'default') && (
              <div className='dj-rounded-md dj-flex dj-items-center dj-transition-background dj-duration-150 dj-justify-center dj-text-center sm:dj-space-x-2 dj-w-full dj-px-3 dj-py-1.5 '>
                <span className='dj-text-xs sm:dj-text-sm dj-whitespace-nowrap'>{option.label}</span>
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
            className={cn('dj-bg-white dj-dark:bg-dark-2 dj-rounded-md', {
              'dj-py-6': (!tabType || tabType === 'default') && option.element,
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

// interface StyledTabProps {
//   label: string
// }

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

// export const MuiTabItem = styled((props: StyledTabProps) => <MuiTab disableRipple {...props} />)(({ theme }) => ({
//   textTransform: 'none',
//   fontWeight: theme.typography.fontWeightRegular,
//   fontSize: theme.typography.pxToRem(12),
//   marginRight: theme.spacing(1),
//   // color: "rgba(255, 255, 255, 0.7)",
//   // "&.Mui-selected": {
//   //   color: "#fff",
//   // },
//   '&.Mui-focusVisible': {
//     backgroundColor: 'rgba(100, 95, 228, 0.32)',
//   },
// }))

// export function MuiTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box>{children}</Box>}
//     </div>
//   )
// }
export default Tabs
