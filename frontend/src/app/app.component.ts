import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from './model/Task';
import { TodoListService } from './services/todo-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  taskForm: FormGroup;

  constructor(
    private todolistService: TodoListService,
    private fb: FormBuilder
  ){
    this.taskForm = this.fb.group({
      Title: ['', [Validators.required]],
      Details: ['', [Validators.required]]
    });

  }

  tasks: Task[] = [];
  task: Task = {
    Id: 0,
    Title: '',
    Details: ''
  };
  editMode = false;
  isLightMode : boolean = false;

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
  }

  loadTasks(){
    this.todolistService.getTodoList().subscribe((data) => {
      this.tasks = data;
    })
  }

  loadTask(Id: any){
    this.todolistService.getTodoListById(Id).subscribe((data) => {
      this.task = data;
  })
  
  }

  addTask(){
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.Id !== id);
  }

}
