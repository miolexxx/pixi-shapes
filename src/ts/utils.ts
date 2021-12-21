export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getPolygonArea = (points: Array<number>) => {
  let area = 0;

  for (let i = 0; i < points.length - 2; i += 2) {
    const x1 = points[i];
    const y1 = points[i + 1];
    const x2 = points[i + 2];
    const y2 = points[i + 3];

    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
};
