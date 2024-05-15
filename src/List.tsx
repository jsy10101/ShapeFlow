import { useEffect } from "preact/hooks";

import { deSelectAll, editId, numShapes, selection, shapes } from "./state";

import { Canvas } from "./Canvas";

export default function List() {
  useEffect(() => {
    if (numShapes.value === 1) {
      const selectedShape = shapes.value.find((s) => s.selected);
      if (selectedShape) editId.value = selectedShape.id;
    } else {
      editId.value = -1;
    }
  }, [selection.value]);

  return (
    <div
      id="List"
      class="flex-1 bg-white flex flex-wrap content-start overflow-y-auto pr-[20px] pb-[20px]"
      onClick={() => deSelectAll()}
    >
      {shapes.value.map((shape) => (
        <Canvas key={shape.id} shape={shape} />
      ))}
    </div>
  );
}
