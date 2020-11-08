export function createEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number): Path2D {
    const path2d = new Path2D()
    path2d.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2)
    return path2d;
}   