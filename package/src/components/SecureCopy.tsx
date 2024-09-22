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
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg'
import Input from './form/Input'
import { cva } from 'class-variance-authority'
const { Text } = Typography

const iconVariants = cva('cursor-pointer w-5 h-5 transition-all duration-300', {
  variants: {
    state: {
      eyelashIcon: 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-200',
      eyeIcon: 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-200',
      copyIcon:
        ' hover:scale-110 text-slate-500 hover:text-primary-300 dark:text-slate-300 dark:hover:text-primary-300',
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
const SecureCopy: React.FC<SecureCopyProps> = ({ text, className, iconClassName, textClassName, type, ...props }) => {
  const [showText, setShowText] = React.useState(false)

  return (
    <>
      {type === 'hide' && (
        <div className={cn('flex items-center gap-1', className, {})}>
          <div
            className='relative overflow-hidden cursor-pointer text-sm  h-7 dark:bg-dark-700 dark:hover:bg-dark-500 bg-gray-200/70 hover:bg-dark-200 px-2 rounded-md select-none transition-all duration-500 flex flex-col items-center justify-center whitespace-nowrap'
            onClick={() => text && copyToClipboard(text)}
          >
            {!showText && (
              <div className='bg-white/10 dark:bg-black/10 backdrop-blur-[2.3px] absolute left-0 top-0 right-0 bottom-0 w-full h-full' />
            )}
            <Text className={cn('w-full overflow-hidden text-ellipsis truncate', textClassName)}>
              {!text || text === undefined ? '' : text}
            </Text>
          </div>

          <div className='select-none'>
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
        <div className={cn('flex items-center gap-1', className)}>
          <Input value={text ? text : ''} readOnly={true} {...props} />
          <div className='select-none'>
            <CopyIcon
              onClick={() => copyToClipboard(text || '')}
              className={cn(iconVariants({ state: 'copyIcon' }), iconClassName)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SecureCopy
