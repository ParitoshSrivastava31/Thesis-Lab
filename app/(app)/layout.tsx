
import { Navbar } from "@/components/layout/Navbar"
import { Sidebar } from "@/components/layout/Sidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex flex-col min-h-screen bg-bg-void">
      <Navbar />
      <div className="flex flex-1 pt-14">
        <Sidebar />
        <main className="flex-1 ml-16 min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
