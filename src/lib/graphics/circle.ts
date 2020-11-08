export function createCircle(x: number, y: number, r: number): Path2D {
  const path2d = new Path2D()
  path2d.arc(x, y, r, 0, 2 * Math.PI)
  return path2d
}