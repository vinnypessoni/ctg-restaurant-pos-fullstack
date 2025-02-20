import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { OrderStatus } from "../types"

interface StatusDialogProps {
  isOpen: boolean
  onClose: () => void
  onStatusSelect: (status: OrderStatus) => void
  currentStatus: OrderStatus
}

export function StatusDialog({ isOpen, onClose, onStatusSelect, currentStatus }: StatusDialogProps) {
  const statuses: OrderStatus[] = ["PENDING", "PREPARING", "SERVED", "CANCELLED"]

  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "PREPARING":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "SERVED":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {statuses.map((status) => (
            <Button
              key={status}
              onClick={() => onStatusSelect(status)}
              variant="outline"
              className={`h-16 ${getStatusStyles(status)} ${status === currentStatus ? "border-2 border-black" : ""}`}
            >
              {status}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

