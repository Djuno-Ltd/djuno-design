/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Countdown Component
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

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Typography from './Typography'
import { cn } from '../utils/cn'
import { ICountdownProps } from '../types/ICountdown'

/**
 * Countdown component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - Countdown props.
 * @param {React.ReactNode} [props.children] - The content inside the Countdown.
 * @param {string} [props.seconds] - The initial time in seconds for the countdown.
 * @param {string} [props.className] - Additional className to apply custom styling to the countdown component.
 * @param {string} [props.showTimer] - Determines whether to show the timer visually.
 * @param {Array<AccordionItem>} [props.timerPosition] - Specifies the position of the timer.
 * @param {boolean} [props.timerRender] - A function to customize the rendering of the countdown timer.
 * @param {boolean} [props.onClick] - A callback function that triggers when the countdown is clicked.
 *
 * @returns {React.ReactNode} Rendered Countdown component.
 *
 * @version 0.4.6
 * @see https://www.npmjs.com/package/djuno-design#countdown
 *
 * @example
 * // Example usage of Countdown component:
 *
 * function MyComponent() {
 *   return (
 *     <Countdown
 *              seconds={5}
 *              timerPosition="end"
 *              className="p-2"
 *             timerRender={({ formatedTime, timeLeft }) => {
 *               if (timeLeft === 0) return null;
 *             return <Text className="text-xs">{formatedTime}</Text>;
 *            }}
 *        />
 *   );
 * }
 */

const { Text } = Typography

const Countdown: React.FC<ICountdownProps & { ref?: any }> = forwardRef(
  ({ seconds, children, className, showTimer = true, timerPosition = 'start', timerRender, onClick }, ref) => {
    const [timeLeft, setTimeLeft] = useState<number>(seconds)

    useEffect(() => {
      setTimeLeft(seconds)
    }, [seconds])

    useEffect(() => {
      if (timeLeft <= 0) return

      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }, [timeLeft])

    const formatTime = (secs: number): string => {
      const days = Math.floor(secs / (3600 * 24))
      const hrs = Math.floor((secs % (3600 * 24)) / 3600)
      const mins = Math.floor((secs % 3600) / 60)
      const secsLeft = secs % 60

      let formattedTime = ''

      if (days > 0) {
        formattedTime += `${days}d `
      }
      if (hrs > 0 || days > 0) {
        formattedTime += `${hrs.toString().padStart(2, '0')}:`
      }

      formattedTime += `${mins.toString().padStart(2, '0')}:`
      formattedTime += `${secsLeft.toString().padStart(2, '0')}`

      return formattedTime.trim()
    }

    const disabled = React.useMemo(() => timeLeft > 0, [timeLeft])

    const timer = () => {
      if (!showTimer) return <></>
      if (timerRender)
        return timerRender({
          formatedTime: formatTime(timeLeft),
          timeLeft,
          disabled,
        })
      return <Text className='dd-text-sm !dd-w-auto'>{formatTime(timeLeft)}</Text>
    }

    useImperativeHandle(ref, () => ({
      resetCountdown: () => {
        setTimeLeft(seconds)
      },
    }))

    return (
      <div
        className={cn(
          'dd-flex dd-items-center dd-w-full dd-h-full dd-gap-1',
          {
            'dd-cursor-not-allowed': disabled,
          },
          className,
        )}
        onClick={() => {
          if (!disabled && onClick) onClick()
        }}
      >
        {timerPosition === 'start' && timer()}
        {typeof children === 'function'
          ? children({
              disabled,
              timeLeft,
              formatedTime: formatTime(timeLeft),
            })
          : children}
        {timerPosition === 'end' && timer()}
      </div>
    )
  },
)

Countdown.displayName = 'Countdown'
export default Countdown
