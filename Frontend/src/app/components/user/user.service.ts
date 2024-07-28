import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
  
})
export class UserService {
  // Server url for backend requests
  serverUrl = 'http://localhost:3000'

  constructor(public http : HttpClient) { }

  // To fetch all the users 
  getAllUsers(page: number, limit: number, search: string = ''):Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  if (search.trim() !== '') {
    params = params.set('searchTerm', search);
  }
    return this.http.get<any>(`${this.serverUrl}/get/all/roles`, { params });
  }

  // add api for user list
  addUserToList(body:any):Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/add/user`, body);
  }

  // delete user by id
  deleteUser(id:any):Observable<any>{
    return this.http.get<any>(`${this.serverUrl}/get/view/user/${id}`);
  }

  // update api for user data
  updateUser(body:any):Observable<any>{
    return this.http.get<any>(`${this.serverUrl}/update/user/`, body);
  }
}
