
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
        {/* Navbar */}

        <nav className="h-14 px-6 flex items-center justify-between absolute top-0 w-full z-50">
            <div className="font-bold text-xl tracking-tight text-text-primary">ThesisLab</div>
            <div className="flex gap-6 items-center">
                <Link href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</Link>
                <Link href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</Link>
                <Link href="/dashboard">
                    <Button>Start Modeling</Button>
                </Link>
            </div>
        </nav>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center relative overflow-hidden">
             {/* Background particles placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-bg-elevated)_0%,var(--color-bg-void)_70%)] -z-10" />
            
            <span className="text-text-tertiary text-[11px] tracking-[0.2em] font uppercase mb-6 font-syne">
                For Probabilistic Investors
            </span>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary leading-[1.1] max-w-3xl mb-6 font-syne">
                Your thesis has hidden <br className="hidden md:block" />
                <span className="text-text-primary">fault lines.</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl max-w-xl mb-10 font-syne">
                ThesisLab maps the structure of your belief. <br />
                Find which assumption matters most.
            </p>

            <div className="flex gap-4">
                <Link href="/dashboard">
                    <Button size="lg" className="px-8 h-12 text-base">
                        Build Your First Thesis →
                    </Button>
                </Link>
                <Link href="#demo">
                    <Button variant="outline" size="lg" className="px-8 h-12 text-base border-bg-border">
                        See a Live Example
                    </Button>
                </Link>
            </div>

            {/* Constellation Placeholder */}
            <div className="mt-20 w-full max-w-4xl h-[400px] bg-bg-surface/30 border border-bg-border rounded-2xl relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)] opacity-10 blur-3xl" />
                 <p className="text-text-tertiary">[ 3D Constellation Demo Loading... ]</p>
                 {/* This will be replaced by ConstellationCanvas in Week 2 */}
            </div>
        </section>

        {/* Feature Highlights Simplified */}
        <section className="py-24 px-4 border-t border-bg-border bg-bg-surface/20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-bg-border rounded-xl bg-bg-surface">
                    <h3 className="text-xl font-bold mb-2 text-text-primary">Constellation</h3>
                    <p className="text-text-secondary">Map your belief as a living graph of assumptions and dependencies.</p>
                </div>
                <div className="p-8 border border-bg-border rounded-xl bg-bg-surface">
                    <h3 className="text-xl font-bold mb-2 text-text-primary">Strength Score</h3>
                    <p className="text-text-secondary">Know if your thesis holds before the markets stress-test it for you.</p>
                </div>
                <div className="p-8 border border-bg-border rounded-xl bg-bg-surface">
                    <h3 className="text-xl font-bold mb-2 text-text-primary">Sensitivity</h3>
                    <p className="text-text-secondary">Find which specific node kills your thesis if it turns out false.</p>
                </div>
                <div className="p-8 border border-bg-border rounded-xl bg-bg-surface">
                     <h3 className="text-xl font-bold mb-2 text-text-primary">Version History</h3>
                     <p className="text-text-secondary">Track how your conviction drifts over time as new data arrives.</p>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-bg-border text-center">
            <p className="text-text-tertiary text-sm">© 2026 ThesisLab. Built for serious investors.</p>
        </footer>
    </div>
  )
}
