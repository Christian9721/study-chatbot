export type Block = {
  id: string;
  messageId: string;
  index: number;
  type: "text" | "code" | "list" | "suggestion";
  content: string;
  meta?: {
    suggestions?: string[];
  };
}

export type BlockReply = {
  id: string;
  blockId: string;
  messageId: string; // referencia al mensaje del usuario
  content: string;
  createdAt: Date;
}