import BlockActions from "./BlockActions"

export default function BlockStructure({ block }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <p className="text-sm whitespace-pre-wrap">
        {block.content}
      </p>

      <BlockActions blockId={block.id} type={block.type} />
    </div>
  )
}