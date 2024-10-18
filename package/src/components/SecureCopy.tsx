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
import Typography from './Typography'
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../assets/icons//eye-slash.svg'
import Input, { inputVariants } from './form/Input'
import { useCopyable } from '../hooks/useCopyable'
import Tooltip from './Tooltip'
import { CopyableText } from '../types'
const { Text } = Typography

/**
 * SecureCopy component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - SecureCopy props.
 * @param {React.ReactNode} [props.children] - The content inside the SecureCopy.
 * @param {string} [props.className] - Additional classes to apply to the SecureCopy.
 * @param {boolean} [props.iconClassName] - Indicates if the SecureCopy has the iconClassName.
 * @param {boolean} [props.textClassName] - Indicates if the SecureCopy has the textClassName.
 * @param {string} [props.uiType] - Type of the Action "hide" or "copy".
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
  copyable,
  ...props
}) => {
  const [showText, setShowText] = React.useState(false)
  const { copy, icon, tooltipText, textToCopy } = useCopyable({ copyable })

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    let finalText: CopyableText = ''
    if (textToCopy) {
      if (typeof textToCopy === 'function') {
        finalText = textToCopy({ value: text })
      } else {
        finalText = textToCopy
      }
    } else {
      finalText = text
    }
    copy(finalText)
  }

  return (
    <>
      {type === 'hide' && (
        <div className={cn('dd-flex dd-items-center dd-gap-1', className)}>
          <Tooltip content={tooltipText} className='!dd-text-xs'>
            <div
              className={cn(
                inputVariants({ uiSize }),
                {
                  'dd-h-7': uiSize === 'small',
                  'dd-h-9': uiSize === 'medium' || uiSize === undefined,
                  'dd-h-11': uiSize === 'large',
                },
                'dd-relative dd-overflow-hidden dd-cursor-pointer dark:dd-bg-dark-700 dark:hover:dd-bg-white/10 dd-bg-gray-200/70 hover:dd-bg-secondary-200 dd-px-2 dd-rounded-md dd-select-none dd-transition-all dd-duration-500 dd-flex dd-flex-col dd-items-center dd-justify-center dd-whitespace-nowrap',
                textClassName,
              )}
              onClick={handleCopy}
            >
              {!showText && (
                <div className='dd-bg-white/10 dark:dd-bg-black/10 dd-backdrop-blur-[2.3px] dd-absolute dd-left-0 dd-top-0 dd-right-0 dd-bottom-0 dd-w-full dd-h-full' />
              )}
              <Text
                className={cn(
                  // 'dd-w-full dd-overflow-hidden dd-text-ellipsis dd-truncate',
                  {
                    '!dd-text-xs': uiSize === 'small',
                    '!dd-text-sm': uiSize === 'medium' || uiSize === undefined,
                    '!dd-text-base': uiSize === 'large',
                  },
                  textClassName,
                )}
              >
                {!text || text === undefined ? '' : text}
              </Text>
            </div>
          </Tooltip>
          <div
            className={cn(
              'dd-w-[18px] dd-select-none dd-cursor-pointer dd-text-slate-700 hover:dd-text-slate-900 dark:dd-text-slate-300 dark:hover:dd-text-slate-200',
              { 'dd-w-[17px]': uiSize === 'small' },
              iconClassName,
            )}
          >
            <Tooltip>
              {showText ? (
                <EyeIcon onClick={() => setShowText(false)} />
              ) : (
                <EyeSlashIcon onClick={() => setShowText(true)} />
              )}
            </Tooltip>
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
              textClassName,
            )}
            containerClassName='dd-flex-1'
            value={text || ''}
            readOnly={true}
            {...props}
          />
          <div
            onClick={handleCopy}
            className={cn(
              'dd-w-[18px] dd-cursor-pointer dd-text-slate-500 hover:dd-text-primary-300 dark:dd-text-slate-300 dark:hover:dd-text-primary-300',
              { 'dd-w-[15px]': uiSize === 'small' },
              iconClassName,
            )}
          >
            <Tooltip content={tooltipText} className='!dd-text-xs'>
              {icon}
            </Tooltip>
          </div>
        </div>
      )}
    </>
  )
}

export default SecureCopy
