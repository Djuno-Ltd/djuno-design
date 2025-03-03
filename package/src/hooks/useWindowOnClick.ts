/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview useWindowOnClick hook
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export function useWindowOnClick(
  callbackFn: (ev: MouseEvent) => any,
  options: AddEventListenerOptions & { ignore?: Element[] } = {},
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target
      if (target instanceof Element && options.ignore?.some((el) => el.contains(target))) {
        return
      }
      callbackFn(event)
    }

    window.addEventListener('click', listener, options)
    return () => {
      window.removeEventListener('click', listener, options)
    }
  }, [callbackFn, options])
}
