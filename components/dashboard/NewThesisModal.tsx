
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Plus, Loader2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  statement: z.string().min(10, "Statement must be at least 10 characters").max(500),
  timeHorizon: z.enum(["ONE_YEAR", "THREE_YEARS", "FIVE_YEARS"]),
})

type FormData = z.infer<typeof formSchema>

export function NewThesisModal() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mocked for Week 5
  const isLimitReached = true;

  const {
    register,
    handleSubmit,
    reset,
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
      setOpen(false)
      reset()
      // Ideally refresh the thesis list or redirect
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Thesis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Thesis</DialogTitle>
          <DialogDescription>
            Define the core statement you want to model.
          </DialogDescription>
        </DialogHeader>

        {isLimitReached && (
          <div className="bg-warning/10 border border-warning/50 text-warning px-4 py-3 rounded-lg text-sm font-syne flex items-start gap-3 mt-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <strong>Hobbyist Plan Limit Reached</strong>
              <p className="mt-1 opacity-90">You have reached the limit of 1 active thesis on the free plan. Upgrade to Professional to create unlimited theses.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
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
              className="w-full h-24 bg-bg-elevated/50 border border-bg-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 resize-none transition-all duration-300 shadow-sm shadow-black/5"
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

          <DialogFooter className="mt-6 border-t border-bg-border/50 pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Thesis
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

