import EditShape from "./EditShape";
import { editShape, numShapes } from "./state";

export default function Edit() {
  const n = numShapes.value;
  const editing = editShape.value;

  return (
    <div
      id="edit"
      class="flex-1 bg-whitesmoke outline outline-grey outline-1 outline-offset-[-10px] h-screen flex items-center justify-center"
    >
      {!editing || n !== 1 ? (
        <label>
          {n < 1 ? "Select One" : n > 1 ? "Too many selected" : "Edit"}
        </label>
      ) : (
        editing && <EditShape shapeType={editing.props.type} />
      )}
    </div>
  );
}
