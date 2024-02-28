## Djuno Design

### Introduction

**djuno-design** is a lightweight library for React to develop front-end projects easily.

## Documentation

### 1. Install

npm

    npm i djuno-design

yarn

    yarn add djuno-design

### 2. Import styles to top of your component tree

```jsx
import 'djuno-design/dist/index.css'
```

### 3. Simply you can import all components everywere

```jsx
import { Button } from 'djuno-design'

function App() {
  return (
    <div>
      <Button>Click!</Button>
    </div>
  )
}
```

## Available components

1. Button
2. Tooltip
3. Loading

## APIs

### Button

| Name    | Type         | Required | default   | Description |
| ------- | ------------ | -------- | --------- | ----------- |
| uiType  | ButtonTypes  | no       | simple    |             |
| size    | SizeTypes    | no       | medium    |             |
| tooltip | TooltipProps | no       | undefined |             |

### Tooltip

| Name    | Type          | Required | default | Description |
| ------- | ------------- | -------- | ------- | ----------- |
| content | string        | yes      |         |             |
| place   | TooltipPlaces | no       | top     |             |
| theme   | ColorTypes    | no       | primary |             |

### Loading

| Name       | Type        | Required | default | Description |
| ---------- | ----------- | -------- | ------- | ----------- |
| className  | string      | no       |         |             |
| type       | LoadingType | no       | simple  |             |
| size       | number      | no       | 24px    |             |
| borderSize | number      | no       | 2px     |             |
| theme      | ColorTypes  | no       | primary |             |

## Contributor ✨

[![Contributors](https://contrib.rocks/image?repo=DevAnsar/react-search-hook)](https://github.com/DevAnsar/react-search-hook/graphs/contributors)
