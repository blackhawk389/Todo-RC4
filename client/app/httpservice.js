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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var httpServiceClass = (function () {
    function httpServiceClass(http) {
        this.http = http;
    }
    httpServiceClass.prototype.addtask = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var requestOption = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/addtaskserver', JSON.stringify(obj), requestOption)
            .map(this.extractdata).catch(this.errorhandler);
    };
    httpServiceClass.prototype.extractdata = function (response) {
        var body = response.json();
        return body || {};
    };
    httpServiceClass.prototype.errorhandler = function (error) {
        var err = error.message ? error.message : error.status ? '{error.status}' : 'server error';
        return Observable_1.Observable.throw(err);
    };
    httpServiceClass.prototype.deleteTask = function (taskobject) {
        return this.http.delete("http://localhost:3000/deletedata/" + taskobject)
            .map(this.extractdata).catch(this.errorhandler);
    };
    httpServiceClass.prototype.updateTask = function (value) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var requestOption = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/edit', JSON.stringify(value), requestOption)
            .map(this.extractdata).catch(this.errorhandler);
    };
    httpServiceClass = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], httpServiceClass);
    return httpServiceClass;
}());
exports.httpServiceClass = httpServiceClass;
//# sourceMappingURL=httpservice.js.map