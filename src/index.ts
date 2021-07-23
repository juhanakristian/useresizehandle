import * as React from "react";

interface UseResizeHandleConfig {
  axis?: "horizontal" | "vertical" | "both";
}

export function useResizeHandle(config?: UseResizeHandleConfig) {
  const containerRef = React.useRef<HTMLElement | null>(null);

  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();
  const [x, setX] = React.useState<number>();
  const [y, setY] = React.useState<number>();

  const axis = config?.axis ?? "both";

  React.useEffect(() => {
    if (!containerRef.current) return;

    setWidth(containerRef.current.clientWidth);
    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  const drag = React.useCallback(
    (event: DragEvent) => {
      if (event.pageX === 0) return;
      if (!x || !y || !width || !height) return;

      const offsetX = x - event.pageX;
      const offsetY = y - event.pageY;

      if (axis == "horizontal" || axis === "both") setWidth(width - offsetX);
      if (axis == "vertical" || axis === "both") setHeight(height - offsetY);
      setX(event.pageX);
      setY(event.pageY);
    },
    [x, y, width, height, axis]
  );

  const dragStart = React.useCallback((event: DragEvent) => {
    if (event.dataTransfer) {
      var img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
      event.dataTransfer.setDragImage(img, 0, 0);
    }
    setX(event.pageX);
    setY(event.pageY);
  }, []);

  const handleStyle = {
    position: "absolute",
    userDrag: "none",
    bottom: 0,
    right: 0,
  };

  const handleProps = {
    draggable: true,
    onDragStart: dragStart,
    onDrag: drag,
    style: handleStyle,
  };

  const containerProps = {
    ref: containerRef,
    style: {
      position: "relative",
      overflow: "hidden",
      width,
      height,
    },
  };

  return { handleProps, containerProps, containerRef };
}
