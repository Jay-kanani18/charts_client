import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  get_for_whom(id:any){
    return this.http.get(
      `${environment.URL}/get_for_whom?id=${id}`
    );
  }
  add_for_whom(data:any,id:any){
    return this.http.post(
      `${environment.URL}/add_for_whom?id=${id}`,data
    );
  }
  get_for_what(id:any){
    return this.http.get(
      `${environment.URL}/get_for_what?id=${id}`
    );
  }
  add_for_what(data:any,id:any){
    return this.http.post(
      `${environment.URL}/add_for_what?id=${id}`,data
      );
    }
  get_charts(id:any){
    return this.http.get(
      `${environment.URL}/get_charts?id=${id}`
    );
  }
  add_charts(data:any){
    return this.http.post(
      `${environment.URL}/add_charts`,data
    );
  }

}
