/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Typography Component
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

interface TypographyProps {
  children: React.ReactNode
}

interface TypographyTitleProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

interface TypographyComponents {
  Title: React.FC<TypographyTitleProps>
  Text: React.FC<TypographyProps>
}

/**
 * Typography component ...
 *
 *
 * @returns {React.ReactNode} Rendered Typography component.
 *
 * @version 0.0.6
 * @see https://www.npmjs.com/package/djuno-design#typography
 *
 */
// eslint-disable-next-line react/prop-types
const Typography: React.FC<TypographyProps> & TypographyComponents = ({ children }): React.ReactNode => {
  return <>{children}</>
}

const Title: React.FC<TypographyTitleProps> = ({ children, level = 1 }) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements
  return <Heading className=''>{children}</Heading>
}

const Text: React.FC<TypographyProps> = ({ children }) => {
  return <p className=''>{children}</p>
}

Typography.Title = Title
Typography.Text = Text

export { Typography, TypographyProps }
export default Typography
