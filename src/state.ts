import { computed, signal } from "@preact/signals";
import { random } from "./utility";
import { Command, UndoManager } from "./undo";

export type SquareProps = {
  type: "square";
  hue?: number;
};

export type StarProps = {
  type: "star";
  r1?: number;
  r2?: number;
  n?: number;
  hue?: number;
};

export type BullseyeProps = {
  type: "bullseye";
  hue1?: number;
  hue2?: number;
  rings?: number;
};

export type CatProps = {
  type: "cat";
  hue?: number;
  eyeDirection?: "left" | "centre" | "right";
};

export type Shape = {
  id: number;
  selected: boolean;
  props: ShapeTypeProps;
};

export type ShapeTypeProps = SquareProps | StarProps | BullseyeProps | CatProps;
export type ShapeType = "square" | "star" | "bullseye" | "cat";

// undo manager
export let undoManager = new UndoManager();

//#region state
export const shapes = signal<Shape[]>([]);

export const editId = signal<number>(-1);

export const multiSelectMode = signal<boolean>(false);

export const selection = signal<boolean>(false);

export const editShape = computed(() =>
  shapes.value.find((s) => editId.value === s.id)
);

export const numShapes = computed(
  () => shapes.value.filter((s) => s.selected).length
);
//#endregion state

//#region mutations

// very simple unique id generator
let uniqueId = 1;

// model "business logic" (CRUD)

// Create
const createRandomShape = (type: ShapeType): Shape => {
  switch (type) {
    case "square":
      return {
        id: uniqueId++,
        props: {
          type: "square",
          hue: Math.round(random(0, 360)),
        },
        selected: false,
      };
    case "star":
      return {
        id: uniqueId++,
        props: {
          type: "star",
          hue: Math.round(random(0, 360)),
          r1: 15,
          r2: Math.round(random(20, 45)),
          n: Math.round(random(3, 10)),
        },
        selected: false,
      };
    case "bullseye":
      return {
        id: uniqueId++,
        props: {
          type: "bullseye",
          hue1: Math.round(random(0, 360)),
          hue2: Math.round(random(0, 360)),
          rings: Math.round(random(2, 5)),
        } as BullseyeProps,
        selected: false,
      };
    case "cat":
      const directions = ["left", "centre", "right"];
      return {
        id: uniqueId++,
        props: {
          type: "cat",
          hue: Math.round(random(0, 360)),
          eyeDirection: directions[Math.round(random(0, 2))],
        } as CatProps,
        selected: false,
      };
  }
};

export const addShape = (type: ShapeType = "square") => {
  const s = createRandomShape(type);
  undoManager.execute({
    do: () => {
      shapes.value = [...shapes.value, s];
    },
    undo: () => {
      shapes.value = shapes.value.slice(0, -1);
    },
  } as Command);
  shapes.value = [...shapes.value, s];
};

export const deleteSelectedShapes = () => {
  const originalShapes = [...shapes.value];
  undoManager.execute({
    do: () => {
      shapes.value = shapes.value.filter((s) => !s.selected);
    },
    undo: () => {
      shapes.value = originalShapes;
    },
  });
  shapes.value = shapes.value.filter((s) => !s.selected);
};

export const deleteAllShapes = () => {
  const originalShapes = [...shapes.value];
  undoManager.execute({
    do: () => {
      shapes.value = [];
    },
    undo: () => {
      shapes.value = originalShapes;
    },
  });
  shapes.value = [];
};

export const select = (id: number = -1) => {
  const shape = shapes.value.find((s) => s.id === id);
  if (!shape) return;
  if (!multiSelectMode.value) deSelectAllBut(shape);
  shape.selected = true;
  shapes.value = [...shapes.value];
  // edge case for triggering useEffect in List.tsx to update editId
  selection.value = !selection.value;
};

export const deselect = (id: number = -1) => {
  const shape = shapes.value.find((s) => s.id === id);
  if (!shape) return;
  if (!multiSelectMode.value) deSelectAllBut(shape);
  shape.selected = false;
  shapes.value = [...shapes.value];
  // edge case for triggering useEffect in List.tsx to update editId
  selection.value = !selection.value;
};

export const deSelectAll = () => {
  deSelectAllBut();
  shapes.value = [...shapes.value];
  // edge case for triggering useEffect in List.tsx to update editId
  selection.value = !selection.value;
};

export const setEditingShapeProps = (props: ShapeTypeProps) => {
  if (editShape.value) {
    const originalProps = { ...editShape.value.props };

    undoManager.execute({
      do: () => {
        if (!editShape.value) return;
        const p = { ...editShape.value.props, ...props };
        editShape.value.props = p;
        shapes.value = shapes.value.map((s) =>
          s.id === editShape.value?.id ? { ...s, ...editShape.value } : s
        );
      },
      undo: () => {
        shapes.value = shapes.value.map((s) =>
          s.id === editShape.value?.id ? { ...s, props: originalProps } : s
        );
      },
    });

    const p = { ...editShape.value.props, ...props };
    editShape.value.props = p;
    shapes.value = shapes.value.map((s) =>
      s.id === editShape.value?.id ? { ...s, ...editShape.value } : s
    );
  }
};

//#endregion mutations

/**
 * Initializes the application by adding a default set of square shapes to the scene
 * @param {number} [n=8] - The number of square shapes to add initially.
 */
const init = (n: number = 8) => {
  for (let i = 0; i < n; i++) {
    addShape();
  }
  // reset undoManager to base state
  undoManager = new UndoManager();
};

/**
 * deselect all shapes except the one passed in
 * @param shape
 */
const deSelectAllBut = (shape?: Shape) => {
  shapes.value.filter((s) => s != shape).forEach((s) => (s.selected = false));
};

export const maxShapes = 25;
export const minShapes = 0;

init();
