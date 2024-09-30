/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Popover Component
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
import { PopoverButton, PopoverPanel, Popover as Popper, Transition } from '@headlessui/react'
import { Fragment } from 'react'
// import { useFloating, shift, flip } from '@floating-ui/react-dom'
import { PopoverProps } from '../types'
/**
 * Popover component that allows for customization of the popover's appearance and behavior.
 *
 * @param {object} props - Popover props.
 * @param {React.ReactNode} props.content - The content or element that triggers the popover when clicked.
 * @param {React.ReactNode} [props.children] - Optional children to be rendered inside the popover.
 * @param {string} [props.panelClassName] - Additional CSS classes to apply to the popover panel.
 * @param {React.CSSProperties} [props.panelStyle] - Additional inline styles to apply to the popover panel.
 *
 * @returns {React.ReactNode} Rendered Popover component.
 *
 * @version 0.6.1
 * @see https://www.npmjs.com/package/djuno-design#popover
 *
 * @example
 * // Example usage of Popover component:
 *
 * function MyComponent() {
 *
 *   return (
 *     <div>
 *      <Popover
 *       content={<div>Popover Content</div>}
 *       open={open}
 *       panelClassName="custom-panel-class"
 *       panelStyle={{panelStyle}}
 *       >
 *       <button>Toggle Popover</button>
 *      </Popover>
 *     </div>
 *   );
 * }
 */

const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  content,
  children,
  anchor = 'bottom start',
  panelClassName,
  panelStyle,
}) => {
  // const { refs, floatingStyles } = useFloating({
  //   placement: 'bottom-start',
  //   middleware: [flip(), shift()],
  // })

  return (
    <Popper className='relative'>
      {({ open }) => (
        <>
          <PopoverButton
            as='div'
            className={cn('focus:dd-outline-none focus:dd-ring-0', {
              '': open,
              '': !open,
            })}
            // ref={refs.setReference}
          >
            {children}
          </PopoverButton>

          <Transition
            as={Fragment}
            enter='dd-transition dd-ease-out dd-duration-200'
            enterFrom='dd-opacity-0 dd-translate-y-1'
            enterTo='dd-opacity-100 dd-translate-y-0'
            leave='dd-transition dd-ease-in dd-duration-150'
            leaveFrom='dd-opacity-100 dd-translate-y-0'
            leaveTo='dd-opacity-0 dd-translate-y-1'
          >
            <PopoverPanel
              // ref={refs.setFloating}
              anchor={anchor}
              style={panelStyle}
              className={cn('dd-absolute dd-left-0 dd-z-10 dd-mt-3 dd-transform dd-px-4 sm:dd-px-0', panelClassName)}
            >
              {content}
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popper>
  )
}

export default Popover
