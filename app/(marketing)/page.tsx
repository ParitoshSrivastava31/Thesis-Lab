"use client";

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ConstellationCanvas } from "@/components/canvas/ConstellationCanvas";
import { useGraphStore } from "@/store/graphStore";
import { useEffect } from "react";
import { motion } from "framer-motion";

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

  // Motion variants for stagger
  const containerVars = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const childVars = {
    hidden: { opacity: 0.01, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
        {/* Navbar */}

        <nav className="h-14 px-6 flex items-center justify-between absolute top-0 w-full z-50">
            <div className="font-syne font-bold text-xl tracking-tight text-text-primary">ThesisLab</div>
            <div className="flex gap-6 items-center">
                <Link href="#features" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-syne">Features</Link>
                <Link href="/pricing" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-syne">Pricing</Link>
                <Link href="/dashboard">
                    <Button className="bg-brand-primary text-white hover:brightness-115">Start Modeling</Button>
                </Link>
            </div>
        </nav>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center relative overflow-hidden">
            {/* Background Base */}
            <div className="absolute inset-0 bg-bg-void -z-20" />
             
            {/* Minimal Grid Pattern for Architecture / Structure Vibe */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--color-bg-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-bg-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
            
            <div className="flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="text-text-tertiary text-[11px] tracking-[0.2em] font-syne uppercase mb-6 font-bold">
                    For Probabilistic Investors
                </span>
                
                <h1 className="text-6xl md:text-6xl font-syne font-extrabold text-text-primary leading-[1.1] max-w-[700px] mb-6">
                    Your thesis has hidden <br className="hidden md:block" />
                    <span className="text-text-primary">fault lines.</span>
                </h1>

                <p className="text-text-secondary text-[20px] max-w-xl mb-10 mt-6 font-syne">
                    ThesisLab maps the structure of your belief. <br />
                    Find which assumption matters most.
                </p>

                <div className="flex gap-4 mt-10">
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8 py-4 bg-brand-primary text-white font-syne font-semibold rounded-lg hover:brightness-115 transition duration-200">
                            Build Your First Thesis →
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" size="lg" className="px-8 py-4 border-bg-border font-syne rounded-lg hover:bg-bg-elevated">
                            See a Live Demo
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Constellation Canvas below hero */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-20 w-full max-w-4xl h-[400px] relative pointer-events-none"
            >
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg-void to-transparent z-10 pointer-events-none" />
                 <ConstellationCanvas />
            </motion.div>
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
