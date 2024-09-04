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
import { cn } from '../utils/cn'
import { JsonViewerProps } from '../types/IJsonViewer'
// import JsonView from "@uiw/react-json-view";
// import { lightTheme } from "@uiw/react-json-view/light";
// import { darkTheme } from "@uiw/react-json-view/dark";
// import useDarkMode from "../../hooks/useDarkMode";

/**
 * JsonViewer component that allows for customization of UI type, size, loading state, and more.
 *
 * @param {object} props - JsonViewer props.
 * @param {React.ReactNode} [props.children] - The content inside the JsonViewer.
 * @param {string} [props.panelClassNames] - Additional panelClassNames to apply to the JsonViewer.
 * @param {Array<AccordionItem>} [props.items] - The items to display in the JsonViewer, each with a label and optional panel content.
 * @param {boolean} [props.loading] - Indicates if the JsonViewer is in a loading state.
 *
 * @returns {React.ReactNode} Rendered JsonViewer component.
 *
 * @version 0.4.8
 * @see https://www.npmjs.com/package/djuno-design#jsonViewer
 *
 * @example
 * // Example usage of JsonViewer component:
 *
 * function MyComponent() {
 *   return (
 *     <JsonViewer

 *     />
 *   );
 * }
 */

const JsonViewer: React.FunctionComponent<JsonViewerProps> = ({ value, collapsed }) => {
  //   const { mode } = useDarkMode()
  return (
    <>
      {/* <JsonView
        style={mode === 'dark' ? darkTheme : lightTheme}
        value={value || {}}
        enableClipboard={false}
        displayDataTypes={false}
        shortenTextAfterLength={20}
        collapsed={collapsed !== undefined ? collapsed : 2}
      /> */}
    </>
  )
}

export default JsonViewer
