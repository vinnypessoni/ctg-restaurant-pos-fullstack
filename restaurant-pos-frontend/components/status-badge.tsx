import { OrderStatus } from "../types"

interface StatusBadgeProps {
  status: OrderStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "PREPARING":
        return "bg-blue-100 text-blue-800"
      case "SERVED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(status)}`}>{status}</span>
}

