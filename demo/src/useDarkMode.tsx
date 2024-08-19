import { useState, useEffect } from 'react'

export type ThemeModes = 'light' | 'dark'
type ThemeModeRefrences = 'manual' | 'system'

const useDarkMode = () => {
  const [mode, setMode] = useState<ThemeModes>(() => {
    const storedMode = localStorage.getItem('theme-mode')
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
      htmlTag?.classList.add('dj-dark')
      htmlTag?.classList.add('dark')
    } else {
      htmlTag?.classList.remove('dj-dark')
      htmlTag?.classList.remove('dark')
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
    let mode =
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

export default useDarkMode
