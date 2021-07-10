# 📐 Supersize

*A react hook for making elements user resizable*


## Usage

```js
import { useSupersize } from "supersizeme";

function Component() {
    const {handleProps, containerProps } = useSupersize();

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

The `useSupersize` hook accepts an optional configuration object that can be used to alter the behaviour.

```ts
interface UseSupersizeConfiguration {
    axis: "horizontal" | "vertical" | "both";
    heightProperty: "height" | "maxHeight" | "minHeight";
    overflowX: "hidden" | "auto" | "scroll";
    overflowY: "hidden" | "auto" | "scroll";
}
```

```js
const config = {
    axis: "horizontal",
    overflowX: "hidden",
}
```
