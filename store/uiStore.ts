import { create } from 'zustand';

interface UIStore {
  mode: '3D' | '2D';
  isSensitivityMode: boolean;
  activePanel: 'details' | 'monte-carlo';
  isAddNodeOpen: boolean;
  
  setMode: (mode: '3D' | '2D') => void;
  toggleSensitivityMode: () => void;
  setSensitivityMode: (enabled: boolean) => void;
  setActivePanel: (panel: 'details' | 'monte-carlo') => void;
  openAddNode: () => void;
  closeAddNode: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mode: '3D',
  isSensitivityMode: false,
  activePanel: 'details',
  isAddNodeOpen: false,

  setMode: (mode) => set({ mode }),
  toggleSensitivityMode: () => set((state) => ({ isSensitivityMode: !state.isSensitivityMode })),
  setSensitivityMode: (enabled) => set({ isSensitivityMode: enabled }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  openAddNode: () => set({ isAddNodeOpen: true }),
  closeAddNode: () => set({ isAddNodeOpen: false }),
}));
