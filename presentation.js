// récupération du module `readline`
var readline = require('readline');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// menu
// https://stackoverflow.com/questions/24464404/how-to-readline-infinitely-in-node-js
// https://jttan.com/blog/nodereadline/
var start = function () {
    rl.question("Please Choose an option:\n"
        + "1. Lister les clients\n"
        + "2. Ajouter un client\n"
        + "99. Sortir\n\n"
        + "Choisir une action : ..."
        , function (line) {

            switch (line) {
                case "1":
                    console.log("this is option 1");
                    // service.afficherClients();
                    // demande ici start et size
                    // retourne les clients, et c'est une liste que presentation affiche avec console.log
                    break;
                case "2":
                    console.log("this is option 2");
                    // service.ajouterClient
                    // demande les infos ici, et les envoie a service.
                    break;
                case "99":
                    return rl.close();
                    // fin
                    break;
                default:
                    console.log("Choisissez un nombre valide");
            }
            start(); //Calling this function again to ask new question
        });
};

exports.start = start;