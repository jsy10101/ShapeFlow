import {
  maxShapes,
  multiSelectMode,
  numShapes,
  shapes,
  undoManager,
} from "./state";

export default function Status() {
  const shapeNum = shapes.value.length;
  const numSelectedShapes = numShapes.value;

  return (
    <div
      id="status"
      class="h-[50px] bg-lightgrey flex-[0_0_auto] p-[10px] flex items-center justify-between"
    >
      <span class="flex-1">
        {shapeNum} shapes{shapeNum === maxShapes && " FULL"}
      </span>
      <span class="flex-none">
        <button
          class="m-0"
          disabled={!undoManager.canUndo}
          onClick={() => undoManager.undo()}
        >
          Undo
        </button>
        <button
          class="m-0 ml-2"
          disabled={!undoManager.canRedo}
          onClick={() => undoManager.redo()}
        >
          Redo
        </button>
      </span>
      <span class="flex-1 flex justify-end">
        {multiSelectMode.value && "SHIFT "}
        {numSelectedShapes > 0 && `selected ${numSelectedShapes}`}
      </span>
    </div>
  );
}
