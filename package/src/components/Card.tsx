/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
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
import { CardProps } from '../types'
import { cn } from '../utils/cn'
import Flex from './Flex'
import Typography from './Typography'

/**
 * Card component renders a customizable card with optional title, description, and setting.
 *
 * @param {object} props - The properties of the Card component.
 * @param {React.ReactNode} [props.children] - The content inside the card.
 * @param {string} [props.id] - The HTML id attribute of the card.
 * @param {string} [props.title] - The title of the card.
 * @param {string} [props.description] - The description of the card.
 * @param {React.ReactNode} [props.setting] - Additional setting to be displayed on the card header.
 * @param {string} [props.className] - Additional CSS classes for the card container.
 * @param {string} [props.headerClassName] - Additional CSS classes for the card header.
 * @param {string} [props.titleClassName] - Additional CSS classes for the card title.
 * @param {string} [props.descriptionClassName] - Additional CSS classes for the card description.
 * @returns {React.ReactNode} Rendered Card component.
 *
 * @version 0.0.5
 * @see https://www.npmjs.com/package/djuno-design#card
 *
 * @example
 * // Basic usage:
 * <Card
 *   title="Title"
 *   description="Description content goes here."
 *   setting={<SettingComponent />}
 * />
 *
 * // Advanced usage:
 * <Card
 *   id="my-card"
 *   title="Title"
 *   description="Description content goes here."
 *   setting={<SettingComponent />}
 *   className="custom-card"
 *   headerClassName="custom-header"
 *   titleClassName="custom-title"
 *   descriptionClassName="custom-description"
 * >
 *   <CardContent />
 * </Card>
 */
const Card: React.FunctionComponent<CardProps> = ({
  children,
  id,
  title,
  titleLevel,
  description,
  setting,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <Flex
      id={id ? id : typeof title === 'string' ? title : undefined}
      direction='col'
      className={cn(
        'dd-w-full dd-rounded-xl dd-bg-white dark:dd-bg-dark-900 dd-border dd-border-secondary-200 dark:dd-border-dark-800 dd-p-6',
        { 'dd-pt-4': title },
        className,
      )}
    >
      {(title || description || setting) && (
        <div
          className={cn(
            'dd-w-full dd-border-b dd-border-secondary-200 dark:dd-border-dark-800 dd-mb-6',
            headerClassName,
          )}
        >
          <Flex items='start' justify='between' className={'dd-w-full dd-mb-2'}>
            <Flex direction='col' className='dd-w-full'>
              {typeof title === 'string' ? (
                <Typography.Title level={titleLevel || 5} className={cn('dd-mb-0', titleClassName)}>
                  {title}
                </Typography.Title>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <Typography.Text uiType='secondary' size='sm' className={cn(descriptionClassName)}>
                  {description}
                </Typography.Text>
              ) : (
                description
              )}
            </Flex>
            {setting}
          </Flex>
        </div>
      )}
      <div className='dd-w-full'>{children}</div>
    </Flex>
  )
}

export default Card
