interface SpringConfig {
    stiffness?: number;
    damping?: number;
    mass?: number;
    delta?: number;
}

declare class Spring {
    public target: number
    public current: number
    public stiffness: number
    public damping: number
    public mass: number
    public delta: number
    public running: boolean
    public velocity: number
    public acceleration: number 

    constructor(config?: SpringConfig) 
    set(value: number, fastForward?: boolean): number
}

export default Spring;