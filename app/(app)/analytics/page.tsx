"use client";

import { Info } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="max-w-5xl mx-auto p-10 pt-16">
            <div className="mb-12">
                <h1 className="text-4xl font-bold font-syne text-text-primary mb-3">Calibration & Analytics</h1>
                <p className="text-text-secondary text-lg">Analyze your cognitive biases and track conviction drift over time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                    <h3 className="font-syne text-text-secondary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                        Overconfidence Score
                        <Info className="w-4 h-4 text-text-tertiary group-hover:text-brand-primary transition-colors" />
                    </h3>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="font-jetbrains text-5xl font-light text-warning tracking-tighter">71</span>
                        <span className="text-text-tertiary mb-1 font-syne font-semibold">/ 100</span>
                    </div>
                    <div className="w-full bg-bg-border/50 h-1.5 rounded-full mt-2 mb-4 overflow-hidden">
                        <div className="bg-warning h-full rounded-full" style={{ width: '71%' }} />
                    </div>
                    <p className="text-sm text-text-secondary">You tend to assign HIGH confidence to assumptions that underperform.</p>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                    <h3 className="font-syne text-text-secondary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                        Avg Strength Drift
                        <Info className="w-4 h-4 text-text-tertiary group-hover:text-brand-primary transition-colors" />
                    </h3>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="font-jetbrains text-5xl font-light text-negative tracking-tighter">-12.4</span>
                        <span className="text-text-tertiary mb-1 font-syne font-semibold">pts</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-auto">Average thesis strength 6 months post-creation.</p>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-glow blur-2xl rounded-full" />
                    <h3 className="font-syne text-text-secondary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                        Calibration Rate
                        <Info className="w-4 h-4 text-text-tertiary group-hover:text-brand-primary transition-colors" />
                    </h3>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="font-jetbrains text-5xl font-light text-positive tracking-tighter">68%</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-auto">How often your &gt;80% probability assumptions occur.</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 rounded-3xl p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoOTksIDEwMiwgMjQxLCAwLjEpIi8+PC9zdmc+')] opacity-50" />
                <div className="text-center max-w-lg relative z-10 backdrop-blur-sm bg-white/40 p-10 rounded-2xl border border-white/60 shadow-xl shadow-brand-glow">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold font-syne tracking-widest mb-6 border border-brand-primary/20">PRO FEATURE</div>
                    <h3 className="text-3xl text-text-primary font-bold font-syne mb-4">Detailed Analytics is available on Pro</h3>
                    <p className="text-text-secondary leading-relaxed mb-6 font-medium">Upgrade your plan to unlock full scenario backtesting, cognitive bias radar charts, and personalized calibration training.</p>
                    <button className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-brand-glow hover:-translate-y-0.5 transition-transform">
                        Upgrade to Professional
                    </button>
                </div>
            </div>
        </div>
    )
}
