"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Receipt, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderData = searchParams.get("orderData")
  const orderDetails = orderData ? JSON.parse(decodeURIComponent(orderData)) : null

  if (!orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>No order details found.</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Menu
        </Button>
      </div>
    )
  }

  const { items, total, paymentMethod } = orderDetails

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Menu
        </Button>
        <h1 className="text-2xl font-bold">Order Confirmation</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <Receipt className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h2 className="text-center text-lg font-semibold mb-2">Order Successfully Placed!</h2>
        <p className="text-center text-gray-600 mb-6">Thank you for your order.</p>

        <div className="border-t border-b py-4 mb-6">
          <h3 className="font-semibold mb-4">Order Details</h3>
          <div className="space-y-4">
            {items.map((item: OrderItem) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span>${(total / 1.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (5%)</span>
            <span>${(total - total / 1.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

