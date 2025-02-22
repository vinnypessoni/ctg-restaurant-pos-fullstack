"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { TableInfo } from "@/types"

export default function ReservationPage() {
  const [tables, setTables] = useState<TableInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<number | null>(null)

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tables`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch tables")
      }
      const data = await response.json()
      setTables(data)
    } catch (error) {
      console.error("Error fetching tables:", error)
      setError("Failed to fetch tables. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleReleaseTable = async (tableNumber: number) => {
    setUpdating(tableNumber)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tables/${tableNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "AVAILABLE",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update table")
      }

      // Update local state
      setTables(
        tables.map((table) =>
          table.tableNumber === tableNumber ? { ...table, status: "AVAILABLE", customerName: undefined } : table,
        ),
      )
    } catch (error) {
      console.error("Error releasing table:", error)
      setError("Failed to release table. Please try again.")
    } finally {
      setUpdating(null)
    }
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchTables}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Table Management</h1>
        <p className="text-gray-500">Manage restaurant table availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tables.map((table) => (
          <Card
            key={table.tableNumber}
            className={`${table.status === "AVAILABLE" ? "bg-green-50" : "bg-red-50"} transition-colors duration-200`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mb-2">Table {table.tableNumber}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    table.status === "AVAILABLE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {table.status}
                </span>
                {table.customerName && <p className="text-gray-600 mb-4">Customer: {table.customerName}</p>}
                {table.status === "OCCUPIED" && (
                  <Button
                    variant="outline"
                    onClick={() => handleReleaseTable(table.tableNumber)}
                    disabled={updating === table.tableNumber}
                    className="w-full"
                  >
                    {updating === table.tableNumber ? <Loader2 className="h-4 w-4 animate-spin" /> : "Release Table"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

