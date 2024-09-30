/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview useTheme hook
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

import { useState, useEffect } from 'react'
export type ThemeModes = 'light' | 'dark'
export type ThemeModeRefrences = 'manual' | 'system'

export interface UseTheme {
  mode: ThemeModes
  modeRefrence: ThemeModeRefrences
  changeMode: (m: ThemeModes | 'system') => void
}

export const useTheme = (): UseTheme => {
  const [mode, setMode] = useState<ThemeModes>(() => {
    const storedMode = window.localStorage.getItem('theme-mode')
    if (storedMode) {
      return storedMode === 'light' ? 'light' : 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [modeRefrence, setModeRefrence] = useState<ThemeModeRefrences>(() => {
    const refrence = localStorage.getItem('theme-mode-refrence')
    if (refrence) {
      return refrence === 'manual' ? 'manual' : 'system'
    } else {
      return 'system'
    }
  })

  useEffect(() => {
    const storedMode = localStorage.getItem('theme-mode')
    const modeRefrence = localStorage.getItem('theme-mode-refrence')
    if (storedMode) {
      // console.log("storedMode:", modeRefrence);
      setMode(storedMode === 'light' ? 'light' : 'dark')
      if (modeRefrence) {
        setModeRefrence(modeRefrence as ThemeModeRefrences)
      } else {
        setModeRefrence('manual')
      }
    } else {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      setModeRefrence('system')
    }
  }, [])

  useEffect(() => {
    // Update the HTML tag's class based on the selected mode
    const htmlTag = document.querySelector('html')
    if (mode === 'dark') {
      htmlTag?.classList.add('dark')
      htmlTag?.classList.add('dd-dark')
    } else {
      htmlTag?.classList.remove('dark')
      htmlTag?.classList.remove('dd-dark')
    }
  }, [mode])

  // Update localStorage when the mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  // Update localStorage when the mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode-refrence', modeRefrence)
  }, [modeRefrence])

  // Function to toggle between 'light' and 'dark' modes
  const changeMode = (selectedMode: ThemeModes | 'system') => {
    const mode =
      selectedMode !== 'system'
        ? selectedMode
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

    setMode(mode)
    setModeRefrence(selectedMode !== 'system' ? 'manual' : 'system')
  }

  return { mode, modeRefrence, changeMode }
}
