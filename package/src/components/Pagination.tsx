/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Pagination Component
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
import { PaginationProps } from '../types/IPagination'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-right.svg'

// /**
//  * Pagination component that allows for customization of UI type, size, loading state, and more.
//  *
//  *
//  * @param {object} props - Pagination props.
//  * @param {React.ReactNode} [props.children] - The content inside the Pagination.
//  * @param {string} [props.className] - Additional classes to apply to the Pagination.
//  * @param {boolean} [props.icon] - Indicates if the Pagination has the icon.
//  * @param {boolean} [props.iconClassName] - Indicates if the Pagination has the iconClassName.
//  * @param {boolean} [props.textClassName] - Indicates if the Pagination has the textClassName.
//  * @param {string} [props.type] - Type of the Action "hide" or "copy".
//  *
//  * @returns {React.ReactNode} Rendered Pagination component.
//  *
//  * @version 0.0.0
//  * @see https://www.npmjs.com/package/djuno-design#pagination
//  *
//  * @example
//  * // Example usage of SecureCopy component:
//  *
//  * function MyComponent() {
//  *   return (

//  *   );
//  * }
//  *
//  */

const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  limit,
  offset,
  total,
  siblingCount,
  onPageChange,
  className,
  loading,
}) => {
  const [currentPage, setCurrentPage] = React.useState(Math.floor(offset / limit) + 1)

  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount: 1,
    limit,
  })

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1]

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || Number(paginationRange?.length) < 2) {
    return null
  }

  const onNext = () => {
    if (!loading) {
      const prevPage = currentPage
      if (prevPage < Number(lastPage)) {
        setCurrentPage(prevPage + 1)
        const newOffset = prevPage * limit
        onPageChange(newOffset, limit)
      }
    }
  }

  const onPrevious = () => {
    if (!loading) {
      const prevPage = currentPage
      if (prevPage - 1 > 0) {
        setCurrentPage(prevPage - 1)
        const newOffset = (prevPage - 2) * limit
        onPageChange(newOffset, limit)
      }
    }
  }

  const onPage = (page: number) => {
    if (!loading) {
      setCurrentPage(page)
      const newOffset = (page - 1) * limit
      onPageChange(newOffset, limit)
    }
  }

  return (
    <ul className={cn('dj-flex dj-gap-0.5', { [className || '']: className })}>
      {/* Left navigation arrow */}
      <li
        className={cn(
          'dj-w-7 dj-h-7 dj-flex dj-justify-center dj-items-center  dj-rounded-full dj-cursor-pointer dj-transition-all dj-duration-100 dj-select-none',
          {
            'dj-bg-slate-100 dj-text-slate-500 hover:dj-bg-primary-500 hover:dj-text-white  dark:dj-bg-dark-1 dark:hover:dj-bg-dark-2 dark:dj-text-slate-100':
              currentPage !== 1, //enable
            'dj-bg-slate-100 dj-text-slate-300 hover:dj-bg-slate-100 hover:dj-text-slate-300  dark:dj-bg-dark-1 dark:hover:dj-bg-dark-2 dark:dj-text-slate-500 !dj-cursor-not-allowed':
              currentPage === 1, //disable
          },
        )}
        onClick={onPrevious}
      >
        <ArrowIcon className='dj-w-4 dj-rotate-180' />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={`page-item-${pageNumber}-${i}`}
                className={cn(
                  'dj-w-7 dj-h-7 dj-flex dj-justify-center dj-items-center dj-rounded-full dj-cursor-default dj-transition-all dj-duration-100 dj-bg-transparent dj-text-slate-500 dj-select-none',
                  { '!dj-cursor-not-allowed': loading },
                )}
              >
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li
              key={`page-item-${pageNumber}`}
              className={cn(
                'dj-w-7 dj-h-7 dj-flex dj-justify-center dj-items-center dj-rounded-full dj-cursor-pointer dj-transition-all dj-duration-100 dj-select-none dj-text-sm',
                {
                  'dj-bg-slate-100 dj-text-slate-500 hover:dj-bg-primary-500 hover:dj-text-white dark:dj-bg-dark-1 dark:hover:dj-bg-dark-2 dark:dj-text-slate-300':
                    pageNumber !== currentPage, //not-selected
                  'dj-bg-primary-500 dj-text-white hover:dj-bg-primary-500 hover:dj-text-white':
                    pageNumber === currentPage, //selected
                  '!dj-cursor-not-allowed': loading,
                },
              )}
              onClick={() => onPage(Number(pageNumber))}
            >
              {pageNumber}
            </li>
          )
        })}
      {/*  Right Navigation arrow */}
      <li
        className={cn(
          'dj-w-7 dj-h-7 dj-flex dj-justify-center dj-items-center  dj-rounded-full dj-cursor-pointer dj-transition-all dj-duration-100 dj-select-none',
          {
            'dj-bg-slate-100 dj-text-slate-500 hover:dj-bg-primary-500 hover:dj-text-white dark:dj-bg-dark-1 dark:hover:dj-bg-dark-2 dark:dj-text-slate-100':
              currentPage !== lastPage, //enable
            'dj-bg-slate-100 dj-text-slate-300 hover:dj-bg-slate-100 hover:dj-text-slate-300 dark:dj-bg-dark-1 dark:hover:dj-bg-dark-2 dark:dj-text-slate-500 !dj-cursor-not-allowed':
              currentPage === lastPage, //disable
            '!dj-cursor-not-allowed': loading,
          },
        )}
        onClick={onNext}
      >
        <ArrowIcon className='w-4' />
      </li>
    </ul>
  )
}

const range = (start: number, end: number) => {
  let length = end - start + 1
  /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
  return Array.from({ length }, (_, idx) => idx + start)
}

export const DOTS = '...'

export const usePagination = ({
  total,
  limit,
  siblingCount,
  currentPage,
}: {
  total: number
  limit: number
  siblingCount: number
  currentPage: number
}) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(total / limit)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
            Case 1:
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
          */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /*
              Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
          */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    /*
            We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
          */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
              Case 2: No left dots to show, but rights dots to be shown
          */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
              Case 3: No right dots to show, but left dots to be shown
          */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
              Case 4: Both left and right dots to be shown
          */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [total, limit, siblingCount, currentPage])

  return paginationRange
}

export default Pagination
