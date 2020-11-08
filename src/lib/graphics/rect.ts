export function createRect(x: number, y: number, width: number, height: number): Path2D {
  const path2d = new Path2D()
  path2d.rect(x - width / 2, y - height / 2, width, height)
  return path2d
}