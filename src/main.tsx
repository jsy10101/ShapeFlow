import { render } from "preact";
import { useEffect } from "preact/hooks";

import Toolbar from "./Toolbar";
import List from "./List";
import Status from "./Status";
import Edit from "./Edit";

import { multiSelectMode, undoManager } from "./state";

// global styles (e.g. reset)
import "./style.css";

export default function App() {
  useEffect(() => {
    // global keyboard event listeners
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey) {
        multiSelectMode.value = true;
      }
      if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        if (!e.shiftKey && undoManager.canUndo) {
          if (undoManager.canUndo) undoManager.undo();
          console.log("undo command issued");
        } else if (e.shiftKey && undoManager.canRedo) {
          if (undoManager.canRedo) undoManager.redo();
          console.log("redo command issued");
        }
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Shift") {
        multiSelectMode.value = false;
      }
    });
  }, []);

  return (
    <div class="h-screen flex">
      <div id="left" class="flex-[2] flex flex-col">
        <Toolbar />
        <List />
        <Status />
      </div>
      <Edit />
    </div>
  );
}

render(<App />, document.querySelector("div#app") as Element);
