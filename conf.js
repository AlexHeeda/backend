const  mysql = require('mysql');

const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
port: 3306,
user :  '************************', // le nom d'utilisateur
password :  '**********************************', // le mot de passe
database :  'exercice', // le nom de la base de données
});


module.exports = connection;
