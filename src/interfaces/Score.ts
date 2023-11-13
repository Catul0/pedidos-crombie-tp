export interface Score {
  id: number;
  userId: number;
  score: number;
  localId: number;
  deliveryId: number;
}

export type CreateScore = Omit<Score, "id" | "localId" | "deliveryId">;
