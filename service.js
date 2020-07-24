// import request
var request = require('request');

function afficherClients(start, size, callback) {
    request('https://antoine-hotel-web-api.herokuapp.com/clients?start=' + start + '&size=' + size, { json: true }, function (err, res, body) {
        if (err) {
            callback('Erreur');
        }
        // body contient les données récupérées
        callback(body);
    });
}

function rechercherClients(nom, callback) {
    request('https://antoine-hotel-web-api.herokuapp.com/clients/recherche/' + nom, { json: true }, function (err, res, body) {
        if (err) {
            callback('Erreur');
        }
        // body contient les données récupérées
        callback(body);
    });
}

function ajouterClient(nom, prenom, callback) {
    var options = {
        json: true,
        json: {
            "nom": nom,
            "prenoms": prenom
        }
    };
    request.post('https://antoine-hotel-web-api.herokuapp.com/clients', options, function (err, res, body) {
        if (err) {
            callback(err);
        }
        // body contient les données récupérées
        callback(body);
    });
}

exports.afficherClients = afficherClients;
exports.ajouterClient = ajouterClient;
exports.rechercherClients = rechercherClients;