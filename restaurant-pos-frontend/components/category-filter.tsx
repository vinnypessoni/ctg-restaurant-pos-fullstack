"use client"

import { Grid, Coffee, Soup, UtensilsCrossed, ChefHat, Sandwich } from "lucide-react"
import { useState } from "react"

const categories = [
  { icon: Grid, label: "All", items: "235 Items" },
  { icon: Coffee, label: "Breakfast", items: "19 Items" },
  { icon: Soup, label: "Soups", items: "8 Items" },
  { icon: UtensilsCrossed, label: "Pasta", items: "14 Items" },
  { icon: ChefHat, label: "Main Course", items: "27 Items" },
  { icon: Sandwich, label: "Burgers", items: "13 Items" },
]

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-3 rounded-xl min-w-[100px] ${
            category.label === activeCategory ? "bg-green-50 text-green-600" : "bg-white"
          } border cursor-pointer hover:bg-green-50`}
          onClick={() => handleCategoryClick(category.label)}
        >
          <category.icon className="h-6 w-6 mb-1" />
          <span className="text-sm font-medium">{category.label}</span>
          <span className="text-xs text-gray-500">{category.items}</span>
        </div>
      ))}
    </div>
  )
}

