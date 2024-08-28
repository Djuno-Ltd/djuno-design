/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview CopyHide types
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

export interface CopyHideProps extends PropsWithChildren {
  text?: string
  icon?: React.ReactNode
  className?: string
  textClassName?: string
  iconClassName?: string
  showText?: boolean
}

// export interface PRESENTED_IMAGE_SIMPLE {
//   iconClassName?: string
// }
// export interface PRESENTED_IMAGE_DEFAULT {
//   iconClassName?: string
// }

// export interface EmptyStateIcons {
//   PRESENTED_IMAGE_DEFAULT: React.FC<PRESENTED_IMAGE_SIMPLE>
//   PRESENTED_IMAGE_SIMPLE: React.FC<PRESENTED_IMAGE_DEFAULT>
// }

// export type EmptyState = '' | ''
