'use client'
import React from 'react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Loading from './../Loading'
import { SwitcherProps } from '../../types/ISwitcher'
import { cn } from '../../utils/cn'

const Switcher: React.FC<SwitcherProps> = ({ on, onToggle, disabled, loading }) => {
  const [enabled, setEnabled] = useState<boolean>(on || false)

  useEffect(() => {
    setEnabled(on || false)
  }, [on])

  const handleChange = (v: boolean) => {
    if (!disabled && !loading) {
      // setEnabled(v);
      onToggle && onToggle(v)
    }
  }
  return (
    <>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={cn(
          'dj-h-[24px] dj-w-[46px]',
          'dj-relative dj-inline-flex dj-shrink-0 dj-cursor-pointer dj-rounded-full dj-border-2 dj-border-transparent dj-transition-colors dj-duration-200 dj-ease-in-out focus:dj-outline-none focus-visible:dj-ring-2  focus-visible:dj-ring-white/75',
          {
            'dj-bg-primary-400 dark:dj-bg-primary-500': enabled && !disabled,
            'dj-bg-primary-200 dark:dj-bg-primary-200/70': enabled && disabled,
            'dj-bg-gray-200 dark:dj-bg-gray-600': !enabled,
            '!dj-cursor-not-allowed': disabled,
          },
        )}
      >
        {/* <span className='sr-only'>Use setting</span> */}
        <span
          aria-hidden='true'
          className={cn(
            'dj-h-[20px] dj-w-[20px]',
            'dj-pointer-events-none dj-inline-block  dj-transform dj-rounded-full dj-bg-white dark:dj-bg-dark-2 dj-shadow-lg dj-ring-0 dj-transition dj-duration-200 dj-ease-in-out',
            {
              'dj-translate-x-[22px]': enabled,
              'dj-translate-x-0': !enabled,
            },
          )}
        >
          {loading && <Loading size={13} borderSize={2} />}
        </span>
      </Switch>
    </>
  )
}
export default Switcher
