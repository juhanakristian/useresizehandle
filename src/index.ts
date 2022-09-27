import * as React from "react";

interface UseResizeHandleConfig {
  axis?: "horizontal" | "vertical" | "both";
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export function useResizeHandle(config?: UseResizeHandleConfig) {
  const containerRef = React.useRef<HTMLElement | null>(null);

  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();

  const [startWidth, setStartWidth] = React.useState<number | undefined>();
  const [startHeight, setStartHeight] = React.useState<number | undefined>();

  const [startX, setStartX] = React.useState<number | undefined>();
  const [startY, setStartY] = React.useState<number | undefined>();

  const [resizing, setResizing] = React.useState(false);

  const axis = config?.axis ?? "both";

  const drag = React.useCallback(
    (event: PointerEvent) => {
      if (event.screenX === 0) return;
      if (!startWidth || !startHeight) return;
      if (!startX || !startY) return;

      if (axis == "horizontal" || axis === "both")
        setWidth(startWidth + (event.screenX - startX));

      if (axis == "vertical" || axis === "both")
        setHeight(startHeight + (event.screenY - startY));
    },
    [axis, startWidth, startHeight, startX, startY]
  );

  const dragEnd = React.useCallback(
    (event: PointerEvent) => {
      setStartX(undefined);
      setStartY(undefined);

      setStartWidth(undefined);
      setStartHeight(undefined);

      setResizing(false);

      if (config?.onResizeEnd) config.onResizeEnd();
    },
    [drag]
  );

  const dragStart = React.useCallback((event: PointerEvent) => {
    setStartX(event.screenX);
    setStartY(event.screenY);

    setStartWidth(containerRef.current?.clientWidth);
    setStartHeight(containerRef.current?.clientHeight);

    setResizing(true);

    if (config?.onResizeStart) config.onResizeStart();
  }, []);

  React.useEffect(() => {
    if (!resizing) {
      window.removeEventListener("pointermove", drag);
      window.removeEventListener("pointerup", dragEnd);
      return;
    }

    window.addEventListener("pointermove", drag);
    window.addEventListener("pointerup", dragEnd);

    return () => {
      window.removeEventListener("pointermove", drag);
      window.removeEventListener("pointerup", dragEnd);
    };
  }, [resizing, drag, dragEnd]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    setWidth(containerRef.current.clientWidth);
    setHeight(containerRef.current.clientHeight);
  }, [drag, dragEnd]);

  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
  };

  const handleProps = {
    onPointerDown: dragStart,
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
