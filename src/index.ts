import * as React from "react";


function useSupersize() {
  const containerRef = React.useRef<HTMLElement | null>(null);

  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();
  const [x, setX] = React.useState<number>();
  const [y, setY] = React.useState<number>();

  React.useEffect(() => {
    if (!containerRef.current) return;

    setWidth(containerRef.current.clientWidth);
    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  const drag = React.useCallback(
    (event) => {
      if (event.pageX === 0) return;
      if (!x || !y || !width || !height) return;

      const offsetX = x - event.pageX;
      const offsetY = y - event.pageY;

      setWidth(width - offsetX);
      setHeight(height - offsetY);
      setX(event.pageX);
      setY(event.pageY);
    },
    [x, y, width, height]
  );

  const dragStart = React.useCallback((event) => {
    setX(event.pageX);
    setY(event.pageY);
  }, []);

  const handleStyle = React.useMemo(() => {
    if (!containerRef) {
      return;
    }
    return {
      position: "absolute",
      bottom: 0,
      right: 0
    };
  }, [containerRef]);

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
      height,
      backgroundColor: "deeppink"
    }
  };

  return { handleProps, containerProps, containerRef };
}