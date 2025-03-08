
import React from "react";
import ProcessSimulator from "@/components/ProcessSimulator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <header className="w-full py-6 px-6 md:px-10 flex justify-center border-b border-border/50 bg-background/95 backdrop-blur-sm z-10">
        <div className="w-full max-w-5xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-primary"></div>
            </div>
            <h1 className="text-xl font-medium">Process Terminator</h1>
          </div>
          <div className="chip bg-secondary text-secondary-foreground">
            OS Simulator
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-10 px-6 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <div className="inline-block chip bg-primary/10 text-primary mb-2">
              Operating System Process Control
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Process Termination Simulator
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Visualize process lifecycle and exit codes with this interactive OS simulator.
            </p>
          </div>
          
          <div className="relative animate-slide-up">
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <ProcessSimulator />
          </div>
          
          <div className="mt-24 glass-panel p-6 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '150ms' }}>
            <h2 className="text-xl font-semibold mb-4">Understanding Exit Codes</h2>
            <p className="text-muted-foreground mb-4">
              When a process terminates, it returns an exit code that indicates how it ended. 
              A code of <span className="font-medium text-foreground">0</span> indicates successful termination, 
              while non-zero values indicate different types of errors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="chip bg-green-100 text-green-700 mb-2">Success</div>
                <p className="text-sm">Exit code 0 means the process completed successfully.</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="chip bg-red-100 text-red-700 mb-2">Error</div>
                <p className="text-sm">Non-zero exit codes indicate various error conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 px-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>Process Terminator &copy; {new Date().getFullYear()} — A beautifully crafted OS simulator</p>
      </footer>
    </div>
  );
};

export default Index;
