import request from 'request-promise-native';
import { Client } from './domain';
export class Service {
    constructor() {};
    afficherClients(start: number, size: number) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients?start=${start}&size=${size}`, { json: true })
            .then(clients => clients.map(((client: Client) => `${client.prenoms} ${client.nom}`)));
    }
    rechercherClients(nom: string) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients/recherche/${nom}`, { json: true })
            .then(clients => clients.map(((client: Client) => `${client.prenoms} ${client.nom}`)));
    }
    ajouterClient(nom: string, prenom: string) {
        const options = {
            json: {
                "nom": nom,
                "prenoms": prenom
            }
        };
        return request.post(`https://antoine-hotel-web-api.herokuapp.com/clients`, options);
    }
}


//module.exports = Service;