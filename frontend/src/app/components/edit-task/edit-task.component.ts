import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoListService } from '../../services/todo-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  editForm: FormGroup;
  editMode = true; 

  constructor(
    private todolistService: TodoListService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      Title: ['', [Validators.required]],
      Details: ['', [Validators.required]],
    });
  }

  updateTask(){
    //your code goes here
  }

  cancelEdit(){
    //your code goes here
  }
}
