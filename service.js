"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import request
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.afficherClients = function (start, size) {
        return request_promise_native_1.default("https://antoine-hotel-web-api.herokuapp.com/clients?start=" + start + "&size=" + size, { json: true })
            .then(function (clients) { return clients.map((function (client) { return client['prenoms'] + " " + client['nom']; })); });
    };
    Service.prototype.rechercherClients = function (nom) {
        return request_promise_native_1.default("https://antoine-hotel-web-api.herokuapp.com/clients/recherche/" + nom, { json: true })
            .then(function (clients) { return clients.map((function (client) { return client['prenoms'] + " " + client['nom']; })); });
    };
    Service.prototype.ajouterClient = function (nom, prenom) {
        var options = {
            //json: true,
            json: {
                "nom": nom,
                "prenoms": prenom
            }
        };
        return request_promise_native_1.default.post("https://antoine-hotel-web-api.herokuapp.com/clients", options);
    };
    return Service;
}());
module.exports = Service;
