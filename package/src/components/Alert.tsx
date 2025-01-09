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
import { ReactComponent as CloseIcon } from './../assets/icons/close.svg'
const { Text } = Typography

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for alert styles based on specified variants.
 */
const alertVariants = cva('dd-w-full dd-rounded-lg dd-border', {
  variants: {
    uiType: {
      neutral: 'dd-bg-white dark:dd-bg-dark-850 dd-border-secondary-200 dark:dd-border-dark-800',
      success: 'dd-bg-success/10 dark:dd-bg-success/20 dd-border-success/30 dark:dd-border-success/30',
      info: 'dd-bg-primary-400/10 dark:dd-bg-primary-400/20 dd-border-primary-400/30 dark:dd-border-primary-400/30',
      warning: 'dd-bg-warning/10 dark:dd-bg-warning/20 dd-border-warning/30 dark:dd-border-warning/20',
      error: 'dd-bg-error/10 dark:dd-bg-error/20 dd-border-error/30 dark:dd-border-error/30',
    },
    paddingType: {
      small: 'dd-p-2.5',
      large: 'dd-p-4',
    },
  },
  defaultVariants: {
    uiType: 'neutral',
    paddingType: 'small',
  },
})

/**
 * Define button variants using the `cva` utility function.
 * This function generates CSS classes for alert icons styles based on specified variants.
 */
const alertIconVariants = cva('dd-mr-2 dd-aspect-square', {
  variants: {
    uiType: {
      neutral: 'dd-text-secondary-400 dark:dd-text-dark-200',
      success: 'dd-text-success/90 dark:dd-text-success/70',
      info: 'dd-text-primary-400/90 dark:dd-text-primary-400/70',
      warning: 'dd-text-warning/90 dark:dd-text-warning/70',
      error: 'dd-text-error/90 dark:dd-text-error/70',
    },
    widthType: {
      small: 'dd-w-[18px]',
      large: 'dd-w-[24px]',
    },
  },
  defaultVariants: {
    uiType: 'neutral',
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
 * @param {string} [props.uiType] - Type of UI for the alert.
 * @param {boolean} [props.showIcon] - Indicates if the alert has the icon.
 * @param {boolean} [props.banner] - Indicates if the alert is a banner or not.
 * @param {React.ReactNode} [props.children] - The content inside the alert.
 *  @param {boolean} [props.closable] - If true, displays a close button for dismissing the alert.
 * @param {() => void} [props.onClose] - Callback function triggered when the alert is closed, if `closable` is true.
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
  uiType,
  showIcon,
  banner,
  children,
  closable,
  onClose,
  style,
}) => {
  const [visible, setVisible] = React.useState(true)

  const handleCloseClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onClose?.()
    if (e.defaultPrevented) {
      return
    }
    setVisible(false)
  }

  return (
    <Flex
      items={'center'}
      className={cn(
        alertVariants({ uiType, paddingType: description ? 'large' : 'small' }),
        {
          'dd-rounded-none dd-border-0': banner,
          '!dd-hidden': !visible,
        },
        className,
      )}
      style={style}
    >
      <Flex items={description ? 'start' : 'center'} className='w-full'>
        {showIcon && uiType !== undefined && uiType !== 'neutral' && (
          <div className={cn(alertIconVariants({ uiType, widthType: description ? 'large' : 'small' }))}>
            {uiType === 'error' && <ErrorIcon />}
            {uiType === 'success' && <SuccessIcon />}
            {uiType === 'info' && <InfoIcon />}
            {uiType === 'warning' && <WarningIcon />}
          </div>
        )}
        <Flex direction='col' className='dd-flex-1'>
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
        {closable && (
          <CloseIcon
            onClick={handleCloseClick}
            className='dd-w-[12px] dd-h-[12px] dd-text-slate-600 hover:dd-text-slate-800 dark:dd-text-slate-400 hover:dark:dd-text-slate-200 hover:dd-scale-125 dd-transition-all dd-duration-300 dd-cursor-pointer'
          />
        )}
      </Flex>
    </Flex>
  )
}

export default Alert
