/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Card Component
 * @copyright Djuno Design 2024
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
import { SimpletableProps, TableRowProps, TableTDProps } from '../types/SimpleTable'

// Define simpleTable variants using the `cva` utility function.
const simpleTableVariants = cva(
  'dj-rounded-md dj-border dj-border-transparent dj-border-separate dj-border-spacing-0 dj-w-full dj-space-y-4',
  {
    variants: {},
  },
)

const simpleTableRowVariants = cva('dj-group duration-200 dj-transition-colors dj-bg-white dark:dj-bg-dark-850', {
  variants: {},
})

const simpleTableHVariants = cva(
  'dj-text-left dj-bg-white dark:dj-bg-dark-850 dj-border-b dark:dj-border-dark-700 dj-p-2',
  {
    variants: {},
  },
)

const simpleTableTDVariants = cva(
  'dj-text-md dj-py-3 dj-px-2 dj-text-[#475569] dark:dj-text-slate-100 dj-border-b dark:dj-border-dark-700',
  {
    variants: {},
  },
)

// SimpleTable component that renders a table structure.
const SimpleTable: React.FC<SimpletableProps> = ({ className, containerClassName, children, ...props }) => {
  return (
    <div className={classNames('dj-w-full dj-relative dj-min-h-[200px]', containerClassName)}>
      <div className='dj-overflow-x-auto dj-overflow-y-hidden'>
        <table className={cn(simpleTableVariants(), className)}>{children}</table>
      </div>
      {/* <AnimatePresence>
        {(props.loading || testLoading) && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full h-full top-0 left-0 bg-gray-400/10 dark:bg-gray-800/10 backdrop-blur-[1.1px] flex justify-center items-center"
          >
            <LoadingSpin borderSize={2.3} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

const SimpleTableRow = (props: React.PropsWithChildren<TableRowProps>) => {
  const { className, withoutHoverStyle, selected, disabled, onClick, children, ...rest } = props
  return (
    <tr
      {...rest}
      onClick={(e: any) => (!disabled && onClick ? onClick(e) : null)}
      className={cn(
        simpleTableRowVariants(),
        {
          'dark:hover:dj-bg-dark-700 hover:dj-bg-[#f8fafc]':
            (withoutHoverStyle === undefined || withoutHoverStyle === false) && !selected,
          'dark:dj-bg-white/10 dj-bg-[#eff5fe]': selected,
          'dj-cursor-not-allowed': disabled,
          'dj-cursor-pointer': !disabled && onClick,
        },
        className,
      )}
    >
      {children}
    </tr>
  )
}

const SimpleTableHead = (props: React.PropsWithChildren) => <thead>{props.children}</thead>

const SimpleTableTH = (props: React.PropsWithChildren<{ lable?: string | React.ReactNode }>) => {
  return (
    <th className={cn(simpleTableHVariants())}>
      <div className='dj-text-slate-400 dark:dj-text-slate-100 dj-font-light dj-overflow-hidden dj-whitespace-nowrap'>
        {props.children || props.lable}
      </div>
    </th>
  )
}

const SimpleTableBody = (props: React.PropsWithChildren) => <tbody>{props.children}</tbody>

const SimpleTableTD = (props: React.PropsWithChildren<TableTDProps>) => {
  const { className, children, ...rest } = props
  return (
    <td {...rest} className={cn(simpleTableTDVariants(), className)}>
      <div className='dj-h-full dj-w-full dj-flex dj-items-center'>{children}</div>
    </td>
  )
}

export { SimpleTableRow, SimpleTableHead, SimpleTableBody, SimpleTableTH, SimpleTableTD }
export default SimpleTable
