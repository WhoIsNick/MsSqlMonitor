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
var user_1 = require('./users/user');
var auth_http_1 = require('./auth.http');
var role_service_1 = require('../components/roles/role.service');
var AuthService = (function () {
    function AuthService(http, roleService) {
        this.http = http;
        this.roleService = roleService;
        this.authKey = 'auth';
        this.roleKey = '#role';
        this.userUrl = 'https://localhost:44301';
    }
    AuthService.prototype.getUser = function () {
        if (this.user == undefined) {
            console.log("Restore user");
            this.user = new user_1.User();
            this.user.id = parseInt(localStorage.getItem("#id"));
            this.user.username = localStorage.getItem("#username");
            this.user.role = localStorage.getItem("#role");
        }
        return this.user;
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var data = 'grant_type=password&username=' + username + '&password=' + password + '&client_id=MsSqlMonitor';
        var url = '/token';
        return this.http.post(url, data, new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }))
            .map(function (response) {
            var auth = response.json();
            _this.setAuth(auth);
            _this.getUserByName(username, password);
            return auth;
        });
    };
    AuthService.prototype.logout = function () {
        this.setAuth(null);
        this.setRole(null);
        localStorage.setItem("#id", null);
        localStorage.setItem("#username", null);
        localStorage.setItem("#role", null);
        return false;
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem(this.authKey) != null;
    };
    AuthService.prototype.getAuth = function () {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    };
    AuthService.prototype.setAuth = function (auth) {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            localStorage.removeItem(this.authKey);
        }
        return true;
    };
    AuthService.prototype.setRole = function (role) {
        if (role) {
            localStorage.setItem(this.roleKey, JSON.stringify(role));
        }
        else {
            localStorage.removeItem(this.roleKey);
        }
        return true;
    };
    AuthService.prototype.isAdmin = function (username) {
        var i = localStorage.getItem(this.roleKey);
        if (i != null) {
            return i.includes("Admin");
        }
        return false;
    };
    AuthService.prototype.isUser = function (username) {
        var i = localStorage.getItem(this.roleKey);
        if (i != null) {
            return i.includes("User");
        }
        return false;
    };
    AuthService.prototype.isGuest = function (username) {
        var i = localStorage.getItem(this.roleKey);
        if (i != null) {
            return i.includes("Guest");
        }
        return false;
    };
    AuthService.prototype.getUserByName = function (username, password) {
        var _this = this;
        this.http.get(this.userUrl + '/api/users/username?username=' + username)
            .toPromise()
            .then(function (response) {
            _this.user = response.json();
            _this.getUserRole(_this.user.roles[0].roleId)
                .then(function (responce) { return _this.role = responce.name; })
                .then(function (respone) { return localStorage.setItem("#role", JSON.stringify(_this.role)); });
            localStorage.setItem("#id", JSON.stringify(_this.user.id));
            localStorage.setItem("#username", JSON.stringify(_this.user.username));
        });
    };
    AuthService.prototype.getUserRole = function (id) {
        return this.roleService.getRoleById(id).then(function (response) { return response; });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_http_1.AuthHttp, role_service_1.RoleService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map