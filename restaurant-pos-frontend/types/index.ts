export type OrderStatus = "PENDING" | "PREPARING" | "SERVED" | "CANCELLED"
export type DiningMode = "DINE_IN" | "TAKE_AWAY" | "DELIVERY"

export interface OrderItem {
  id?: number
  title: string
  price: number
  quantity: number
  image?: string // Add image as an optional property
}

export interface Order {
  id?: string
  tableNumber: number
  customerName: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  timestamp?: string
  paymentMethod: string
  diningMode: DiningMode
  deliveryAddress?: string
}

export interface TableInfo {
  tableNumber: number
  customerName?: string
  status: "AVAILABLE" | "OCCUPIED"
}

export interface CartItemType {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export interface FoodItem {
  id: number
  title: string
  price: number
  image: string
  category: string
  type: "Veg" | "Non Veg"
  discount?: number
}

export type OrderType = {
  id: number
  items: CartItemType[]
  total: number
  paymentMethod: string
  diningMode: DiningMode
  tableNumber?: number
}