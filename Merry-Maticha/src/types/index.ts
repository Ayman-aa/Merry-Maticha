export interface TimerState
{
    minutes: number;
    seconds: number;
    isRunning: boolean;
    mode: 'work' | 'break';
}

export interface TimerSettings
{
    focusTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    numberOfPomodoros: number;
}