"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
// service.js
var service_1 = require("./service");
var service = new service_1.Service();
// récupération du module `readline`
var readline_1 = __importDefault(require("readline"));
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
// menu avec config pour l'affichage
// refactor pour suivre exemple de Khalil
var config = {
    1: { libelle: 'Lister les clients', fn: menuListerClients },
    2: { libelle: 'Ajouter un client', fn: menuAjouterClient },
    3: { libelle: 'Rechercher des clients par nom', fn: menuRechercherParNom },
    99: { libelle: 'Sortir', fn: menuQuitter }
};
exports.start = function () {
    console.log("** Administration Hotel **");
    for (var choix in config) {
        console.log(choix + ". " + config[choix].libelle);
    }
    rl.question('Quelle action choisissez-vous ? : ', function (saisie) {
        var choix = parseInt(saisie);
        try {
            config[choix].fn(rl);
        }
        catch (error) {
            console.log("Mauvause entrée, veuillez choisir un nombre valide.");
            exports.start();
        }
    });
};
function menuListerClients(rl) {
    rl.question('Combien de clients voulez-vous afficher ? ', function (size) {
        console.log('>> Liste des clients');
        var clients$ = service.afficherClients(0, size);
        clients$
            .then(function (clients) { return console.log(clients); })
            .catch(function (err) { return console.log("Erreur lors du listing des clients. Raison " + err); });
        exports.start();
    });
}
function menuAjouterClient(rl) {
    rl.question('nom:', function (nom) {
        rl.question('prenoms:', function (prenoms) {
            var clients$ = service.ajouterClient(nom, prenoms);
            clients$
                .then((function (client) { return console.log('\x1b[33m%s\x1b[0m', "Client (" + client.nom + " " + client.prenoms + ") cr\u00E9e avec l'uuid : " + client.uuid); }))
                .catch(function (err) { return console.log("Erreur lors de l'ajout du client. Raison " + err); });
            exports.start();
        });
    });
}
function menuRechercherParNom(rl) {
    rl.question('Nom du client à rechercher ?', function (nom) {
        var clients$ = service.rechercherClients(nom);
        clients$
            .then(function (clients) { return console.log(clients); })
            .catch(function (err) { return console.log("Erreur lors de l'affichage du(des) client(s). Raison " + err); });
        exports.start();
    });
}
function menuQuitter(rl) {
    console.log("Au revoir");
    rl.close();
}
