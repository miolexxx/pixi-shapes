export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getPolygonArea = (points: Array<number>) => {
  let area = 0;

  for (let i = 0; i < points.length - 2; i += 2) {
    const x1 = points[i]; // x
    const y1 = points[i + 1]; // y
    const x2 = points[i + 2]; // next x
    const y2 = points[i + 3]; // next y

    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
};
