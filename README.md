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

## APIs

### Button

| Name    | Type         | Required | default   | Description |
| ------- | ------------ | -------- | --------- | ----------- |
| uiType  | string       | no       | simple    |             |
| size    | string       | no       | medium    |             |
| tooltip | TooltipProps | no       | undefined |             |

### Tooltip

| Name    | Type         | Required | default | Description |
| ------- | ------------ | -------- | ------- | ----------- |
| content | string       | yes      |         |             |
| place   | string       | no       | top     |             |
| theme   | TooltipTheme | no       | primary |             |

## Contributor ✨

[![Contributors](https://contrib.rocks/image?repo=DevAnsar/react-search-hook)](https://github.com/DevAnsar/react-search-hook/graphs/contributors)
