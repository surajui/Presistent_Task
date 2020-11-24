import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {

    
   }
   ListData(){
    return this.http.get("http://localhost:3000/ListData")
  }

  addListdata(req){
    return this.http.post("http://localhost:3000/ListData",req)
  }

  addnewtask(id,req){
    return this.http.patch("http://localhost:3000/ListData/"+id,{
      arrayList:req
    })
  }
  deleteList(id){
    return this.http.delete("http://localhost:3000/ListData/"+id)
  }
}
