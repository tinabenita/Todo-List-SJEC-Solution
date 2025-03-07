import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from './model/Task';
import { TodoListService } from './services/todo-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  taskForm: FormGroup;

  constructor(
    private todolistService: TodoListService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      Title: ['', [Validators.required]],
      Details: ['', [Validators.required]],
    });
  }

  tasks: Task[] = [];
  task: Task = {
    Id: null,
    Title: '',
    Details: '',
  };
  editMode = false;
  isLightMode: boolean = false;

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
  }

  ngOnInit(): void {
      this.loadTasks();
  }

  loadTasks() {
    this.todolistService.getTodoList().subscribe((data) => {
      this.tasks = data.map((taskItem: any) => ({
        Id: taskItem.id,
        Title: taskItem.title,
        Details: taskItem.details,
      }));
      console.log(this.tasks);
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      this.todolistService.addTodoList(this.taskForm.value).subscribe({
        next: (response) => {
          console.log('Task added successfully', response);
          this.loadTasks(); 
          this.formReset();
        },
        error: (error) => {
          console.error('Error adding task', error);
        },
      });
    }
  }

  deleteTask(id: any) {
    console.log(id);
    this.todolistService.deleteTodoList(id).subscribe({
      next: (response) => {
        console.log('Task deleted successfully', response);
        this.loadTasks(); 
      },
      error: (error) => {
        console.error('Error deleting task', error);
      },
    });
  }

  editTask(id: any) {}

  formReset() {
    this.taskForm.reset();
  }
}
