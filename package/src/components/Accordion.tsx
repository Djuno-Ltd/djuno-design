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
import { cva } from 'class-variance-authority'

const accordionVariants = cva('dd-w-full dd-rounded-lg dd-overflow-hidden', {
  variants: {
    uiType: {
      default: ' dd-border-0', // Default styles for the accordion
      transparent: 'dd-border dd-border-secondary-200 dark:dd-border-dark-700 dd-bg-transparent', // Transparent with border
    },
  },
  defaultVariants: {
    uiType: 'default', // Default type is `default`
  },
})

/**
 * Accordion component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - Accordion props.
 * @param {React.ReactNode} [props.children] - The content inside the accordion.
 * @param {string} [props.classNames] - Additional classNames to apply to the accordion container.
 * @param {string} [props.panelClassName] - Additional panelClassNames to apply to the accordion.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the accordion, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the accordion is in a loading state.
 * @param {string} [props.labelClassName] - Additional CSS classes to apply custom styles to the label.
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
 *       panelClassName="custom-panel-class"
 *       items={[
 *         { label: "Item 1", panel: "Panel content for item 1" },
 *         { label: "Item 2", panel: "Panel content for item 2" }
 *       ]}
 *       loading={false}
 *     />
 *   );
 * }
 */

const Accordion: React.FC<AccordionProps> = ({ items, className, labelClassName, panelClassName, loading, uiType }) => {
  return (
    <div className={cn(accordionVariants({ uiType }), className)}>
      {items?.length === 0 && loading && <Loading borderSize={2} style={{ minHeight: 100 }} />}
      {items?.map((item, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <DisclosureButton
                className={cn(
                  ' dd-bg-secondary-100 dark:dd-bg-dark-850 dd-flex dd-w-full dd-justify-between dd-items-center dd-px-2 dd-py-3 md:dd-px-4 md:dd-py-4 dd-text-left dd-text-sm dd-font-medium focus:dd-outline-none focus-visible:dd-ring-0 dd-text-black dark:dd-text-white hover:dd-bg-secondary-300 dark:hover:dd-bg-dark-950',
                  {
                    '': uiType === 'default',
                    'dd-border dark:dd-border-dark-700 dd-bg-transparent dark:dd-bg-transparent dark:hover:dd-bg-dark-800 hover:dd-bg-secondary-100':
                      uiType === 'transparent',
                  },
                  labelClassName,
                )}
              >
                {item.label}
                {item.panel && (
                  <ChevronDownIcon
                    className={cn(
                      'dd-h-4 dd-w-4 dd-text-dark-500 dark:dd-text-secondary-300 dd-transform dd-transition-transform dd-duration-300',
                      {
                        'dd-rotate-180': open,
                      },
                    )}
                  />
                )}
              </DisclosureButton>
              {item.panel && (
                <DisclosurePanel
                  className={cn(
                    'dd-bg-secondary-50 dark:dd-bg-dark-800 dd-p-3 dd-text-black dark:dd-text-white',
                    {
                      '': uiType === 'default',
                      'dd-border dark:dd-border-dark-700 dd-bg-transparent dark:dd-bg-transparent':
                        uiType === 'transparent',
                    },
                    panelClassName,
                  )}
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
