"use client"

import { useState } from "react"

export default function ChatInput({
  onSend
}: {
  onSend: (msg: string) => void
}) {
  const [value, setValue] = useState("")

  return (
    <div className="p-4 border-t border-zinc-800">
      <input
        className="w-full p-2 bg-zinc-900 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={() => {
          onSend(value)
          setValue("")
        }}
      >
        Send
      </button>
    </div>
  )
}