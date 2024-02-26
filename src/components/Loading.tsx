import * as React from 'react'
import { HTMLAttributes } from 'react'
import cn from '../utils/cn'

export type LoadingType = 'simple' | 'cutoff' | 'elastic'
export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  type?: LoadingType
  color?: string
  borderColor?: string
  size?: number
  borderSize?: number
}

const Loading: React.FunctionComponent<LoadingProps> = ({ type, size, borderSize, borderColor, color }) => {
  if (type === 'elastic') {
    return (
      <svg style={{ ...(size ? { width: size, height: size } : { width: 24, height: 24 }) }} viewBox='0 0 16 16'>
        <g className='dj-animate-rotate' style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <path
            className='dj-fill-primary-50 dark:dj-fill-zinc-600'
            style={{
              ...(color && { fill: color }),
            }}
            d='M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z'
          ></path>
          <circle
            className='dj-animate-stroke-dash dj-fill-none dj-stroke-primary-500'
            style={{
              ...(borderSize && { strokeWidth: borderSize }),
              ...(borderColor && { stroke: borderColor }),
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeDasharray: '67, 100',
              strokeDashoffset: '46',
              transformOrigin: 'center',
            }}
            cx='8'
            cy='8'
            r='7'
          ></circle>
        </g>
      </svg>
    )
  }
  return (
    <div
      style={{
        ...(size ? { width: size, height: size } : { width: 24, height: 24 }),
        ...(borderSize && { borderWidth: borderSize }),
        ...(borderColor && { borderColor: borderColor }),
        ...(color && { borderTopColor: color }),
      }}
      className={cn(
        'dj-rounded-full dj-loading-spin  dj-border-[0.125rem] dj-border-primary-50 dj-border-t-primary-500 dark:dj-border-zinc-600 dark:dj-border-t-primary-300',
        {
          'dj-animate-spin': type === undefined || type === 'simple',
          'dj-animate-cutoff-spin': type === 'cutoff',
        },
      )}
    />
  )
}

export default Loading
