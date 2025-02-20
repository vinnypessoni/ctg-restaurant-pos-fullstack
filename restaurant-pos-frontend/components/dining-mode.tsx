"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { DiningMode } from "@/types"

const modes: DiningMode[] = ["DINE_IN", "TAKE_AWAY", "DELIVERY"]

interface DiningModeSelectorProps {
  onModeChange: (mode: DiningMode) => void
}

export function DiningModeSelector({ onModeChange }: DiningModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<DiningMode>(modes[0])

  const handleModeChange = (mode: DiningMode) => {
    setSelectedMode(mode)
    onModeChange(mode)
  }

  const getModeLabel = (mode: DiningMode): string => {
    switch (mode) {
      case "DINE_IN":
        return "Dine In"
      case "TAKE_AWAY":
        return "Take Away"
      case "DELIVERY":
        return "Delivery"
    }
  }

  return (
    <div className="flex gap-2 mb-4">
      {modes.map((mode) => (
        <Button
          key={mode}
          variant={mode === selectedMode ? "secondary" : "ghost"}
          className="rounded-full"
          onClick={() => handleModeChange(mode)}
        >
          {getModeLabel(mode)}
        </Button>
      ))}
    </div>
  )
}

