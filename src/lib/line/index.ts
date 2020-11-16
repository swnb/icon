import { Point } from "./point";
import { Vector } from './vector'

const { sqrt, pow } = Math;

interface ILine {
  getDistance(): number
  getStartPoint(): Point
  getEndPoint(): Point
  setStartPoint(x: number, y: number): this
  setEndPoint(x: number, y: number): this
  toVector(): Vector
}

export class Line implements ILine {
  static create(sp: Point, ep: Point) {
    return new Line(sp, ep)
  }

  private _sp: Point
  private _ep: Point

  constructor(sp: Point, ep: Point) {
    this._sp = sp
    this._ep = ep
  }

  public getDistance = () => {
    const { _sp, _ep } = this;
    return sqrt(pow(_ep.x - _sp.x, 2) + pow(_ep.y - _sp.y, 2))
  }

  public getStartPoint = (): Point => this._sp;

  public getEndPoint = (): Point => this._ep;

  public setStartPoint = (x: number, y: number) => {
    this._sp = Point.create(x, y)
    return this
  }

  public setEndPoint = (x: number, y: number) => {
    this._ep = Point.create(x, y)
    return this
  }

  public toVector = () => {
    const { _sp, _ep } = this;
    return Vector.create(_ep.x - _sp.x, _ep.y - _sp.y)
  }

  public translate = (vector: Vector) => {
    return Line.create(
      this._sp.translate(vector),
      this._ep.translate(vector)
    )
  }
}