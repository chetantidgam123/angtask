import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  navigate(arg0: string[]) {
    // throw new Error('Method not implemented.');
  }
  apiUrl: any = "http://localhost:3036/";
  IPAddress: any = '';
  constructor(
    private http: HttpClient
  ) {

  }

  // Login / Access Apis

  signup(data: any) {
    return this.http.post(this.apiUrl + "signup", data);
  }
  Login(data: any) {
    return this.http.post(this.apiUrl + "login", data);
  }

  Logout(data: any) {
    return this.http.post(this.apiUrl + "logout", data);
  }
  getUsers() {
    return this.http.get(this.apiUrl + "getUsers");
  }
  updateUser(data: any, id: any) {
    return this.http.put(this.apiUrl + "updateUser/" + id, data);
  }
  removeUser(id: any) {
    return this.http.delete(this.apiUrl + "removeUser/" + id);
  }
  getUserById() {
    return this.http.get(this.apiUrl + "getUserById");
  }
  updateUserById(data: any) {
    return this.http.put(this.apiUrl + "updateUserById", data);
  }
  changeStatusUser(data: any) {
    return this.http.put(this.apiUrl + "changeStatusUser", data);
  }
  addContact(data: any) {
    return this.http.post(this.apiUrl + "addContact", data);
  }
  addContactByAdmin(data: any) {
    return this.http.post(this.apiUrl + "addContactByAdmin", data);
  }
  getContactsByUser() {
    return this.http.get(this.apiUrl + "getContactsByUser");
  }
  getContactsByUserById(id: any) {
    return this.http.get(this.apiUrl + "getContactsByUserById/" + id);
  }
  updateContact(data: any, id: any) {
    return this.http.put(this.apiUrl + "updateContact/" + id, data);
  }
  removeContact(id: any) {
    return this.http.delete(this.apiUrl + "removeContact/" + id);
  }
  resetPass(data: any) {
    return this.http.put(this.apiUrl + "resetPass/", data);
  }



}
