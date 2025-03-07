import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private apiUrl = "https://localhost:7101/api/TodoList"

  constructor(private http: HttpClient) { }

  private Id: any | null = null;

  getId(): any | null {
    return this.Id;
  }

  setId(id: any): void {
    this.Id = id;
  }

  getTodoList() : Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTodoListById(id: any) : Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTodoList(todoList: Task) : Observable<any> {
    return this.http.post(this.apiUrl, todoList);
  }

  updateTodoList(todoList: Task) : Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${todoList.Id}`, todoList);
  }

  deleteTodoList(id: any) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
