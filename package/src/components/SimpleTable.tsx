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
import { cn } from '../utils/cn'
import { SimpletableProps, TableComponents, TableRowProps, TableTDProps } from '../types/SimpleTable'
import { motion, AnimatePresence } from 'framer-motion'
import Loading from './Loading'

/**
 * SimpleTable component that renders a table structure.
 *
 * @param {object} props - SimpleTable props.
 * @param {React.ReactNode} props.children - The content to be displayed within the Typography component.
 * @returns {React.ReactNode} Rendered SimpleTable component.
 *
 * @version 0.3.6
 * @see https://www.npmjs.com/package/djuno-design#simple-table
 *
 * @example
 * Example usage of Typography component:
 * <SimpleTable className="gap-3 w-full">
 *   <SimpleTable.Head>
 *     <SimpleTable.Row>
 *       <SimpleTable.TH>Header 1</SimpleTable.TH>
 *       <SimpleTable.TH>Header 2</SimpleTable.TH>
 *       <SimpleTable.TH>Header 3</SimpleTable.TH>
 *     </SimpleTable.Row>
 *   </SimpleTable.Head>
 *   <SimpleTable.Body>
 *     <SimpleTable.Row>
 *       <SimpleTable.TD>Data 1</SimpleTable.TD>
 *       <SimpleTable.TD>Data 2</SimpleTable.TD>
 *       <SimpleTable.TD>Data 3</SimpleTable.TD>
 *     </SimpleTable.Row>
 *   </SimpleTable.Body>
 * </SimpleTable>
 */
// eslint-disable-next-line react/prop-types
const SimpleTable: React.FC<SimpletableProps> & TableComponents = ({
  className,
  containerClassName,
  children,
  loading,
  withoutDefaultHeight,
}) => {
  const testLoading = false
  return (
    <div
      className={cn('dj-w-full dj-relative ', containerClassName, {
        'dj-min-h-[200px] ': withoutDefaultHeight === undefined || withoutDefaultHeight === false,
      })}
    >
      <div className='dj-overflow-x-auto dj-overflow-y-hidden'>
        <table
          className={cn(
            'dj-rounded-md dj-border dj-border-transparent dj-border-separate dj-border-spacing-0 dj-w-full dj-space-y-4',
            className,
          )}
        >
          {children}
        </table>
      </div>
      <AnimatePresence>
        {(loading || testLoading) && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='dj-absolute dj-w-full dj-h-full dj-top-0 dj-left-0 dj-bg-gray-400/10 dark:dj-bg-gray-800/10 dj-backdrop-blur-[1.1px] dj-flex dj-justify-center items-center'
          >
            <Loading type={'simple'} borderSize={2.3} theme={'primary'} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SimpleTableRow = (props: React.PropsWithChildren<TableRowProps>) => {
  const { className, withoutHoverStyle, selected, disabled, onClick, children, ...rest } = props
  return (
    <tr
      onClick={(e: React.MouseEvent<HTMLTableRowElement>) => (!disabled && onClick ? onClick(e) : null)}
      className={cn(className, 'dj-group dj-duration-200 dj-transition-colors dj-bg-white dark:dj-bg-dark-3', {
        'dark:hover:dj-bg-dark-2 hover:dj-bg-[#f8fafc] ':
          (withoutHoverStyle === undefined || withoutHoverStyle === false) && !selected,
        'dark:!dj-bg-white/10 !dj-bg-[#eff5fe] ': selected,
        'dj-cursor-not-allowed': disabled,
        'dj-cursor-pointer': !disabled && onClick,
      })}
    >
      {children}
    </tr>
  )
}

const SimpleTableHead = (props: React.PropsWithChildren) => <thead>{props.children}</thead>

const SimpleTableTH = (props: React.PropsWithChildren<{ lable?: string | React.ReactNode }>) => {
  return (
    <th className='dj-text-left dj-bg-white dark:dj-bg-dark-850 dj-border-b dark:dj-border-dark-700 dj-p-2'>
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
    <td
      {...rest}
      className={cn(
        'dj-text-md dj-py-3 dj-px-2 dj-text-[#475569] dark:dj-text-slate-100 dj-border-b dark:dj-border-dark-700 ',
        className,
      )}
    >
      <div className='dj-h-full dj-w-full dj-flex dj-items-center'>{children}</div>
    </td>
  )
}

SimpleTable.Head = SimpleTableHead
SimpleTable.TH = SimpleTableTH
SimpleTable.Body = SimpleTableBody
SimpleTable.Row = SimpleTableRow
SimpleTable.TD = SimpleTableTD

export default SimpleTable
