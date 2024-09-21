/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Tag Component
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
import { TagProps } from '../types/ITag'
import { ReactComponent as CloseIcon } from './../assets/icons/close.svg'
import { cn } from '../utils/cn'
import Typography from './Typography'

const Tag = React.forwardRef<HTMLSpanElement, TagProps>((tagProps, ref) => {
  const { className, color, style, children, icon, closable, onClose, bordered = true } = tagProps
  const [visible, setVisible] = React.useState(true)

  const handleCloseClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onClose?.()
    if (e.defaultPrevented) {
      return
    }
    setVisible(false)
  }

  const iconNode: React.ReactNode = icon || null

  const tagNode: React.ReactNode = (
    <span
      ref={ref}
      className={cn(
        'dj-flex dj-items-center dj-justify-between dj-gap-0.5 dj-px-1 dj-py-0.5 dj-border dj-rounded-md',
        {
          '!dj-hidden': !visible,
          'dj-bg-slate-100 dj-border-slate-300 dj-text-slate-700 dark:dj-bg-slate-800 dark:dj-border-slate-700 dark:dj-text-slate-300':
            color === undefined,
          'dj-bg-blue-100 dj-border-blue-500 dj-text-blue-500 dark:dj-bg-blue-500/30': color === 'processing',
          'dj-bg-green-50 dj-border-green-400 dj-text-green-600 dark:dj-bg-green-500/20': color === 'success',
          'dj-bg-red-50 dj-border-red-500 dj-text-red-500 dark:dj-bg-red-500/20': color === 'error',
          'dj-bg-yellow-50 dj-border-orange-500 dj-text-orange-500 dark:dj-bg-orange-500/20': color === 'warning',
          //
          '!dj-border-0': !bordered,
        },
        className,
      )}
      style={style}
    >
      <>
        {iconNode}
        {children && (
          <Typography.Text uiType='transparent' size='xs' className='dj-whitespace-nowrap'>
            {children}
          </Typography.Text>
        )}
      </>
      {closable && (
        <CloseIcon
          onClick={handleCloseClick}
          className='dj-w-[12px] dj-h-[12px] dj-text-slate-600 hover:dj-text-slate-800 dark:dj-text-slate-400 hover:dark:dj-text-slate-200 hover:dj-scale-125 dj-transition-all dj-duration-300 dj-cursor-pointer'
        />
      )}
    </span>
  )

  return tagNode
})

Tag.displayName = 'Tag'
export default Tag
