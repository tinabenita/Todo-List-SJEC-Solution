import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  heading: string;
  details: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    heading: '',
    details: ''
  };
  editMode = false;
  editingTask: Task = { id: 0, heading: '', details: '' };
  isLightMode = false;

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
  }

  addTask() {
    if (this.newTask.heading && this.newTask.details) {
      const task: Task = {
        id: Date.now(),
        heading: this.newTask.heading,
        details: this.newTask.details
      };
      this.tasks.push(task);
      this.newTask = { heading: '', details: '' };
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  startEdit(task: Task) {
    this.editMode = true;
    this.editingTask = { ...task };
  }

  updateTask() {
    const index = this.tasks.findIndex(t => t.id === this.editingTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.editingTask };
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.editMode = false;
    this.editingTask = { id: 0, heading: '', details: '' };
  }  
}
