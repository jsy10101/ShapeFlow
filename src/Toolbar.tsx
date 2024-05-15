import { useState } from "preact/hooks";
import {
  ShapeType,
  addShape,
  deleteAllShapes,
  deleteSelectedShapes,
  maxShapes,
  minShapes,
  numShapes,
  shapes,
} from "./state";

export default function Toolbar() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>("square");
  const numTotalShapes = shapes.value.length;

  return (
    <div id="toolbar" class="h-[50px] bg-lightgrey flex-[0_0_auto]">
      <button
        onClick={() => addShape(selectedShape)}
        disabled={numTotalShapes === maxShapes}
      >
        Add
      </button>
      <select
        value={selectedShape}
        onChange={(e) => {
          setSelectedShape((e.target as HTMLSelectElement).value as ShapeType);
        }}
      >
        <option value="square">Square</option>
        <option value="star">Star</option>
        <option value="bullseye">Bullseye</option>
        <option value="cat">Cat</option>
      </select>
      <button
        onClick={() => deleteSelectedShapes()}
        disabled={numShapes.value === 0}
      >
        Delete
      </button>
      <button
        onClick={() => deleteAllShapes()}
        disabled={numTotalShapes === minShapes}
      >
        Clear
      </button>
    </div>
  );
}
