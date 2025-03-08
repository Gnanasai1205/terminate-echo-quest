
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play, Square, RotateCw, Terminal } from "lucide-react";
import { ExitCode, simulateProcess, getRandomDuration } from "@/utils/processUtils";
import TerminationMessage from "./TerminationMessage";

interface ProcessSimulatorProps {
  className?: string;
}

const ProcessSimulator: React.FC<ProcessSimulatorProps> = ({ className }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exitCode, setExitCode] = useState<ExitCode | null>(null);
  const [processStartTime, setProcessStartTime] = useState<number | null>(null);
  const [processDuration, setProcessDuration] = useState<number>(0);
  const [duration, setDuration] = useState(() => getRandomDuration());
  const cancelRef = useRef<() => void | null>(() => null);

  // Reset the simulator
  const handleReset = () => {
    if (isRunning) {
      cancelRef.current();
    }
    setIsRunning(false);
    setProgress(0);
    setExitCode(null);
    setProcessStartTime(null);
    setProcessDuration(0);
    setDuration(getRandomDuration());
  };

  // Start the process simulation
  const handleStart = () => {
    handleReset();
    setIsRunning(true);
    setProcessStartTime(Date.now());
    
    // Set the custom CSS variable for animation duration
    document.documentElement.style.setProperty('--duration', `${duration / 1000}s`);
    
    cancelRef.current = simulateProcess(
      (p) => setProgress(p),
      (code) => {
        setExitCode(code);
        setIsRunning(false);
        if (processStartTime) {
          setProcessDuration(Date.now() - processStartTime);
        }
      },
      duration
    );
  };

  // Stop the process simulation
  const handleStop = () => {
    cancelRef.current();
    setIsRunning(false);
    setExitCode(130); // SIGINT
    if (processStartTime) {
      setProcessDuration(Date.now() - processStartTime);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => cancelRef.current();
  }, []);

  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto", 
        className
      )}
    >
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-primary" />
            <h2 className="font-semibold text-lg">Process Simulator</h2>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleReset}
            disabled={isRunning}
            className="h-8 w-8"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Process Status</span>
              <span className={cn(
                "font-medium",
                isRunning ? "text-amber-500" : exitCode !== null 
                  ? exitCode === 0 ? "text-green-500" : "text-red-500" 
                  : "text-muted-foreground"
              )}>
                {isRunning ? "Running" : exitCode !== null ? "Terminated" : "Ready"}
              </span>
            </div>
            
            <div className="process-bar">
              {isRunning && (
                <div 
                  className="process-bar-progress"
                  style={{ 
                    width: `${progress * 100}%`,
                  }}
                />
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleStart}
              disabled={isRunning}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-md" />
              <span className="relative flex items-center">
                <Play className="w-4 h-4 mr-2" /> 
                Start
              </span>
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleStop}
              disabled={!isRunning}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-destructive/10 group-hover:bg-destructive/20 transition-colors rounded-md" />
              <span className="relative flex items-center">
                <Square className="w-4 h-4 mr-2" /> 
                Stop
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {exitCode !== null && (
        <TerminationMessage 
          exitCode={exitCode} 
          duration={processDuration} 
        />
      )}
    </div>
  );
};

export default ProcessSimulator;
