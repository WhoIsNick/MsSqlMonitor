"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var AuthenticationConnectionBackend = (function (_super) {
    __extends(AuthenticationConnectionBackend, _super);
    function AuthenticationConnectionBackend(_browserXhr, _baseResponseOptions, _xsrfStrategy) {
        _super.call(this, _browserXhr, _baseResponseOptions, _xsrfStrategy);
    }
    AuthenticationConnectionBackend.prototype.createConnection = function (request) {
        var xhrConnection = _super.prototype.createConnection.call(this, request);
        xhrConnection.response = xhrConnection.response.catch(function (error) {
            if (error.status === 401 || error.status === 403) {
                localStorage.clear();
                window.location.href = 'https://localhost:44301';
            }
            return Observable_1.Observable.throw(error);
        });
        return xhrConnection;
    };
    return AuthenticationConnectionBackend;
}(http_1.XHRBackend));
exports.AuthenticationConnectionBackend = AuthenticationConnectionBackend;
//# sourceMappingURL=authenticationConnectionBackend.js.map