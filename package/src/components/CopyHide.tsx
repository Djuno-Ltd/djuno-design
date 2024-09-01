/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Card Component
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
import { CopyHideProps } from '../types/CopyHide'
import { copyToClipboard } from '../utils/copy'
import Typography from './Typography'
const { Text } = Typography
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../assets/icons//eye-slash.svg'
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg'
import Input from './form/Input'
import { cva } from 'class-variance-authority'

const iconVariants = cva('dj-cursor-pointer dj-w-5 dj-h-5 dj-transition-all dj-duration-300', {
  variants: {
    state: {
      eyelashIcon:
        '  hover:dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200',
      eyeIcon: 'hover:dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200',
      copyIcon:
        ' hover:dj-scale-110 dj-text-slate-500 hover:dj-text-primary-300 dark:dj-text-slate-300 dark:hover:dj-text-primary-300',
    },
  },
  defaultVariants: {
    state: 'eyelashIcon',
  },
})

/**
 * CopyHide component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - CopyHide props.
 * @param {React.ReactNode} [props.children] - The content inside the copyHide.
 * @param {string} [props.className] - Additional classes to apply to the copyHide.
 * @param {boolean} [props.icon] - Indicates if the copyHide has the icon.
 * @param {boolean} [props.iconClassName] - Indicates if the copyHide has the iconClassName.
 * @param {boolean} [props.textClassName] - Indicates if the copyHide has the textClassName.
 * @param {string} [props.type] - Type of the Action "hide" or "copy".
 *
 * @returns {React.ReactNode} Rendered CopyHide component.
 *
 * @version 0.0.0
 * @see https://www.npmjs.com/package/djuno-design#copyHide
 *
 * @example
 * // Example usage of CopyHide component:
 *
 * function MyComponent() {
 *   return (
 *     <CopyHide
 *       className="my-custom-class"
 *       icon={<CustomIcon />}
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

const CopyHide: React.FC<CopyHideProps> = ({ text, icon, className, iconClassName, textClassName, type, ...props }) => {
  const [showText, setShowText] = React.useState(false)

  return (
    <>
      {type === 'hide' && (
        <div className={cn('dj-flex dj-items-center dj-gap-1', className, {})}>
          <div
            className='dj-relative dj-overflow-hidden dj-cursor-pointer dj-text-sm  dj-h-7 dark:dj-bg-dark-700 dark:hover:dj-bg-dark-500 dj-bg-gray-200/70 hover:dj-bg-dark-200 dj-px-2 dj-rounded-md dj-select-none dj-transition-all dj-duration-500 dj-flex dj-flex-col dj-items-center dj-justify-center dj-dj-whitespace-nowrap'
            onClick={() => text && copyToClipboard(text)}
          >
            {!showText && (
              <div className='dj-bg-white/10 dark:dj-bg-black/10 dj-backdrop-blur-[2.3px] dj-absolute dj-left-0 dj-top-0 dj-right-0 dj-bottom-0 dj-w-full dj-h-full' />
            )}
            <Text className={cn('dj-w-full dj-overflow-hidden dj-text-ellipsis dj-truncate', textClassName)}>
              {!text || text === undefined ? 'Djuno Design' : text}
            </Text>
          </div>

          <div className='dj-select-none'>
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
        <div className={cn('dj-flex dj-items-center dj-gap-1', className)}>
          <Input
            inputProps={{
              value: text ? text : 'Djuno Design',
              readOnly: true,
              ...props,
            }}
          />
          <div className='dj-select-none'>
            <CopyIcon
              onClick={() => copyToClipboard(text || 'Djuno Design')}
              className={cn(iconVariants({ state: 'copyIcon' }), iconClassName)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CopyHide
