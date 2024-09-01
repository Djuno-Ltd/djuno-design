/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview DropdownMenuMenu types
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

import React, { PropsWithChildren } from 'react'

export interface DropdownMenuProps extends PropsWithChildren {
  menu?: Array<DropdownMenuElement>
  title?: string | React.ReactNode
  type?: 'default' | 'simple'
  positionClassName?: string
  buttonClassName?: string
  itemsClassName?: string
}

export type DropdownMenuItem = {
  label: string | React.ReactNode
  key: string
  onClick?: (item: DropdownMenuItem, close: () => void) => void
  disabled?: boolean
  danger?: boolean
  loading?: boolean
}

export type DropdownMenuDivider = {
  type: 'divider'
}

export type DropdownMenuElement = DropdownMenuItem | DropdownMenuDivider
