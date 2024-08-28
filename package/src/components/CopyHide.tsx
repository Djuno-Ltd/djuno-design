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
import { cva } from 'class-variance-authority'
import classNames from 'classnames'
import { cn } from '../utils/cn'
import { CopyHideProps } from '../types/CopyHide'
import { copyToClipboard } from '../utils/copy'
import Typography from './Typography'
const { Text } = Typography
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../assets/icons//eye-slash.svg'

/**
 * Define emptyState variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const copyHideVariants = cva('dj-flex dj-items-center dj-gap-1', {
  variants: {
    //   uiType: {
    //     hide: 'dj-w-5 dj-h-5 dj-cursor-pointer hover:dj-scale-110 dj-transition-all dj-duration-300 dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200',
    //     show: 'dj-w-5 dj-h-5 dj-cursor-pointer  hover:dj-scale-110 dj-transition-all dj-duration-300 dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200',
    //   },
  },
  defaultVariants: {
    //   uiType: 'hide',
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
 *
 * @returns {React.ReactNode} Rendered CopyHide component.
 *
 * @version 0.0.4
 * @see https://www.npmjs.com/package/djuno-design#copyHide
 *
 * @example
 * // Example usage of CopyHide component:
 *
 *
 *
 */

const CopyHide: React.FC<CopyHideProps> = ({ text, icon, className, iconClassName, textClassName, ...props }) => {
  const [showText, setShowText] = React.useState(false)
  return (
    <div className={cn(copyHideVariants({}), className, {})}>
      <div
        className='dj-relative dj-overflow-hidden dj-cursor-pointer dj-text-sm  dj-h-7 dark:dj-bg-dark-700 dark:hover:dj-bg-dark-500 dj-bg-gray-200/70 hover:dj-bg-dark-200 dj-px-2 dj-rounded-md dj-select-none dj-transition-all dj-duration-500 dj-flex dj-flex-col dj-items-center dj-justify-center dj-dj-whitespace-nowrap'
        onClick={() => text && copyToClipboard(text)}
      >
        {!showText && (
          <div className='dj-bg-white/10 dark:dj-bg-black/10 dj-backdrop-blur-[2.3px] dj-absolute dj-left-0 dj-top-0 dj-right-0 dj-bottom-0 dj-w-full dj-h-full' />
        )}
        <div className={classNames('dj-w-full dj-overflow-hidden dj-text-ellipsis dj-truncate', textClassName)}>
          {!text || text === undefined ? 'Djuno Design' : text}
        </div>
      </div>
      <div className='dj-select-none'>
        {showText && (
          <EyeSlashIcon
            onClick={() => setShowText(false)}
            className='dj-w-5 dj-h-5 dj-cursor-pointer hover:dj-scale-110 dj-transition-all dj-duration-300 dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200'
          />
        )}
        {!showText && (
          <EyeIcon
            onClick={() => setShowText(true)}
            className='dj-w-5 dj-h-5 dj-cursor-pointer  hover:dj-scale-110 dj-transition-all dj-duration-300 dj-text-slate-700 hover:dj-text-slate-900 dark:dj-text-slate-300 dark:dj-hover:text-slate-200'
          />
        )}
      </div>
    </div>
  )
}

export default CopyHide
