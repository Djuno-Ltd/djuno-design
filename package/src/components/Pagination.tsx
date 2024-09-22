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

/**
 * Pagination component that allows for customization of UI type, size, loading state, and more.
 *
 *
 * @param {object} props - Pagination props.
 * @param {number} props.limit - Number of items per page.
 * @param {number} props.offset - Current offset for pagination.
 * @param {number} props.total - Total number of items.
 * @param {number} [props.siblingCount] - Number of sibling pages to display around the current page.
 * @param {Function} props.onPageChange - Callback function triggered when page changes.
 * @param {number} props.onPageChange.offset - New offset value.
 * @param {number} props.onPageChange.limit - Number of items per page.
 * @param {React.ReactNode} [props.children] - Optional children to be rendered within the pagination.
 * @param {string} [props.className] - Additional CSS classes to apply to the pagination container.
 * @param {boolean} [props.loading] - Indicates if the component should display a loading state.
 * @param {SizeTypes} [props.size] - Size of the input field.
 *
 * @returns {React.ReactNode} Rendered Pagination component.
 *
 * @version 0.4.9
 * @see https://www.npmjs.com/package/djuno-design#pagination
 *
 * @example
 * // Example usage of Pagination component:
 *
 * function MyComponent() {
 *   const handlePageChange = (offset, limit) => {
 *     console.log(`Page changed to offset: ${offset}, limit: ${limit}`);
 *   };
 *
 *   return (
 *     <Pagination
 *       limit={limit}
 *       offset={offset}
 *       total={total}
 *       siblingCount={siblingCount}
 *       onPageChange={handlePageChange}
 *       className="custom-pagination"
 *       loading={false}
 *     >
 *       Optional children can go here
 *     </Pagination>
 *   );
 * }
 *
 */

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

  // Ensure that siblingCount is defined and is a number
  if (typeof siblingCount !== 'number' || siblingCount < 0) {
    throw new Error('Invalid siblingCount provided')
  }

  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    limit,
  })

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1]

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
    <ul className={cn('flex gap-0.5', { [className || '']: className })}>
      {/* Left navigation arrow */}
      <li
        className={cn(
          'w-7 h-7 flex justify-center items-center  rounded-full cursor-pointer transition-all duration-100 select-none',
          {
            'bg-slate-100 text-slate-500 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-slate-100':
              currentPage !== 1, //enable
            'bg-slate-100 text-slate-300 hover:bg-slate-100 hover:text-slate-300 dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-slate-500 !cursor-not-allowed':
              currentPage === 1, //disable
          },
        )}
        onClick={onPrevious}
      >
        <ArrowIcon className='w-4 rotate-180' />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={`page-item-${pageNumber}-${i}`}
                className={cn(
                  'w-7 h-7 flex justify-center items-center rounded-full cursor-default transition-all duration-100 bg-transparent text-slate-500 select-none',
                  { '!cursor-not-allowed': loading },
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
                'w-7 h-7 flex justify-center items-center rounded-full cursor-pointer transition-all duration-100 select-none text-sm',
                {
                  'bg-slate-100 text-slate-500 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-slate-300':
                    pageNumber !== currentPage, //not-selected
                  'bg-primary-500 text-white hover:bg-primary-500 hover:text-white': pageNumber === currentPage, //selected
                  '!cursor-not-allowed': loading,
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
          'w-7 h-7 flex justify-center items-center rounded-full cursor-pointer transition-all duration-100 select-none ',
          {
            'bg-slate-100 text-slate-500 hover:bg-primary-500 hover:text-white dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-slate-100':
              currentPage !== lastPage, //enable
            'bg-slate-100 text-slate-300 hover:bg-slate-100 hover:text-slate-300 dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-slate-500 !cursor-not-allowed':
              currentPage === lastPage, //disable
            '!cursor-not-allowed': loading,
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
  const length = end - start + 1
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
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [total, limit, siblingCount, currentPage])

  return paginationRange
}

export default Pagination
