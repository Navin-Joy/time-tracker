import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask, ITaskTimerHistory } from 'src/app/core/interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  isActive: boolean = false;
  @Input() timerValue!: number;

  @Input() taskDetails!: ITask;
  @Output() readonly actionClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const taskHistory: ITaskTimerHistory[] = this.taskDetails.history;

    if (taskHistory.length) {
      this.isActive = Boolean(!taskHistory[taskHistory.length - 1]['endTime'] || false);
    }
  }

  public onTaskAction(actionType: string): void {
    this.actionClicked.emit({ task: this.taskDetails, actionType: actionType });
  }

}
