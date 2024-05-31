export interface Neighbor {
  row: number,
  column: number
}

export type Neighbors = Array<Neighbor>;

export const NEIGHBORS: Neighbors = Array.of({ row: 0, column: 1 },
                                             { row: 1, column: 0 },
                                             { row: -1, column: 0 },
                                             { row: 0, column: -1 });
