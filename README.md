# 📐 useResize

*A react hook for making elements user resizable*


## Usage

```js
import { useResize } from "useresize";

function Component() {
    const {handleProps, containerProps } = useResize();

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

The `useResize` hook accepts an optional configuration object that can be used to alter the behaviour.

```ts
interface UseResizeConfig {
    axis: "horizontal" | "vertical" | "both";
}
```

```js
const config = {
    axis: "horizontal",
}

const {handleProps, containerProps} = useResize(config)

```
