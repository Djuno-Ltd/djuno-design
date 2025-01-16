/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Modal Component
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
import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { ReactComponent as CloseIcon } from './../assets/icons/close.svg'
import { cn } from '../utils/cn'
import { ModalProps } from '../types/IModal'
import Typography from './Typography'

/**
 * Modal component.
 *
 * A flexible modal dialog component that can be used to display content in an overlay.
 * The modal can be customized with various options such as title, visibility control, and additional styles.
 *
 * @param {object} props - Modal component props.
 * @param {React.ReactNode} [props.title] - The title of the modal, which can be a string or any React node.
 * @param {boolean} [props.isOpen] - Controls whether the modal is open or closed.
 * @param {Function} [props.onClose] - Callback function that is triggered when the modal is requested to be closed.
 * @param {string} [props.contentClassName] - Additional CSS classes to apply to the modal content for custom styling.
 * @param {string} [props.containerClassName] - Additional CSS classes to apply to the modal container for custom styling.
 * @param {boolean} [props.closable] - If true, the modal will display a close button, allowing the user to close it.
 * @param {Function} [props.rendered] - Callback function that is triggered when the modal is rendered.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the modal.
 *
 * @returns {React.ReactNode} Rendered Modal component.
 *
 * @version 0.4.1
 * @see https://www.npmjs.com/package/djuno-design#modal
 *
 * @example
 * // Example usage of Modal component:
 *
 * const [isOpen,setIsOpen] = React.useState(false)
 * <Modal
 *   title="Confirmation"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   closable={true}
 *   contentClassName="custom-modal-content"
 *   containerClassName="custom-modal-container"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 */
const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  contentClassName,
  containerClassName,
  closable = true,
  rendered,
  contentStyle,
  containerStyle,
}) => {
  React.useEffect(() => {
    if (rendered && isOpen) {
      setTimeout(rendered, 300)
    }
  }, [isOpen, rendered])
  return (
    <Transition appear show={isOpen || false} as={React.Fragment}>
      <Dialog as='div' className='dd-relative dd-z-50' onClose={onClose && closable ? onClose : () => {}}>
        <TransitionChild
          as={React.Fragment}
          enter='dd-ease-out dd-duration-300'
          enterFrom='dd-opacity-0'
          enterTo='dd-opacity-100'
          leave='dd-ease-in dd-duration-200'
          leaveFrom='dd-opacity-100'
          leaveTo='dd-opacity-0'
        >
          <div className='dd-fixed dd-inset-0 dd-bg-black/10 dd-backdrop-blur-sm' />
        </TransitionChild>

        <div className='dd-fixed dd-inset-0 dd-overflow-y-auto'>
          <div
            className={cn('dd-flex dd-min-h-full dd-items-center dd-justify-center dd-p-2 dd-text-center', {
              [containerClassName || '']: containerClassName,
            })}
            style={containerStyle}
          >
            <TransitionChild
              as={React.Fragment}
              enter='dd-ease-out dd-duration-300'
              enterFrom='dd-opacity-0 dd-scale-95'
              enterTo='dd-opacity-100 dd-scale-100'
              leave='dd-ease-in dd-duration-200'
              leaveFrom='dd-opacity-100 dd-scale-100'
              leaveTo='dd-opacity-0 dd-scale-95'
            >
              <DialogPanel
                as='div'
                className={cn(
                  'dd-w-full dd-transform dd-rounded-xl dd-bg-white dd-border-0 dark:dd-bg-dark-900 dark:dd-border-2 dark:dd-border-dark-800 dd-p-4 dd-text-left dd-align-middle dd-shadow-xl dd-transition-all',
                  {
                    [contentClassName || '']: contentClassName,
                  },
                )}
                style={contentStyle}
              >
                <DialogTitle as='div' className='dd-leading-6 dd-flex dd-items-center dd-justify-between'>
                  <Typography.Text size='base'>{title}</Typography.Text>
                  {closable && (
                    <CloseIcon
                      onClick={onClose ? onClose : () => {}}
                      className='dd-text-gray-900 dark:dd-text-slate-200 dd-w-5 dd-h-5 dd-cursor-pointer hover:dd-scale-110'
                    />
                  )}
                </DialogTitle>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
