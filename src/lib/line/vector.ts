import { Point } from './point';

export class Vector {
  static create(x: number, y: number) {
    return new Vector(x, y)
  }

  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  public get x() {
    return this._x
  }

  public get y() {
    return this._y
  }

  public rotate(angle: number) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const newX = this._x * cos - this._y * sin;
    const newY = sin * this._x + this._y * cos
    return Vector.create(newX, newY)
  }

  public translate = (vector: Vector) => Vector.create(this._x + vector._x, this._y + vector._y)
}
