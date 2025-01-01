/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Typography types
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

import { CopyableOptionsProp } from '.'
import { TooltipProps } from './Tooltip'

export type TypographtTitleLevels = 1 | 2 | 3 | 4 | 5 | 6
export type TypographtUiTypes = 'secondary' | 'success' | 'warning' | 'danger' | 'disabled' | 'transparent'
export type TypographtSizeTypes =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

export interface TypographyBaseProps extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
  uiType?: TypographtUiTypes
  code?: boolean
  mark?: boolean
  underline?: boolean
  del?: boolean
  strong?: boolean
  italic?: boolean
}

export interface TypographyProps extends TypographyBaseProps {
  tooltip?: TooltipProps
  copyable?: boolean | CopyableOptionsProp
}

export interface TypographyTitleProps extends TypographyProps, React.HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: TypographtTitleLevels
}

export interface TypographyTextProps extends TypographyProps, React.HtmlHTMLAttributes<HTMLSpanElement> {
  size?: TypographtSizeTypes
}

export interface TypographyParagraphProps extends TypographyProps, React.HtmlHTMLAttributes<HTMLDivElement> {
  size?: TypographtSizeTypes
}

export interface TypographyLinkProps extends TypographyProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: TypographtSizeTypes
}

export interface TypographyComponents {
  Title: React.FC<TypographyTitleProps>
  Text: React.FC<TypographyTextProps>
  Paragraph: React.FC<TypographyParagraphProps>
  Link: React.FC<TypographyLinkProps>
}
