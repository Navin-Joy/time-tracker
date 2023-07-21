import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ITask, ITaskActionEvent } from 'src/app/core/interfaces/task.interface';
import { TaskService } from 'src/app/core/services/task.service';
import { Subscription } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { IOverlayContent } from 'src/app/core/interfaces/overlay.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskList!: ITask[];
  subscription = new Subscription();
  timer: any;
  timerValue: number = 0;
  activeTask!: ITask | null;
  addTaskForm: FormGroup;

  @ViewChild('addTaskPopupTemplate') addTaskPopupTemplate!: TemplateRef<HTMLTemplateElement>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private overlayService: OverlayService
  ) {
    this.addTaskForm = fb.group({
      taskName: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.subscription.add(this.taskService.getTaskList().subscribe((tasks: ITask[]) => {
      this.taskList = [...tasks];
    })
    );
  }

  // task card operations
  public onTaskActionClicked(actionEvent: ITaskActionEvent): void {
    switch (actionEvent.actionType) {
      case 'start':
        this.startTask(actionEvent.task);
        break;

      case 'stop':
        this.stopTask(actionEvent.task);
        break;

      case 'delete':
        this.openDeleteConfirmationDialog(actionEvent.task);
        break;
    }
  }

  private startTask(task: ITask): void {
    if (this.activeTask) {
      this.stopTask(this.activeTask);
    }
    this.activeTask = task;
    this.taskService.startTimer(task);
    this.startCounter();
  }

  private stopTask(task: ITask): void {
    this.taskService.stopTimer(task);
    clearInterval(this.timer);
    this.timerValue = 0;
    this.taskService.updateActiveTimer(this.timerValue);
    this.activeTask = null;
  }

  private deleteTask(task: ITask): void {
    if (task.id == this.activeTask?.id) {
      this.stopTask(task);
    }
    this.taskService.deleteTask(task);
  }
  // task card operations

  // popups
  private openDeleteConfirmationDialog(task: ITask): void {
    const popupConfig: IOverlayContent = {
      title: 'Confirmation required!',
      body: 'Are you sure you want to delete this entry?',
      confirmText: 'Yes',
      cancelText: 'No'
    };

    this.overlayService.openOverlay(popupConfig).subscribe((result: any) => {
      if (result) {
        this.deleteTask(task);
      }
    })
  }

  public openAddTaskDialog(): void {
    const popupConfig: IOverlayContent = {
      body: this.addTaskPopupTemplate,
    };

    this.overlayService.openOverlay(popupConfig).subscribe((result: any) => {
      this.addTaskForm.reset();
    });
  }
  // popups


  private startCounter(): void {
    this.timerValue = 0;
    this.timer = setInterval(() => {
      this.timerValue = this.timerValue + 1000;
      this.taskService.updateActiveTimer(this.timerValue);
    }, 1000);
  }

  public onFormSubmit(): void {
    if (this.addTaskForm.valid) {
      this.taskService.addNewTask(this.addTaskForm.controls['taskName'].value);
      this.overlayService.closeOverlay();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    clearInterval(this.timer);
  }

}
