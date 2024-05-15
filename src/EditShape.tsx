import { useEffect, useState } from "preact/hooks";
import {
  BullseyeProps,
  CatProps,
  Shape,
  ShapeType,
  ShapeTypeProps,
  SquareProps,
  StarProps,
  editShape,
  setEditingShapeProps,
} from "./state";
import { EditCanvas } from "./EditCanvas";

type EditShapeProps = {
  shapeType: ShapeType;
};

export default function EditShape({ shapeType }: EditShapeProps) {
  const [hue, setHue] = useState("");
  const [hue2, setHue2] = useState("");
  const [points, setPoints] = useState("");
  const [radius, setRadius] = useState("");
  const [rings, setRings] = useState("");
  const [eyeDirection, setEyeDirection] = useState("centre");

  const currentEditShape = editShape.value as Shape;

  useEffect(() => {
    let props: ShapeTypeProps;
    switch (shapeType) {
      case "square":
        props = currentEditShape.props as SquareProps;
        setHue(props.hue?.toString() || "");
        break;
      case "star":
        props = currentEditShape.props as StarProps;
        setHue(props.hue?.toString() || "");
        setPoints(props.n?.toString() || "");
        setRadius(props.r2?.toString() || "");
        break;
      case "bullseye":
        props = currentEditShape.props as BullseyeProps;
        setHue(props.hue1?.toString() || "");
        setHue2(props.hue2?.toString() || "");
        setRings(props.rings?.toString() || "");
        break;
      case "cat":
        props = currentEditShape.props as CatProps;
        setHue(props.hue?.toString() || "");
        setEyeDirection(props.eyeDirection?.toString() || "");
    }
  }, [currentEditShape]);

  const isValidHue = (text: string) =>
    /^(360|[1-2]?[0-9]{1,2}|3[0-5][0-9])$/.test(text);

  const isValidPoint = (text: string) => /^(10|[3-9])$/.test(text);

  const isValidRadius = (text: string) => /^([2-3][0-9]|4[0-5])$/.test(text);

  const isValidRing = (text: string) => /^([2-5])$/.test(text);

  const handleHueInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setHue(el.value);
    if (isValidHue(el.value)) {
      shapeType == "bullseye"
        ? setEditingShapeProps({
            hue1: parseInt(el.value),
            type: shapeType,
          })
        : setEditingShapeProps({
            hue: parseInt(el.value),
            type: shapeType,
          });
    }
  };

  const handleHue2Input = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setHue2(el.value);
    if (isValidHue(el.value)) {
      setEditingShapeProps({
        hue2: parseInt(el.value),
        type: shapeType,
      });
    }
  };

  const handlePointsInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setPoints(el.value);
    if (isValidPoint(el.value)) {
      setEditingShapeProps({
        n: parseInt(el.value),
        type: shapeType,
      });
    }
  };

  const handleRadiusInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setRadius(el.value);
    if (isValidRadius(el.value)) {
      setEditingShapeProps({
        r2: parseInt(el.value),
        type: shapeType,
      });
    }
  };

  const handleRingsInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setRings(el.value);
    if (isValidRing(el.value)) {
      setEditingShapeProps({
        rings: parseInt(el.value),
        type: shapeType,
      });
    }
  };

  const handleEyeDirectionSelection = (e: Event) => {
    const el = e.target as HTMLSelectElement;
    setEyeDirection(el.value);
    setEditingShapeProps({
      eyeDirection: el.value as "left" | "centre" | "right",
      type: shapeType,
    });
  };

  return (
    <div class="h-screen flex items-center justify-center flex-col p-[20px] w-full">
      <div class="flex-[2_1_0] flex items-center w-full mb-[10px]">
        <EditCanvas />
      </div>
      <form class="flex-1 outline outline-grey outline-1 w-full p-[10px]">
        <div class="flex mb-[10px]">
          <label class="w-[50px] mr-[10px] flex justify-end">
            Hue{shapeType === "bullseye" && "1"}
          </label>
          <input
            type="number"
            value={hue}
            min="0"
            max="360"
            class={`w-[60px] ${
              !isValidHue(hue) ? "outline outline-red outline-[2px]" : ""
            }`}
            onInput={handleHueInput}
          />
        </div>
        {shapeType === "bullseye" && (
          <>
            <div class="flex mb-[10px]">
              <label class="w-[50px] mr-[10px] flex justify-end">Hue2</label>
              <input
                type="number"
                value={hue2}
                min="0"
                max="360"
                class={`w-[60px] ${
                  !isValidHue(hue2) ? "outline outline-red outline-[2px]" : ""
                }`}
                onInput={handleHue2Input}
              />
            </div>
            <div class="flex mb-[10px]">
              <label class="w-[50px] mr-[10px] flex justify-end">Rings</label>
              <input
                type="number"
                value={rings}
                min="2"
                max="5"
                class={`w-[60px] ${
                  !isValidRing(rings) ? "outline outline-red outline-[2px]" : ""
                }`}
                onInput={handleRingsInput}
              />
            </div>
          </>
        )}
        {shapeType === "star" && (
          <>
            <div class="flex mb-[10px]">
              <label class="w-[50px] mr-[10px] flex justify-end">Points</label>
              <input
                type="number"
                value={points}
                min="3"
                max="10"
                class={`w-[60px] ${
                  !isValidPoint(points)
                    ? "outline outline-red outline-[2px]"
                    : ""
                }`}
                onInput={handlePointsInput}
              />
            </div>
            <div class="flex mb-[10px]">
              <label class="w-[50px] mr-[10px] flex justify-end">Radius</label>
              <input
                type="number"
                value={radius}
                min="20"
                max="45"
                class={`w-[60px] ${
                  !isValidRadius(radius)
                    ? "outline outline-red outline-[2px]"
                    : ""
                }`}
                onInput={handleRadiusInput}
              />
            </div>
          </>
        )}
        {shapeType === "cat" && (
          <div class="flex mb-[10px]">
            <label class="w-[50px] mr-[10px] flex justify-end">Look</label>
            <select
              value={eyeDirection}
              onChange={handleEyeDirectionSelection}
              class="m-0 p-0 h-[26px] w-[85px]"
            >
              <option value="left">Left</option>
              <option value="centre">Centre</option>
              <option value="right">Right</option>
            </select>
          </div>
        )}
      </form>
    </div>
  );
}
