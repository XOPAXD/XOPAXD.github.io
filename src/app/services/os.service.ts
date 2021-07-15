import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OS } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseURL : String = environment.baseURL;

  constructor(private http : HttpClient,
              private snack:MatSnackBar) { }

  findAll():Observable<OS[]>{
    const url = this.baseURL + "/os";
    return this.http.get<OS[]>(url);
  }

  findById(id:any):Observable<OS>{
    const url = this.baseURL + "/os/"+id;
    return this.http.get<OS>(url);
  }

  create(os:OS):Observable<OS>{
    const url = this.baseURL + "/os";
    return this.http.post<OS>(url,os);
  }

  update(os:OS):Observable<OS>{
    const url = this.baseURL + "/os/";
    return this.http.put<OS>(url,os);
  }

  delete(id:any):Observable<void>{
    const url = this.baseURL + "/os/"+id;
    return this.http.delete<void>(url);
  }

  message(msg:string):void{
      this.snack.open(`${msg}`,'OK',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:4000
      })
  }
}
