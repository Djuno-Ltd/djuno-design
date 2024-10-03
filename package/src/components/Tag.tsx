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

/**
 * Tag component.
 *
 * A customizable tag component with optional icons, colors, and a close functionality.
 * The component supports custom content, colors for different statuses, and can be closed by the user.
 *
 * @param {object} tagProps - Tag component props.
 * @param {string} [tagProps.className] - Additional class names to apply to the tag.
 * @param {string} [tagProps.color] - The color type of the tag (e.g., 'processing', 'success', 'error', 'warning').
 * @param {React.CSSProperties} [tagProps.style] - Inline styles for the tag.
 * @param {React.ReactNode} [tagProps.children] - Content to be displayed inside the tag.
 * @param {React.ReactNode} [tagProps.icon] - Icon to be displayed before the content.
 * @param {boolean} [tagProps.closable] - If true, the tag can be closed (disappears on click).
 * @param {boolean} [tagProps.bordered=true] - If false, the tag will not have a border.
 * @param {() => void} [tagProps.onClose] - Callback function to be called when the tag is closed.
 * @param {React.Ref<HTMLSpanElement>} ref - Reference to the tag element.
 *
 * @returns {React.ReactNode} Rendered Tag component.
 *
 * @version 0.7.1
 * @see https://www.npmjs.com/package/djuno-design#tag
 *
 * @example
 * // Example usage of Tag component:
 * <Tag color="success" closable onClose={() => console.log('Tag closed')}>
 *   Success Tag
 * </Tag>
 */

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
        'dd-flex dd-items-center dd-justify-between dd-gap-0.5 dd-px-1 dd-py-0.5 dd-border dd-rounded-md',
        {
          '!dd-hidden': !visible,
          'dd-bg-slate-100 dd-border-slate-300 dd-text-slate-700 dark:dd-bg-slate-800 dark:dd-border-slate-700 dark:dd-text-slate-300':
            color === undefined,
          'dd-bg-blue-100 dd-border-blue-500 dd-text-blue-500 dark:dd-bg-blue-500/30': color === 'processing',
          'dd-bg-green-50 dd-border-green-400 dd-text-green-600 dark:dd-bg-green-500/20': color === 'success',
          'dd-bg-red-50 dd-border-red-500 dd-text-red-500 dark:dd-bg-red-500/20': color === 'error',
          'dd-bg-yellow-50 dd-border-orange-500 dd-text-orange-500 dark:dd-bg-orange-500/20': color === 'warning',
          //
          '!dd-border-0': !bordered,
        },
        className,
      )}
      style={style}
    >
      <>
        {iconNode}
        {children && (
          <Typography.Text uiType='transparent' size='xs' className='dd-whitespace-nowrap'>
            {children}
          </Typography.Text>
        )}
      </>
      {closable && (
        <CloseIcon
          onClick={handleCloseClick}
          className='dd-w-[12px] dd-h-[12px] dd-text-slate-600 hover:dd-text-slate-800 dark:dd-text-slate-400 hover:dark:dd-text-slate-200 hover:dd-scale-125 dd-transition-all dd-duration-300 dd-cursor-pointer'
        />
      )}
    </span>
  )

  return tagNode
})

Tag.displayName = 'Tag'
export default Tag
