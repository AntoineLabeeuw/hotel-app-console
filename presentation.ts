// service.js
const serviceClass = require('./service');
const service = new serviceClass();
// récupération du module `readline`
const readline = require('readline');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// menu avec config pour l'affichage
// refactor pour suivre exemple de Khalil
const config:any = {
    1: { libelle: 'Lister les clients', fn: menuListerClients },
    2: { libelle: 'Ajouter un client', fn: menuAjouterClient },
    3: { libelle: 'Rechercher des clients par nom', fn: menuRechercherParNom },
    99: { libelle: 'Sortir', fn: menuQuitter }
};

const start = () => {
    console.log(`** Administration Hotel **`);
    for (const choix in config) {
        console.log(choix + ". " + config[choix].libelle);
    }
    rl.question('Quelle action choisissez-vous ? : ', (saisie: string) => {
        const choix = parseInt(saisie);
        try {
            config[choix].fn(rl);
        } catch (error) {
            console.log("Mauvause entrée, veuillez choisir un nombre valide.");
            start();
        }

    });
}

function menuListerClients(rl: { question: (arg0: string, arg1: (size: any) => void) => void; }) {
    rl.question('Combien de clients voulez-vous afficher ? ', (size: any) => {
        console.log('>> Liste des clients');
        const clients$ = service.afficherClients(0, size);
        clients$
            .then((clients: any) => console.log(clients))
            .catch((err: any) => console.log(`Erreur lors du listing des clients. Raison ${err}`));
        start();
    });
}

function menuAjouterClient(rl: { question: (arg0: string, arg1: { (nom: any): void; (prenoms: any): void; }) => void; }) {
    rl.question('nom:', (nom: any) => {
        rl.question('prenoms:', (prenoms: any) => {
            const clients$ = service.ajouterClient(nom, prenoms);
            clients$
                .then((client: { nom: any; prenoms: any; uuid: any; }) => console.log('\x1b[33m%s\x1b[0m', `Client (${client.nom} ${client.prenoms}) crée avec l'uuid : ${client.uuid}`))
                .catch((err: any) => console.log(`Erreur lors de l'ajout du client. Raison ${err}`));
            start();
        });
    });
}

function menuRechercherParNom(rl: { question: (arg0: string, arg1: (nom: any) => void) => void; }) {
    rl.question('Nom du client à rechercher ?', (nom: any) => {
        const clients$ = service.rechercherClients(nom);
        clients$
            .then((clients: any) => console.log(clients))
            .catch((err: any) => console.log(`Erreur lors de l'affichage du(des) client(s). Raison ${err}`));
        start();
    });
}

function menuQuitter(rl: { close: () => void; }) {
    console.log(`Au revoir`);
    rl.close();
}

exports.start = start;