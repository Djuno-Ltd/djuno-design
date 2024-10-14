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
import { SimpletableProps, TableComponents, TableRowProps, TableTDProps, TableTHProps } from '../types/SimpleTable'
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
const SimpleTable: React.FC<React.PropsWithChildren<SimpletableProps>> & TableComponents = ({
  className,
  containerClassName,
  children,
  loading,
  loadingSetting,
}) => {
  const testLoading = false
  return (
    <div className={cn('dd-w-full dd-relative ', containerClassName, {})}>
      <div className='dd-overflow-x-auto dd-overflow-y-hidden'>
        <table
          className={cn(
            'dd-rounded-md dd-border dd-border-transparent dd-border-separate dd-border-spacing-0 dd-w-full dd-space-y-4',
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
            className='dd-absolute dd-w-full dd-h-full dd-top-0 dd-left-0 dd-bg-gray-400/10 dark:dd-bg-gray-800/10 dd-backdrop-blur-[1.1px] dd-flex dd-justify-center dd-items-center'
          >
            <Loading
              borderSize={loadingSetting?.borderSize || 2}
              uiType={loadingSetting?.uiType || 'simple'}
              uiSize={loadingSetting?.uiSize || 24}
              theme={loadingSetting?.theme || 'primary'}
              className={loadingSetting?.className}
            />
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
      {...rest}
      onClick={(e: React.MouseEvent<HTMLTableRowElement>) => (!disabled && onClick ? onClick(e) : null)}
      className={cn(
        'dd-group dd-duration-200 dd-transition-colors dd-bg-white dark:dd-bg-dark-850 ',
        {
          'dark:hover:dd-bg-dark-800 hover:dd-bg-[#f8fafc] ':
            (withoutHoverStyle === undefined || withoutHoverStyle === false) && !selected,
          'dark:!dd-bg-white/10 !dd-bg-[#eff5fe] ': selected,
          'dd-cursor-not-allowed': disabled,
          'dd-cursor-pointer': !disabled && onClick,
        },
        className,
      )}
    >
      {children}
    </tr>
  )
}

const SimpleTableHead = (props: React.PropsWithChildren) => <thead>{props.children}</thead>

const SimpleTableTH = (props: React.PropsWithChildren<TableTHProps>) => {
  const { className, children, ...rest } = props
  return (
    <th
      {...rest}
      className={cn(
        'dd-text-left dd-bg-white dark:dd-bg-dark-850 dd-border-b dark:dd-border-dark-700 dd-p-2',
        className,
      )}
    >
      <div className='dd-text-slate-400 dark:dd-text-slate-100 dd-font-light dd-overflow-hidden dd-whitespace-nowrap'>
        {children || props.lable}
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
        'dd-text-md dd-py-3 dd-px-2 dd-text-[#475569] dark:dd-text-slate-100 dd-border-b dark:dd-border-dark-700 ',
        className,
      )}
    >
      {children}
    </td>
  )
}

SimpleTable.Head = SimpleTableHead
SimpleTable.TH = SimpleTableTH
SimpleTable.Body = SimpleTableBody
SimpleTable.Row = SimpleTableRow
SimpleTable.TD = SimpleTableTD

export default SimpleTable
