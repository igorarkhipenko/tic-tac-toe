export type TileValue = 'x' | 'o' | undefined;

export const getTileKey = (r: number, c: number) => `${r},${c}`;
