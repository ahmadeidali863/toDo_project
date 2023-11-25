import { Component } from '@angular/core';
import { ToDoService } from '../core/to-do.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../core/interface/task';

@Component({
  selector: 'app-to-do-page',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss','../core/styles/form_validation.scss']
})
export class ToDoPageComponent {
  addTaskSection : boolean = false;
  addSubtaskSection : boolean = false;
  taskInfoSection : boolean = false;
  statusColumnsInput : boolean = false;

  taskStatusOptions = Object.values(TaskStatus);

  statusColumns:string='';

public task : Task = {
  title: '',
  description: '',
  subtasks: [],
  progressBar: 0,
  status: TaskStatus.Todo,
  columnId: ''
}

constructor(private toDoService : ToDoService
            ){

 

}


addTask(form : any) {
  console.log(this.task)
  this.toDoService.addTask(this.task).subscribe(() => {
  //  this.loadTasks();
  });
}

addStatusColumns(status : any) {
  console.log(status)
  this.statusColumnsInput = false
  this.toDoService.addColumn(status).subscribe(
    err => {
      console.log(err)
    })
}



addSubtask(subtask :any){
  this.task.subtasks.push(subtask)
  this.openAddSubtaskSection();
}

deleteSubtask(subtask: any) {
  const index = this.task.subtasks.indexOf(subtask);
  if (index !== -1) {
    this.task.subtasks.splice(index, 1);
  }

}
openAddTaskSection(){
    if (this.addTaskSection == true) {
      this.addTaskSection = false;
    } else {
      this.addTaskSection = true;
    }
}

openAddSubtaskSection(){
    if (this.addSubtaskSection == true) {
      this.addSubtaskSection = false;
    } else {
      this.addSubtaskSection = true;
    }
}

openTaskInfoSection(){
    if (this.taskInfoSection == true) {
      this.taskInfoSection = false;
    } else {
      this.taskInfoSection = true;
    }
}



}
