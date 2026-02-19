
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-void relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pulse/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-syne text-text-primary mb-2">ThesisLab</h1>
          <p className="text-text-secondary">The Investment Constellation Engine</p>
        </div>
        {children}
      </div>
    </div>
  )
}
