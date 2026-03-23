import { Block } from "@/models/block.interface"
import BlockStructure from "./Block"

export default function Message() {
  // luego conectamos con query
  const blocks:Block[]  = []

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <BlockStructure key={block.id} block={block} />
      ))}
    </div>
  )
}