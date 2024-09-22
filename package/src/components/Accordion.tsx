/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Accordion Component
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
import { ReactComponent as ChevronDownIcon } from '../assets/icons/chevron-down.svg'
import { AccordionProps } from '../types/IAccordion'
import Loading from './Loading'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

/**
 * Accordion component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - Accordion props.
 * @param {React.ReactNode} [props.children] - The content inside the accordion.
 * @param {string} [props.panelClassNames] - Additional panelClassNames to apply to the accordion.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the accordion, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the accordion is in a loading state.
 *
 * @returns {React.ReactNode} Rendered Accordion component.
 *
 * @version 0.4.8
 * @see https://www.npmjs.com/package/djuno-design#accordion
 *
 * @example
 * // Example usage of Accordion component:
 *
 * function MyComponent() {
 *   return (
 *     <Accordion
 *       panelClassNames="custom-panel-class"
 *       items={[
 *         { label: "Item 1", panel: "Panel content for item 1" },
 *         { label: "Item 2", panel: "Panel content for item 2" }
 *       ]}
 *       loading={false}
 *     />
 *   );
 * }
 */

const Accordion: React.FC<AccordionProps> = ({ items, panelClassNames, loading }) => {
  return (
    <div className='w-full bg-secondary-100 dark:bg-dark-850 border dark:border-dark-600 rounded-lg overflow-hidden '>
      {items?.length === 0 && loading && <Loading borderSize={2} style={{ minHeight: 100 }} />}
      {items?.map((item, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <DisclosureButton className='flex w-full justify-between items-center text-dark-900 bg-secondary-100 hover:bg-secondary-200 dark:text-secondary-100 dark:bg-dark-850 dark:hover:bg-dark-900 px-2 py-3 md:px-4 md:py-4 text-left text-sm font-medium  focus:outline-none focus-visible:ring-0 '>
                {item.label}
                {item.panel && (
                  <ChevronDownIcon
                    className={cn(
                      'h-4 w-4 text-dark-500 dark:text-secondary-300 transform transition-transform duration-300',
                      {
                        'rotate-180': open,
                      },
                    )}
                  />
                )}
              </DisclosureButton>
              {item.panel && (
                <DisclosurePanel
                  className={cn(panelClassNames, {
                    'dark:bg-dark-850 p-3 border-y dark:border-dark-700 dark:text-dark-200':
                      panelClassNames === undefined,
                  })}
                >
                  {item.panel}
                </DisclosurePanel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

export default Accordion
