export interface ITask {
    id: string,
    taskName: string,
    // new timestamp - old timestamp
    timeRecorded: number,
    history: ITaskTimerHistory[]
}

export interface ITaskTimerHistory {
    startTime: Date,
    endTime?: Date
}

export interface ITaskActionEvent {
    task: ITask,
    actionType: string
}