import { useState } from 'react';
import { useScenarioController, useScenarioStore } from '@/store/scenarioStore';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

// Placeholder for Input if not exists
function SimpleInput({ value, onChange, placeholder, className }: any) {
    return (
        <input 
            className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    )
}

export function ScenarioList() {
  const { scenarios, activeScenarioId, loadScenario, deleteScenario, createScenario } = useScenarioController();
  const [isCreating, setIsCreating] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState('');

  const handleCreate = () => {
    if (!newScenarioName.trim()) return;
    createScenario(newScenarioName);
    setNewScenarioName('');
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col space-y-2 p-2">
      {scenarios.length === 0 && (
        <div className="text-center p-4 text-xs text-text-tertiary">
            No scenarios saved yet.
        </div>
      )}

      {scenarios.map((scenario) => (
        <div 
          key={scenario.id} 
          className={cn(
            "group flex items-center justify-between p-3 rounded-md border border-transparent transition-all cursor-pointer hover:bg-bg-elevated",
            activeScenarioId === scenario.id ? "bg-bg-elevated border-brand-primary/50 shadow-sm" : "border-bg-border"
          )}
          onClick={() => loadScenario(scenario.id)}
        >
          <div className="flex flex-col">
             <span className={cn("text-sm font-medium", activeScenarioId === scenario.id ? "text-brand-primary" : "text-text-primary")}>
                {scenario.name}
             </span>
             <span className="text-xs text-text-tertiary">
                Score: <span className={getScoreColor(scenario.strengthScore)}>{scenario.strengthScore.toFixed(1)}</span>
             </span>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {activeScenarioId === scenario.id && <CheckCircle2 className="w-4 h-4 text-brand-primary" />}
            <button 
                className="text-text-tertiary hover:text-negative transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    deleteScenario(scenario.id);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {isCreating ? (
          <div className="p-3 border border-brand-primary rounded-md bg-bg-elevated animate-in fade-in slide-in-from-top-2">
             <SimpleInput 
                value={newScenarioName} 
                onChange={setNewScenarioName} 
                placeholder="Scenario Name (e.g. Bull Case)" 
                className="mb-2 bg-bg-surface border-bg-border text-text-primary"
                autoFocus
             />
             <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)} className="h-7 text-xs">Cancel</Button>
                <Button size="sm" onClick={handleCreate} className="h-7 text-xs bg-brand-primary text-white">Save</Button>
             </div>
          </div>
      ) : (
          <Button 
            variant="outline" 
            className="w-full border-dashed border-bg-border text-text-secondary hover:text-text-primary hover:border-text-secondary"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Scenario
          </Button>
      )}
    </div>
  );
}

function getScoreColor(score: number) {
    if (score >= 70) return "text-score-strong";
    if (score >= 40) return "text-score-moderate";
    return "text-score-weak";
}
