"use client"

import React, { useState } from 'react';
import { useVersionController, useVersionStore } from '@/store/versionStore';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HistoryList() {
    const { versions, createVersion, setViewingVersionId } = useVersionController();
    const { viewingVersionId } = useVersionStore();
    const [note, setNote] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveVersion = () => {
        setIsSaving(true);
        createVersion(note);
        setNote('');
        setTimeout(() => setIsSaving(false), 500); 
    };

    return (
        <div className="flex flex-col h-full bg-bg-surface/30 p-4 gap-4">
            <div className="flex flex-col gap-2">
                <input 
                    type="text" 
                    placeholder="Version note (optional)"
                    className="w-full bg-bg-surface border border-bg-border rounded text-xs px-2 py-1 text-text-primary focus:outline-none focus:border-brand-primary/50 placeholder:text-text-tertiary"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button 
                    className="w-full text-xs font-syne h-7 bg-brand-primary/10 text-brand-pulse hover:bg-brand-primary/20 border-brand-primary/20"
                    onClick={handleSaveVersion}
                    disabled={isSaving}
                >
                    {isSaving ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {isSaving ? 'Saved!' : 'Save Version'}
                </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
                {versions.length === 0 ? (
                    <div className="text-center text-text-tertiary text-xs py-4">
                        No versions saved yet.
                    </div>
                ) : (
                    versions.map((version) => (
                        <div 
                            key={version.id}
                            className={`flex flex-col p-2 rounded cursor-pointer transition-colors border ${
                                viewingVersionId === version.id 
                                ? 'bg-brand-primary/10 border-brand-primary/30' 
                                : 'bg-bg-surface/50 border-bg-border/50 hover:bg-bg-elevated hover:border-bg-border'
                            }`}
                            onClick={() => setViewingVersionId(viewingVersionId === version.id ? null : version.id)}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-syne text-[11px] font-bold text-text-secondary">
                                    {version.changeNote || 'Auto-save'}
                                </span>
                                <span className="text-[10px] text-text-tertiary font-mono">
                                    {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-text-tertiary font-mono">
                                <span>Score: {version.snapshot.strengthScore.toFixed(1)}</span>
                                <span>{version.snapshot.nodes.length} nodes</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
