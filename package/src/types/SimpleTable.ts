/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview SimpleTable types
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
import { HTMLProps, PropsWithChildren } from 'react'
import { LoadingProps } from './Loading'

export interface SimpletableProps extends PropsWithChildren {
  loading?: boolean
  className?: string
  containerClassName?: string
  loadingSetting?: LoadingProps
  style?: React.CSSProperties
  containerStyle?: React.CSSProperties
  loadingStyle?: React.CSSProperties
}

export interface TableHeadProps extends React.PropsWithChildren {}

export interface TableTHProps {
  lable?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface TableBodyProps extends React.PropsWithChildren {}

export interface TableRowProps extends HTMLProps<HTMLTableRowElement> {
  className?: string
  withoutHoverStyle?: boolean
  style?: React.CSSProperties
}

export interface TableTDProps extends HTMLProps<HTMLTableCellElement> {
  className?: string
  style?: React.CSSProperties
}

export interface TableComponents {
  Head: React.FC<TableHeadProps>
  TH: React.FC<React.PropsWithChildren<TableTHProps>>
  Body: React.FC<TableBodyProps>
  Row: React.FC<TableRowProps>
  TD: React.FC<TableTDProps>
}
