/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Button Component
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
import cn from './../utils/cn'
import Tooltip from './Tooltip'
import Loading from './Loading'
import { ButtonProps } from '../types'

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  className,
  uiType,
  size,
  tooltip,
  loading,
  loadingType,
  ...props
}) => {
  const renderButton = () => (
    <button
      {...props}
      className={cn(
        'dj-rounded-xl focus:dj-outline-none dj-transition-all disabled:dj-cursor-not-allowed dj-w-max dj-flex dj-items-center dj-gap-1 dj-duration-400',
        {
          'dj-text-primary-500 dj-bg-transparent hover:dj-bg-primary-50 hover:dj-text-primary-500 hover:dj-border-primary-100 dj-border-2 dj-border-slate-200 dark:dj-bg-secondary-800 dark:hover:dj-bg-secondary-700 dark:dj-text-white dark:dj-border-secondary-700 disabled:dj-border-secondary-300 disabled:hover:dj-bg-transparent disabled:dj-text-secondary-300 disabled:dark:dj-text-secondary-400':
            uiType === 'simple' || uiType === undefined,
          'dj-text-white dj-bg-primary-500 hover:dj-bg-primary-500 hover:dj-shadow-lg hover:dj-shadow-primary-200 dark:hover:dj-shadow-lg dark:hover:dj-shadow-secondary-700 border-2 dj-border-primary-500 focus:dj-ring-2 focus:dj-ring-primary-300 dark:focus:dj-ring-secondary-600 disabled:dj-border-secondary-300 disabled:dj-bg-secondary-200 disabled:dj-text-secondary-400 disabled:dark:dj-bg-secondary-500 disabled:dark:dj-border-secondary-500 disabled:dark:dj-text-secondary-300 disabled:hover:dj-shadow-none':
            uiType === 'primary',
          'dj-text-xs dj-px-3 dj-h-7': size === 'small',
          'dj-text-sm dj-px-4 dj-h-9': size === 'medium' || size === undefined,
          'dj-text-base dj-px-5 dj-h-11': size === 'large',
        },
        className,
      )}
    >
      {loading && (
        <Loading
          type={loadingType || 'simple'}
          borderSize={1.5}
          size={size === 'medium' || size === undefined ? 14 : size === 'small' ? 12 : 18}
          theme={uiType === 'primary' ? 'white' : 'transparent'}
        />
      )}
      {children}
    </button>
  )
  if (tooltip?.content) return <Tooltip {...tooltip}>{renderButton()}</Tooltip>
  return renderButton()
}

export default Button
