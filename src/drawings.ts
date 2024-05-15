type SquareDrawingProps = {
  fill?: string;
};

type StarDrawingProps = {
  n?: number;
  r1?: number;
  r2?: number;
  fill?: string;
};

type BullseyeDrawingProps = {
  hue1?: string;
  hue2?: string;
  rings?: number;
};

type CatDrawingProps = {
  fill?: string;
  eyeDirection?: "left" | "centre" | "right";
};

const referenceSize = 100;

export const square = (
  gc: CanvasRenderingContext2D,
  { fill = "yellow" }: SquareDrawingProps = {}
) => {
  gc.save();
  gc.fillStyle = fill;
  gc.strokeStyle = "black";
  gc.lineWidth = 4;

  gc.beginPath();
  gc.rect(-referenceSize / 2, -referenceSize / 2, referenceSize, referenceSize);
  gc.fill();
  gc.stroke();
  gc.restore();
};

export const star = (
  gc: CanvasRenderingContext2D,
  { n = 5, r1 = 12, r2 = 30, fill = "yellow" }: StarDrawingProps = {}
) => {
  gc.save();

  gc.fillStyle = fill;
  gc.strokeStyle = "black";
  gc.lineWidth = 2;

  const s = (2 * Math.PI) / n;

  gc.beginPath();
  gc.moveTo(0, -r2);
  for (let i = 0; i < n; i++) {
    const angle = i * s;
    gc.lineTo(r2 * Math.sin(angle), -r2 * Math.cos(angle));
    gc.lineTo(r1 * Math.sin(angle + s / 2), -r1 * Math.cos(angle + s / 2));
  }
  gc.closePath();
  gc.fill();
  gc.stroke();

  gc.restore();
};

export const bullseye = (
  gc: CanvasRenderingContext2D,
  { hue1 = "yellow", hue2 = "red", rings = 3 }: BullseyeDrawingProps = {}
) => {
  gc.save();

  gc.fillStyle = hue1;
  gc.strokeStyle = "black";
  gc.lineWidth = 2;

  const radius = 45;
  const fillColors = [hue1, hue2];
  let currentRadius = radius;
  const radOffset = currentRadius / rings;
  for (let i = 0; i < rings; i++) {
    gc.fillStyle = fillColors[i % 2];
    gc.beginPath();
    gc.arc(0, 0, currentRadius, 0, 2 * Math.PI);
    gc.closePath();
    gc.fill();
    gc.stroke();
    currentRadius -= radOffset;
  }

  gc.restore();
};

export const cat = (
  gc: CanvasRenderingContext2D,
  { fill = "yellow", eyeDirection = "centre" }: CatDrawingProps = {}
) => {
  gc.save();

  gc.fillStyle = fill;
  gc.strokeStyle = "white";
  gc.lineWidth = 8;

  // head white outline
  gc.beginPath();
  gc.arc(0, 0, 40, 0, 2 * Math.PI);
  gc.stroke();

  // ears
  gc.beginPath();
  // left
  gc.moveTo(-40, -48);
  gc.lineTo(-8, -36);
  gc.lineTo(-35, -14);
  gc.closePath();
  // right
  gc.moveTo(40, -48);
  gc.lineTo(8, -36);
  gc.lineTo(35, -14);
  gc.closePath();
  gc.stroke();
  gc.fill();

  // head
  gc.beginPath();
  gc.arc(0, 0, 40, 0, 2 * Math.PI);
  gc.fill();

  // whites of eyes
  gc.strokeStyle = "black";
  gc.fillStyle = "white";
  gc.lineWidth = 1;
  gc.beginPath();
  // left
  gc.ellipse(-16, -9, 8, 14, 0, 0, Math.PI * 2);
  gc.fill();
  gc.stroke();
  // right
  gc.beginPath();
  gc.ellipse(16, -9, 8, 14, 0, 0, Math.PI * 2);
  gc.fill();
  gc.stroke();

  // eyeballs
  gc.fillStyle = "black";
  let xOffset: number;

  switch (eyeDirection) {
    case "left":
      xOffset = 4;
      break;
    case "right":
      xOffset = -4;
      break;
    default:
      xOffset = 0;
  }
  gc.beginPath();
  // left
  gc.arc(-16 - xOffset, -9, 5, 0, Math.PI * 2);
  gc.fill();
  // right
  gc.beginPath();
  gc.arc(16 - xOffset, -9, 5, 0, Math.PI * 2);
  gc.fill();

  gc.restore();

  gc.restore();
};
