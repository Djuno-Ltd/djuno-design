## ![Djuno-design](https://bytebucket.org/djunoltd/djuno-design/raw/359ef9aff4e466d83ce3551bf3deca362de0aa5f/src/assets/djuno-design-logo.svg?token=0386a8f6fd7561c7f356ee575f347c9cb5b3ab14) Djuno Design

**djuno-design** is a lightweight, tailwindCSS-based, and wrapper-approach library for React to develop front-end projects easily.

### 1. Install

npm

    npm i djuno-design

yarn

    yarn add djuno-design

### 2. Import styles at the top of your component tree

```jsx
import 'djuno-design/dist/index.css'
```

### 3. Simply you can import all components everywere

```jsx
import { Button } from 'djuno-design'

function App() {
  return (
    <>
      <Button>Click!</Button>
    </>
  )
}
```

## Documentation

### Available providers

1. DjunoDesignProvider (or DDProvider)

### Available components

1.  Button
2.  Tooltip

    - InfoTooltip

3.  Loading
4.  Flex
5.  Card
6.  Typography

    - Title
    - Text
    - Paragraph
    - Link

7.  Alert
8.  Steps
9.  Form

    - Input
    - Textarea
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
15. Dropdown
16. SecureCopy
17. Accordion
18. Pagination
19. Layouts

    - PanelLayout
    - PanelSidebar
    - PanelHeader

20. Sidebar
21. JsonViewer
22. Tabs
23. ThemeChanger & ThemeSwitcher
24. Popover
25. Tag
26. CodeViewer

### Available hooks

1. useShow
2. useWindowOnClick
3. useDjunoDesign

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
| uiType      | `ButtonTypes`  |          | simple    |             |
| uiSize      | `SizeTypes`    |          | medium    |             |
| tooltip     | `TooltipProps` |          | undefined |             |
| loading     | boolean        |          | false     |             |
| loadingType | `LoadingType`  |          | simple    |             |

### Tooltip

| Name      | Type                | Required | default | Description |
| --------- | ------------------- | -------- | ------- | ----------- |
| content   | string, ReactNode   | ✔       |         |             |
| place     | `TooltipPlaces`     |          | top     |             |
| theme     | `TooltipThemeTypes` |          | primary |             |
| clickable | boolean             |          | false   |             |

### Loading

| Name       | Type                | Required | default | Description |
| ---------- | ------------------- | -------- | ------- | ----------- |
| uiType     | `LoadingType`       |          | simple  |             |
| uiSize     | number              |          | 24px    |             |
| borderSize | number              |          | 2px     |             |
| theme      | `LoadingThemeTypes` |          | primary |             |

### Flex

| Name      | Type            | Required | default | Description                   |
| --------- | --------------- | -------- | ------- | ----------------------------- |
| direction | `FlexDirection` |          | row     | Specifies the main-axis       |
| justify   | `FlexJustify`   |          | start   | Alignment along the main-axis |
| items     | `FlexItems`     |          | start   | Alignment along the sub-axis  |

### Card

| Name                          | Type              | Required | default | Description |
| ----------------------------- | ----------------- | -------- | ------- | ----------- |
| id                            | string            |          |         |             |
| title                         | string, ReactNode |          |         |             |
| titleLevel                    | number [1,2,..,6] |          | 5       |             |
| description                   | string, ReactNode |          |         |             |
| setting                       | string, ReactNode |          |         |             |
| class names for main sections | string            |          |         |             |

### Typography

#### Typography.Title

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| level     | number [1,2,..,6]                   |          | 1         |             |
| uiType    | `TypographtUiTypes`                 |          | default   |             |
| tooltip   | `TooltipProps`                      |          | undefined |             |
| code      | boolean                             |          | false     |             |
| mark      | boolean                             |          | false     |             |
| underline | boolean                             |          | false     |             |
| del       | boolean                             |          | false     |             |
| strong    | boolean                             |          | false     |             |
| italic    | boolean                             |          | false     |             |
| copyable  | boolean or `TypographyCopyableProp` |          | false     |             |

#### Typography.Text

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| size      | `TypographtSizeTypes`               |          | base      |             |
| uiType    | `TypographtUiTypes`                 |          | default   |             |
| tooltip   | `TooltipProps`                      |          | undefined |             |
| code      | boolean                             |          | false     |             |
| mark      | boolean                             |          | false     |             |
| underline | boolean                             |          | false     |             |
| del       | boolean                             |          | false     |             |
| strong    | boolean                             |          | false     |             |
| italic    | boolean                             |          | false     |             |
| copyable  | boolean or `TypographyCopyableProp` |          | false     |             |

#### Typography.Paragraph

| Name      | Type                                | Required | default   | Description |
| --------- | ----------------------------------- | -------- | --------- | ----------- |
| size      | `TypographtSizeTypes`               |          | base      |             |
| uiType    | `TypographtUiTypes`                 |          | default   |             |
| tooltip   | `TooltipProps`                      |          | undefined |             |
| code      | boolean                             |          | false     |             |
| mark      | boolean                             |          | false     |             |
| underline | boolean                             |          | false     |             |
| del       | boolean                             |          | false     |             |
| strong    | boolean                             |          | false     |             |
| italic    | boolean                             |          | false     |             |
| copyable  | boolean or `TypographyCopyableProp` |          | false     |             |

#### Typography.Link

| Name            | Type                              | Required | default   | Description |
| --------------- | --------------------------------- | -------- | --------- | ----------- |
| all `<a>` props | `React.AnchorHTMLAttributes`      |          |           |             |
| size            | `TypographtSizeTypes`             |          | base      |             |
| uiType          | `TypographtUiTypes`               |          | default   |             |
| tooltip         | `TooltipProps`                    |          | undefined |             |
| code            | `boolean`                         |          | false     |             |
| mark            | `boolean`                         |          | false     |             |
| underline       | `boolean`                         |          | false     |             |
| del             | `boolean`                         |          | false     |             |
| strong          | `boolean`                         |          | false     |             |
| italic          | `boolean`                         |          | false     |             |
| copyable        | `boolean, TypographyCopyableProp` |          | false     |             |

### Alert

| Name        | Type                | Required | default   | Description                                              |
| ----------- | ------------------- | -------- | --------- | -------------------------------------------------------- |
| message     | `string, ReactNode` |          |           |                                                          |
| description | `string, ReactNode` |          |           |                                                          |
| uiType      | `AlertTypes`        |          | `neutral` |                                                          |
| showIcon    | `boolean`           |          | `false`   |                                                          |
| banner      | `boolean`           |          | `false`   | Display Alert as a banner                                |
| closable    | `boolean`           |          | `false`   | If true, the alert can be closed (disappears on click).  |
| onClose     | `() => void`        |          |           | Callback function to be called when the alert is closed. |

### Steps

| Name  | Type         | Required | default | Description |
| ----- | ------------ | -------- | ------- | ----------- |
| steps | `StepItem[]` | yes      |         |             |
| step  | `string`     | yes      |         |             |

### Input

| Name                | Type                                          | Required | default | Description |
| ------------------- | --------------------------------------------- | -------- | ------- | ----------- |
| all `<input>` props | `React.InputHTMLAttributes<HTMLInputElement>` |          |         |             |
| label               | `string, React.ReactNode`                     |          |         |             |
| uiType              | `InputTypes`                                  |          |         |             |
| required            | `boolean`                                     |          |         |             |
| error               | `string , boolean , React.ReactNode`          |          |         |             |
| hint                | `string, React.ReactNode`                     |          |         |             |
| loading             | `boolean`                                     |          |         |             |
| loadingType         | `LoadingType`                                 |          |         |             |
| placeholder         | `string`                                      |          |         |             |
| tooltip             | `TooltipProps`                                |          |         |             |
| uiSize              | `SizeTypes`                                   |          | medium  |             |
| copyable            | `boolean or function or InputCopyableProp`    |          |         |             |
| labelClassName      | `string`                                      |          |         |             |
| containerClassName  | `string`                                      |          |         |             |

### Textarea

| Name                   | Type                                                | Required | default | Description |
| ---------------------- | --------------------------------------------------- | -------- | ------- | ----------- |
| all `<textarea>` props | `React.TextareaHTMLAttributes<HTMLTextAreaElement>` |          |         |             |
| placeholder            | `string`                                            |          |         |             |
| label                  | `string, React.ReactNode`                           |          |         |             |
| required               | `boolean`                                           |          |         |             |
| error                  | `string, boolean, React.ReactNode`                  |          |         |             |
| hint                   | `string , React.ReactNode`                          |          |         |             |
| uiType                 | `InputTypes`                                        |          |         |             |
| tooltip                | `TooltipProps`                                      |          |         |             |
| uiSize                 | `SizeTypes`                                         |          | medium  |             |
| copyable               | `boolean or function or InputCopyableProp`          |          |         |             |
| labelClassName         | `string`                                            |          |         |             |
| loading                | `boolean`                                           |          |         |             |
| loadingType            | `LoadingType`                                       |          |         |             |
| containerClassName     | `string`                                            |          |         |             |

### Switcher

| Name        | Type                       | Required | default | Description |
| ----------- | -------------------------- | -------- | ------- | ----------- |
| value       | `boolean`                  |          |         |             |
| onChange    | `(value: boolean) => void` |          |         |             |
| disabled    | `boolean`                  |          |         |             |
| loading     | `boolean`                  |          |         |             |
| loadingType | `LoadingProps`             |          |         |             |
| uiSize      | `SizeTypes`                |          | medium  |             |

### Select

| Name             | Type                                    | Required | Default | Description                                                                |
| ---------------- | --------------------------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| value            | `T`                                     |          |         | The currently selected value.                                              |
| onChange         | `(value: T or undefined) => void`       |          |         | Callback function triggered when the selected value changes.               |
| defaultValue     | `T`                                     |          |         | The default value of the select component.                                 |
| options          | `SelectOption<T, ET>[]`                 | ✔       |         | Array of options available for selection.                                  |
| className        | `string`                                |          |         | Additional CSS classes for custom styling of the select component.         |
| labelClassName   | `string`                                |          |         | Additional CSS classes for custom label                                    |
| buttonClassName  | `string`                                |          |         | Additional CSS classes for custom styling of the select button.            |
| optionsClassName | `string`                                |          |         | Additional CSS classes for custom styling of the options list.             |
| optionClassName  | `string`                                |          |         | Additional CSS classes for custom styling of the each option               |
| label            | `string or  React.ReactNode`            |          |         | The label displayed above the select component.                            |
| error            | `string or boolean or  React.ReactNode` |          |         | Error message to display if there is a validation issue.                   |
| required         | `boolean`                               |          |         | Indicates if the select component is required.                             |
| uiType           | `SelectTypes`                           |          |         | The uiType of the select component (e.g., single select, multi-select).    |
| tooltip          | `TooltipProps`                          |          |         | Tooltip properties to display additional information.                      |
| hint             | `string or  React.ReactNode`            |          |         | Hint text to provide additional context or instructions.                   |
| loading          | `boolean`                               |          |         | Indicates if the select component is in a loading state.                   |
| loadingType      | `LoadingType`                           |          |         | Type of loading indicator to display when the select component is loading. |
| emptyString      | `string`                                |          |         | Text to display when there are no options available.                       |
| clearable        | `boolean`                               |          |         | If true, allows the user to clear the selected value.                      |
| disabled         | `boolean`                               |          |         | If true, disables the select component.                                    |
| uiSize           | `SizeTypes`                             |          |         | Size of the select component (e.g., small, medium, large).                 |
| onBlur           | `(e: FocusEvent) => void`               |          |         | Callback function triggered when the select component loses focus.         |

### Skeleton

| Name      | Type                 | Required | default   | Description |
| --------- | -------------------- | -------- | --------- | ----------- |
| shape     | `SkeletonShapes`     |          | rectangle |             |
| uiSize    | `SizeTypes`          |          | medium    |             |
| animation | `SkeletonAnimations` |          | pulse     |             |

### SimpleTable

| Name               | Type     | Required | default | Description |
| ------------------ | -------- | -------- | ------- | ----------- |
| className          | `string` |          |         |             |
| containerClassName | `string` |          |         |             |

#### SimpleTable.Row

| Name              | Type      | Required | default | Description |
| ----------------- | --------- | -------- | ------- | ----------- |
| className         | `string`  |          |         |             |
| withoutHoverStyle | `boolean` |          |         |             |

#### SimpleTable.TD

| Name      | Type     | Required | default | Description |
| --------- | -------- | -------- | ------- | ----------- |
| className | `string` |          |         |             |

#### SimpleTable.TH

| Name  | Type                | Required | default | Description |
| ----- | ------------------- | -------- | ------- | ----------- |
| label | `string, ReactNode` |          |         |             |

### EmptyState

| Name          | Type        | Required | default                 | Description |
| ------------- | ----------- | -------- | ----------------------- | ----------- |
| text          | `ReactNode` |          | No data                 |             |
| icon          | `ReactNode` |          | PRESENTED_IMAGE_DEFAULT |             |
| className     | `string`    |          |                         |             |
| iconClassName | `string`    |          |                         |             |
| textClassName | `string`    |          |                         |             |
| usingIcon     | `boolean`   |          | true                    |             |
| usingText     | `boolean`   |          | true                    |             |

### Divider

| Name          | Type               | Required | default | Description |
| ------------- | ------------------ | -------- | ------- | ----------- |
| uiType        | `DividerTypes`     |          |         |             |
| className     | `string`           |          |         |             |
| orientation   | `OrientationTypes` |          |         |             |
| text          | `string`           |          |         |             |
| textClassName | `string`           |          |         |             |

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

### Dropdown

| Name            | Type                | Required | default | Description |
| --------------- | ------------------- | -------- | ------- | ----------- |
| menu            | `DropdownElement[]` |          |         |             |
| title           | `string`            |          |         |             |
| buttonClassName | `string`            |          |         |             |
| itemsClassName  | `string`            |          |         |             |
| itemClassName   | `string`            |          |         |             |

### SecureCopy

| Name          | Type          | Required | default | Description |
| ------------- | ------------- | -------- | ------- | ----------- |
| text          | `string`      | ✔       |         |             |
| className     | `string`      |          |         |             |
| icon          | `ReactNode`   |          |         |             |
| type          | `ActionTypes` |          |         |             |
| textClassName | `string`      |          |         |             |
| iconClassName | `string`      |          |         |             |
| showText      | `boolean`     |          |         |             |
| uiSize        | `SizeTypes`   |          | medium  |             |

### Accordion

| Name            | Type              | Required | default | Description |
| --------------- | ----------------- | -------- | ------- | ----------- |
| items           | `AccordionItem[]` |          |         |             |
| panelClassNames | `string`          |          |         |             |
| loading         | `boolean`         |          |         |             |
| uiType          | `AccordinType`    |          | default |             |

### Pagination

| Name         | Type                                      | Required | default | Description |
| ------------ | ----------------------------------------- | -------- | ------- | ----------- |
| limit        | `number`                                  |          |         |             |
| offset       | `number`                                  |          |         |             |
| total        | `number`                                  |          |         |             |
| siblingCount | `number`                                  |          |         |             |
| onPageChange | `(offset: number, limit: number) => void` |          |         |             |
| className    | `string`                                  |          |         |             |
| loading      | `boolean`                                 |          |         |             |

### PanelLayout

| Name                            | Type                                                                                                                                                                     | Required | Default | Description                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| `type`                          | `PanelLayoutTypes`                                                                                                                                                       |          |         | Defines the layout type, such as 'normal' or 'mini'.                                           |
| `pathname`                      | `string`                                                                                                                                                                 |          |         | The current pathname used to generate segments for the sidebar.                                |
| `renderSidebar`                 | `({ segments, isShowSidebar, type }: { segments: string[], isShowSidebar: boolean, type: PanelLayoutTypes }) => React.ReactNode`                                         |          |         | Function to render the sidebar, receiving segments, sidebar visibility state, and layout type. |
| `renderHeader`                  | `({ handleHideSidebar, handleShowSidebar, isShowSidebar }: { handleHideSidebar: () => void, handleShowSidebar: () => void, isShowSidebar: boolean }) => React.ReactNode` |          |         | Function to render the header, receiving callbacks to show or hide the sidebar.                |
| `children`                      | `React.ReactNode`                                                                                                                                                        |          |         | The content to be displayed within the layout's main area.                                     |
| `enableGoToTopAfterScroll`      | `boolean`                                                                                                                                                                |          | true    | Showing a button to go to the top of the page after a little scrolling                         |
| `enableGoToTopAfterChangeRoute` | `boolean`                                                                                                                                                                |          | true    | Scrolling to the top after changing pathname prop.                                             |
| `globalLoading`                 | `boolean`                                                                                                                                                                |          | false   | Controls whether the global loading state is active.                                           |
| `globalLoadingContent`          | `React.ReactNode`                                                                                                                                                        |          |         | Custom content to display within the global loading overlay.                                   |
| `contentLoading`                | `boolean`                                                                                                                                                                |          | false   | Controls whether the content loading state is active.                                          |
| `contentLoadingContent`         | `React.ReactNode`                                                                                                                                                        |          |         | Custom content to display within the content loading overlay.                                  |
| `loadingsContainerClassName`    | `string`                                                                                                                                                                 |          |         | A custom CSS class applied to the container of both global and content loading overlays.       |

### PanelSidebar

| Name            | Type               | Required | Default | Description                                                   |
| --------------- | ------------------ | -------- | ------- | ------------------------------------------------------------- |
| `isShowSidebar` | `boolean`          |          |         | Determines whether the sidebar is visible or hidden.          |
| `type`          | `PanelLayoutTypes` |          |         | The type of sidebar layout, such as 'normal' or 'mini'.       |
| `sidebarHeader` | `React.ReactNode`  |          |         | Optional header content to display at the top of the sidebar. |
| `children`      | `React.ReactNode`  |          |         | The content to be displayed within the sidebar.               |

### PanelHeader

| Name                | Type              | Required | Default | Description                                                |
| ------------------- | ----------------- | -------- | ------- | ---------------------------------------------------------- |
| `handleHideSidebar` | `() => void`      |          |         | Callback function to hide the sidebar.                     |
| `handleShowSidebar` | `() => void`      |          |         | Callback function to show the sidebar.                     |
| `mobileIcon`        | `React.ReactNode` |          |         | An optional icon or element to display in the mobile view. |
| `children`          | `React.ReactNode` |          |         | The content to be displayed within the header.             |

### Checkbox

| Name           | Type                               | Required | default | Description |
| -------------- | ---------------------------------- | -------- | ------- | ----------- |
| label          | `string, React.ReactNode`          |          |         |             |
| required       | `boolean`                          |          | false   |             |
| error          | `string, boolean, React.ReactNode` |          |         |             |
| value          | `boolean`                          |          |         |             |
| onChange       | `() => void`                       |          |         |             |
| disabled       | `boolean`                          |          |         |             |
| labelClassName | `string`                           |          |         |             |

### Sidebar

| Name        | Type                  | Required | Default | Description                                                     |
| ----------- | --------------------- | -------- | ------- | --------------------------------------------------------------- |
| items       | `SidebarItem[]`       | ✔       |         | List of items to be displayed in the sidebar.                   |
| segments    | `string[]`            |          |         | Array of URL segments used to determine the active item.        |
| subItems    | `SidebarItem[]`       |          |         | Additional items to be displayed below the main items.          |
| loading     | `boolean`             |          |         | Indicates whether the sidebar is in a loading state.            |
| loadingMode | `SidebarLoadingModes` |          |         | Determines the visual loading state (e.g., spinner, skeleton).  |
| type        | `PanelLayoutTypes`    |          |         | Specifies the sidebar layout type (e.g., 'normal' or 'mini').   |
| children    | `React.ReactNode`     |          |         | Additional content to be rendered at the bottom of the sidebar. |

#### SidebarItem

| Name             | Type                                                     | Required | Default | Description                                                          |
| ---------------- | -------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------- |
| id               | `string  or number`                                      | Yes      |         | Unique identifier for the sidebar item.                              |
| activeConditions | `SidebarActiveItemCondition[]`                           |          |         | Conditions to determine if the item is active.                       |
| label            | `SidebarItemLabel`                                       |          |         | Label content for the sidebar item (can be text, node, or function). |
| link             | `string`                                                 |          |         | Optional link associated with the item.                              |
| onClick          | `(item?: SidebarItem) => void`                           |          |         | Click handler for the item.                                          |
| icon             | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>` |          |         | Icon component for the item.                                         |
| disabled         | `boolean`                                                |          |         | If true, the item is disabled and not clickable.                     |
| children         | `SidebarItem[]`                                          |          |         | Nested items to be displayed below the current item                  |
| active           | `boolean`                                                |          |         | Conditions to determine if the item is visible or not.               |
| testId           | `string`                                                 |          |         | Test ID for the sidebar item (useful for testing).                   |

### JsonViewer

| Name      | Type              | Required | default | Description |
| --------- | ----------------- | -------- | ------- | ----------- |
| value     | `object, null`    |          | {}      |             |
| collapsed | `number, boolean` |          |         |             |

### Tabs

| Name           | Type         | Required | Default | Description |
| -------------- | ------------ | -------- | ------- | ----------- |
| options        | `TabOptions` |          |         |             |
| selectedIndex  | `number`     |          |         |             |
| onChange       | `() => void` |          |         |             |
| listClassName  | `string`     |          |         |             |
| panelClassName | `string`     |          |         |             |
| tabType        | `string`     |          |         |             |

### ThemeChanger , ThemeSwitcher

| Name           | Type     | Required | default | Description |
| -------------- | -------- | -------- | ------- | ----------- |
| itemsClassName | `string` |          |         |             |

### Popover

| Name           | Type                  | Required | default | Description |
| -------------- | --------------------- | -------- | ------- | ----------- |
| contentNode    | `React.ReactNode`     | ✔       |         |             |
| children       | `React.ReactNode`     |          |         |             |
| panelclassName | `string`              |          |         |             |
| panelStyle     | `React.CSSProperties` |          |         |             |

### Tag

| Name      | Type                  | Required | Default | Description                                             |
| --------- | --------------------- | -------- | ------- | ------------------------------------------------------- |
| className | `string`              |          |         | Additional class names to apply to the tag.             |
| color     | `PresetColorNames`    |          |         | Color type of the tag (e.g., 'processing', 'success',). |
| style     | `React.CSSProperties` |          |         | Inline styles for the tag.                              |
| children  | `React.ReactNode`     |          |         | Content to be displayed inside the tag.                 |
| icon      | `React.ReactNode`     |          |         | Icon to be displayed before the content.                |
| bordered  | `boolean`             |          | `true`  | If false, the tag will not have a border.               |
| closable  | `boolean`             |          | `false` | If true, the tag can be closed (disappears on click).   |
| onClose   | `() => void`          |          |         | Callback function to be called when the tag is closed.  |

### CodeViewer

| Name               | Type                  | Required | Default   | Description                                                                                                                      |
| ------------------ | --------------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| code               | `string`              | ✔       |           | The code to be displayed in the viewer.                                                                                          |
| language           | `CodeViewerLanguages` |          |           | The programming language for syntax highlighting.                                                                                |
| showLineNumbers    | `boolean`             |          | `false`   | If true, line numbers are displayed.                                                                                             |
| wrapLongLines      | `boolean`             |          | `false`   | If true, long lines are wrapped instead of scrolling horizontally.                                                               |
| bgTransparent      | `boolean`             |          | `true`    | If true, the background is set to transparent.                                                                                   |
| startingLineNumber | `number`              |          |           | The line number to start counting from if `showLineNumbers` is true.                                                             |
| theme              | `ThemeModes`          |          |           | The theme mode for syntax highlighting (`'light'` or `'dark'`). If not provided, `DjunoDesignProvider` will determine the theme. |
| fontSize           | `string`              |          | `0.85rem` | The font size of the code.                                                                                                       |
| `copyable`         | `CopyableProp`        |          |           | Enables the copy-to-clipboard feature. Can be customized with tooltips and icons.                                                |

### Countdown

| Name          | Type                                               | Required | Default | Description |
| ------------- | -------------------------------------------------- | -------- | ------- | ----------- |
| seconds       | `number`                                           |          |         |             |
| className     | `string`                                           |          |         |             |
| showTimer     | `boolean`                                          |          |         |             |
| children      | `React.ReactNode`                                  |          |         |             |
| timerPosition | 'start or end'                                     |          |         |             |
| timerRender   | `(props: CountdownRenderProps) => React.ReactNode` |          |         |             |
| onClick       | `() => void`                                       |          |         |             |

## Contributor ✨

[![Contributors](https://contrib.rocks/image?repo=DevAnsar/react-search-hook)](https://github.com/DevAnsar)
