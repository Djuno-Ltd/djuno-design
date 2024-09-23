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
    <div className='w-screen bg-white dark:bg-zinc-900 min-h-screen flex justify-center items-center'>
      <div className='fixed top-5 right-10 text-slate-400 dark:text-slate-300'>
        <ThemeChanger />
      </div>
      <div className='max-w-lg min-w-[22rem] w-3/5 mx-5 flex flex-col justify-start'>
        <div className='p-8 flex flex-col bg-white shadow-[0_4px_30px_0_rgba(0,0,0,0.05)] dark:bg-dark-3  dark:shadow-none rounded-xl  '>
          <div className='flex justify-center mb-2'>{logo}</div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
