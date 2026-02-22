"use client";

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ConstellationCanvas } from "@/components/canvas/ConstellationCanvas";
import { useGraphStore } from "@/store/graphStore";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Activity, Network, Target, Zap } from "lucide-react";

export default function LandingPage() {
  const { setNodes, setEdges } = useGraphStore();

  useEffect(() => {
    // Set 5 hardcoded nodes and 4 edges for the hero demo
    setNodes([
      { id: '1', thesisId: 'demo', title: 'Macro Policy Pivot', type: 'MACRO_FACTOR', probability: 85, confidence: 'HIGH', timeRelevance: 'MEDIUM', sensitivityScore: 90, position: [0, 0, 0] },
      { id: '2', thesisId: 'demo', title: 'Supply Chain Easing', type: 'CATALYST', probability: 60, confidence: 'MEDIUM', timeRelevance: 'SHORT', sensitivityScore: 40, position: [-2, 1, 0] },
      { id: '3', thesisId: 'demo', title: 'Sector Deleveraging', type: 'SECTOR_TREND', probability: 75, confidence: 'MEDIUM', timeRelevance: 'LONG', sensitivityScore: 60, position: [2, 1, 0] },
      { id: '4', thesisId: 'demo', title: 'Competitive Moat', type: 'COMPANY_FACTOR', probability: 90, confidence: 'HIGH', timeRelevance: 'LONG', sensitivityScore: 85, position: [1, -2, 0] },
      { id: '5', thesisId: 'demo', title: 'Regulatory Headwind', type: 'RISK_FACTOR', probability: 30, confidence: 'LOW', timeRelevance: 'SHORT', sensitivityScore: 70, position: [-1, -2, 0] },
    ]);
    setEdges([
      { id: 'e1', thesisId: 'demo', source: '2', target: '1', weight: 0.6, strength: 'MODERATE', dependencyType: 'CORRELATED' },
      { id: 'e2', thesisId: 'demo', source: '1', target: '3', weight: 0.9, strength: 'STRONG', dependencyType: 'CAUSAL' },
      { id: 'e3', thesisId: 'demo', source: '4', target: '3', weight: 0.8, strength: 'STRONG', dependencyType: 'CONDITIONAL' },
      { id: 'e4', thesisId: 'demo', source: '5', target: '4', weight: 0.5, strength: 'MODERATE', dependencyType: 'CAUSAL' },
    ]);
  }, [setNodes, setEdges]);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-void selection:bg-brand-primary selection:text-white font-sans">
        {/* Navbar */}
        <nav className="h-16 px-6 md:px-12 flex items-center justify-between absolute top-0 w-full z-50 bg-bg-void/80 backdrop-blur-md border-b border-bg-border/50">
            <div className="font-syne font-bold text-xl tracking-tight text-text-primary flex items-center gap-2">
                <Network className="w-5 h-5 text-brand-primary" />
                ThesisLab
            </div>
            <div className="flex gap-8 items-center">
                <Link href="#product" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium tracking-tight hidden md:block">Product</Link>
                <Link href="#features" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium tracking-tight hidden md:block">Features</Link>
                <Link href="/dashboard">
                    <Button className="bg-brand-primary text-white text-sm px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300 shadow-sm font-medium">
                        Start Modeling
                    </Button>
                </Link>
            </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-glow rounded-full blur-[100px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-4xl z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface border border-bg-border shadow-sm text-xs font-semibold text-text-secondary tracking-widest uppercase mb-8">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    The Investment Constellation Engine
                </div>
                
                <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-text-primary leading-[1.05] tracking-tight mb-8">
                    Don&apos;t just tell a story.<br className="hidden md:block" />
                    <span className="text-text-secondary">Model your thesis.</span>
                </h1>

                <p className="text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed tracking-tight mb-12">
                    ThesisLab is a structured belief modeling tool for probabilistic investors. Transform your scattered assumptions into a living, mathematical constellation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/dashboard">
                        <Button size="lg" className="rounded-full px-8 py-7 text-base font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-brand-primary text-white flex items-center gap-2 group">
                            Build Your First Thesis
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Premium App Window Wrapper for Canvas */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl mt-24 relative z-20 perspective-[2000px]"
            >
                <div className="rounded-2xl border border-bg-border/60 bg-bg-surface/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5 flex flex-col">
                    {/* Fake Mac Window Header */}
                    <div className="h-12 bg-bg-elevated/50 border-b border-bg-border flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                        </div>
                        <div className="mx-auto text-xs font-medium text-text-tertiary font-sans">thesislab.app / demo-model</div>
                    </div>
                    {/* Canvas Area */}
                    <div className="h-[500px] w-full relative bg-bg-void overflow-hidden">
                        {/* Gradient overlays to soften edges of canvas */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-bg-void to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-bg-void to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-bg-void to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 top-0 h-8 bg-linear-to-b from-bg-void to-transparent z-10 pointer-events-none" />
                        
                        <ConstellationCanvas />
                    </div>
                </div>
            </motion.div>
        </section>

        {/* Product Explanation Section - "What is it?" */}
        <section id="product" className="py-32 px-6 bg-bg-surface border-y border-bg-border/50 relative overflow-hidden" ref={targetRef}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-brand-primary">The Problem</h2>
                    <h3 className="text-4xl md:text-5xl font-syne font-bold leading-tight tracking-tight">
                        Narratives mask <br /> underlying risk.
                    </h3>
                    <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-medium">
                        <p>
                            Most investors have beliefs, but few have structured beliefs. When asked about a complex thesis, you might tell a compelling story. But stories hide weak assumptions.
                        </p>
                        <p>
                            ThesisLab forces rigorous clarity. By visually mapping the causal relationships between your assumptions, you can stress-test your logic, pinpoint weak links, and instantly run thousands of probabilistic scenarios.
                        </p>
                    </div>
                </div>
                
                {/* Floating Bento Graphic */}
                <motion.div style={{ y }} className="relative grid grid-cols-2 gap-4">
                    <div className="col-span-2 bg-linear-to-br from-bg-elevated to-bg-surface border border-bg-border rounded-4xl p-10 shadow-sm hover:shadow-lg transition-shadow duration-500">
                        <Network className="w-8 h-8 text-brand-primary mb-6" />
                        <h4 className="text-2xl font-bold font-syne mb-2 tracking-tight">Constellation Map</h4>
                        <p className="text-text-secondary leading-relaxed">A 3D visualization that turns text into a mathematical network of dependencies and edge weights.</p>
                    </div>
                    <div className="bg-bg-elevated/20 border border-bg-border rounded-4xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500">
                        <Target className="w-6 h-6 text-brand-primary mb-4" />
                        <h4 className="text-xl font-bold font-syne mb-2 tracking-tight">Stress Testing</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">Find the single &quot;load-bearing&quot; assumption that shatters the deal.</p>
                    </div>
                    <div className="bg-bg-elevated/20 border border-bg-border rounded-4xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500">
                        <Activity className="w-6 h-6 text-brand-primary mb-4" />
                        <h4 className="text-xl font-bold font-syne mb-2 tracking-tight">Simulations</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">Run thousands of Monte Carlo outcomes instantly to find base and bear cases.</p>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Features / Apple Style */}
        <section id="features" className="py-32 px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tight mb-6 mt-4">Designed for depth.</h2>
                <p className="text-xl text-text-secondary font-medium tracking-tight">Everything you need to quantify conviction and model the future.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group rounded-[2.5rem] bg-bg-surface border border-bg-border/60 p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-brand-glow flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Activity className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="text-3xl font-bold font-syne mb-4 text-text-primary tracking-tight">Strength Score</h3>
                    <p className="text-text-secondary leading-relaxed text-lg">
                        A dynamic metric (0–100) quantifying your conviction. Calculated instantly based on node probabilities and network centrality, revealing your risk blind spots.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="group rounded-[2.5rem] bg-bg-surface border border-bg-border/60 p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-brand-glow flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Zap className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="text-3xl font-bold font-syne mb-4 text-text-primary tracking-tight">Sensitivity Scan</h3>
                    <p className="text-text-secondary leading-relaxed text-lg">
                        With one click, simulate cascading failure scenarios to rank assumptions. See exactly how much your thesis collapses if a specific foundational node fails.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="group rounded-[2.5rem] bg-bg-surface border border-bg-border/60 p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-brand-glow flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Target className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="text-3xl font-bold font-syne mb-4 text-text-primary tracking-tight">Scenario Setup</h3>
                    <p className="text-text-secondary leading-relaxed text-lg">
                        Save snapshots of your &quot;Bull&quot;, &quot;Base&quot;, and &quot;Bear&quot; cases. Toggle effortlessly between them to view your structural network graph under varying amounts of stress.
                    </p>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 bg-brand-primary text-white text-center rounded-[3rem] mx-4 md:mx-12 mb-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_100%)] mix-blend-overlay" />
            <div className="max-w-3xl mx-auto relative z-10 py-10">
                <h2 className="text-5xl md:text-7xl font-syne font-bold tracking-tight mb-8">Stop guessing. <br className="hidden md:block"/>Start mapping.</h2>
                <Link href="/dashboard">
                    <Button size="lg" className="rounded-full px-12 py-8 text-xl font-medium bg-white text-brand-primary hover:bg-bg-elevated hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                        Open ThesisLab Workspace
                    </Button>
                </Link>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 flex flex-col items-center border-t border-bg-border/50 bg-bg-void">
            <div className="flex gap-2 items-center mb-6 text-text-secondary">
                <Network className="w-6 h-6" />
                <span className="font-syne font-bold tracking-tight text-xl">ThesisLab</span>
            </div>
            <div className="flex gap-8 mb-8">
                <Link href="#" className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors">Contact</Link>
            </div>
            <p className="text-text-tertiary text-sm tracking-tight text-center">
                © {new Date().getFullYear()} ThesisLab. Built for the Orbital Intelligence of modern investing.
            </p>
        </footer>
    </div>
  )
}
