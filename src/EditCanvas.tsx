import { useRef, useLayoutEffect, useState } from "preact/hooks";

import { Shape, ShapeTypeProps, editShape } from "./state";
import * as Drawing from "./drawings";

export function EditCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const currentEditShape = editShape.value as Shape;

  useLayoutEffect(() => {
    // watch for resize events
    const resizeObserver = new ResizeObserver(() => {
      // this should never happen
      if (!canvasRef.current) throw new Error("Canvas not found");

      const w = canvasRef.current.offsetWidth;
      const h = canvasRef.current.offsetHeight;

      // update the state if the size has changed
      if (w != width) {
        setWidth(w);
      }
      if (h != height) {
        setHeight(h);
      }
    });

    if (canvasRef.current) resizeObserver.observe(canvasRef.current);

    return () => {
      // cleanup by removing from ResizeObserver
      resizeObserver.disconnect();
    };
  }, []);

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) drawShape(gc, currentEditShape?.props);
  }, [width, height, currentEditShape]);

  function drawShape(gc: CanvasRenderingContext2D, props: ShapeTypeProps) {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
    gc.save();
    gc.translate(gc.canvas.width / 2, gc.canvas.height / 2);
    switch (props.type) {
      case "square":
        Drawing.square(gc, {
          fill: `hsl(${props.hue}, 100%, 50%)`,
        });
        break;
      case "star":
        Drawing.star(gc, {
          fill: `hsl(${props.hue}, 100%, 50%)`,
          r1: props.r1,
          r2: props.r2,
          n: props.n,
        });
        break;
      case "bullseye":
        Drawing.bullseye(gc, {
          hue1: `hsl(${props.hue1}, 100%, 50%)`,
          hue2: `hsl(${props.hue2}, 100%, 50%)`,
          rings: props.rings,
        });
        break;
      case "cat":
        Drawing.cat(gc, {
          fill: `hsl(${props.hue}, 100%, 50%)`,
          eyeDirection: props.eyeDirection,
        });
    }
    gc.restore();
  }

  return <canvas ref={canvasRef} width="100" height="100" class="flex-1" />;
}
