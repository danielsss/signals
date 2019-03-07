import {EventEmitter} from 'events';

declare namespace __SIGNALS__ {
  if (process.platform !== 'win32') {}
  if (process.platform === 'linux') {}


  export interface Signals extends EventEmitter {

    /**
     * @description add salt before process exit
     * @param {Function} fn 
     * @param {Object} [context]
     */
    before(fn: Function | Array<Function>, context: Object): void;
    
    /**
     * The SIGABRT and SIGIOT signal is sent to a process to tell it to abort,
     * i.e. to terminate. The signal is usually initiated by the process 
     * itself when it calls abort() function of the C Standard Library,
     * but it can be sent to the process from outside like any other signal.
     */
    SIGABRT(): void;
    sigabrt(): void;

    SIGIOT(): void;
    sigiot(): void;

    /**
     * The SIGALRM, SIGVTALRM and SIGPROF signal is sent to a process when the
     * time limit specified in a call to a preceding alarm setting function
     * (such as setitimer) elapses. SIGALRM is sent when real or clock time elapses.
     * SIGVTALRM is sent when CPU time used by the process elapses. 
     * SIGPROF is sent when CPU time used by the process and by the system on behalf of the process elapses.
     */
    SIGALRM(): void;
    sigalrm(): void;

    SIGVTALRM(): void;
    sigvtalrm(): void;
  

    /**
     * The SIGHUP signal is sent to a process when its controlling terminal is closed.
     * It was originally designed to notify the process of a serial line drop (a hangup).
     * In modern systems, this signal usually means that the controlling pseudo or virtual terminal has been closed.
     * Many daemons will reload their configuration files and reopen their logfiles 
     * instead of exiting when receiving this signal. nohup is a command to make a command ignore the signal.
     */
    SIGHUP(): void;
    sighup(): void;
  
    /**
     * The SIGINT signal is sent to a process by its controlling terminal
     * when a user wishes to interrupt the process.
     * This is typically initiated by pressing Ctrl+C, but on some systems,
     * the "delete" character or "break" key can be used.
     */
    SIGINT(): void;
    sigint(): void;

    SIGTERM(): void;
    sigterm(): void;

    
    /**
     * The SIGXCPU signal is sent to a process when it has used up the CPU for a duration
     * that exceeds a certain predetermined user-settable value. The arrival of a SIGXCPU signal
     * provides the receiving process a chance to quickly save any intermediate results and to exit gracefully,
     * before it is terminated by the operating system using the SIGKILL signal.
     */
    SIGXCPU(): void;
    sigxcpu(): void;

    /**
     * The SIGXFSZ signal is sent to a process when it grows a file that exceeds the maximum allowed size.
     */
    SIGXFSZ(): void;
    sigxfsz(): void;

    /**
     * The SIGUSR1 and SIGUSR2 signals are sent to a process to indicate user-defined conditions.
     */
    SIGUSR2(): void;
    sigusr2(): void;

    /**
     * The SIGTRAP signal is sent to a process when an exception (or trap) occurs: 
     * a condition that a debugger has requested to be informed of – for example, 
     * when a particular function is executed, or when a particular variable changes value.
     */
    SIGTRAP(): void;
    sigtrap(): void;

    /**
     * The SIGSYS signal is sent to a process when it passes a bad argument to a system call. 
     * In practice, this kind of signal is rarely encountered since applications rely on libraries 
     * (e.g. libc) to make the call for them. SIGSYS can be received by applications violating 
     * the Linux Seccomp security rules configured to restrict them.
     */
    SIGSYS(): void;
    sigsys(): void;

    /**
     * The SIGQUIT signal is sent to a process by its controlling terminal
     * when the user requests that the process quit and perform a core dump.
     */
    SIGQUIT(): void;
    sigquit(): void;
    

    SIGIO(): void;
    sigio(): void;

    /**
     * The SIGPOLL signal is sent when an event occurred on an explicitly watched file descriptor.
     * Using it effectively leads to making asynchronous I/O requests since the kernel will poll 
     * the descriptor in place of the caller. It provides an alternative to active polling
     */
    SIGPOLL(): void;
    sigpoll(): void;

    /**
     * The SIGPWR signal is sent to a process when the system experiences a power failure.
     */
    SIGPWR(): void;
    sigpwr(): void;

    /**
     * The SIGSTKFLT signal is sent to a process when the coprocessor experiences a stack fault 
     * (i.e. popping when the stack is empty or pushing when it is full). 
     * It is defined by, but not used on Linux, where a x87 coprocessor stack fault will generate SIGFPE instead.
     */
    SIGSTKFLT(): void;
    sigstkflt(): void;

    /**
     * he SIGUNUSED signal is sent to a process when a system call with an unused system call number is made.
     * It is synonymous with SIGSYS on most architectures.
     */
    SIGUNUSED(): void;
    sigunused(): void;
  }
}

export = __SIGNALS__;