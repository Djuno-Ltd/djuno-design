## ![Djuno-design](https://bytebucket.org/djunoltd/djuno-design/raw/359ef9aff4e466d83ce3551bf3deca362de0aa5f/src/assets/djuno-design-logo.svg?token=0386a8f6fd7561c7f356ee575f347c9cb5b3ab14) Djuno Design

**djuno-design** is a lightweight, tailwindCSS-based, and wrapper-approach library for React to develop front-end projects easily.

A good visual reference can be found at [design.djuno.io](https://design.djuno.io/)

### 1. Install

npm

    npm i djuno-design

yarn

    yarn add djuno-design

### 2. Import styles at the top of your component tree

```jsx
import "djuno-design/dist/index.css";
```

### 3. Simply you can import all components everywere

```jsx
import { Button } from "djuno-design";

function App() {
  return (
    <>
      <Button>Click!</Button>
    </>
  );
}
```
