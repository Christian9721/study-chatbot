export type Message = {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string; // raw
  createdAt: Date;
}