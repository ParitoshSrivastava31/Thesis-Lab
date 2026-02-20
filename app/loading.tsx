export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-bg-void">
            <div className="flex flex-col items-center gap-4">
                {/* Simple pulse animation for loading */}
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute h-full w-full animate-ping opacity-20 rounded-full border border-brand-primary"></div>
                    <div className="h-4 w-4 rounded-full bg-brand-primary opacity-80"></div>
                </div>
                <div className="text-text-secondary font-syne text-sm animate-pulse tracking-widest uppercase">
                    Initializing Engine...
                </div>
            </div>
        </div>
    )
}
