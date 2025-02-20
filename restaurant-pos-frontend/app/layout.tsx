import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <SidebarNav />
          {children}
        </div>
      </body>
    </html>
  )
}

