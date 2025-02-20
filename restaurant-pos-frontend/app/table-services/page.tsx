"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { StatusDialog } from "@/components/status-dialog"
import type { Order, OrderStatus } from "@/types"

export default function TableServicesPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders")
      if (!response.ok) throw new Error("Failed to fetch orders")
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId)
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (!response.ok) throw new Error("Failed to update order status")

      // Update local state
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    } catch (error) {
      console.error("Error updating order status:", error)
    } finally {
      setUpdating(null)
      setIsStatusDialogOpen(false)
    }
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsStatusDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Table Services</h1>
        <p className="text-gray-500">Click on a table to update its order status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleOrderClick(order)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Table {order.tableNumber}</h2>
                <StatusBadge status={order.status} />
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Order ID: {order.id}</p>
                <p>Time: {new Date(order.timestamp!).toLocaleString()}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.title} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-black mt-4">Total: ${order.total.toFixed(2)}</p>
              </div>
              {updating === order.id && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOrder && (
        <StatusDialog
          isOpen={isStatusDialogOpen}
          onClose={() => setIsStatusDialogOpen(false)}
          onStatusSelect={(status) => handleStatusUpdate(selectedOrder.id!, status)}
          currentStatus={selectedOrder.status}
        />
      )}
    </div>
  )
}

