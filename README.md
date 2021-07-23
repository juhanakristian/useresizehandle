# 📐 useResizeHandle

*A react hook for making elements user resizable*

## Install

```shell
npm install useresizehandle
# or with yarn
yarn add useresizehandle
```

## Usage

```js
import { useResizeHandle } from "useresize";

function Component() {
    const {handleProps, containerProps } = useResizeHandle();

    return (
      <div>
        <div {...containerProps}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div {...handleProps}
            style={{
              ...handleProps.style,
              width: 30,
              height: 30,
              background: "black"
            }}
        ></div>
      </div>
    )
}
```


## Configuration

The `useResizeHandle` hook accepts an optional configuration object that can be used to alter the behaviour.

```ts
interface UseResizeConfig {
    axis: "horizontal" | "vertical" | "both";
}
```

```js
const config = {
    axis: "horizontal",
}

const {handleProps, containerProps} = useResizeHandle(config)

```
