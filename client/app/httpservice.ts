import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class httpServiceClass{
    
    constructor (public http: Http) {
        
    }
    
    addtask(obj) : Observable<any>{
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let requestOption = new RequestOptions({ headers: headers});
        return this.http.post('http://localhost:3000/addtaskserver', JSON.stringify(obj), requestOption)
                   .map(this.extractdata).catch(this.errorhandler) 
        
    }
    
    extractdata(response : Response){
       let body = response.json();
       return body || {};
    }
    
    errorhandler(error : any){
     let err = error.message ? error.message : error.status ? '{error.status}' : 'server error';
     return Observable.throw(err);  
        
    }
    
    deleteTask(taskobject){
      return this.http.delete("http://localhost:3000/deletedata/" +taskobject)
             .map(this.extractdata).catch(this.errorhandler)
    }
    
    updateTask(value){
     
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let requestOption = new RequestOptions({ headers: headers});
        return this.http.post('http://localhost:3000/edit', JSON.stringify(value), requestOption)
                   .map(this.extractdata).catch(this.errorhandler)    
        
    }
}