
import React from "react";

const CodeBackground: React.FC = () => {
  return (
    <div className="code-background absolute inset-0 overflow-hidden z-[-1] opacity-15 dark:opacity-20 select-none pointer-events-none">
      <pre className="text-xs md:text-sm font-mono leading-tight text-left p-4 h-full overflow-hidden">
{`#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>

// Process control block structure
typedef struct {
    pid_t pid;
    int priority;
    char state[10];
    int exit_code;
} PCB;

// Initialize a new process
PCB* create_process(int priority) {
    PCB* process = (PCB*)malloc(sizeof(PCB));
    process->priority = priority;
    strcpy(process->state, "READY");
    process->exit_code = -1;
    return process;
}

// Execute a process
int execute_process(PCB* process) {
    pid_t pid = fork();
    
    if (pid == -1) {
        perror("fork failed");
        return 1;
    } else if (pid == 0) {
        // Child process
        printf("Process %d running\\n", getpid());
        
        // Simulate work
        sleep(2);
        
        // Various exit scenarios
        int exit_codes[] = {0, 1, 2, 9, 11, 127, 134, 139};
        int exit_code = exit_codes[rand() % 8];
        
        if (exit_code == 11) {
            // Simulate segmentation fault
            raise(SIGSEGV);
        } else if (exit_code == 9) {
            // Simulate kill signal
            raise(SIGKILL);
        } else {
            exit(exit_code);
        }
    } else {
        // Parent process
        process->pid = pid;
        strcpy(process->state, "RUNNING");
        
        int status;
        waitpid(pid, &status, 0);
        
        if (WIFEXITED(status)) {
            strcpy(process->state, "TERMINATED");
            process->exit_code = WEXITSTATUS(status);
            printf("Process %d exited with code %d\\n", 
                  pid, process->exit_code);
        } else if (WIFSIGNALED(status)) {
            strcpy(process->state, "TERMINATED");
            process->exit_code = 128 + WTERMSIG(status);
            printf("Process %d terminated by signal %d\\n", 
                  pid, WTERMSIG(status));
        }
    }
    
    return 0;
}

// Terminate a process
void terminate_process(PCB* process) {
    if (process->pid > 0) {
        kill(process->pid, SIGTERM);
        printf("Process %d terminated\\n", process->pid);
    }
    free(process);
}

// Main process scheduler
int main() {
    srand(time(NULL));
    
    PCB* process = create_process(10);
    printf("Created process with priority %d\\n", process->priority);
    
    if (execute_process(process) == 0) {
        printf("Process execution complete\\n");
        printf("Final state: %s\\n", process->state);
        printf("Exit code: %d\\n", process->exit_code);
    } else {
        printf("Process execution failed\\n");
    }
    
    terminate_process(process);
    return 0;
}`}
      </pre>
    </div>
  );
};

export default CodeBackground;
