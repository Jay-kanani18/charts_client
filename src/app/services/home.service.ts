import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }



  getUsers() {
    return this.http.get(
      `${environment.URL}/get_users?token=xyz`
    );
  }

  getUserDetail(id:any){
    return this.http.get(
      `${environment.URL}/get_user_detail?id=${id}`
    );
  }
  
  updateUser(id:any,data:any){
      console.log(data)
    return this.http.post(
      `${environment.URL}/update_user?id=${id}`
    ,data);
  }
  
  deleteUser(id:any){
    return this.http.delete(
      `${environment.URL}/delete_user?id=${id}`
    );
  }

}
