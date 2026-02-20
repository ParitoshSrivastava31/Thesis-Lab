"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
    
    // Animation variants
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVars = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="h-14 px-6 flex items-center justify-between absolute top-0 w-full z-50">
                <div className="font-syne font-bold text-xl tracking-tight text-text-primary">
                    <Link href="/">ThesisLab</Link>
                </div>
                <div className="flex gap-6 items-center">
                    <Link href="/#features" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-syne">Features</Link>
                    <Link href="/pricing" className="text-text-primary transition-colors text-sm font-syne font-semibold">Pricing</Link>
                    <Link href="/dashboard">
                        <Button className="bg-brand-primary text-white hover:brightness-115">Start Modeling</Button>
                    </Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center pt-40 pb-20 px-4 relative overflow-hidden">
                {/* Background Base */}
                <div className="absolute inset-0 bg-bg-void -z-20" />
                 
                {/* Minimal Grid Pattern for Architecture / Structure Vibe */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--color-bg-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-bg-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>

                <div className="text-center mb-16 z-10">
                    <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-text-primary mb-6">
                        Invest with conviction.
                    </h1>
                    <p className="text-text-secondary text-lg max-w-xl mx-auto font-syne">
                        Start mapping your assumptions for free. Upgrade to simulate complex scenarios and manage multiple theses.
                    </p>
                </div>

                <motion.div 
                    variants={containerVars} 
                    initial="hidden" 
                    animate="show" 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10"
                >
                    {/* Free Tier */}
                    <motion.div variants={cardVars} className="flex flex-col bg-bg-surface border border-bg-border rounded-2xl p-8 hover:border-text-secondary/30 transition-colors">
                        <div className="mb-8">
                            <h3 className="font-syne text-2xl font-bold text-text-primary mb-2">Hobbyist</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-syne font-extrabold text-text-primary">$0</span>
                                <span className="text-text-secondary font-syne">/ forever</span>
                            </div>
                            <p className="text-text-secondary font-syne text-sm">
                                For angels and solo investors exploring probabilistic thinking.
                            </p>
                        </div>

                        <div className="flex-1 mb-8">
                            <ul className="space-y-4 font-syne text-sm text-text-secondary">
                                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-primary shrink-0" /> 1 Active Thesis</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-primary shrink-0" /> Up to 10 Assumptions</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-primary shrink-0" /> Basic Stress Testing</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-primary shrink-0" /> Local History (Session only)</li>
                            </ul>
                        </div>

                        <Link href="/dashboard" className="mt-auto">
                            <Button variant="outline" className="w-full py-6 font-syne font-bold border-bg-border hover:bg-bg-elevated text-text-primary">
                                Start Free
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Pro Tier */}
                    <motion.div variants={cardVars} className="flex flex-col bg-bg-surface border-2 border-brand-primary shadow-xl rounded-2xl p-8 relative">
                        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-brand-primary text-white font-syne font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="font-syne text-2xl font-bold text-text-primary mb-2">Professional</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-syne font-extrabold text-text-primary">$49</span>
                                <span className="text-text-secondary font-syne">/ month</span>
                            </div>
                            <p className="text-text-secondary font-syne text-sm">
                                For fund managers building rigorous institutional models.
                            </p>
                        </div>

                        <div className="flex-1 mb-8">
                            <ul className="space-y-4 font-syne text-sm text-text-secondary">
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> Unlimited Theses</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> Unlimited Assumptions</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> Monte Carlo Engine</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> Saved Scenarios & Diffing</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> PDF Report Exports</li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-positive shrink-0" /> Unlimited Version History</li>
                            </ul>
                        </div>

                        <Link href="/dashboard" className="mt-auto">
                            <Button className="w-full py-6 font-syne font-bold bg-brand-primary hover:brightness-115 text-white">
                                Upgrade to Pro
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
