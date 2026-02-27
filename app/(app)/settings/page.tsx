"use client";

import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto p-10 pt-16">
            <div className="mb-12">
                <h1 className="text-4xl font-bold font-syne text-text-primary mb-3">Settings</h1>
                <p className="text-text-secondary text-lg">Manage your profile and subscription.</p>
            </div>

            <div className="space-y-8">
                <section className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold font-syne text-text-primary mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm">1</span>
                        Profile Information
                    </h2>
                    <div className="space-y-4 max-w-xl pl-11">
                        <div>
                            <label className="text-sm font-bold font-syne uppercase tracking-wider text-text-secondary block mb-3">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-bg-elevated/50 border border-bg-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none opacity-70 cursor-not-allowed shadow-inner"
                                value="investor@example.com"
                                disabled
                            />
                            <p className="text-xs text-text-tertiary mt-3 font-medium">Email changes must be requested through support.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold font-syne text-text-primary mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm">2</span>
                        Subscription Plan
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pl-11 bg-bg-elevated/30 p-6 rounded-xl border border-bg-border/40">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center justify-center bg-brand-primary text-white shadow-md shadow-brand-glow px-4 py-1.5 rounded-full text-xs font-bold font-syne tracking-widest">
                                    HOBBYIST (FREE)
                                </span>
                            </div>
                            <p className="text-text-secondary text-sm mt-3 max-w-md leading-relaxed font-medium">
                                You are currently on the free plan. You can create up to 1 active thesis and limited nodes.
                            </p>
                        </div>
                        <Button className="shrink-0 font-bold bg-white text-brand-primary border-brand-primary/20 hover:bg-brand-primary/5">Upgrade Plan</Button>
                    </div>
                </section>

                <section className="bg-negative/5 border border-negative/10 rounded-2xl p-8">
                    <h2 className="text-xl font-bold font-syne text-negative mb-4 flex items-center gap-3">
                        Danger Zone
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pl-11">
                        <p className="text-text-secondary text-sm max-w-md leading-relaxed font-medium">
                            Permanently delete your account and all associated thesis data. This action cannot be undone.
                        </p>
                        <Button className="shrink-0 bg-white text-negative hover:bg-negative hover:text-white border-none shadow-sm shadow-negative/10">Delete Account</Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
