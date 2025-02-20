"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface HeaderProps {
  onSearch: (searchTerm: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchClick = () => {
    onSearch(searchTerm)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick()
    }
  }

  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b">
      <div className="flex-1 relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search Product here..."
            className="pr-10"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0"
            onClick={handleSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
