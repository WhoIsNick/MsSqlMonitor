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
require('rxjs/add/operator/toPromise');
var MonitorDataService = (function () {
    function MonitorDataService(http) {
        this.http = http;
        this.instancesUrl = 'https://localhost:5000/api/instances/';
        this.loginsUrl = 'https://localhost:5000/api/instances/logins/';
        this.rolesUrl = 'https://localhost:5000/api/instances/roles/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    MonitorDataService.prototype.getInstances = function () {
        return this.http.get(this.instancesUrl)
            .toPromise()
            .then(function (response) { return response.json().model; })
            .catch(function (error) { return console.error(error); });
    };
    MonitorDataService.prototype.getInstanceById = function (id) {
        var url = this.instancesUrl.concat("" + id);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().model; })
            .catch(function (error) { return console.error(error); });
    };
    MonitorDataService.prototype.updateInstance = function (instance) {
        return this.http.put(this.instancesUrl, "'" + JSON.stringify(instance) + "'", new http_1.RequestOptions({ headers: this.headers }))
            .toPromise()
            .then(function (response) { return response.json().model; })
            .catch(function (error) { return console.error(error); });
    };
    MonitorDataService.prototype.getInstanceLogins = function (id) {
        var url = this.loginsUrl.concat("" + id);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().model; })
            .catch(function (error) { return console.error(error); });
    };
    MonitorDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MonitorDataService);
    return MonitorDataService;
}());
exports.MonitorDataService = MonitorDataService;
//# sourceMappingURL=monitor-data.service.js.map