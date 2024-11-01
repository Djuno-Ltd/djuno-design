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
import Skeleton from './components/Skeleton'
import Input, { AnimatedFormError } from './components/form/Input'
import Switcher from './components/form/Switcher'
import Select, { MultiSelect } from './components/form/Select'
import Textarea from './components/form/Textarea'
import SimpleTable from './components/SimpleTable'
import EmptyState from './components/EmptyState'
import Divider from './components/Divider'
import SecureCopy from './components/SecureCopy'
import Pagination from './components/Pagination'
import Modal from './components/Modal'
import Dropdown from './components/Dropdown'
import Accordion from './components/Accordion'
import Tabs from './components/Tabs'
import PanelLayout from './components/layouts/PanelLayout'
import PanelHeader from './components/layouts/PanelHeader'
import PanelSidebar from './components/layouts/PanelSidebar'
import Checkbox from './components/form/Checkbox'
import Popover from './components/Popover'
import JsonViewer from './components/JsonViewer'
import Sidebar from './components/Sidebar'
import ThemeChanger, { ThemeSwitcher } from './components/ThemeChanger'
import Tag from './components/Tag'
import CodeViewer from './components/CodeViewer'
import Countdown from './components/Countdown'

// export providers
export * from './providers/DjunoDesignProvider'

// export hooks
export * from './hooks/useWindowOnClick'
export * from './hooks/useShow'
export * from './hooks/useDjunoDesign'
// export * from './hooks/useTheme'

// export all types
export * from './types'

// export utils
export * from './utils'
export * from './utils/cn'
export * from './utils/uuid'
export * from './utils/localStorage'
export * from './utils/copy'

/**
 * export components
 */
export {
  Button,
  Tooltip,
  Loading,
  Flex,
  Card,
  Typography,
  Alert,
  Steps,
  Input,
  AnimatedFormError,
  Skeleton,
  SimpleTable,
  EmptyState,
  Divider,
  SecureCopy,
  Switcher,
  Pagination,
  Modal,
  Select,
  MultiSelect,
  Dropdown,
  Accordion,
  Tabs,
  PanelLayout,
  PanelHeader,
  PanelSidebar,
  Checkbox,
  Popover,
  Sidebar,
  Textarea,
  JsonViewer,
  ThemeChanger,
  ThemeSwitcher,
  Tag,
  CodeViewer,
  Countdown,
}
