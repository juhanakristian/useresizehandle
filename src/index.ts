import * as React from "react";


function useSupersize(ref: React.RefObject<HTMLElement>) {
  const elementRef = React.useRef(ref);

  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(300);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    setWidth(300);
    setHeight(300);
  }, [elementRef.current]);

  const drag = React.useCallback(
    (event) => {
      if (event.pageX === 0) return;

      const offsetX = x - event.pageX;
      const offsetY = y - event.pageY;

      setWidth((width) => width - offsetX);
      setHeight((height) => height - offsetY);
      setX(event.pageX);
      setY(event.pageY);
    },
    [elementRef.current, x, y]
  );

  const dragStart = React.useCallback(
    (event) => {
      setX(event.pageX);
      setY(event.pageY);
    },
    [elementRef.current]
  );

  const handleStyle = React.useMemo(() => {
    if (!elementRef) {
    }
    return {
      position: "absolute",
      bottom: 0,
      right: 0
    };
  }, [elementRef.current]);

  const handleProps = {
    draggable: true,
    onDragStart: dragStart,
    onDrag: drag,
    style: handleStyle
  };

  const containerProps = {
    style: {
      position: "relative",
      overflow: "hidden",
      width,
      height
    }
  };

  return { handleProps, containerProps };
}