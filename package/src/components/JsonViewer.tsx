/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview JsonViewer Component
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
import { JsonViewerProps } from '../types/IJsonViewer'
import JsonView from '@uiw/react-json-view'
import { lightTheme } from '@uiw/react-json-view/light'
import { darkTheme } from '@uiw/react-json-view/dark'
import { useDjunoDesign } from '../hooks/useDjunoDesign'

/**
 * JsonViewer component that allows for the display and customization of JSON data.
 *
 * @param {object} props - JsonViewer props.
 * @param {object | null} [props.value] - The JSON data to display. If null or undefined, an empty object will be rendered.
 * @param {number | boolean} [props.collapsed] - Controls how the JSON is displayed. If true, all levels will be collapsed. If a number, only the specified number of levels will be expanded.
 * @param {string} [props.theme] - The theme of the JSON viewer. Can be `'light'` or `'dark'`. (Optional)
 *
 * @returns {React.ReactNode} Rendered JsonViewer component.
 *
 * @version 0.6.0
 * @see https://www.npmjs.com/package/djuno-design#jsonViewer
 *
 * @example
 * // Example usage of JsonViewer component:
 *   const exampleJson = {
 *     name: "John Doe",
 *     age: 30,
 *     address: {
 *       street: "123 Main St",
 *       city: "Anytown",
 *       state: "CA"
 *     },
 *     hobbies: ["reading", "traveling", "coding"]
 *   };
 *
 *   <JsonViewer
 *     value={exampleJson} // The JSON data to display
 *     collapsed={2}       // Collapse all levels after the second level
 *   />
 *
 *
 */
const JsonViewer: React.FunctionComponent<JsonViewerProps> = ({ value, collapsed }) => {
  const {
    theme: { mode },
  } = useDjunoDesign({ stric: false })
  const [currentTheme, setCurrentTheme] = React.useState(mode === 'dark' ? darkTheme : lightTheme)

  React.useEffect(() => {
    const theme = mode === 'dark' ? darkTheme : lightTheme
    setCurrentTheme(theme)
  }, [mode])

  return (
    <JsonView
      style={currentTheme}
      value={value || {}}
      enableClipboard={false}
      displayDataTypes={false}
      shortenTextAfterLength={20}
      collapsed={collapsed !== undefined ? collapsed : 2}
    />
  )
}

export default JsonViewer
