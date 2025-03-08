
import React from "react";
import { cn } from "@/lib/utils";
import { ExitCode, getExitCodeDetails } from "@/utils/processUtils";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface TerminationMessageProps {
  exitCode: ExitCode | null;
  duration: number;
  className?: string;
}

const TerminationMessage: React.FC<TerminationMessageProps> = ({
  exitCode,
  duration,
  className,
}) => {
  if (exitCode === null) return null;

  const { status, description } = getExitCodeDetails(exitCode);
  const isSuccess = exitCode === 0;
  
  return (
    <div 
      className={cn(
        "glass-panel p-6 animate-scale-in",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <div 
            className={cn(
              "p-2 rounded-full",
              isSuccess ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}
          >
            {isSuccess ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="chip bg-secondary text-secondary-foreground">
              Exit {exitCode}
            </div>
            <h3 className="text-xl font-semibold mt-1">{status}</h3>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-border pb-2">
            <span className="text-muted-foreground">Description</span>
            <span className="font-medium">{description}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-border pb-2">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">{(duration / 1000).toFixed(2)}s</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Timestamp</span>
            <span className="font-medium">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminationMessage;
