"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    statement: z.string().min(10, "Statement must be at least 10 characters").max(500),
    timeHorizon: z.enum(["ONE_YEAR", "THREE_YEARS", "FIVE_YEARS"]),
})

type FormData = z.infer<typeof formSchema>

export default function NewThesisPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            timeHorizon: "THREE_YEARS",
        },
    })

    async function onSubmit(data: FormData) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/thesis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to create thesis")

            const thesis = await response.json()
            router.push(`/thesis/${thesis.id}`)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 pt-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-syne text-text-primary mb-2">Create New Thesis</h1>
                <p className="text-text-secondary">Define the core statement you want to model.</p>
            </div>

            <div className="bg-bg-surface border border-bg-border rounded-xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Thesis Name</label>
                        <input
                            {...register("name")}
                            className="w-full bg-bg-elevated/50 border border-bg-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 transition-all duration-300 shadow-sm shadow-black/5"
                            placeholder="e.g. AI Infrastructure Bull Case"
                        />
                        {errors.name && <p className="text-xs text-negative">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Core Statement</label>
                        <textarea
                            {...register("statement")}
                            className="w-full h-32 bg-bg-elevated/50 border border-bg-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 resize-none transition-all duration-300 shadow-sm shadow-black/5"
                            placeholder="Enter your investment thesis statement..."
                        />
                        {errors.statement && <p className="text-xs text-negative">{errors.statement.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Time Horizon</label>
                        <select
                            {...register("timeHorizon")}
                            className="w-full bg-bg-elevated/50 border border-bg-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 transition-all duration-300 shadow-sm shadow-black/5 cursor-pointer appearance-none"
                            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                        >
                            <option value="ONE_YEAR">1 Year</option>
                            <option value="THREE_YEARS">3 Years</option>
                            <option value="FIVE_YEARS">5 Years</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-bg-border/50 mt-8">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Thesis
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

