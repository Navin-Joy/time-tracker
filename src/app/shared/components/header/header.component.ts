import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/core/interfaces/task.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subscription = new Subscription();
  totalTime: number = 0;
  activeHourCounter: number = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscription.add(this.taskService.getTaskList().subscribe((tasks: ITask[]) => { this.calcTotalTime(tasks) }));
    this.subscription.add(this.taskService.getActiveTimer().subscribe((counter: number) => { this.activeHourCounter = counter / 3600000 }));
  }

  private calcTotalTime(tasks: ITask[]): void {
    this.totalTime = tasks.reduce((acc, task) => acc + task.timeRecorded, 0) / 3600000;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
