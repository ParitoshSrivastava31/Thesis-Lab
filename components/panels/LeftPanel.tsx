"use client"

import React, { useState, ReactNode } from 'react';
import { AssumptionList } from './AssumptionList';
import { HistoryList } from './HistoryList';
import { ScenarioList } from '@/components/panels/ScenarioList';
import { ChevronDown, ChevronRight, Layers, History, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function LeftPanel() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    assumptions: true,
    scenarios: true,
    history: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white/40 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_30px_rgba(0,0,0,0.02)] overflow-y-auto w-[320px] rounded-br-2xl">

      {/* 1. Assumptions Section */}
      <CollapsibleSection
        title="Assumptions"
        icon={<List className="w-4 h-4 text-brand-primary" />}
        isOpen={openSections.assumptions}
        onToggle={() => toggleSection('assumptions')}
      >
        <AssumptionList />
      </CollapsibleSection>

      {/* 2. Scenarios Section */}
      <CollapsibleSection
        title="Scenarios"
        icon={<Layers className="w-4 h-4 text-node-sector" />}
        isOpen={openSections.scenarios}
        onToggle={() => toggleSection('scenarios')}
        className="border-t border-bg-border/50"
      >
        <ScenarioList />
      </CollapsibleSection>

      {/* 3. History Section */}
      <CollapsibleSection
        title="History"
        icon={<History className="w-4 h-4 text-node-macro" />}
        isOpen={openSections.history}
        onToggle={() => toggleSection('history')}
        className="border-t border-bg-border/50"
      >
        <HistoryList />
      </CollapsibleSection>

    </div>
  );
}

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

function CollapsibleSection({ title, icon, isOpen, onToggle, children, className }: CollapsibleSectionProps) {
  return (
    <div className={cn("flex flex-col mb-2", className)}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-5 hover:bg-white/40 transition-colors text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-white/50 shadow-sm border border-white/80 group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <span className="text-sm font-syne font-semibold tracking-wide text-text-primary">{title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-text-tertiary" /> : <ChevronRight className="w-4 h-4 text-text-tertiary" />}
      </button>

      {isOpen && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-300 pb-2">
          {children}
        </div>
      )}
    </div>
  )
}
