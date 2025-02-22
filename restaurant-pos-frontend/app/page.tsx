"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/category-filter"
import { FoodGrid } from "@/components/food-grid"
import { Cart } from "@/components/cart"
import { Footer } from "@/components/footer"
import { DiningModeSelector } from "@/components/dining-mode"
import type { CartItemType, FoodItem, DiningMode } from "@/types"

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [diningMode, setDiningMode] = useState<DiningMode>("DINE_IN")
  const [searchTerm, setSearchTerm] = useState("")
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([])
  const [tableNumber, setTableNumber] = useState(4) // Assuming table 4 as default
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Fetch food items from API
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/food-items")
        if (!response.ok) {
          throw new Error("Failed to fetch food items")
        }
        const data = await response.json()
        setFoodItems(data)
        setFilteredItems(data)
      } catch (error) {
        console.error("Error fetching food items:", error)
      }
    }

    fetchFoodItems()
  }, [])

  useEffect(() => {
    // Filter items based on search term and category
    const filtered = foodItems.filter((item) => {
      const matchesSearch = searchTerm === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory, foodItems])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleQuantityChange = (id: number, title: string, price: number, image: string, change: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === id)
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        const item = updatedItems[existingItemIndex]
        const newQuantity = item.quantity + change
        if (newQuantity <= 0) {
          return updatedItems.filter((item) => item.id !== id)
        } else {
          updatedItems[existingItemIndex] = { ...item, quantity: newQuantity }
        }
        return updatedItems
      } else if (change > 0) {
        return [...prevItems, { id, title, price, quantity: 1, image }]
      }
      return prevItems
    })
  }

  const handlePlaceOrder = (orderDetails: { items: CartItemType[]; total: number; paymentMethod: string }) => {
    console.log("Order placed:", orderDetails)
    setCartItems([])
  }

  const handleDiningModeChange = (mode: DiningMode) => {
    setDiningMode(mode)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch orders")
      }
      const data = await response.json()
      setOrders(data)
      setFilteredOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError(error.message || "An error occurred while fetching orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header onSearch={handleSearch} />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-auto p-4">
          <DiningModeSelector onModeChange={handleDiningModeChange} />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
          <FoodGrid foodItems={filteredItems} onQuantityChange={handleQuantityChange} cartItems={cartItems} />
        </main>
        <Cart
          cartItems={cartItems}
          onPlaceOrder={handlePlaceOrder}
          initialTableNumber={tableNumber}
          diningMode={diningMode}
        />
      </div>
      <Footer />
    </div>
  )
}

