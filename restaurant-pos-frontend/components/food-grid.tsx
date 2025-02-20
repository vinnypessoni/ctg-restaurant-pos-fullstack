"use client"

import { FoodCard } from "./food-card"
import type { FoodItem, CartItemType } from "@/types"

interface FoodGridProps {
  foodItems: FoodItem[]
  onQuantityChange: (id: number, title: string, price: number, image: string, change: number) => void
  cartItems: CartItemType[]
}

export function FoodGrid({ foodItems, onQuantityChange, cartItems }: FoodGridProps) {
  const handleQuantityChange = (id: number, change: number) => {
    const item = foodItems.find((item) => item.id === id)
    if (item) {
      onQuantityChange(id, item.title, item.price, item.image, change)
    }
  }

  const getItemQuantity = (id: number) => {
    const cartItem = cartItems.find((item) => item.id === id)
    return cartItem ? cartItem.quantity : 0
  }

  if (foodItems.length === 0) {
    return <div className="text-center py-8">No items found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {foodItems.map((item) => (
        <FoodCard
          key={item.id}
          {...item}
          quantity={getItemQuantity(item.id)}
          onIncrease={() => handleQuantityChange(item.id, 1)}
          onDecrease={() => handleQuantityChange(item.id, -1)}
        />
      ))}
    </div>
  )
}

