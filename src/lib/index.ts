import { createCircle } from "./graphics/circle";
import { createEllipse } from "./graphics/ellipse"
import { Line } from "./line";
import { Point } from "./line/point";
import { RateQueue } from "./rate/queue";

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

  const rateQueue = new RateQueue<Line>(500).start()
  rateQueue.subscribe((line) => {
    console.log(line.getStartPoint(), line.getEndPoint())
    context.beginPath()
    context.moveTo(...line.getStartPoint().toTuple())
    context.lineTo(...line.getEndPoint().toTuple())
    context.stroke();
    context.closePath()
  })

  renderTree(Point.create(x, y + 120), 20, Math.PI / 4, 100, (line) => {
    rateQueue.push(line)
  })
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

function renderTree(startPoint: Point, length: number, angle: number, ttl: number, callback: (line: Line) => void) {
  const endPoint = startPoint.createPointWithNewY(startPoint.y - length)
  let line: Line | undefined = Line.create(startPoint, endPoint)
  let queue: Line[] = [];
  while (line && ttl-- > 0) {
    queue.push(...createTreeBranch(line, angle, callback))
    line = queue.shift();
  }
}

function createTreeBranch(line: Line, angle: number, callback: (line: Line) => void): Line[] {

  const startPoint = line.getStartPoint()
  const endPoint = line.getEndPoint()

  callback(Line.create(startPoint, endPoint))

  const originVector = Line.create(startPoint, endPoint).toVector();
  // const newVector = originVector.translate(originVector)
  const leftVector = originVector.rotate(angle)
  const rightVector = originVector.rotate(-angle)

  const leftPoint = endPoint.translate(leftVector)
  const rightPoint = endPoint.translate(rightVector)

  return [Line.create(endPoint, leftPoint), Line.create(endPoint, rightPoint)]
}

export { getInitConfig, render }