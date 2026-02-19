import { Button } from "@/components/ui/Button"
import { useUIStore } from "@/store/uiStore"
import { useSimulationController } from "@/store/simulationStore"
import { Box, Cuboid, Activity, RefreshCw } from "lucide-react"

export function CanvasToolbar() {
  const { mode, setMode, isSensitivityMode, toggleSensitivityMode } = useUIStore()
  const { runSensitivity } = useSimulationController()

  const handleSensitivityToggle = () => {
    if (!isSensitivityMode) {
        // Run analysis fresh when turning on
        runSensitivity()
    }
    toggleSensitivityMode()
  }

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-xl bg-bg-elevated/80 backdrop-blur-md border border-bg-border shadow-lg z-10 transition-all hover:scale-105">
      
      {/* View Mode Toggles */}
      <div className="flex bg-bg-surface rounded-lg p-0.5 border border-bg-border mr-2">
        <button
          onClick={() => setMode('2D')}
          className={`p-2 rounded-md transition-all ${mode === '2D' ? 'bg-bg-elevated text-brand-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
          title="2D Graph"
        >
          <Box className="w-4 h-4" /> 
        </button>
        <button
          onClick={() => setMode('3D')}
          className={`p-2 rounded-md transition-all ${mode === '3D' ? 'bg-bg-elevated text-brand-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
          title="3D Constellation"
        >
          <Cuboid className="w-4 h-4" />
        </button>
      </div>

      <div className="w-px h-8 bg-bg-border mx-1" />

      {/* Sensitivity Mode */}
      <Button 
        variant={isSensitivityMode ? "default" : "ghost"}
        size="sm"
        onClick={handleSensitivityToggle}
        className={`gap-2 ${isSensitivityMode ? 'bg-brand-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
      >
        <Activity className="w-4 h-4" />
        <span className="hidden sm:inline">Sensitivity</span>
      </Button>

      {/* Reset Camera (Placeholder logic for now) */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-text-secondary hover:text-text-primary"
        title="Reset View"
        onClick={() => {
            // This would ideally dispatch an event to the CameraController
            // specific implementation depends on how we expose R3F controls
            console.log("Reset camera") 
        }}
      >
        <RefreshCw className="w-4 h-4" />
      </Button>

    </div>
  )
}
