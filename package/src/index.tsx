/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Main file
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

/**
 * import styles
 */
import './index.css'

/**
 * import components
 */
import Button from './components/Button'
import Tooltip from './components/Tooltip'
import Loading from './components/Loading'
import Flex from './components/Flex'
import Card from './components/Card'
import Typography from './components/Typography'
import Alert from './components/Alert'
import Steps from './components/Steps'
import Input from './components/form/Input'
import EmptyState from './components/EmptyState'
import CopyHide from './components/CopyHide'

// export all types
export * from './types'

// export utils
export * from './utils'
export * from './utils/uuid'
export * from './utils/localStorage'
export * from './utils/copy'

/**
 * export components
 */
export { Button, Tooltip, Loading, Flex, Card, Typography, Alert, Steps, Input, EmptyState, CopyHide }
