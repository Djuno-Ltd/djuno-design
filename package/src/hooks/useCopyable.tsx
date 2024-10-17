/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview useCopyable hook
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

import React, { useEffect } from 'react'
import { CopyableProp, CopyableText } from '../types'
import { ReactComponent as CopyIcon } from './../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../assets/icons/check.svg'
import { copyToClipboard } from '../utils/copy'

export interface UseCopyable {
  copyable: CopyableProp | undefined
}

export const useCopyable = ({ copyable }: UseCopyable) => {
  const tooltipTexts: [string, string] = React.useMemo(() => {
    const defaultTexts: [string, string] = ['Copy', 'Copied']
    const emptyTexts: [string, string] = ['', '']

    if (typeof copyable === 'object') {
      if (copyable?.tooltips === false) {
        return emptyTexts
      } else if (copyable?.tooltips) {
        return typeof copyable?.tooltips === 'boolean' ? defaultTexts : copyable.tooltips
      }
    }
    return defaultTexts
  }, [copyable])

  const icons: [React.ReactNode, React.ReactNode] = React.useMemo(() => {
    const defaultIcons: [React.ReactNode, React.ReactNode] = [
      <CopyIcon key='copy-icon' />,
      <CheckIcon key='copied-icon' />,
    ]
    if (typeof copyable === 'object' && copyable?.icon) {
      return copyable.icon
    }
    return defaultIcons
  }, [copyable])

  const [textToCopy, setTextToCopy] = React.useState<string | ((prop: { value?: string }) => CopyableText) | undefined>(
    undefined,
  )
  const [tooltipText, setTooltipText] = React.useState(tooltipTexts[0])
  const [icon, setIcon] = React.useState(icons[0])
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(
    (textToCopy: string | number | null | undefined) => {
      if (typeof textToCopy === 'string' || typeof textToCopy === 'number') {
        copyToClipboard(textToCopy.toString()).then(() => {
          setCopied(true)
          setTooltipText(tooltipTexts[1])
          setIcon(icons[1])

          setTimeout(() => {
            setCopied(false)
            setTooltipText(tooltipTexts[0])
            setIcon(icons[0])
          }, 2000)
        })
      }
    },
    [copyable, tooltipTexts, icons],
  )

  useEffect(() => {
    if (copyable && typeof copyable === 'object' && copyable.text) {
      setTextToCopy(copyable.text)
    }
  }, [copyable])

  return { copy, tooltipText, icon, copied, textToCopy }
}
