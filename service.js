// import request
const request = require('request-promise-native');
class Service {
    afficherClients(start, size) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients?start=${start}&size=${size}`, { json: true })
            .then(clients => clients.map(client => `${client['prenoms']} ${client['nom']}`));
    }
    rechercherClients(nom) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients/recherche/${nom}`, { json: true })
            .then(clients => clients.map(client => `${client['prenoms']} ${client['nom']}`));
    }
    ajouterClient(nom, prenom) {
        const options = {
            json: true,
            json: {
                "nom": nom,
                "prenoms": prenom
            }
        };
        return request.post(`https://antoine-hotel-web-api.herokuapp.com/clients`, options);
    }
}


module.exports = Service;