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
}) => {
  React.useEffect(() => {
    if (rendered && isOpen) {
      setTimeout(rendered, 300)
    }
  }, [isOpen, rendered])
  return (
    <Transition appear show={isOpen || false} as={React.Fragment}>
      <Dialog as='div' className='dj-relative dj-z-50' onClose={onClose && closable ? onClose : () => {}}>
        <TransitionChild
          as={React.Fragment}
          enter='dj-ease-out dj-duration-300'
          enterFrom='dj-opacity-0'
          enterTo='dj-opacity-100'
          leave='dj-ease-in dj-duration-200'
          leaveFrom='dj-opacity-100'
          leaveTo='dj-opacity-0'
        >
          <div className='dj-fixed dj-inset-0 dj-bg-black/10 dj-backdrop-blur-sm' />
        </TransitionChild>

        <div className='dj-fixed dj-inset-0 dj-overflow-y-auto'>
          <div
            className={cn('dj-flex dj-min-h-full dj-items-center dj-justify-center dj-p-2 dj-text-center', {
              [containerClassName || '']: containerClassName,
            })}
          >
            <TransitionChild
              as={React.Fragment}
              enter='dj-ease-out dj-duration-300'
              enterFrom='dj-opacity-0 dj-scale-95'
              enterTo='dj-opacity-100 dj-scale-100'
              leave='dj-ease-in dj-duration-200'
              leaveFrom='dj-opacity-100 dj-scale-100'
              leaveTo='dj-opacity-0 dj-scale-95'
            >
              <DialogPanel
                as='div'
                className={cn(
                  'dj-w-full dj-transform dj-rounded-xl dj-bg-white dj-border-0 dark:dj-bg-dark-900 dark:dj-border-2 dark:dj-border-dark-800 dj-p-4 dj-text-left dj-align-middle dj-shadow-xl dj-transition-all',
                  {
                    [contentClassName || '']: contentClassName,
                  },
                )}
              >
                <DialogTitle as='div' className='dj-leading-6 dj-flex dj-items-center dj-justify-between'>
                  <Typography.Text size='base'>{title}</Typography.Text>
                  {closable && (
                    <CloseIcon
                      onClick={onClose ? onClose : () => {}}
                      className='dj-text-gray-900 dark:dj-text-slate-200 dj-w-5 dj-h-5 dj-cursor-pointer hover:dj-scale-110'
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
