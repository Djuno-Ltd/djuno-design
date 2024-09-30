/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview DropdownMenu types
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

import { AnchorProps } from '@headlessui/react/dist/internal/floating'
import React, { PropsWithChildren } from 'react'

export interface DropdownProps extends PropsWithChildren {
  menu?: Array<DropdownElement>
  title?: string | React.ReactNode
  type?: DropdownTypes
  anchor?: AnchorProps
  buttonClassName?: string
  itemsClassName?: string
}
export type DropdownTypes = 'default' | 'simple'

export type DropdownItem = {
  label: string | React.ReactNode
  key: string
  onClick?: (item: DropdownItem, close: () => void) => void
  disabled?: boolean
  danger?: boolean
  loading?: boolean
}

export type DropdownDivider = {
  type: 'divider'
}

export type DropdownElement = DropdownItem | DropdownDivider
