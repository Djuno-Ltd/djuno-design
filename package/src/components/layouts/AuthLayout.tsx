/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview AuthLayout Component
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
import React from 'react'
import ThemeChanger from '../ThemeChanger'
import { AuthLayoutProps } from '../../types/IAuthLayouts'

const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = ({ children, logo }) => {
  return (
    <div className='dd-w-screen dd-bg-white dark:dd-bg-zinc-900 dd-min-h-screen dd-flex dd-justify-center dd-items-center'>
      <div className='dd-fixed dd-top-5 dd-right-10 dd-text-slate-400 dark:dd-text-slate-300'>
        <ThemeChanger />
      </div>
      <div className='dd-max-w-lg dd-min-w-[22rem] dd-w-3/5 dd-mx-5 dd-flex dd-flex-col dd-justify-start'>
        <div className='dd-p-8 dd-flex dd-flex-col dd-bg-white dd-shadow-[0_4px_30px_0_rgba(0,0,0,0.05)] dark:dd-bg-dark-3  dark:dd-shadow-none dd-rounded-xl  '>
          <div className='dd-flex dd-justify-center dd-mb-2'>{logo}</div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
