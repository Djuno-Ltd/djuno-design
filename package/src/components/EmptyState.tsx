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
import { EmptyStateBodyProps, EmptyStateIconProps, EmptyStateIcons, EmptyStateProps } from '../types/EmptyState'
import { ReactComponent as InboxIcon } from './../assets/icons/inbox.svg'
import { ReactComponent as InboxArrowIcon } from './../assets/icons/inbox-arrow-down.svg'
import Typography from './Typography'

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
 * @version 0.3.7
 * @see https://www.npmjs.com/package/djuno-design#emptySate
 *
 * @example
 * // Example usage of EmptyState component:
 *
 * function MyComponent() {
 *   return (
 *     <EmptyState
 *       className="my-custom-class"
 *       icon={<CustomIcon />}
 *       iconClassName="custom-icon-class"
 *       textClassName="custom-text-class"
 *       usingIcon={true}
 *       usingText={true}
 *       text="No items found"
 *     />
 *   );
 * }
 */
// eslint-disable-next-line react/prop-types
const EmptyState: React.FC<EmptyStateProps> & EmptyStateIcons = (props): React.ReactNode => {
  return <EmptyStateBody {...props} />
}

const EmptyStateBody: React.FC<EmptyStateBodyProps> = ({
  text,
  icon,
  className,
  iconClassName,
  textClassName,
  usingIcon,
  usingText,
}): React.ReactNode => {
  return (
    <div
      className={cn(
        'w-full  flex flex-col gap-1 justify-center items-center text-slate-400 dark:text-gray-600',
        className,
      )}
    >
      {usingIcon || usingIcon === undefined ? icon || <DefaultIcon className={iconClassName} /> : null}
      <Typography.Text uiType='transparent' size='sm' className={textClassName}>
        {usingText || usingText === undefined ? text || 'No data' : null}
      </Typography.Text>
    </div>
  )
}

const SimpleIcon: React.FC<EmptyStateIconProps> = ({ className }) => {
  return <InboxIcon className={cn('w-14', className)} />
}

const DefaultIcon: React.FC<EmptyStateIconProps> = ({ className }) => {
  return <InboxArrowIcon className={cn('w-14', className)} />
}

EmptyState.PRESENTED_IMAGE_SIMPLE = SimpleIcon
EmptyState.PRESENTED_IMAGE_DEFAULT = DefaultIcon

export default EmptyState
