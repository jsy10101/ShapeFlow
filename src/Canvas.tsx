import { useRef, useLayoutEffect } from "preact/hooks";

import { Shape, ShapeTypeProps, deselect, select, shapes } from "./state";
import * as Drawing from "./drawings";

type CanvasProps = {
  shape: Shape;
};

export function Canvas({ shape }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = shape.id;

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) drawShape(gc, shape.props);
  }, [shapes.value]);

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

  return (
    <canvas
      id={id.toString()}
      ref={canvasRef}
      width="100"
      height="100"
      class={`w-[50px] h-[50px] ml-[20px] mt-[20px] hover:outline hover:outline-[4px] hover:outline-lightblue ${
        shape.selected &&
        "outline outline-[1px] outline-blue outline-offset-[2px] hover:outline-[4px] hover:!outline-blue hover:outline-offset-[0.5px]"
      } ${shape.props.type !== "square" && "border-[1px] border-lightgrey"}`}
      onClick={(e) => {
        e.stopPropagation();
        if (shape.selected) {
          deselect(parseInt(canvasRef.current?.id || ""));
        } else {
          select(parseInt(canvasRef.current?.id || ""));
        }
      }}
    />
  );
}
