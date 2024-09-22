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
import { cn } from '../utils/cn'
import Typography from './Typography'
import { AlertProps } from '../types'
import { cva } from 'class-variance-authority'
import Flex from './Flex'
import { ReactComponent as ErrorIcon } from './../assets/icons/x-circle.svg'
import { ReactComponent as SuccessIcon } from './../assets/icons/check-circle.svg'
import { ReactComponent as InfoIcon } from './../assets/icons/information-circle.svg'
import { ReactComponent as WarningIcon } from './../assets/icons/exclamation-circle.svg'

const { Text } = Typography

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const alertVariants = cva('w-full rounded-lg border', {
  variants: {
    type: {
      neutral: 'bg-white dark:bg-dark-850 border-secondary-200 dark:border-dark-800',
      success: 'bg-success/10 dark:bg-success/20 border-success/30 dark:border-success/30',
      info: 'bg-primary-400/10 dark:bg-primary-400/20 border-primary-400/30 dark:border-primary-400/30',
      warning: 'bg-warning/10 dark:bg-warning/20 border-warning/30 dark:border-warning/20',
      error: 'bg-error/10 dark:bg-error/20 border-error/30 dark:border-error/30',
    },
    paddingType: {
      small: 'px-3 py-2.5',
      large: 'px-5 py-4',
    },
  },
  defaultVariants: {
    type: 'neutral',
    paddingType: 'small',
  },
})

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for alert icons styles based on specified variants.
 */
const alertIconVariants = cva('mr-2 aspect-square', {
  variants: {
    type: {
      neutral: 'text-secondary-400 dark:text-dark-200',
      success: 'text-success/90 dark:text-success/70',
      info: 'text-primary-400/90 dark:text-primary-400/70',
      warning: 'text-warning/90 dark:text-warning/70',
      error: 'text-error/90 dark:text-error/70',
    },
    widthType: {
      small: 'w-[18px]',
      large: 'w-[24px]',
    },
  },
  defaultVariants: {
    type: 'neutral',
    widthType: 'small',
  },
})

/**
 * Alert component that allows for showing messages with different types.
 *
 * @param {object} props - Alert props.
 * @param {string} [props.className] - Additional classes to apply to the allert.
 * @param {string | React.ReactNode} [props.message] - Message of the alert
 * @param {string | React.ReactNode} [props.description] - Description of the alert
 * @param {string} [props.type] - Type of UI for the alert.
 * @param {boolean} [props.showIcon] - Indicates if the alert has the icon.
 * @param {boolean} [props.banner] - Indicates if the alert is a banner or not.
 *
 * @returns {React.ReactNode} Rendered Alert component.
 *
 * @version 0.1.2
 * @see https://www.npmjs.com/package/djuno-design#alert
 *
 * @example
 * // Example usage of Alert component:
 * <Alert type="info" message="Djuno Design. Info Alert" showIcon={true} />
 *
 *
 */
const Alert: React.FunctionComponent<AlertProps> = ({
  message,
  description,
  className,
  type,
  showIcon,
  banner,
  children,
}) => {
  return (
    <Flex
      items={'center'}
      className={cn(alertVariants({ type, paddingType: description ? 'large' : 'small' }), className, {
        'rounded-none border-0': banner,
      })}
    >
      <Flex items={description ? 'start' : 'center'}>
        {showIcon && type !== undefined && type !== 'neutral' && (
          <div className={cn(alertIconVariants({ type, widthType: description ? 'large' : 'small' }))}>
            {type === 'error' && <ErrorIcon />}
            {type === 'success' && <SuccessIcon />}
            {type === 'info' && <InfoIcon />}
            {type === 'warning' && <WarningIcon />}
          </div>
        )}
        <Flex direction='col'>
          <Flex items='center'>
            {typeof message === 'string' && (
              <Text size='sm' strong={!!description}>
                {message}
              </Text>
            )}
            {typeof message !== 'string' && <>{message}</>}
          </Flex>
          {description && (
            <Flex className='mt-2'>
              {typeof description === 'string' && <Text size='sm'>{description}</Text>}
              {typeof description !== 'string' && <>{description}</>}
            </Flex>
          )}
          <Flex>{children}</Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Alert
