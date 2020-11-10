import { Vector } from "./vector";

export type PointTuple = [number, number]

export class Point {
  static create(x: number, y: number) {
    return new Point(x, y)
  }

  private readonly _x: number
  private readonly _y: number

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() { return this._x }

  public get y() { return this._y }

  public createPointWithNewX = (newX: number) => Point.create(newX, this._y)

  public createPointWithNewY = (newY: number) => Point.create(this._x, newY)

  public toTuple = (): PointTuple => [this._x, this._y]

  public translate = (vector: Vector) => Point.create(this._x + vector.x, this._y + vector.y)
}
