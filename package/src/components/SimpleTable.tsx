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
import { SimpletableProps, TableRowProps, TableTDProps } from '../types/SimpleTable'

/**
 * Define simpleTable variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */

const simpleTableVariants = cva(
  'dj-rounded-md dj-border dj-border-transparent dj-border-separate dj-border-spacing-0 dj-w-full dj-space-y-4',
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
const simpleTableRowVariants = cva('dj-group duration-200 dj-transition-colors dj-bg-white dark:dj-bg-dark-3', {
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
})
const simpleTableHVariants = cva(
  'dj-text-left dj-bg-white dark:dj-bg-dark-3 dj-border-b darkdj-:border-dark-2 dj-p-2',
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
const simpleTableTDVariants = cva(
  'dj-text-md py-3 dj-px-2 dj-text-[#475569] dark:dj-text-slate-100 dj-border-b dark:dj-border-dark-2',
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
 * SimpleTable component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - SimpleTable props.
 * @param {React.ReactNode} [props.children] - The content inside the emptystate.
 * @param {string} [props.className] - Additional classes to apply to the simpleTable.
 * @param {boolean} [props.containerClassName] - Indicates if the emptystate has the containerClassName.
 *
 * @returns {React.ReactNode} Rendered SimpleTable component.
 *
 * @version 0.0.4
 * @see https://www.npmjs.com/package/djuno-design#simpleTable
 *
 * @example
 * // Example usage of SimpleTable component:
 *
 *
 *
 */

const SimpleTable: React.FC<SimpletableProps> = ({ loading, className, containerClassName, ...props }) => {
  return (
    <div className={classNames('relative min-h-[200px]', containerClassName)}>
      <div className='overflow-x-auto overflow-y-hidden'>
        <table
          className={cn(simpleTableVariants({}), {
            // [tagLoadingClass]: props.loading,
            [className || '']: className,
          })}
        >
          {props.children}
        </table>
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

const TableRow = (props: React.PropsWithChildren<TableRowProps>) => {
  const { className, withoutHoverStyle, selected, disabled, onClick, ...rest } = props
  return (
    <tr
      {...rest}
      onClick={(e: any) => (!disabled && onClick ? onClick(e) : null)}
      className={cn(simpleTableRowVariants, {
        'dark:hover:dj-bg-dark-2 hover:dj-bg-[#f8fafc] ':
          (withoutHoverStyle === undefined || withoutHoverStyle === false) && !selected,
        'dark:dj-bg-white/10 dj-bg-[#eff5fe] ': selected,
        'dj-cursor-not-allowed': disabled,
        'dj-cursor-pointer': !disabled && onClick,
      })}
    >
      {props.children}
    </tr>
  )
}

const TableHead = (props: React.PropsWithChildren) => <thead>{props.children}</thead>

const TableTH = (props: React.PropsWithChildren<{ lable?: string | React.ReactNode }>) => {
  return (
    <th className={cn(simpleTableHVariants, {})}>
      <div className='dj-text-slate-400 dark:dj-text-slate-100 dj-font-light dj-overflow-hidden dj-whitespace-nowrap'>
        {props.children || props.lable}
      </div>
    </th>
  )
}

const TableBody = (props: React.PropsWithChildren) => <tbody>{props.children}</tbody>

const TableTD = (props: React.PropsWithChildren<TableTDProps>) => {
  const { className, children, ...rest } = props
  return (
    <td {...rest} className={cn(simpleTableTDVariants, props.className)}>
      <div className='dj-h-full dj-w-full dj-flex dj-items-center'>{props.children}</div>
    </td>
  )
}

export { TableRow, TableHead, TableBody, TableTH, TableTD }
export default SimpleTable
