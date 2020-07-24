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
var start = function () {
    rl.question("1. Lister les clients\n"
        + "2. Ajouter un client\n"
        + "99. Sortir\n\n"
        + "Choisir une action : ...\n"
        , function (line) {

            switch (line) {
                case "1":
                    // service.afficherClients();
                    service.afficherClients(0, 10, data => data.forEach(element => console.log(element.nom, element.prenoms)));
                    // demande ici start et size
                    // retourne les clients, et c'est une liste que presentation affiche avec console.log
                    break;
                case "2":
                    // service.ajouterClient
                    service.ajouterClient("nom", "prenom", function(data) {
                        console.log("Client (" + data.nom + ") crée avec l'uuid : "+ data.uuid);
                    });
                    // demande les infos ici, et les envoie a service.
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