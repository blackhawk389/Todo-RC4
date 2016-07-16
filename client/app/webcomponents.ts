import { Component, EventEmitter } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { httpServiceClass } from './httpservice';


@Component({
    
    selector : 'child-component',
    inputs : ['taskobject'],
    outputs : ['childevent', 'updatevent'],
    
    template : `<div>   
      <span *ngIf="!editMode">{{taskobject.taskobj}}</span><input *ngIf="editMode" [(ngModel)]="taskobject.taskobj" />
      
      <button type = "button" class = "btn btn-default" (click) = "deletetask(taskobject._id)">Delete</button>
      <button *ngIf="!editMode" type = "button" class = "btn btn-defualt" (click) = "updatetask()">Update</button>
      <button *ngIf="editMode" type = "button" class = "btn btn-defualt" (click) = "savetask(taskobject)">Save</button>
      <button  type = "button" class = "btn btn-defualt" (click) = "showdetails()">Show Details</button>
      <div *ngIf = "show">
      <span *ngIf="!editMode">{{taskobject.detailobj}}</span><input *ngIf="editMode" [(ngModel)]="taskobject.detailobj" />
      </div>
    </div>
    `
})
export class child{
    
    editMode = false;  
    show = false;
    childevent : EventEmitter<any>;
    updatevent : EventEmitter<any>;
 
    constructor(){
        this.childevent = new EventEmitter();
        this.updatevent = new EventEmitter();
    }
       
    deletetask(deletingobjectid){
        this.childevent.emit(deletingobjectid);
    }
    
    updatetask(){
        this.editMode = true;
    }
    savetask(updatingobj){
        
        this.editMode = false;
        this.updatevent.emit(updatingobj); 
    }
    showdetails(){
        this.show = this.show ? false : true;
    }
}





@Component({
    selector : 'parent-component',
    directives : [child],
    template : `
    
    <h1 class= "text-center">TODO App</h1>
    
    <form (ngSubmit)="onSubmit()">     
        <lable>Task</lable>
        <input type="text" required
        [(ngModel)]="task" name="task" >
        <lable>Detail</lable>
        <input type="text" required
        [(ngModel)]="details" name="details">
      <button type='submit'>Submit</button>
    </form>
    <div>
    <child-component *ngFor ="let todo of array" [taskobject] ="todo" (childevent) = "deleteparent($event)"  (updatevent) = "updateparent($event)">Loading...</child-component>
    
    
    <h2>Basic Request</h2>
    
    <button type="button" (click)="deletefromserver()">Make Request</button>
    
    `,
    providers : [httpServiceClass]
})
export class parent{
    
    comingeventdelete ;
    task : string;
    details : string ;
    id : number;
    array : any[];
  
    
    constructor(private http :Http,private httpService : httpServiceClass){
        this.array = [];
    }
    
    deleteparent(taskobject){
        
           this.httpService.deleteTask(taskobject).subscribe((res)=>{
               this.array= res;
           })         
    }
    
    updateparent(value){
    this.httpService.updateTask(value).subscribe((res)=>{
        console.log(res)
    }, (err)=>{
        console.log(err)
    })
           console.log(value);
           console.log("Updated")

    }
    
    
    onSubmit(){
            
        var obj = {
            taskobj : this.task,
            detailobj : this.details
        }
        this.task = '';
        this.details = '';  
        
        this.httpService.addtask(obj).subscribe((res)=>{
            this.array = res
            console.log(this.array)
        }, (err)=>{
            console.log(err)
        })                
    }    
  }

bootstrap(parent, [HTTP_PROVIDERS,  disableDeprecatedForms(),
  provideForms()]);