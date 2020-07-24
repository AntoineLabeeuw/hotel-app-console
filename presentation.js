// récupération du module `readline`
var readline = require('readline');
// service.js
var service = require('./service');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// menu
// https://stackoverflow.com/questions/24464404/how-to-readline-infinitely-in-node-js
// https://jttan.com/blog/nodereadline/
function start() {
    rl.question('** Administration Hotel **\n'
        + "1. Lister les clients\n"
        + "2. Ajouter un client\n"
        + "3. Rechercher des clients par nom\n"
        + "99. Sortir\n\n"
        + "Choisir une action : ...\n"
        , function (line) {

            switch (line) {
                case "1":
                    // service.afficherClients();
                    service.afficherClients(0, 10, data => data.forEach(element => console.log('\x1b[33m%s %s\x1b[0m', element.nom, element.prenoms)));
                    // demande ici start et size
                    // retourne les clients, et c'est une liste que presentation affiche avec console.log
                    break;
                case "2":
                    // service.ajouterClient
                    rl.question('Nom du client a ajouter ?', function (nom) {
                        rl.question('Prénom du client a ajouter ?', function (prenom) {
                            service.ajouterClient(nom, prenom, function (data) {
                                console.log('\x1b[33m%s\x1b[0m', "Client (" + data.nom + " " + data.prenoms + ") crée avec l'uuid : " + data.uuid);
                            }, function (err) {
                                console.log('Erreur', err);
                            })
                        })
                    });
                    break;
                case "3":
                    console.log("numero 3");
                    // service.rechercherClients(nom)
                    // demande les infos ici, et les envoie a service.
                    rl.question('Nom du client à rechercher ?', function (nom) {
                        service.rechercherClients(nom, function (data) {
                            console.log(data);
                        }, function (err) {
                            console.log('Erreur', err);
                        })
                    });
                    break;
                case "99":
                    return rl.close();
                    // fin
                    break;
                default:
                    console.log("Choisissez un nombre valide");
            }
            start();
        });
};
exports.start = start;