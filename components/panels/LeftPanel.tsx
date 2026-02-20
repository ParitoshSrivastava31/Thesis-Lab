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
    <div className="flex flex-col h-full bg-bg-elevated border-r border-bg-border overflow-y-auto w-[300px]">
      
      {/* 1. Assumptions Section */}
      <CollapsibleSection 
        title="Assumptions" 
        icon={<List className="w-3 h-3" />}
        isOpen={openSections.assumptions}
        onToggle={() => toggleSection('assumptions')}
      >
        <AssumptionList />
      </CollapsibleSection>

      {/* 2. Scenarios Section */}
      <CollapsibleSection 
        title="Scenarios" 
        icon={<Layers className="w-3 h-3" />}
        isOpen={openSections.scenarios}
        onToggle={() => toggleSection('scenarios')}
        className="border-t border-bg-border"
      >
        <ScenarioList />
      </CollapsibleSection>

      {/* 3. History Section */}
      <CollapsibleSection 
        title="History" 
        icon={<History className="w-3 h-3" />}
        isOpen={openSections.history}
        onToggle={() => toggleSection('history')}
        className="border-t border-bg-border"
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
        <div className={cn("flex flex-col", className)}>
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full p-4 hover:bg-bg-surface/50 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-xs font-syne font-bold uppercase tracking-widest text-text-secondary">{title}</span>
                </div>
                {isOpen ? <ChevronDown className="w-3 h-3 text-text-tertiary" /> : <ChevronRight className="w-3 h-3 text-text-tertiary" />}
            </button>
            
            {isOpen && (
                <div className="animate-in slide-in-from-top-1 fade-in duration-200">
                    {children}
                </div>
            )}
        </div>
    )
}
