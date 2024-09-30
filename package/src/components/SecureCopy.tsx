/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview SecureCopy Component
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
import { SecureCopyProps } from '../types/ISecureCopy'
import { copyToClipboard } from '../utils/copy'
import Typography from './Typography'
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../assets/icons//eye-slash.svg'
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg'
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg'
import Input, { inputVariants } from './form/Input'
import { cva } from 'class-variance-authority'
const { Text } = Typography

const iconVariants = cva('dd-cursor-pointer dd-w-5 dd-h-5 dd-transition-all dd-duration-300', {
  variants: {
    state: {
      eyelashIcon: 'dd-text-slate-700 hover:dd-text-slate-900 dark:dd-text-slate-300 dark:hover:dd-text-slate-200',
      eyeIcon: 'dd-text-slate-700 hover:dd-text-slate-900 dark:dd-text-slate-300 dark:dd-hover:text-slate-200',
      copyIcon:
        'hover:dd-scale-110 dd-text-slate-500 hover:dd-text-primary-300 dark:dd-text-slate-300 dark:hover:dd-text-primary-300',
    },
  },
  defaultVariants: {
    state: 'eyelashIcon',
  },
})

/**
 * SecureCopy component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - SecureCopy props.
 * @param {React.ReactNode} [props.children] - The content inside the SecureCopy.
 * @param {string} [props.className] - Additional classes to apply to the SecureCopy.
 * @param {boolean} [props.iconClassName] - Indicates if the SecureCopy has the iconClassName.
 * @param {boolean} [props.textClassName] - Indicates if the SecureCopy has the textClassName.
 * @param {string} [props.type] - Type of the Action "hide" or "copy".
 *
 * @returns {React.ReactNode} Rendered SecureCopy component.
 *
 * @version 0.4.7
 * @see https://www.npmjs.com/package/djuno-design#SecureCopy
 *
 * @example
 * // Example usage of SecureCopy component:
 *
 * function MyComponent() {
 *   return (
 *     <SecureCopy
 *       className="my-custom-class"
 *       iconClassName="custom-icon-class"
 *       textClassName="custom-text-class"
 *       showText={true}
 *       text="Text"
 *       type="copy"
 *     />
 *   );
 * }
 *
 */
const SecureCopy: React.FC<SecureCopyProps> = ({
  text,
  className,
  iconClassName,
  textClassName,
  type,
  uiSize,
  ...props
}) => {
  const [showText, setShowText] = React.useState(false)

  const [copied, setCopied] = React.useState(false) // Add state for copy status

  // Function to handle copying and icon change
  const handleCopy = () => {
    if (text) {
      copyToClipboard(text) // Copy to clipboard
      setCopied(true) // Set copied to true

      // Reset the icon after a delay
      setTimeout(() => setCopied(false), 2000) // Change back after 2 seconds
    }
  }

  return (
    <>
      {type === 'hide' && (
        <div className={cn('dd-flex dd-items-center dd-gap-1', className)}>
          <div
            className={cn(
              inputVariants({ uiSize }),
              {
                'dd-h-7': uiSize === 'small',
                'dd-h-9': uiSize === 'medium' || uiSize === undefined,
                'dd-h-11': uiSize === 'large',
              },
              'dd-relative dd-overflow-hidden dd-cursor-pointer dd-text-sm dark:dd-bg-dark-700 dark:hover:dd-bg-dark-500 dd-bg-gray-200/70 hover:dd-bg-dark-200 dd-px-2 dd-rounded-md dd-select-none dd-transition-all dd-duration-500 dd-flex dd-flex-col dd-items-center dd-justify-center dd-whitespace-nowrap',
            )}
            onClick={() => text && copyToClipboard(text)}
          >
            {!showText && (
              <div className='dd-bg-white/10 dark:dd-bg-black/10 dd-backdrop-blur-[2.3px] dd-absolute dd-left-0 dd-top-0 dd-right-0 dd-bottom-0 dd-w-full dd-h-full' />
            )}
            <Text className={cn('dd-w-full dd-overflow-hidden dd-text-ellipsis dd-truncate', textClassName)}>
              {!text || text === undefined ? '' : text}
            </Text>
          </div>

          <div className='dd-select-none'>
            {showText ? (
              <EyeIcon
                onClick={() => setShowText(false)}
                className={cn(iconVariants({ state: 'eyeIcon' }), iconClassName)}
              />
            ) : (
              <EyeSlashIcon
                onClick={() => setShowText(true)}
                className={cn(iconVariants({ state: 'eyelashIcon' }), iconClassName)}
              />
            )}
          </div>
        </div>
      )}

      {type === 'copy' && (
        <div className={cn('dd-flex dd-items-center dd-gap-1', className)}>
          <Input
            className={cn(
              inputVariants({
                uiSize,
              }),
              {
                'dd-h-7': uiSize === 'small',
                'dd-h-9': uiSize === 'medium' || uiSize === undefined,
                'dd-h-11': uiSize === 'large',
              },
              className,
            )}
            value={text || ''}
            readOnly={true}
            {...props}
          />
          <div className='select-none'>
            {copied ? (
              <CheckIcon // Show CheckIcon when copied
                className={cn(iconVariants({ state: 'copyIcon' }), iconClassName)}
              />
            ) : (
              <CopyIcon // Show CopyIcon initially
                onClick={handleCopy}
                className={cn(iconVariants({ state: 'copyIcon' }), iconClassName)}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SecureCopy
