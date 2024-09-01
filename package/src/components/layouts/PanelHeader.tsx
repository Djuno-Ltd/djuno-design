import React, { PropsWithChildren } from 'react'
import { ReactComponent as MenuIcon } from './../../assets/icons/menu.svg'
import useWindowOnClick from '../../hooks/useWindowOnClick'

const PanelHeader: React.FC<
  PropsWithChildren<{
    handleHideSidebar?: () => void
    handleShowSidebar?: () => void
    mobileIcon?: React.ReactNode
  }>
> = ({ children, handleHideSidebar, handleShowSidebar, mobileIcon }) => {
  useWindowOnClick(
    () => {
      if (handleHideSidebar) handleHideSidebar()
    },
    [],
    { capture: true },
  )

  return (
    <div className='dj-w-full dj-h-16 dj-px-6 dj-flex dj-items-center dj-bg-white dark:dj-bg-dark-3 dj-top-0 dj-z-30 dj-sticky dj-border-b-2 dj-border-slate-200 dark:dj-border-dark-3'>
      <div className='dj-w-full lg:dj-max-w-7xl dj-mx-auto dj-flex dj-items-center dj-justify-between'>
        <div className='lg:dj-hidden dj-flex dj-items-center dj-gap-3'>
          <MenuIcon
            className='dj-text-slate-800 dark:dj-text-slate-200 dj-w-7 dj-h-7'
            onClick={handleShowSidebar}
            test-cy='menu-icon'
          />
          {mobileIcon}
        </div>
        {children}
      </div>
    </div>
  )
}
export default PanelHeader
