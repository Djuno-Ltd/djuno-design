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
import cn from '../utils/cn'

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
          'dj-flex-row': !direction || direction === 'row',
          'dj-flex-row-reverse': direction === 'row-reverse',
          'dj-flex-col': direction === 'col',
          'dj-flex-col-reverse': direction === 'col-reverce',

          //justify
          'dj-justify-start': !justify || justify === 'start',
          'dj-justify-end': justify === 'end',
          'dj-justify-center': justify === 'center',
          'dj-justify-between': justify === 'between',
          'dj-justify-around': justify === 'around',
          'dj-justify-evenly': justify === 'evenly',
          'dj-justify-stretch': justify === 'stretch',

          //items
          'dj-items-start': !items || items === 'start',
          'dj-items-end': items === 'end',
          'dj-items-center': items === 'center',
          'dj-items-baseline': items === 'baseline',
          'dj-items-stretch': items === 'stretch',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Flex
