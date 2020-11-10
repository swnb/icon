import { Vector } from "./vector";

export interface Object {
  translate(vector: Vector): Object
}
