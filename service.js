// import request
const request = require('request-promise-native');

function afficherClients(start, size) {
    return request(`https://antoine-hotel-web-api.herokuapp.com/clients?start=${start}&size=${size}`, { json: true })
        .then(clients => clients.map(client => `${client['prenoms']} ${client['nom']}`));
}

function rechercherClients(nom) {
    return request(`https://antoine-hotel-web-api.herokuapp.com/clients/recherche/${nom}`, { json: true })
        .then(clients => client);
}

function ajouterClient(nom, prenom) {
    const options = {
        json: true,
        json: {
            "nom": nom,
            "prenoms": prenom
        }
    };
    return request.post(`https://antoine-hotel-web-api.herokuapp.com/clients`, options);
}

exports.afficherClients = afficherClients;
exports.ajouterClient = ajouterClient;
exports.rechercherClients = rechercherClients;