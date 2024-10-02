/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview useShow hook
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
import { DjunoDesignContext } from './../providers/DjunoDesignProvider'
import { useTheme, UseTheme } from './useTheme'

interface UseDjunoDesignProps {
  stric: boolean
  font?: '' //TODO
}

interface UseDjunoDesignResponse {
  provided: boolean
  theme: UseTheme
  navigator?: (url: string | undefined) => void
}

const initProps: UseDjunoDesignProps = { stric: true }

/**
 * @function
 * @name useDjunoDesign
 * @description A hook to interact with the DjunoDesineProvider.
 */
export const useDjunoDesign = ({ stric }: UseDjunoDesignProps = initProps): UseDjunoDesignResponse => {
  const context = React.useContext(DjunoDesignContext)
  const ut = useTheme()

  if (!context) {
    if (stric) {
      throw new Error('DjunoDesign provider is missing.')
    } else {
      return { provided: false, theme: ut, navigator: undefined }
    }
  }

  return { provided: true, theme: context.theme, navigator: context.navigator }
}
