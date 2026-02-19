
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex flex-col min-h-screen bg-bg-void">
      {/* Marketing Navbar could go here if different */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
