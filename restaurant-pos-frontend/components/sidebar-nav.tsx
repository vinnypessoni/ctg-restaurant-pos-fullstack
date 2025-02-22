"use client"

import { Menu, TableIcon as TableBar, CalendarRange, Truck, Calculator, Settings, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navItems = [
  { icon: Menu, label: "Menu", color: "text-green-600", route: "/" },
  { icon: TableBar, label: "Table Services", color: "text-gray-600", route: "/table-services" },
  { icon: CalendarRange, label: "Reservation", color: "text-gray-600", route: "/reservation" },
  { icon: Truck, label: "Delivery", color: "text-gray-600", route: "/delivery" },
  { icon: Calculator, label: "Accounting", color: "text-gray-600", route: "/accounting" },
  { icon: Settings, label: "Settings", color: "text-gray-600", route: "/settings" },
]

export function SidebarNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"))
  }, [])

  const handleNavigation = (route: string) => {
    if (route === "/accounting" && !isLoggedIn) {
      router.push("/login")
    } else {
      router.push(route)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="w-64 p-4 border-r h-screen">
      <div className="flex items-center gap-2 mb-8">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg"
          alt="Chili POS Logo"
          className="w-8 h-8"
        />
        <span className="font-semibold">CHILI POS</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={pathname === item.route ? "secondary" : "ghost"}
            className={`w-full justify-start ${pathname === item.route ? "bg-green-50 text-green-600" : item.color}`}
            onClick={() => handleNavigation(item.route)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      {isLoggedIn ? (
        <Button
          variant="ghost"
          className="w-full justify-start mt-auto text-gray-600 absolute bottom-4"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="w-full justify-start mt-auto text-gray-600 absolute bottom-4"
          onClick={handleLogin}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  )
}

