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
import { EmptyStateIcons, EmptyStateProps, PRESENTED_IMAGE_DEFAULT, PRESENTED_IMAGE_SIMPLE } from '../types/EmptyState'
import { ReactComponent as InboxIcon } from './../assets/icons/inbox.svg'
import { ReactComponent as InboxArrowIcon } from './../assets/icons/inbox-arrow-down.svg'

/**
 * Define emptyState variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const emptyStateVariants = cva(
  'dj-w-full dj-min-h-[150px] dj-flex dj-flex-col dj-gap-1 dj-justify-center dj-items-center  dj-text-slate-400 dj-dark:text-gray-600',
  {
    variants: {
      //   uiType: {
      //     simple: '',
      //     primary: '',
      //     light: '',
      // //   },
      //   size: {
      //     small: 'dj-text-xs dj-px-3 dj-h-7',
      //     medium: 'dj-text-sm dj-px-4 dj-h-9',
      //     large: 'dj-text-base dj-px-5 dj-h-11',
      //   },
    },
    // defaultVariants: {
    //   uiType: 'simple',
    //   size: 'medium',
    // },
  },
)

/**
 * EmptyState component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - EmptyState props.
 * @param {React.ReactNode} [props.children] - The content inside the emptystate.
 * @param {string} [props.className] - Additional classes to apply to the emptystate.
 * @param {boolean} [props.icon] - Indicates if the emptystate has the icon.
 * @param {boolean} [props.iconClassName] - Indicates if the emptystate has the iconClassName.
 * @param {boolean} [props.textClassName] - Indicates if the emptystate has the textClassName.
 *
 * @returns {React.ReactNode} Rendered EmptyState component.
 *
 * @version 0.0.4
 * @see https://www.npmjs.com/package/djuno-design#emptySate
 *
 * @example
 * // Example usage of EmptyState component:
 *
 *
 *
 */

const EmptyState: React.FC<EmptyStateProps> & EmptyStateIcons = ({
  text,
  icon,
  className,
  iconClassName,
  textClassName,
  usingIcon,
  usingText,
  ...props
}) => {
  return (
    <div className={cn(emptyStateVariants({}), className, {})}>
      {usingIcon || usingIcon === undefined
        ? icon || <EmptyState.PRESENTED_IMAGE_DEFAULT {...{ iconClassName }} />
        : null}
      <span className={classNames('dj-text-sm dj-font-medium', textClassName)}>
        {usingText || usingText === undefined ? text || 'No data' : null}
      </span>
    </div>
  )
}

const PRESENTED_IMAGE_SIMPLE: React.FC<PRESENTED_IMAGE_SIMPLE> = ({ iconClassName }) => {
  return <InboxIcon className={classNames('dj-w-14', iconClassName)} />
}
const PRESENTED_IMAGE_DEFAULT: React.FC<PRESENTED_IMAGE_DEFAULT> = ({ iconClassName }) => {
  return <InboxArrowIcon className={classNames('dj-w-14', iconClassName)} />
}

EmptyState.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE
EmptyState.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT

export default EmptyState
