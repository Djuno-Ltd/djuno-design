import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip, PlacesType } from 'react-tooltip'
import uuid from '../utils/uuid'
import cn from '../utils/cn'

export interface TooltipProps extends PropsWithChildren {
  content: string
  clickable?: boolean
  place?: PlacesType
  theme?: TooltipTheme
}

type TooltipTheme = 'primary' | 'error'

const Tooltip: React.FunctionComponent<TooltipProps> = ({ children, content, clickable, place, theme }) => {
  const randomKey = uuid(10)
  return (
    <>
      <div data-tooltip-id={randomKey} data-tooltip-content={content}>
        {children}
      </div>
      <ReactTooltip
        id={randomKey}
        clickable={clickable}
        place={place}
        className={cn('dj-text-white dj-max-w-[250px] !dj-px-2 !dj-py-1 !dj-whitespace-normal dj-z-40', {
          '!dj-bg-primary-500 dark:dj-bg-primary-400': theme === undefined || theme === 'primary',
          '!dj-bg-red-500 dark:dj-bg-red-500': theme === 'error',
        })}
      />
    </>
  )
}

export default Tooltip
