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
import { useFloating, shift, flip } from '@floating-ui/react-dom'
import { PopoverProps } from '../types'
/**
 * Popover component that allows for customization of the popover's appearance and behavior.
 *
 * @param {object} props - Popover props.
 * @param {React.ReactNode} props.contentNode - The content or element that triggers the popover when clicked.
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
 *       contentNode={<div>Popover Content</div>}
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
  contentNode,
  children,
  panelClassName,
  panelStyle,
}) => {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [flip(), shift()],
  })

  return (
    <Popper className='relative'>
      {({ open }) => (
        <>
          <PopoverButton
            as='div'
            className={cn('focus:outline-none focus:ring-0', {
              '': open,
              '': !open,
            })}
            ref={refs.setReference}
          >
            {children}
          </PopoverButton>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <PopoverPanel
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...panelStyle }}
              className={cn('absolute left-0 z-10 mt-3 transform px-4 sm:px-0', panelClassName)}
            >
              {contentNode}
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popper>
  )
}

export default Popover
