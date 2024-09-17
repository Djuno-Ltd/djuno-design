/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview DjunoDesign Provider
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
import { UseTheme, useTheme } from './../hooks/useTheme'

export type DjunoDesignContextType = {
  theme: UseTheme
}

export interface DjunoDesignProviderProps {
  children: React.ReactNode
}

/**
 * DjunoDesignProvider
 *
 * @param children
 *
 * @return Functional Component
 */
const DjunoDesignProvider: React.FunctionComponent<DjunoDesignProviderProps> = ({ children }) => {
  const theme = useTheme()

  // const initialState = React.useMemo(() => {}, [])
  const contextValue = React.useMemo(
    () => ({
      theme,
    }),
    [theme],
  )

  return <DjunoDesignContext.Provider value={contextValue}>{children}</DjunoDesignContext.Provider>
}

const DDProvider = DjunoDesignProvider
export const DjunoDesignContext = React.createContext<DjunoDesignContextType | null>(null)

export { DjunoDesignProvider, DDProvider }
