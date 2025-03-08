
// Process termination codes and their descriptions
export const exitCodes = {
  0: { status: "Success", description: "Normal termination" },
  1: { status: "Error", description: "General error" },
  2: { status: "Error", description: "Misuse of shell builtins" },
  126: { status: "Error", description: "Command cannot execute" },
  127: { status: "Error", description: "Command not found" },
  128: { status: "Error", description: "Invalid exit argument" },
  129: { status: "Error", description: "SIGHUP (Hangup)" },
  130: { status: "Error", description: "SIGINT (Interrupt)" },
  131: { status: "Error", description: "SIGQUIT (Quit and core dump)" },
  132: { status: "Error", description: "SIGILL (Illegal instruction)" },
  133: { status: "Error", description: "SIGTRAP (Trace/breakpoint trap)" },
  134: { status: "Error", description: "SIGABRT (Abort)" },
  135: { status: "Error", description: "SIGBUS (Bus error)" },
  136: { status: "Error", description: "SIGFPE (Floating point exception)" },
  137: { status: "Error", description: "SIGKILL (Kill, unblockable)" },
  139: { status: "Error", description: "SIGSEGV (Segmentation fault)" },
  143: { status: "Error", description: "SIGTERM (Termination)" },
};

export type ExitCode = keyof typeof exitCodes;

// Get a random exit code from the list
export const getRandomExitCode = (): ExitCode => {
  const codes = Object.keys(exitCodes).map(Number) as ExitCode[];
  return codes[Math.floor(Math.random() * codes.length)];
};

// Get details about an exit code
export const getExitCodeDetails = (code: ExitCode) => {
  return exitCodes[code] || { status: "Unknown", description: "Unknown exit code" };
};

// Get a random process duration between min and max seconds
export const getRandomDuration = (min: number = 2, max: number = 5): number => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
};

// Generate a simulated process execution
export const simulateProcess = (
  onProgress: (progress: number) => void,
  onComplete: (exitCode: ExitCode) => void,
  duration: number = getRandomDuration()
) => {
  let startTime = Date.now();
  let timer: number | null = null;

  const update = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    onProgress(progress);
    
    if (progress < 1) {
      timer = window.setTimeout(update, 50);
    } else {
      if (timer) clearTimeout(timer);
      const exitCode = getRandomExitCode();
      onComplete(exitCode);
    }
  };

  // Start the simulation
  timer = window.setTimeout(update, 50);

  // Return a function to cancel the simulation
  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
};

// Format duration in ms to seconds with 2 decimal places
export const formatDuration = (ms: number): string => {
  return (ms / 1000).toFixed(2) + "s";
};
