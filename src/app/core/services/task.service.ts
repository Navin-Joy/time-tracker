import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ITask, ITaskTimerHistory } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: ITask[] = [];
  taskListener$ = new Subject<ITask[]>();
  activeTimerListener$ = new Subject<number>();

  constructor() { }

  // CRUD operations
  public getTaskList(): Observable<ITask[]> {
    return this.taskListener$.asObservable();
  }

  private updateTaskList(taskList: ITask[]): void {
    this.taskList = taskList;
    this.taskListener$.next(taskList);
  }

  public startTimer(task: ITask): void {
    let newHistory: ITaskTimerHistory = { startTime: new Date() };

    const tempList = this.taskList.map((taskItem: ITask) => {
      if (taskItem.id == task.id) {
        taskItem.history.push(newHistory);
      }
      return { ...taskItem }
    })
    this.updateTaskList(tempList);
  }

  public stopTimer(task: ITask): void {
    const tempList = this.taskList.map((taskItem: ITask) => {
      if (taskItem.id == task.id) {
        taskItem.history[taskItem.history.length - 1]['endTime'] = new Date();
        taskItem['timeRecorded'] = this.getTaskTime(taskItem);
      }
      return { ...taskItem }
    })
    this.updateTaskList(tempList);
  }

  public addNewTask(taskName: string): void {
    const newTask: ITask = {
      id: Date.now().toString(),
      taskName: taskName,
      timeRecorded: 0,
      history: []
    }

    this.updateTaskList([...this.taskList, newTask]);
  }

  public deleteTask(task: ITask): void {
    const tempList = this.taskList.filter((taskItem: ITask) => taskItem.id != task.id);
    this.updateTaskList(tempList);
  }
  // CRUD operations


  // active counter
  public getActiveTimer(): Observable<number> {
    return this.activeTimerListener$.asObservable();
  }

  public updateActiveTimer(counter: number): void {
    this.activeTimerListener$.next(counter);
  }
  // active counter


  // to get total time for a task
  private getTaskTime(task: ITask): number {
    let totalTime: number = 0;
    task.history.forEach((history: ITaskTimerHistory) => {
      if (history.endTime) {
        totalTime = totalTime + (history.endTime.getTime() - history.startTime.getTime())
      }
    });
    return totalTime;
  }

}
