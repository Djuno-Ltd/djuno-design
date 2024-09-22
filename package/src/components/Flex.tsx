/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Flex Component
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
import { FlexProps } from '../types'
import { cn } from '../utils/cn'

/**
 * Flex component that provides flexible layout options.
 *
 * @param {object} props - Flex component props.
 * @param {React.ReactNode} props.children - The content to be laid out flexibly.
 * @param {FlexDirection} [props.direction] - The direction of the flex container.
 * @param {FlexItems} [props.items] - The alignment of flex items within the flex container.
 * @param {FlexJustify} [props.justify] - The alignment of flex items along the main axis of the flex container.
 * @param {string} [props.className] - Additional CSS classes to apply to the flex container.
 * @returns {React.ReactNode} Rendered Flex container with children.
 *
 * @version 0.0.4
 * @see https://www.npmjs.com/package/djuno-design#flex
 *
 * @example
 * <Flex direction="row" justify="center" items="center" className="bg-gray-200">
 *   <div className="bg-blue-500 p-4">Item 1</div>
 *   <div className="bg-green-500 p-4">Item 2</div>
 *   <div className="bg-red-500 p-4">Item 3</div>
 * </Flex>
 */
const Flex: React.FunctionComponent<FlexProps> = ({ children, direction, className, items, justify, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'flex',
        {
          //direction
          'flex-row':
            !direction || direction === 'row' || (typeof direction !== 'string' && direction?.default === 'row'),
          'flex-row-reverse':
            direction === 'row-reverse' || (typeof direction !== 'string' && direction?.default === 'row-reverse'),
          'flex-col': direction === 'col' || (typeof direction !== 'string' && direction?.default === 'col'),
          'flex-col-reverse':
            direction === 'col-reverce' || (typeof direction !== 'string' && direction?.sm === 'col-reverce'),
          'sm:flex-row': typeof direction !== 'string' && direction?.sm === 'row',
          'sm:flex-row-reverse': typeof direction !== 'string' && direction?.sm === 'row-reverse',
          'sm:flex-col': typeof direction !== 'string' && direction?.sm === 'col',
          'sm:flex-col-reverse': typeof direction !== 'string' && direction?.sm === 'col-reverce',
          'md:flex-row': typeof direction !== 'string' && direction?.md === 'row',
          'md:flex-row-reverse': typeof direction !== 'string' && direction?.md === 'row-reverse',
          'md:flex-col': typeof direction !== 'string' && direction?.md === 'col',
          'md:flex-col-reverse': typeof direction !== 'string' && direction?.md === 'col-reverce',
          'lg:flex-row': typeof direction !== 'string' && direction?.lg === 'row',
          'lg:flex-row-reverse': typeof direction !== 'string' && direction?.lg === 'row-reverse',
          'lg:flex-col': typeof direction !== 'string' && direction?.lg === 'col',
          'lg:flex-col-reverse': typeof direction !== 'string' && direction?.lg === 'col-reverce',
          'xl:flex-row': typeof direction !== 'string' && direction?.xl === 'row',
          'xl:flex-row-reverse': typeof direction !== 'string' && direction?.xl === 'row-reverse',
          'xl:flex-col': typeof direction !== 'string' && direction?.xl === 'col',
          'xl:flex-col-reverse': typeof direction !== 'string' && direction?.xl === 'col-reverce',
          '2xl:flex-row': direction && typeof direction !== 'string' && direction['2xl'] === 'row',
          '2xl:flex-row-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'row-reverse',
          '2xl:flex-col': direction && typeof direction !== 'string' && direction['2xl'] === 'col',
          '2xl:flex-col-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'col-reverce',

          //justify
          'justify-start':
            !justify || justify === 'start' || (typeof justify !== 'string' && justify?.default === 'start'),
          'justify-end': justify === 'end' || (typeof justify !== 'string' && justify?.default === 'end'),
          'justify-center': justify === 'center' || (typeof justify !== 'string' && justify?.default === 'center'),
          'justify-between': justify === 'between' || (typeof justify !== 'string' && justify?.default === 'between'),
          'justify-around': justify === 'around' || (typeof justify !== 'string' && justify?.default === 'around'),
          'justify-evenly': justify === 'evenly' || (typeof justify !== 'string' && justify?.default === 'evenly'),
          'justify-stretch': justify === 'stretch' || (typeof justify !== 'string' && justify?.default === 'stretch'),
          'sm:justify-start': typeof justify !== 'string' && justify?.sm === 'start',
          'sm:justify-end': typeof justify !== 'string' && justify?.sm === 'end',
          'sm:justify-center': typeof justify !== 'string' && justify?.sm === 'center',
          'sm:justify-between': typeof justify !== 'string' && justify?.sm === 'between',
          'sm:justify-around': typeof justify !== 'string' && justify?.sm === 'around',
          'sm:justify-evenly': typeof justify !== 'string' && justify?.sm === 'evenly',
          'sm:justify-stretch': typeof justify !== 'string' && justify?.sm === 'stretch',
          'md:justify-start': typeof justify !== 'string' && justify?.md === 'start',
          'md:justify-end': typeof justify !== 'string' && justify?.md === 'end',
          'md:justify-center': typeof justify !== 'string' && justify?.md === 'center',
          'md:justify-between': typeof justify !== 'string' && justify?.md === 'between',
          'md:justify-around': typeof justify !== 'string' && justify?.md === 'around',
          'md:justify-evenly': typeof justify !== 'string' && justify?.md === 'evenly',
          'md:justify-stretch': typeof justify !== 'string' && justify?.md === 'stretch',
          'lg:justify-start': typeof justify !== 'string' && justify?.lg === 'start',
          'lg:justify-end': typeof justify !== 'string' && justify?.lg === 'end',
          'lg:justify-center': typeof justify !== 'string' && justify?.lg === 'center',
          'lg:justify-between': typeof justify !== 'string' && justify?.lg === 'between',
          'lg:justify-around': typeof justify !== 'string' && justify?.lg === 'around',
          'lg:justify-evenly': typeof justify !== 'string' && justify?.lg === 'evenly',
          'lg:justify-stretch': typeof justify !== 'string' && justify?.lg === 'stretch',
          'xl:justify-start': typeof justify !== 'string' && justify?.xl === 'start',
          'xl:justify-end': typeof justify !== 'string' && justify?.xl === 'end',
          'xl:justify-center': typeof justify !== 'string' && justify?.xl === 'center',
          'xl:justify-between': typeof justify !== 'string' && justify?.xl === 'between',
          'xl:justify-around': typeof justify !== 'string' && justify?.xl === 'around',
          'xl:justify-evenly': typeof justify !== 'string' && justify?.xl === 'evenly',
          'xl:justify-stretch': typeof justify !== 'string' && justify?.xl === 'stretch',
          '2xl:justify-start': typeof justify !== 'string' && justify && justify['2xl'] === 'start',
          '2xl:justify-end': typeof justify !== 'string' && justify && justify['2xl'] === 'end',
          '2xl:justify-center': typeof justify !== 'string' && justify && justify['2xl'] === 'center',
          '2xl:justify-between': typeof justify !== 'string' && justify && justify['2xl'] === 'between',
          '2xl:justify-around': typeof justify !== 'string' && justify && justify['2xl'] === 'around',
          '2xl:justify-evenly': typeof justify !== 'string' && justify && justify['2xl'] === 'evenly',
          '2xl:justify-stretch': typeof justify !== 'string' && justify && justify['2xl'] === 'stretch',

          //items
          'items-start': !items || items === 'start' || (typeof items !== 'string' && items?.default === 'start'),
          'items-end': items === 'end' || (typeof items !== 'string' && items?.default === 'end'),
          'items-center': items === 'center' || (typeof items !== 'string' && items?.default === 'center'),
          'items-baseline': items === 'baseline' || (typeof items !== 'string' && items?.default === 'baseline'),
          'items-stretch': items === 'stretch' || (typeof items !== 'string' && items?.default === 'stretch'),
          'sm:items-start': typeof items !== 'string' && items?.sm === 'start',
          'sm:items-end': typeof items !== 'string' && items?.sm === 'end',
          'sm:items-center': typeof items !== 'string' && items?.sm === 'center',
          'sm:items-baseline': typeof items !== 'string' && items?.sm === 'baseline',
          'sm:items-stretch': typeof items !== 'string' && items?.sm === 'stretch',
          'md:items-start': typeof items !== 'string' && items?.md === 'start',
          'md:items-end': typeof items !== 'string' && items?.md === 'end',
          'md:items-center': typeof items !== 'string' && items?.md === 'center',
          'md:items-baseline': typeof items !== 'string' && items?.md === 'baseline',
          'md:items-stretch': typeof items !== 'string' && items?.md === 'stretch',
          'lg:items-start': typeof items !== 'string' && items?.lg === 'start',
          'lg:items-end': typeof items !== 'string' && items?.lg === 'end',
          'lg:items-center': typeof items !== 'string' && items?.lg === 'center',
          'lg:items-baseline': typeof items !== 'string' && items?.lg === 'baseline',
          'lg:items-stretch': typeof items !== 'string' && items?.lg === 'stretch',
          'xl:items-start': typeof items !== 'string' && items?.xl === 'start',
          'xl:items-end': typeof items !== 'string' && items?.xl === 'end',
          'xl:items-center': typeof items !== 'string' && items?.xl === 'center',
          'xl:items-baseline': typeof items !== 'string' && items?.xl === 'baseline',
          'xl:items-stretch': typeof items !== 'string' && items?.xl === 'stretch',
          '2xl:items-start': typeof items !== 'string' && items && items['2xl'] === 'start',
          '2xl:items-end': typeof items !== 'string' && items && items['2xl'] === 'end',
          '2xl:items-center': typeof items !== 'string' && items && items['2xl'] === 'center',
          '2xl:items-baseline': typeof items !== 'string' && items && items['2xl'] === 'baseline',
          '2xl:items-stretch': typeof items !== 'string' && items && items['2xl'] === 'stretch',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Flex
