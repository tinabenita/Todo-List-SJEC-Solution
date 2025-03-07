import { Component } from '@angular/core';
import { Task } from '../../model/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    Title: '',
    Details: '',
  };

  editMode = false;

  addTask() {
    if (this.newTask.Title && this.newTask.Details) {
      const task: Task = {
        Id: Date.now(),
        Title: this.newTask.Title,
        Details: this.newTask.Details,
      };
      this.tasks.push(task);
      this.newTask = { Title: '', Details: '' };
    }
  }
 
}
