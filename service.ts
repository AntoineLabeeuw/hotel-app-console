// import request
import request from 'request-promise-native';
class Service {
    afficherClients(start:number, size:number) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients?start=${start}&size=${size}`, { json: true })
            .then(clients => clients.map(((client:any)  => `${client['prenoms']} ${client['nom']}`)));
    }
    rechercherClients(nom: any) {
        return request(`https://antoine-hotel-web-api.herokuapp.com/clients/recherche/${nom}`, { json: true })
            .then(clients => clients.map(((client:any) => `${client['prenoms']} ${client['nom']}`)));
    }
    ajouterClient(nom: any, prenom: any) {
        const options = {
            //json: true,
            json: {
                "nom": nom,
                "prenoms": prenom
            }
        };
        return request.post(`https://antoine-hotel-web-api.herokuapp.com/clients`, options);
    }
}


module.exports = Service;