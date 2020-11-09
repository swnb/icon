import { createCircle } from "./graphics/circle";
import { createEllipse } from "./graphics/ellipse"

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

  // context.translate(x, y)
  // context.rotate(Math.PI / 8)
  // context.translate(-x, -y)
  "006d77-83c5be-edf6f9-ffddd2-e29578".split("-").forEach((color, i) => {
    const nextRx = rx * (8 - i);
    const nextRy = ry * (8 - i);
    context.lineWidth = 2;
    context.fillStyle = "#" + color
    renderReactIcon(context, x, y, nextRx, nextRy);
    context.save()
    context.translate(x, y)
    context.rotate(Math.PI / 8)
    context.translate(-x, -y)
    renderReactIcon(context, x, y, nextRx, nextRy);
    context.restore()
  })

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
    context.fill(path2d);
  }
}

function clearRectByPath2d(context: CanvasRenderingContext2D, rectPath: Path2D, bgColor: string) {
  context.fillStyle = bgColor
  context.fill(rectPath);
}

type Position = [number, number];

function renderTree(context: CanvasRenderingContext2D, sp: Position, ep: Position, edge: number): [Position, Position] {
  context.moveTo(sp[0], sp[1])
  context.lineTo(ep[0], ep[1])
  //   const length = Math.pow()
  //   const xOffset = 
  // const leftNode = [ex -,]
  //   context.lineTo()


}

export { getInitConfig, render }