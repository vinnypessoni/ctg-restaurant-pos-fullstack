"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, DollarSign } from "lucide-react"
import type { Order } from "@/types"

export default function AccountingPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      setError("Failed to fetch orders. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const calculateGrandTotal = () => {
    return orders.reduce((total, order) => total + order.total, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Accounting</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2" />
            Grand Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${calculateGrandTotal().toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Dining Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.diningMode}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.timestamp!).toLocaleString()}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

