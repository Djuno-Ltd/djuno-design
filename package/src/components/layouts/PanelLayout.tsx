/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview PanelLayout Component
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

import React, { PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'
import useShow from '../../hooks/useShow'

const PanelLayout: React.FC<
  PropsWithChildren<{
    type?: 'normal' | 'mini'
    pathname?: string
    renderSidebar?: (segments: string[], isShow: boolean) => React.ReactNode
    renderHeader?: (handleHideSidebar: () => void, handleShowSidebar: () => void) => React.ReactNode
  }>
> = ({ type, children, pathname, renderSidebar, renderHeader }) => {
  const [isShowSidebar, { hide: handleHideSidebar, show: handleShowSidebar }] = useShow(true)

  const segments = React.useMemo(() => {
    if (!pathname) return ['']
    return pathname
      .split('/')
      .filter((segment) => segment !== '')
      .filter(Boolean)
  }, [])

  return (
    <div className='dj-min-h-full'>
      <div className={cn('dj-flex dj-flex-col dj-h-full md:dj-block dj-w-full md:dj-w-auto')}>
        <div className='dj-flex dj-flex-col dj-min-h-full md:dj-flex-row'>
          {renderSidebar && renderSidebar(segments, isShowSidebar)}
          <div
            className={cn('dj-min-h-[calc(100%-4rem)] dj-w-full dj-ml-auto dj-transition-all dj-duration-200', {
              'lg:dj-w-[calc(100%-260px)]': type === 'normal' || type === undefined,
              'lg:dj-w-[calc(100%-130px)]': type === 'mini',
            })}
          >
            {renderHeader && renderHeader(handleHideSidebar, handleShowSidebar)}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelLayout
