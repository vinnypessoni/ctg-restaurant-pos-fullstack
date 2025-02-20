"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, QrCode, Banknote, Edit2 } from "lucide-react"
import { useState, useEffect } from "react"
import { CartItem } from "./cart-item"
import { useRouter } from "next/navigation"
import type { CartItemType, TableInfo, Order, DiningMode } from "@/types"

interface CartProps {
  cartItems: CartItemType[]
  onPlaceOrder: (orderDetails: { items: CartItemType[]; total: number; paymentMethod: string }) => void
  initialTableNumber: number
  diningMode: DiningMode
}

export function Cart({ cartItems, onPlaceOrder, initialTableNumber, diningMode }: CartProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [tableNumber, setTableNumber] = useState(initialTableNumber)
  const [customerName, setCustomerName] = useState("")
  const [isEditingCustomer, setIsEditingCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [availableTables, setAvailableTables] = useState<TableInfo[]>([])
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchTables = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:8080/api/tables")
        if (!response.ok) throw new Error("Failed to fetch tables")
        const data = await response.json()
        setAvailableTables(data)
      } catch (error) {
        console.error("Error fetching tables:", error)
        setErrorMessage("Failed to fetch tables. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTables()
  }, [])

  const handleTableSelect = (table: TableInfo) => {
    setTableNumber(table.tableNumber)
    setCustomerName(table.customerName || "")
    setIsTableDialogOpen(false)
  }

  const handleEditCustomer = () => {
    setNewCustomerName(customerName)
    setIsEditingCustomer(true)
  }

  const handleSaveCustomerName = async () => {
    if (newCustomerName.trim()) {
      setCustomerName(newCustomerName.trim())
      try {
        const response = await fetch(`http://localhost:8080/api/tables/${tableNumber}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "OCCUPIED",
            customerName: newCustomerName.trim(),
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const updatedTable = await response.json()
        setAvailableTables((prevTables) =>
          prevTables.map((table) => (table.tableNumber === updatedTable.tableNumber ? updatedTable : table)),
        )
      } catch (error) {
        console.error("Error updating table:", error)
        setErrorMessage("Failed to update customer name. Please try again.")
      }
    }
    setIsEditingCustomer(false)
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) {
      setErrorMessage("Please select a payment method")
      return
    }

    if (diningMode === "DELIVERY" && !deliveryAddress.trim()) {
      setErrorMessage("Please enter delivery address")
      return
    }

    setIsPlacingOrder(true)
    setErrorMessage(null)

    const orderDetails: Order = {
      tableNumber,
      customerName,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total,
      paymentMethod: selectedPaymentMethod,
      status: "PENDING",
      diningMode: diningMode,
      ...(diningMode === "DELIVERY" && { deliveryAddress }),
    }

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Order placed successfully:", data)

      // Call onPlaceOrder with the correct structure
      onPlaceOrder({
        items: cartItems,
        total: total,
        paymentMethod: selectedPaymentMethod,
      })

      const orderData = encodeURIComponent(JSON.stringify(data))
      router.push(`/order-confirmation?orderData=${orderData}`)
    } catch (error) {
      console.error("Error placing order:", error)
      setErrorMessage(`Failed to place order. Please try again.`)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  function fetchTables() {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="w-[380px] bg-white border-l flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex-1">
          <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
            <DialogTrigger asChild>
              <div className="cursor-pointer group">
                <h2 className="text-xl font-bold group-hover:text-gray-600">Table {tableNumber}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 group-hover:text-gray-400">{customerName || "No customer"}</p>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEditCustomer}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Table</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
                  </div>
                ) : errorMessage ? (
                  <div className="text-red-500 text-center p-4">
                    {errorMessage}
                    <Button
                      className="mt-2 w-full"
                      variant="outline"
                      onClick={() => {
                        setErrorMessage(null)
                        fetchTables()
                      }}
                    >
                      Retry
                    </Button>
                  </div>
                ) : availableTables.length === 0 ? (
                  <div className="text-center text-gray-500 p-4">No tables available</div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {availableTables.map((table) => (
                      <Button
                        key={table.tableNumber}
                        onClick={() => handleTableSelect(table)}
                        variant="outline"
                        className={`h-24 relative ${
                          table.tableNumber === tableNumber ? "border-2 border-green-600" : ""
                        } ${table.status === "OCCUPIED" ? "bg-red-50 cursor-not-allowed" : "bg-green-50"}`}
                        disabled={table.status === "OCCUPIED" && table.tableNumber !== tableNumber}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold">Table {table.tableNumber}</div>
                          <div className="text-sm text-gray-500">
                            {table.status === "OCCUPIED" ? "Occupied" : "Available"}
                          </div>
                          {table.customerName && <div className="text-xs text-gray-500 mt-1">{table.customerName}</div>}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={isEditingCustomer} onOpenChange={setIsEditingCustomer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer Name</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <Button onClick={handleSaveCustomerName} className="w-full">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 overflow-auto p-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="border-t p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax 5%</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["Cash", "Credit/Debit Card", "QR Code"].map((method) => (
            <Button
              key={method}
              variant={selectedPaymentMethod === method ? "secondary" : "outline"}
              className="flex flex-col items-center py-2"
              onClick={() => setSelectedPaymentMethod(method)}
            >
              {method === "Cash" && <Banknote className="h-5 w-5 mb-1" />}
              {method === "Credit/Debit Card" && <CreditCard className="h-5 w-5 mb-1" />}
              {method === "QR Code" && <QrCode className="h-5 w-5 mb-1" />}
              <span className="text-xs">{method}</span>
            </Button>
          ))}
        </div>
        {diningMode === "DELIVERY" && (
          <div className="px-4 mb-4">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
              className="mt-2"
            />
          </div>
        )}
        {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0 || isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  )
}

