import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
// import uuid from '../utils/uuid'
// import cn from '../utils/cn'

export interface TooltipProps extends PropsWithChildren {
  content?: string
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({ children, content }) => {
  //   const randomKey = uuid(10)
  return (
    <div>
      <div data-tooltip-id={'test'} data-tooltip-content={content}>
        {children}
      </div>
      <ReactTooltip
        id={'test'}
        className={
          '!dj-bg-primary-500 dj-text-white dark:dj-bg-primary-400 dj-max-w-[250px] !dj-px-2 !dj-py-1 !dj-whitespace-normal dj-z-40'
        }
      />
    </div>
  )
}

export default Tooltip
