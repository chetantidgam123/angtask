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
  apiUrl: any = "http://localhost:4000/";
  IPAddress: any = '';
  constructor(
    private http: HttpClient
  ) {
    
  }

  // Login / Access Apis

  Login(data: any) {
    return this.http.post(this.apiUrl + "login", data);
  }

  Logout(data: any) {
    return this.http.post(this.apiUrl + "logout", data);
  }
  getUserById() {
    return this.http.get(this.apiUrl + "getUserById");
  }
  updateUserById(data:any) {
    return this.http.put(this.apiUrl + "updateUserById",data);
  }
  addContact(data: any) {
    return this.http.post(this.apiUrl + "addContact", data);
  }
  getContactsByUser() {
    return this.http.get(this.apiUrl + "getContactsByUser");
  }
  updateContact(data:any,id:any) {
    return this.http.put(this.apiUrl + "updateContact/"+id,data);
  }
  removeContact(id:any) {
    return this.http.delete(this.apiUrl + "removeContact/"+id);
  }

 
}
