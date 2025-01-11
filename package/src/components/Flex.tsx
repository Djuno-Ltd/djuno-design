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
const Flex: React.FunctionComponent<FlexProps> = ({
  children,
  direction,
  className,
  items,
  justify,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'dd-flex',
        {
          //direction
          'dd-flex-row':
            !direction || direction === 'row' || (typeof direction !== 'string' && direction?.default === 'row'),
          'dd-flex-row-reverse':
            direction === 'row-reverse' || (typeof direction !== 'string' && direction?.default === 'row-reverse'),
          'dd-flex-col': direction === 'col' || (typeof direction !== 'string' && direction?.default === 'col'),
          'dd-flex-col-reverse':
            direction === 'col-reverce' || (typeof direction !== 'string' && direction?.sm === 'col-reverce'),
          'sm:dd-flex-row': typeof direction !== 'string' && direction?.sm === 'row',
          'sm:dd-flex-row-reverse': typeof direction !== 'string' && direction?.sm === 'row-reverse',
          'sm:dd-flex-col': typeof direction !== 'string' && direction?.sm === 'col',
          'sm:dd-flex-col-reverse': typeof direction !== 'string' && direction?.sm === 'col-reverce',
          'md:dd-flex-row': typeof direction !== 'string' && direction?.md === 'row',
          'md:dd-flex-row-reverse': typeof direction !== 'string' && direction?.md === 'row-reverse',
          'md:dd-flex-col': typeof direction !== 'string' && direction?.md === 'col',
          'md:dd-flex-col-reverse': typeof direction !== 'string' && direction?.md === 'col-reverce',
          'lg:dd-flex-row': typeof direction !== 'string' && direction?.lg === 'row',
          'lg:dd-flex-row-reverse': typeof direction !== 'string' && direction?.lg === 'row-reverse',
          'lg:dd-flex-col': typeof direction !== 'string' && direction?.lg === 'col',
          'lg:dd-flex-col-reverse': typeof direction !== 'string' && direction?.lg === 'col-reverce',
          'xl:dd-flex-row': typeof direction !== 'string' && direction?.xl === 'row',
          'xl:dd-flex-row-reverse': typeof direction !== 'string' && direction?.xl === 'row-reverse',
          'xl:dd-flex-col': typeof direction !== 'string' && direction?.xl === 'col',
          'xl:dd-flex-col-reverse': typeof direction !== 'string' && direction?.xl === 'col-reverce',
          '2xl:dd-flex-row': direction && typeof direction !== 'string' && direction['2xl'] === 'row',
          '2xl:dd-flex-row-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'row-reverse',
          '2xl:dd-flex-col': direction && typeof direction !== 'string' && direction['2xl'] === 'col',
          '2xl:dd-flex-col-reverse': direction && typeof direction !== 'string' && direction['2xl'] === 'col-reverce',

          //justify
          'dd-justify-start': justify === 'start' || (typeof justify !== 'string' && justify?.default === 'start'),
          'dd-justify-end': justify === 'end' || (typeof justify !== 'string' && justify?.default === 'end'),
          'dd-justify-center': justify === 'center' || (typeof justify !== 'string' && justify?.default === 'center'),
          'dd-justify-between':
            justify === 'between' || (typeof justify !== 'string' && justify?.default === 'between'),
          'dd-justify-around': justify === 'around' || (typeof justify !== 'string' && justify?.default === 'around'),
          'dd-justify-evenly': justify === 'evenly' || (typeof justify !== 'string' && justify?.default === 'evenly'),
          'dd-justify-stretch':
            justify === 'stretch' || (typeof justify !== 'string' && justify?.default === 'stretch'),
          'sm:dd-justify-start': typeof justify !== 'string' && justify?.sm === 'start',
          'sm:dd-justify-end': typeof justify !== 'string' && justify?.sm === 'end',
          'sm:dd-justify-center': typeof justify !== 'string' && justify?.sm === 'center',
          'sm:dd-justify-between': typeof justify !== 'string' && justify?.sm === 'between',
          'sm:dd-justify-around': typeof justify !== 'string' && justify?.sm === 'around',
          'sm:dd-justify-evenly': typeof justify !== 'string' && justify?.sm === 'evenly',
          'sm:dd-justify-stretch': typeof justify !== 'string' && justify?.sm === 'stretch',
          'md:dd-justify-start': typeof justify !== 'string' && justify?.md === 'start',
          'md:dd-justify-end': typeof justify !== 'string' && justify?.md === 'end',
          'md:dd-justify-center': typeof justify !== 'string' && justify?.md === 'center',
          'md:dd-justify-between': typeof justify !== 'string' && justify?.md === 'between',
          'md:dd-justify-around': typeof justify !== 'string' && justify?.md === 'around',
          'md:dd-justify-evenly': typeof justify !== 'string' && justify?.md === 'evenly',
          'md:dd-justify-stretch': typeof justify !== 'string' && justify?.md === 'stretch',
          'lg:dd-justify-start': typeof justify !== 'string' && justify?.lg === 'start',
          'lg:dd-justify-end': typeof justify !== 'string' && justify?.lg === 'end',
          'lg:dd-justify-center': typeof justify !== 'string' && justify?.lg === 'center',
          'lg:dd-justify-between': typeof justify !== 'string' && justify?.lg === 'between',
          'lg:dd-justify-around': typeof justify !== 'string' && justify?.lg === 'around',
          'lg:dd-justify-evenly': typeof justify !== 'string' && justify?.lg === 'evenly',
          'lg:dd-justify-stretch': typeof justify !== 'string' && justify?.lg === 'stretch',
          'xl:dd-justify-start': typeof justify !== 'string' && justify?.xl === 'start',
          'xl:dd-justify-end': typeof justify !== 'string' && justify?.xl === 'end',
          'xl:dd-justify-center': typeof justify !== 'string' && justify?.xl === 'center',
          'xl:dd-justify-between': typeof justify !== 'string' && justify?.xl === 'between',
          'xl:dd-justify-around': typeof justify !== 'string' && justify?.xl === 'around',
          'xl:dd-justify-evenly': typeof justify !== 'string' && justify?.xl === 'evenly',
          'xl:dd-justify-stretch': typeof justify !== 'string' && justify?.xl === 'stretch',
          '2xl:dd-justify-start': typeof justify !== 'string' && justify && justify['2xl'] === 'start',
          '2xl:dd-justify-end': typeof justify !== 'string' && justify && justify['2xl'] === 'end',
          '2xl:dd-justify-center': typeof justify !== 'string' && justify && justify['2xl'] === 'center',
          '2xl:dd-justify-between': typeof justify !== 'string' && justify && justify['2xl'] === 'between',
          '2xl:dd-justify-around': typeof justify !== 'string' && justify && justify['2xl'] === 'around',
          '2xl:dd-justify-evenly': typeof justify !== 'string' && justify && justify['2xl'] === 'evenly',
          '2xl:dd-justify-stretch': typeof justify !== 'string' && justify && justify['2xl'] === 'stretch',

          //items
          'dd-items-start': items === 'start' || (typeof items !== 'string' && items?.default === 'start'),
          'dd-items-end': items === 'end' || (typeof items !== 'string' && items?.default === 'end'),
          'dd-items-center': items === 'center' || (typeof items !== 'string' && items?.default === 'center'),
          'dd-items-baseline': items === 'baseline' || (typeof items !== 'string' && items?.default === 'baseline'),
          'dd-items-stretch': items === 'stretch' || (typeof items !== 'string' && items?.default === 'stretch'),
          'sm:dd-items-start': typeof items !== 'string' && items?.sm === 'start',
          'sm:dd-items-end': typeof items !== 'string' && items?.sm === 'end',
          'sm:dd-items-center': typeof items !== 'string' && items?.sm === 'center',
          'sm:dd-items-baseline': typeof items !== 'string' && items?.sm === 'baseline',
          'sm:dd-items-stretch': typeof items !== 'string' && items?.sm === 'stretch',
          'md:dd-items-start': typeof items !== 'string' && items?.md === 'start',
          'md:dd-items-end': typeof items !== 'string' && items?.md === 'end',
          'md:dd-items-center': typeof items !== 'string' && items?.md === 'center',
          'md:dd-items-baseline': typeof items !== 'string' && items?.md === 'baseline',
          'md:dd-items-stretch': typeof items !== 'string' && items?.md === 'stretch',
          'lg:dd-items-start': typeof items !== 'string' && items?.lg === 'start',
          'lg:dd-items-end': typeof items !== 'string' && items?.lg === 'end',
          'lg:dd-items-center': typeof items !== 'string' && items?.lg === 'center',
          'lg:dd-items-baseline': typeof items !== 'string' && items?.lg === 'baseline',
          'lg:dd-items-stretch': typeof items !== 'string' && items?.lg === 'stretch',
          'xl:dd-items-start': typeof items !== 'string' && items?.xl === 'start',
          'xl:dd-items-end': typeof items !== 'string' && items?.xl === 'end',
          'xl:dd-items-center': typeof items !== 'string' && items?.xl === 'center',
          'xl:dd-items-baseline': typeof items !== 'string' && items?.xl === 'baseline',
          'xl:dd-items-stretch': typeof items !== 'string' && items?.xl === 'stretch',
          '2xl:dd-items-start': typeof items !== 'string' && items && items['2xl'] === 'start',
          '2xl:dd-items-end': typeof items !== 'string' && items && items['2xl'] === 'end',
          '2xl:dd-items-center': typeof items !== 'string' && items && items['2xl'] === 'center',
          '2xl:dd-items-baseline': typeof items !== 'string' && items && items['2xl'] === 'baseline',
          '2xl:dd-items-stretch': typeof items !== 'string' && items && items['2xl'] === 'stretch',
        },
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export default Flex
