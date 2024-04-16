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
        'dj-flex',
        {
          //direction
          'dj-flex-row':
            !direction || direction === 'row' || (typeof direction !== 'string' && direction?.default === 'row'),
          'dj-flex-row-reverse':
            direction === 'row-reverse' || (typeof direction !== 'string' && direction?.default === 'row-reverse'),
          'dj-flex-col': direction === 'col' || (typeof direction !== 'string' && direction?.default === 'col'),
          'dj-flex-col-reverse':
            direction === 'col-reverce' || (typeof direction !== 'string' && direction?.sm === 'col-reverce'),
          'sm:dj-flex-row': typeof direction !== 'string' && direction?.sm === 'row',
          'sm:dj-flex-row-reverse': typeof direction !== 'string' && direction?.sm === 'row-reverse',
          'sm:dj-flex-col': typeof direction !== 'string' && direction?.sm === 'col',
          'sm:dj-flex-col-reverse': typeof direction !== 'string' && direction?.sm === 'col-reverce',
          'md:dj-flex-row': typeof direction !== 'string' && direction?.md === 'row',
          'md:dj-flex-row-reverse': typeof direction !== 'string' && direction?.md === 'row-reverse',
          'md:dj-flex-col': typeof direction !== 'string' && direction?.md === 'col',
          'md:dj-flex-col-reverse': typeof direction !== 'string' && direction?.md === 'col-reverce',
          'lg:dj-flex-row': typeof direction !== 'string' && direction?.lg === 'row',
          'lg:dj-flex-row-reverse': typeof direction !== 'string' && direction?.lg === 'row-reverse',
          'lg:dj-flex-col': typeof direction !== 'string' && direction?.lg === 'col',
          'lg:dj-flex-col-reverse': typeof direction !== 'string' && direction?.lg === 'col-reverce',
          'xl:dj-flex-row': typeof direction !== 'string' && direction?.xl === 'row',
          'xl:dj-flex-row-reverse': typeof direction !== 'string' && direction?.xl === 'row-reverse',
          'xl:dj-flex-col': typeof direction !== 'string' && direction?.xl === 'col',
          'xl:dj-flex-col-reverse': typeof direction !== 'string' && direction?.xl === 'col-reverce',
          '2xl:dj-flex-row': direction && typeof direction !== 'string' && direction['2xl'] === 'row',
          '2xl:dj-flex-row-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'row-reverse',
          '2xl:dj-flex-col': direction && typeof direction !== 'string' && direction['2xl'] === 'col',
          '2xl:dj-flex-col-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'col-reverce',

          //justify
          'dj-justify-start':
            !justify || justify === 'start' || (typeof justify !== 'string' && justify?.default === 'start'),
          'dj-justify-end': justify === 'end' || (typeof justify !== 'string' && justify?.default === 'end'),
          'dj-justify-center': justify === 'center' || (typeof justify !== 'string' && justify?.default === 'center'),
          'dj-justify-between':
            justify === 'between' || (typeof justify !== 'string' && justify?.default === 'between'),
          'dj-justify-around': justify === 'around' || (typeof justify !== 'string' && justify?.default === 'around'),
          'dj-justify-evenly': justify === 'evenly' || (typeof justify !== 'string' && justify?.default === 'evenly'),
          'dj-justify-stretch':
            justify === 'stretch' || (typeof justify !== 'string' && justify?.default === 'stretch'),
          'sm:dj-justify-start': typeof justify !== 'string' && justify?.sm === 'start',
          'sm:dj-justify-end': typeof justify !== 'string' && justify?.sm === 'end',
          'sm:dj-justify-center': typeof justify !== 'string' && justify?.sm === 'center',
          'sm:dj-justify-between': typeof justify !== 'string' && justify?.sm === 'between',
          'sm:dj-justify-around': typeof justify !== 'string' && justify?.sm === 'around',
          'sm:dj-justify-evenly': typeof justify !== 'string' && justify?.sm === 'evenly',
          'sm:dj-justify-stretch': typeof justify !== 'string' && justify?.sm === 'stretch',
          'md:dj-justify-start': typeof justify !== 'string' && justify?.md === 'start',
          'md:dj-justify-end': typeof justify !== 'string' && justify?.md === 'end',
          'md:dj-justify-center': typeof justify !== 'string' && justify?.md === 'center',
          'md:dj-justify-between': typeof justify !== 'string' && justify?.md === 'between',
          'md:dj-justify-around': typeof justify !== 'string' && justify?.md === 'around',
          'md:dj-justify-evenly': typeof justify !== 'string' && justify?.md === 'evenly',
          'md:dj-justify-stretch': typeof justify !== 'string' && justify?.md === 'stretch',
          'lg:dj-justify-start': typeof justify !== 'string' && justify?.lg === 'start',
          'lg:dj-justify-end': typeof justify !== 'string' && justify?.lg === 'end',
          'lg:dj-justify-center': typeof justify !== 'string' && justify?.lg === 'center',
          'lg:dj-justify-between': typeof justify !== 'string' && justify?.lg === 'between',
          'lg:dj-justify-around': typeof justify !== 'string' && justify?.lg === 'around',
          'lg:dj-justify-evenly': typeof justify !== 'string' && justify?.lg === 'evenly',
          'lg:dj-justify-stretch': typeof justify !== 'string' && justify?.lg === 'stretch',
          'xl:dj-justify-start': typeof justify !== 'string' && justify?.xl === 'start',
          'xl:dj-justify-end': typeof justify !== 'string' && justify?.xl === 'end',
          'xl:dj-justify-center': typeof justify !== 'string' && justify?.xl === 'center',
          'xl:dj-justify-between': typeof justify !== 'string' && justify?.xl === 'between',
          'xl:dj-justify-around': typeof justify !== 'string' && justify?.xl === 'around',
          'xl:dj-justify-evenly': typeof justify !== 'string' && justify?.xl === 'evenly',
          'xl:dj-justify-stretch': typeof justify !== 'string' && justify?.xl === 'stretch',
          '2xl:dj-justify-start': typeof justify !== 'string' && justify && justify['2xl'] === 'start',
          '2xl:dj-justify-end': typeof justify !== 'string' && justify && justify['2xl'] === 'end',
          '2xl:dj-justify-center': typeof justify !== 'string' && justify && justify['2xl'] === 'center',
          '2xl:dj-justify-between': typeof justify !== 'string' && justify && justify['2xl'] === 'between',
          '2xl:dj-justify-around': typeof justify !== 'string' && justify && justify['2xl'] === 'around',
          '2xl:dj-justify-evenly': typeof justify !== 'string' && justify && justify['2xl'] === 'evenly',
          '2xl:dj-justify-stretch': typeof justify !== 'string' && justify && justify['2xl'] === 'stretch',

          //items
          'dj-items-start': !items || items === 'start' || (typeof items !== 'string' && items?.default === 'start'),
          'dj-items-end': items === 'end' || (typeof items !== 'string' && items?.default === 'end'),
          'dj-items-center': items === 'center' || (typeof items !== 'string' && items?.default === 'center'),
          'dj-items-baseline': items === 'baseline' || (typeof items !== 'string' && items?.default === 'baseline'),
          'dj-items-stretch': items === 'stretch' || (typeof items !== 'string' && items?.default === 'stretch'),
          'sm:dj-items-start': typeof items !== 'string' && items?.sm === 'start',
          'sm:dj-items-end': typeof items !== 'string' && items?.sm === 'end',
          'sm:dj-items-center': typeof items !== 'string' && items?.sm === 'center',
          'sm:dj-items-baseline': typeof items !== 'string' && items?.sm === 'baseline',
          'sm:dj-items-stretch': typeof items !== 'string' && items?.sm === 'stretch',
          'md:dj-items-start': typeof items !== 'string' && items?.md === 'start',
          'md:dj-items-end': typeof items !== 'string' && items?.md === 'end',
          'md:dj-items-center': typeof items !== 'string' && items?.md === 'center',
          'md:dj-items-baseline': typeof items !== 'string' && items?.md === 'baseline',
          'md:dj-items-stretch': typeof items !== 'string' && items?.md === 'stretch',
          'lg:dj-items-start': typeof items !== 'string' && items?.lg === 'start',
          'lg:dj-items-end': typeof items !== 'string' && items?.lg === 'end',
          'lg:dj-items-center': typeof items !== 'string' && items?.lg === 'center',
          'lg:dj-items-baseline': typeof items !== 'string' && items?.lg === 'baseline',
          'lg:dj-items-stretch': typeof items !== 'string' && items?.lg === 'stretch',
          'xl:dj-items-start': typeof items !== 'string' && items?.xl === 'start',
          'xl:dj-items-end': typeof items !== 'string' && items?.xl === 'end',
          'xl:dj-items-center': typeof items !== 'string' && items?.xl === 'center',
          'xl:dj-items-baseline': typeof items !== 'string' && items?.xl === 'baseline',
          'xl:dj-items-stretch': typeof items !== 'string' && items?.xl === 'stretch',
          '2xl:dj-items-start': typeof items !== 'string' && items && items['2xl'] === 'start',
          '2xl:dj-items-end': typeof items !== 'string' && items && items['2xl'] === 'end',
          '2xl:dj-items-center': typeof items !== 'string' && items && items['2xl'] === 'center',
          '2xl:dj-items-baseline': typeof items !== 'string' && items && items['2xl'] === 'baseline',
          '2xl:dj-items-stretch': typeof items !== 'string' && items && items['2xl'] === 'stretch',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Flex
