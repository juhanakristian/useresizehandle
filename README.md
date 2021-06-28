# 📐 Supersize

*A react hook for making elements user resizable*




## Usage

```js
import { useSupersize } from "supersizeme";

function Component() {
    const {handleProps, containerProps, containerRef} = useSupersize();

    return (
      <div>
        <div ref={containerRef} {...containerProps}>
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


