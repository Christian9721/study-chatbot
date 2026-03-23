export type Reaction = {
  id: string;
  blockId: string;
  type:  "like" | "dislike" | "love" | "insightful";
}