## ![Djuno-design](https://bytebucket.org/djunoltd/djuno-design/raw/359ef9aff4e466d83ce3551bf3deca362de0aa5f/src/assets/djuno-design-logo.svg?token=0386a8f6fd7561c7f356ee575f347c9cb5b3ab14) Djuno Design

**djuno-design** is a lightweight, tailwindCSS-based, and wrapper-approach library for React to develop front-end projects easily.

## Documentation

### Available components

1. Button
2. Tooltip
   - InfoTooltip
3. Loading
4. Flex
5. Card
6. Typography
   - Title
   - Text
   - Paragraph
   - Link
7. Alert
8. Steps
9. Form
   - Input
   - Switcher
   - Select
10. Skeleton
11. SimpleTable
    - Head
    - TH
    - Body
    - Row
    - TD
12. EmptyState
13. Divider
14. Modal
15. Layouts
    - PanelLayout

### Available hooks

1. useShow

### Available utility functions

1. uuid
2. localStorage
   - getLocalStorage
   - setLocalStorage
   - removeLocalStorage
3. sleep
4. copy
   - copyToClipboard

## APIs

### Button

| Name        | Type           | Required | default   | Description |
| ----------- | -------------- | -------- | --------- | ----------- |
| uiType      | `ButtonTypes`  | no       | simple    |             |
| size        | `SizeTypes`    | no       | medium    |             |
| tooltip     | `TooltipProps` | no       | undefined |             |
| loading     | boolean        | no       | false     |             |
| loadingType | `LoadingType`  | no       | simple    |             |

### Tooltip

| Name      | Type                | Required | default | Description |
| --------- | ------------------- | -------- | ------- | ----------- |
| content   | string, ReactNode   | yes      |         |             |
| place     | `TooltipPlaces`     | no       | top     |             |
| theme     | `TooltipThemeTypes` | no       | primary |             |
| clickable | boolean             | no       | false   |             |

### Loading

| Name       | Type                | Required | default | Description |
| ---------- | ------------------- | -------- | ------- | ----------- |
| type       | `LoadingType`       | no       | simple  |             |
| size       | number              | no       | 24px    |             |
| borderSize | number              | no       | 2px     |             |
| theme      | `LoadingThemeTypes` | no       | primary |             |

### Flex

| Name      | Type            | Required | default | Description                   |
| --------- | --------------- | -------- | ------- | ----------------------------- |
| direction | `FlexDirection` | no       | row     | Specifies the main-axis       |
| justify   | `FlexJustify`   | no       | start   | Alignment along the main-axis |
| items     | `FlexItems`     | no       | start   | Alignment along the sub-axis  |

### Card

| Name                          | Type              | Required | default | Description |
| ----------------------------- | ----------------- | -------- | ------- | ----------- |
| id                            | string            | no       |         |             |
| title                         | string, ReactNode | no       |         |             |
| titleLevel                    | number [1,2,..,6] | no       | 5       |             |
| description                   | string, ReactNode | no       |         |             |
| setting                       | string, ReactNode | no       |         |             |
| class names for main sections | string            | no       |         |             |

### Typography

#### Typography.Title

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| level     | number [1,2,..,6]                   | no       | 1         |             |
| uiType    | `TypographtUiTypes`                 | no       | default   |             |
| tooltip   | `TooltipProps`                      | no       | undefined |             |
| code      | boolean                             | no       | false     |             |
| mark      | boolean                             | no       | false     |             |
| underline | boolean                             | no       | false     |             |
| del       | boolean                             | no       | false     |             |
| strong    | boolean                             | no       | false     |             |
| italic    | boolean                             | no       | false     |             |
| copyable  | boolean or `TypographyCopyableProp` | no       | false     |             |

#### Typography.Text

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| size      | `TypographtSizeTypes`               | no       | base      |             |
| uiType    | `TypographtUiTypes`                 | no       | default   |             |
| tooltip   | `TooltipProps`                      | no       | undefined |             |
| code      | boolean                             | no       | false     |             |
| mark      | boolean                             | no       | false     |             |
| underline | boolean                             | no       | false     |             |
| del       | boolean                             | no       | false     |             |
| strong    | boolean                             | no       | false     |             |
| italic    | boolean                             | no       | false     |             |
| copyable  | boolean or `TypographyCopyableProp` | no       | false     |             |

#### Typography.Paragraph

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| size      | `TypographtSizeTypes`               | no       | base      |             |
| uiType    | `TypographtUiTypes`                 | no       | default   |             |
| tooltip   | `TooltipProps`                      | no       | undefined |             |
| code      | boolean                             | no       | false     |             |
| mark      | boolean                             | no       | false     |             |
| underline | boolean                             | no       | false     |             |
| del       | boolean                             | no       | false     |             |
| strong    | boolean                             | no       | false     |             |
| italic    | boolean                             | no       | false     |             |
| copyable  | boolean or `TypographyCopyableProp` | no       | false     |             |

#### Typography.Link

| Name            | Type                                | Required | default   | Description |
| --------------- | ----------------------------------- | -------- | --------- | ----------- |
| all `<a>` props | `React.AnchorHTMLAttributes`        | no       |           |             |
| size            | `TypographtSizeTypes`               | no       | base      |             |
| uiType          | `TypographtUiTypes`                 | no       | default   |             |
| tooltip         | `TooltipProps`                      | no       | undefined |             |
| code            | boolean                             | no       | false     |             |
| mark            | boolean                             | no       | false     |             |
| underline       | boolean                             | no       | false     |             |
| del             | boolean                             | no       | false     |             |
| strong          | boolean                             | no       | false     |             |
| italic          | boolean                             | no       | false     |             |
| copyable        | boolean or `TypographyCopyableProp` | no       | false     |             |

### Alert

| Name        | Type              | Required | default | Description               |
| ----------- | ----------------- | -------- | ------- | ------------------------- |
| message     | string, ReactNode | no       |         |                           |
| description | string, ReactNode | no       |         |                           |
| type        | `AlertTypes`      | no       | neutral |                           |
| showIcon    | boolean           | no       | false   |                           |
| banner      | boolean           | no       | false   | Display Alert as a banner |

### Steps

| Name  | Type         | Required | default | Description |
| ----- | ------------ | -------- | ------- | ----------- |
| steps | `StepItem[]` | yes      |         |             |
| step  | string       | yes      |         |             |

### Input

| Name        | Type                          | Required | default | Description |
| ----------- | ----------------------------- | -------- | ------- | ----------- |
| inputProps  | `HTMLProps<HTMLInputElement>` | no       |         |             |
| label       | string                        | no       |         |             |
| type        | `InputTypes`                  | no       |         |             |
| required    | boolean                       | no       |         |             |
| error       | string , boolean              | no       |         |             |
| hint        | boolean                       | no       |         |             |
| loading     | boolean                       | no       |         |             |
| loadingType | `LoadingProps`                | no       |         |             |
| placeholder | string                        | no       |         |             |
| tooltip     | `TooltipProps`                | no       |         |             |
| size        | `SizeTypes`                   | no       | medium  |             |
| copyable    | `boolean or function`         | no       |         |             |

### Switcher

| Name        | Type                       | Required | default | Description |
| ----------- | -------------------------- | -------- | ------- | ----------- |
| on          | boolean                    |          |         |             |
| onToggle    | `(value: boolean) => void` |          |         |             |
| disabled    | boolean                    |          |         |             |
| loading     | boolean                    |          |         |             |
| loadingType | `LoadingProps`             |          |         |             |
| size        | `SizeTypes`                |          | medium  |             |

### Select

### Select

| Name               | Type                              | Required | Default | Description                                                                |
| ------------------ | --------------------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `value`            | `T`                               |          |         | The currently selected value.                                              |
| `onChange`         | `(value: T or undefined) => void` |          |         | Callback function triggered when the selected value changes.               |
| `defaultValue`     | `T`                               |          |         | The default value of the select component.                                 |
| `options`          | `SelectOption<T, ET>[]`           | ✔       |         | Array of options available for selection.                                  |
| `className`        | `string`                          |          |         | Additional CSS classes for custom styling of the select component.         |
| `buttonClassName`  | `string`                          |          |         | Additional CSS classes for custom styling of the select button.            |
| `optionsClassName` | `string`                          |          |         | Additional CSS classes for custom styling of the options list.             |
| `label`            | `string`                          |          |         | The label displayed above the select component.                            |
| `error`            | `string`                          |          |         | Error message to display if there is a validation issue.                   |
| `required`         | `boolean`                         |          |         | Indicates if the select component is required.                             |
| `type`             | `SelectTypes`                     |          |         | The type of the select component (e.g., single select, multi-select).      |
| `tooltip`          | `TooltipProps`                    |          |         | Tooltip properties to display additional information.                      |
| `hint`             | `string`                          |          |         | Hint text to provide additional context or instructions.                   |
| `loading`          | `boolean`                         |          |         | Indicates if the select component is in a loading state.                   |
| `loadingType`      | `LoadingType`                     |          |         | Type of loading indicator to display when the select component is loading. |
| `emptyString`      | `string`                          |          |         | Text to display when there are no options available.                       |
| `clearable`        | `boolean`                         |          |         | If true, allows the user to clear the selected value.                      |
| `disabled`         | `boolean`                         |          |         | If true, disables the select component.                                    |
| `size`             | `SizeTypes`                       |          |         | Size of the select component (e.g., small, medium, large).                 |
| `onBlur`           | `(e: FocusEvent) => void`         |          |         | Callback function triggered when the select component loses focus.         |

### Skeleton

| Name      | Type                 | Required | default   | Description |
| --------- | -------------------- | -------- | --------- | ----------- |
| shape     | `SkeletonShapes`     | no       | rectangle |             |
| size      | `SizeTypes`          | no       | medium    |             |
| animation | `SkeletonAnimations` | no       | pulse     |             |

### SimpleTable

| Name               | Type   | Required | default | Description |
| ------------------ | ------ | -------- | ------- | ----------- |
| className          | string | no       |         |             |
| containerClassName | string |          |         |             |

#### SimpleTable.Row

| Name              | Type    | Required | default | Description |
| ----------------- | ------- | -------- | ------- | ----------- |
| className         | string  | no       |         |             |
| withoutHoverStyle | boolean |          |         |             |

#### SimpleTable.TD

| Name      | Type   | Required | default | Description |
| --------- | ------ | -------- | ------- | ----------- |
| className | string | no       |         |             |

#### SimpleTable.TH

| Name  | Type              | Required | default | Description |
| ----- | ----------------- | -------- | ------- | ----------- |
| label | string, ReactNode | no       |         |             |

### EmptyState

| Name          | Type        | Required | default                 | Description |
| ------------- | ----------- | -------- | ----------------------- | ----------- |
| text          | `ReactNode` | no       | No data                 |             |
| icon          | `ReactNode` | no       | PRESENTED_IMAGE_DEFAULT |             |
| className     | string      | no       |                         |             |
| iconClassName | string      | no       |                         |             |
| textClassName | string      | no       |                         |             |
| usingIcon     | boolean     | no       | true                    |             |
| usingText     | boolean     | no       | true                    |             |

### Divider

| Name          | Type               | Required | default | Description |
| ------------- | ------------------ | -------- | ------- | ----------- |
| uiType        | `DividerTypes`     |          |         |             |
| className     | string             |          |         |             |
| orientation   | `OrientationTypes` |          |         |             |
| text          | string             |          |         |             |
| textClassName | string             |          |         |             |
| usingText     | boolean            |          |         |             |

### Modal

| Name               | Type              | Required | Default | Description                                                       |
| ------------------ | ----------------- | -------- | ------- | ----------------------------------------------------------------- |
| title              | `React.ReactNode` |          |         | The title of the modal, which can be a string or any React node.  |
| isOpen             | `boolean`         |          |         | Controls whether the modal is open or closed.                     |
| onClose            | `() => void`      |          |         | Callback function triggered when the modal is requested to close. |
| contentClassName   | `string`          |          |         | Additional CSS classes for custom styling of the modal content.   |
| containerClassName | `string`          |          |         | Additional CSS classes for custom styling of the modal container. |
| closable           | `boolean`         |          |         | If true, displays a close button in the modal.                    |
| rendered           | `() => void`      |          |         | Callback function triggered when the modal is rendered.           |
| children           | `React.ReactNode` |          |         | The content to be displayed inside the modal.                     |

## Contributor ✨

[![Contributors](https://contrib.rocks/image?repo=DevAnsar/react-search-hook)](https://github.com/DevAnsar)
