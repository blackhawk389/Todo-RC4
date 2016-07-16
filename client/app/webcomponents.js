"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var forms_1 = require('@angular/forms');
var httpservice_1 = require('./httpservice');
var child = (function () {
    function child() {
        this.editMode = false;
        this.show = false;
        this.childevent = new core_1.EventEmitter();
        this.updatevent = new core_1.EventEmitter();
    }
    child.prototype.deletetask = function (deletingobjectid) {
        this.childevent.emit(deletingobjectid);
    };
    child.prototype.updatetask = function () {
        this.editMode = true;
    };
    child.prototype.savetask = function (updatingobj) {
        this.editMode = false;
        this.updatevent.emit(updatingobj);
    };
    child.prototype.showdetails = function () {
        this.show = this.show ? false : true;
    };
    child = __decorate([
        core_1.Component({
            selector: 'child-component',
            inputs: ['taskobject'],
            outputs: ['childevent', 'updatevent'],
            template: "<div>   \n      <span *ngIf=\"!editMode\">{{taskobject.taskobj}}</span><input *ngIf=\"editMode\" [(ngModel)]=\"taskobject.taskobj\" />\n      \n      <button type = \"button\" class = \"btn btn-default\" (click) = \"deletetask(taskobject._id)\">Delete</button>\n      <button *ngIf=\"!editMode\" type = \"button\" class = \"btn btn-defualt\" (click) = \"updatetask()\">Update</button>\n      <button *ngIf=\"editMode\" type = \"button\" class = \"btn btn-defualt\" (click) = \"savetask(taskobject)\">Save</button>\n      <button  type = \"button\" class = \"btn btn-defualt\" (click) = \"showdetails()\">Show Details</button>\n      <div *ngIf = \"show\">\n      <span *ngIf=\"!editMode\">{{taskobject.detailobj}}</span><input *ngIf=\"editMode\" [(ngModel)]=\"taskobject.detailobj\" />\n      </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], child);
    return child;
}());
exports.child = child;
var parent = (function () {
    function parent(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.array = [];
    }
    parent.prototype.deleteparent = function (taskobject) {
        var _this = this;
        this.httpService.deleteTask(taskobject).subscribe(function (res) {
            _this.array = res;
        });
    };
    parent.prototype.updateparent = function (value) {
        this.httpService.updateTask(value).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
        console.log(value);
        console.log("Updated");
    };
    parent.prototype.onSubmit = function () {
        var _this = this;
        var obj = {
            taskobj: this.task,
            detailobj: this.details
        };
        this.task = '';
        this.details = '';
        this.httpService.addtask(obj).subscribe(function (res) {
            _this.array = res;
            console.log(_this.array);
        }, function (err) {
            console.log(err);
        });
    };
    parent = __decorate([
        core_1.Component({
            selector: 'parent-component',
            directives: [child],
            template: "\n    \n    <h1 class= \"text-center\">TODO App</h1>\n    \n    <form (ngSubmit)=\"onSubmit()\">     \n        <lable>Task</lable>\n        <input type=\"text\" required\n        [(ngModel)]=\"task\" name=\"task\" >\n        <lable>Detail</lable>\n        <input type=\"text\" required\n        [(ngModel)]=\"details\" name=\"details\">\n      <button type='submit'>Submit</button>\n    </form>\n    <div>\n    <child-component *ngFor =\"let todo of array\" [taskobject] =\"todo\" (childevent) = \"deleteparent($event)\"  (updatevent) = \"updateparent($event)\">Loading...</child-component>\n    \n    \n    <h2>Basic Request</h2>\n    \n    <button type=\"button\" (click)=\"deletefromserver()\">Make Request</button>\n    \n    ",
            providers: [httpservice_1.httpServiceClass]
        }), 
        __metadata('design:paramtypes', [http_1.Http, httpservice_1.httpServiceClass])
    ], parent);
    return parent;
}());
exports.parent = parent;
platform_browser_dynamic_1.bootstrap(parent, [http_2.HTTP_PROVIDERS, forms_1.disableDeprecatedForms(),
    forms_1.provideForms()]);
//# sourceMappingURL=webcomponents.js.map