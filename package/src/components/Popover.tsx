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
import { Fragment, PropsWithChildren } from 'react'
import { useFloating, shift, flip } from '@floating-ui/react-dom'
import { PopoverProps } from '../types'

/**
 * Popover component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - Popover props.
 * @param {React.ReactNode} props.buttonEl - The element that triggers the popover when clicked.
 * @param {boolean} props.open - Controls whether the popover is open or closed.
 * @param {HTMLElement | null} props.anchorEl - The DOM element to which the popover is anchored.
 * @param {React.ReactNode} [props.children] - Optional children to be rendered inside the popover.
 * @param {string} [props.className] - Additional CSS classes to apply to the popover container.
 * @param {React.CSSProperties} [props.popoverClassName] - Additional inline styles to apply to the popover.
 *
 * @returns {React.ReactNode} Rendered Popover component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#popover
 *
 * @example
 * // Example usage of Popover component:
 *
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *   const anchorRef = useRef<HTMLDivElement | null>(null);
 *
 *   const handleToggle = () => setOpen((prev) => !prev);
 *   const handleClose = () => setOpen(false);
 *
 *   return (
 *     <div>
 *       <div ref={anchorRef} onClick={handleToggle}>
 *         Open Popover
 *       </div>
 *
 *       <Popover
 *         buttonEl={<div>Trigger Element</div>}
 *         open={open}
 *         anchorEl={anchorRef.current}
 *         className="custom-popover"
 *         sx={{ zIndex: 1000, minWidth: 350, maxWidth: 400 }}
 *       >
 *         <div className="p-3">
 *           <h4>Popover Content</h4>
 *           <p>This is an example of popover content.</p>
 *           <button onClick={handleClose}>Close</button>
 *         </div>
 *       </Popover>
 *     </div>
 *   );
 * }
 */

const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  buttonEl,
  open,
  anchorEl,
  children,
  className,
  popoverClassName,
}) => {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [flip(), shift()],
  })

  return (
    <Popper className='dj-relative'>
      {({ open }) => (
        <>
          <PopoverButton
            className={`
        ${open ? 'dj-text-white' : 'dj-text-white/90'}
        `}
            ref={refs.setReference}
          >
            {buttonEl}
          </PopoverButton>
          <Transition
            as={Fragment}
            enter='dj-transition dj-ease-out dj-duration-200'
            enterFrom='dj-opacity-0 dj-translate-y-1'
            enterTo='dj-opacity-100 dj-translate-y-0'
            leave='dj-transition dj-ease-in dj-duration-150'
            leaveFrom='dj-opacity-100 dj-translate-y-0'
            leaveTo='dj-opacity-0 dj-translate-y-1'
          >
            <PopoverPanel
              ref={refs.setFloating}
              style={floatingStyles}
              className='dj-absolute dj-left-0 dj-z-10 mt-3 dj-transform dj-px-4 sm:dj-px-0'
            >
              {children}
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popper>
  )
}

export default Popover
