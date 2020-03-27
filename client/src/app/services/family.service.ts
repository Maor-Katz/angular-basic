import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(public http: HttpClient) { }

  getHomeMembers() {
    return this.http.get('http://localhost:1005/persons');
  }

  getTodoList() {
    return this.http.get('http://localhost:1005/tasks/');
  }

  addTodoList(task) {
    return this.http.post(`http://localhost:1005/tasks/`, task, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    }); 
  } 

  editTask(body) {
    return this.http.put(`http://localhost:1005/tasks/isFinish`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    });
  }

  deleteTask(id) {
    return this.http.delete(`http://localhost:1005/tasks/${id}`);
  }

}
