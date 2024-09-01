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
import Typography from './Typography'
const { Text } = Typography
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as ChevronDownIcon } from '../assets/icons/chevron-down.svg'
import { cva } from 'class-variance-authority'
import { AccordionProps } from '../types/Accordion'
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
 * @version 0.0.0
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

const Accordion: React.FC<AccordionProps> = ({ items, panelClassNames, loading, ...props }) => {
  return (
    <>
      {' '}
      <div className='dj-w-full dj-bg-secondary-100 dark:dj-bg-dark-800 border dark:dj-border-dark-600 dj-rounded-lg dj-overflow-hidden '>
        {items?.length === 0 && loading && <Loading borderSize={2} style={{ minHeight: 100 }} />}
        {items?.map((item, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <>
                <DisclosureButton className='dj-flex dj-w-full dj-justify-between dj-items-center dj-text-dark-900 dj-bg-secondary-100 hover:dj-bg-secondary-200 dark:dj-text-secondary-100 dark:dj-bg-dark-800 dark:hover:dj-bg-dark-850 px-2 dj-py-3 md:dj-px-4 md:dj-py-4 dj-text-left dj-text-sm dj-font-medium  focus:dj-outline-none focus-visible:dj-ring-0 border'>
                  {item.label}
                  {item.panel && (
                    <ChevronDownIcon
                      className={cn(
                        'dj-h-4 dj-w-4 dj-text-dark-500 dark:dj-text-secondary-300 dj-transform dj-transition-transform dj-duration-300',
                        {
                          'dj-rotate-180': open,
                        },
                      )}
                    />
                  )}
                </DisclosureButton>
                {item.panel && (
                  <DisclosurePanel
                    className={cn(panelClassNames, {
                      'dark:dj-bg-dark-800 dj-p-3 dj-border-y dark:dj-border-dark-700 dark:dj-text-dark-200':
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
    </>
  )
}

export default Accordion
