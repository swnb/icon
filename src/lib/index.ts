import { createCircle } from "./graphics/circle";
import { createEllipse } from "./graphics/ellipse"
import { createRect } from "./graphics/rect";

const canvasConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  lineColor: "#3d84a8",
}

function getInitConfig() { return canvasConfig }

function render(context: CanvasRenderingContext2D) {
  const y = window.innerHeight / 2;
  const x = window.innerWidth / 2;
  const rx = 10;
  const ry = 40;

  context.translate(x, y)
  context.rotate(Math.PI / 8)
  context.translate(-x, -y)

  for (let i = 8; i < 12; i++) {
    const nextRx = rx * i;
    const nextRy = ry * i;
    context.lineWidth = 2
    context.strokeStyle = canvasConfig.lineColor;
    renderReactIcon(context, x, y, nextRx, nextRy);

    context.save()
    context.translate(x, y)
    context.rotate(Math.PI / 8)
    context.translate(-x, -y)
    renderReactIcon(context, x, y, nextRx, nextRy);
    context.restore()
  }

  const circlePath = createCircle(x, y, rx * 4)
  context.save()
  context.translate(x, y)
  context.rotate(Math.PI / 2)
  context.translate(-x, -y)
  context.restore()
  context.save()
  context.arc(x, y, 120, 0, 2 * Math.PI)
  context.fillStyle = "white"
  context.fill()
  context.strokeStyle = canvasConfig.lineColor
  context.stroke()
  clearRectByPath2d(context, circlePath, canvasConfig.lineColor)
  context.restore()
}

function renderReactIcon(context: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) {
  for (let i = 0; i < 4; i++) {
    const path2d = createEllipse(x, y, rx, ry, Math.PI / 4 * i);
    context.stroke(path2d);
  }
}


function clearRectByPath2d(context: CanvasRenderingContext2D, rectPath: Path2D, bgColor: string) {
  context.fillStyle = bgColor
  context.fill(rectPath);
}

export { getInitConfig, render }