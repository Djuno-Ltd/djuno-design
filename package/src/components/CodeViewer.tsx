/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview CodeViewer Component
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
import { useDjunoDesign } from '../hooks/useDjunoDesign'
import { CodeViewerProps } from '../types/ICodeViewer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrow, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ReactComponent as CopyIcon } from './../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../assets/icons/check.svg'
import { copyToClipboard } from '../utils/copy'
import { cn } from '../utils/cn'
import Tooltip from './Tooltip'
import { useCopyable } from '../hooks/useCopyable'

/**
 * CodeViewer component for displaying code with syntax highlighting, line numbers, and optional copy-to-clipboard functionality.
 * It applies theming based on the current design mode or an explicitly provided theme.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {string|string[]} props.code - The code to display. Can be a string or an array of strings.
 * @param {CodeViewerLanguages} [props.language] - The language for syntax highlighting (e.g., 'javascript', 'css', etc.).
 * @param {boolean} [props.showLineNumbers=false] - Whether to display line numbers alongside the code.
 * @param {boolean} [props.wrapLongLines=false] - Whether to wrap long lines of code.
 * @param {boolean} [props.bgTransparent=false] - Whether the background should be transparent.
 * @param {number} [props.startingLineNumber] - The number at which to start the line numbering.
 * @param {ThemeModes} [props.theme] - Optional theme override ('light' or 'dark'). If not provided, the `DjunoDesignProvider` will determine the theme.
 * @param {string} [props.fontSize='0.85rem'] - The font size of the displayed code. Defaults to 0.85rem.
 * @param {CopyableProp} [props.copyable] - Enables the copy-to-clipboard feature. Can be a boolean, a function to customize the copied value, or an object with tooltips and icons for customization.
 *
 * @returns {React.ReactNode} Rendered CodeViewer component.
 *
 * @version 0.5.7
 * @see https://www.npmjs.com/package/djuno-design#codeViewer
 *
 * @example
 * <CodeViewer
 *   code={`const x = 10;`}
 *   language="javascript"
 *   showLineNumbers={true}
 *   wrapLongLines={true}
 *   copyable={true}
 * />
 *
 */
const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language,
  showLineNumbers = false,
  wrapLongLines = false,
  bgTransparent = false,
  startingLineNumber,
  theme,
  fontSize,
  copyable,
}) => {
  const {
    theme: { mode },
  } = useDjunoDesign({ stric: false })
  const [currentTheme, setCurrentTheme] = React.useState<{
    [key: string]: React.CSSProperties
  }>()
  const { copy, icon, tooltipText, textToCopy } = useCopyable({ copyable })

  React.useEffect(() => {
    let style
    if (theme) {
      style = theme === 'dark' ? tomorrowNight : tomorrow
    } else {
      style =
        mode === 'dark' ? tomorrowNight : { ...tomorrow, hljs: { ...tomorrow.hljs, background: 'rgb(243 244 246)' } }
    }
    style = {
      ...style,
      hljs: { ...style.hljs, fontSize: fontSize || '0.85rem', borderRadius: '10px', zIndex: 20, padding: '0.8em' },
    }
    if (bgTransparent) {
      style = { ...style, hljs: { ...style.hljs, background: 'transparent' } }
    }
    setCurrentTheme(style)
  }, [mode])

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

  // const [tooltipText, setTooltipText] = React.useState(tooltipTexts[0])
  // const [icon, setIcon] = React.useState(icons[0])

  const handleCopyToClipboard = () => {
    let finalText: string | number | null | undefined = ''
    const inputValue = Array.isArray(code) ? code[0] : code

    if (typeof textToCopy === 'function') {
      finalText = textToCopy({ value: inputValue })
    } else {
      finalText = inputValue
    }
    copy(finalText)
    // if (typeof textToCopy === 'string' || typeof textToCopy === 'number') {
    //   copyToClipboard(textToCopy.toString()).then(() => {
    //     setTooltipText(tooltipTexts[1])
    //     setIcon(icons[1])

    //     // Revert back after some time
    //     setTimeout(() => {
    //       setTooltipText(tooltipTexts[0])
    //       setIcon(icons[0])
    //     }, 2000)
    //   })
  }

  return (
    <div className='dd-relative dd-w-full'>
      {typeof copyable !== 'undefined' && (
        <div className={cn('dd-absolute dd-z-30 dd-top-3 dd-right-3')}>
          <div
            onClick={handleCopyToClipboard}
            className={cn(
              'dd-w-[18px] dd-h-[18px] dd-cursor-pointer dd-text-slate-500 hover:dd-text-primary-300 dark:dd-text-slate-300 dark:hover:dd-text-primary-300 dd-text-xs',
            )}
          >
            <Tooltip content={tooltipText}>{icon}</Tooltip>
          </div>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={currentTheme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        startingLineNumber={startingLineNumber}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeViewer
