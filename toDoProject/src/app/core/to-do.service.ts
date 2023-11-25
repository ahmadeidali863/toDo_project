import { Injectable } from '@angular/core';
import { Task } from './interface/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  
  private apiUrl = 'http://localhost:3000/api/columns';

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(taskId: string) {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<Task>(url);
  }
  addColumn(status: any): Observable<any> {
    return this.http.post(this.apiUrl, status)
  }
  // addColumn(status: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     "Accept": "application/octet-stream",
  //     "Access-Control-Allow-Origin": "*",
  //     'Authorization': "my-auth-token"
  //   });
  //   return this.http.post<any>(`${this.apiUrl}columns`, status).pipe(
  //     catchError(error => {
  //       if (error == 0) {
  //         return throwError(error);
  //       }
  //       return error;
  //     })
  //   );;
  // }
  addTask(task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      
    });
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  updateTask(taskId: string, task: Task) {
    const url = `${this.apiUrl}/${taskId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Task>(url, task, { headers });
  }

  deleteTask(taskId: string) {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<Task>(url);
  }
}
