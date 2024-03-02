## Djuno Design

### Introduction

**djuno-design** is a lightweight library for React to develop front-end projects easily.

## Documentation

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

## Available components

1. Button
2. Tooltip
3. Loading
4. Flex
5. Card

## APIs

### Button

| Name        | Type         | Required | default   | Description |
| ----------- | ------------ | -------- | --------- | ----------- |
| uiType      | ButtonTypes  | no       | simple    |             |
| size        | SizeTypes    | no       | medium    |             |
| tooltip     | TooltipProps | no       | undefined |             |
| loading     | boolean      | no       | false     |             |
| loadingType | LoadingType  | no       | simple    |             |

### Tooltip

| Name      | Type              | Required | default | Description |
| --------- | ----------------- | -------- | ------- | ----------- |
| content   | string, ReactNode | yes      |         |             |
| place     | TooltipPlaces     | no       | top     |             |
| theme     | TooltipThemeTypes | no       | primary |             |
| clickable | boolean           | no       | false   |             |

### Loading

| Name       | Type              | Required | default | Description |
| ---------- | ----------------- | -------- | ------- | ----------- |
| type       | LoadingType       | no       | simple  |             |
| size       | number            | no       | 24px    |             |
| borderSize | number            | no       | 2px     |             |
| theme      | LoadingThemeTypes | no       | primary |             |

### Flex

| Name      | Type          | Required | default | Description                   |
| --------- | ------------- | -------- | ------- | ----------------------------- |
| direction | FlexDirection | no       | row     | Specifies the main-axis       |
| justify   | FlexJustify   | no       | start   | Alignment along the main-axis |
| items     | FlexItems     | no       | start   | Alignment along the sub-axis  |

### Card

| Name                          | Type              | Required | default | Description |
| ----------------------------- | ----------------- | -------- | ------- | ----------- |
| id                            | string            | no       |         |             |
| title                         | string, ReactNode | no       |         |             |
| description                   | string, ReactNode | no       |         |             |
| setting                       | string, ReactNode | no       |         |             |
| class names for main sections | string            | no       |         |             |

## Contributor ✨

[![Contributors](https://contrib.rocks/image?repo=DevAnsar/react-search-hook)](https://github.com/DevAnsar)
