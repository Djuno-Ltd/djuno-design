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
      <Dialog as='div' className='relative z-50' onClose={onClose && closable ? onClose : () => {}}>
        <TransitionChild
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/10 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div
            className={cn('flex min-h-full items-center justify-center p-2 text-center', {
              [containerClassName || '']: containerClassName,
            })}
          >
            <TransitionChild
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel
                as='div'
                className={cn(
                  'w-full transform rounded-xl bg-white border-0 dark:bg-dark-900 dark:border-2 dark:border-dark-800 p-4 text-left align-middle shadow-xl transition-all',
                  {
                    [contentClassName || '']: contentClassName,
                  },
                )}
              >
                <DialogTitle as='div' className='leading-6 flex items-center justify-between'>
                  <Typography.Text size='base'>{title}</Typography.Text>
                  {closable && (
                    <CloseIcon
                      onClick={onClose ? onClose : () => {}}
                      className='text-gray-900 dark:text-slate-200 w-5 h-5 cursor-pointer hover:scale-110'
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
