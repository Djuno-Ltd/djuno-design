/**
 * @author Sanaz Zeraati <szeraati69@gmail.com>
 * @fileoverview Card Component
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
import { SecureCopyProps } from '../types/SecureCopy'
import { copyToClipboard } from '../utils/copy'
import Typography from './Typography'
const { Text } = Typography
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../assets/icons//eye-slash.svg'
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg'
import Input from './form/Input'
