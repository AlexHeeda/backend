const connection = require('./conf');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
const port = 3000;

app.use(Session({
    store: new FileStore({
        // path: path.join(__dirname, '/tmp'),
        encrypt: true
    }),
    secret: 'Super Secret !',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId'
}));

app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/session-in", (req, res) => {
    req.session.song = "be bop a lula.";
    res.send("ok");
});

app.get("/session-out", (req, res) =>{
    res.send(req.session.song);
});

/**
 * 1.Récupére toute les données.
 */
app.get("/all", (req, res) => {
    req.session.maVariable = true; 
    connection.query('SELECT * FROM wcs_api', (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});

/**
 * 2.Récupére le nom et la date de la table wcs_api.
 */
app.get("/all/light", (req, res) => {
    connection.query('SELECT name, jour FROM wcs_api', (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});

/**
 * 3.Récupére les lignes quand le nom contient wcs.
 */
app.get("/all/wcs", (req, res) => {
    connection.query('SELECT * FROM wcs_api WHERE name LIKE "%wcs%"', (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});


/**
 * 4.Récupére les données avec un nom comment par 'campus'.
 */
app.get("/all/campus", (req, res) => {
    connection.query('SELECT * FROM wcs_api WHERE name LIKE "campus%"', (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});

/**
 * 5.Récupére les données avec une date superieur a 2010.
 */
app.get("/all/date", (req, res) => {
    connection.query('SELECT * FROM wcs_api WHERE jour > "2010/01/01"', (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});


/**
 * 6.Récupere les données avec un parametre url ASC OU DESC.
 */
app.get("/all/:choice", (req, res) => {
    const choix = req.params.choice;
    console.log(choix);
    connection.query(`SELECT * FROM wcs_api ORDER BY id_api ${choix}`, (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu récupérer les données")
        } else {
            res.json(result);
        }
    });
});

/**
 * 7.Ajoute des données a la base.
 */
app.post("/all/save", (req, res) => {
    // récupération des données envoyées
    const formData = req.body;

    connection.query('INSERT INTO wcs_api SET ?', formData, (err, result) => {
        if (err) {
            res.status(500).send("nous n'avons pas pu inserer les données")
        } else {
            res.send("Données ajouté");
        }
    });
});

/**
 * 8.Modification de données
 */
app.put("/all/change/:id", (req, res) => {
    // récupération des données envoyées
    const idW = req.params.id;
    const formData = req.body;

    // connection à la base de données, et insertion de l'employé
    connection.query('UPDATE wcs_api SET ? WHERE id_wcs = ?', [formData, idW], err => {

        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("nous n'avons pas pu inserer les données");
        } else {

            // Si tout s'est bien passé, on envoie un statut "ok".
            res.send("Données ajouté");
        }
    });
});



/**
 * 9.Toggle du booléen, change la valeur par l'url, si rentrez true alors false et inversement.
 */
app.put("/all/toggle/:id", (req, res) => {
    const idwcs = req.params.id;
<<<<<<< HEAD
    connection.query(`UPDATE wcs_api SET answer = !answer WHERE id_wcs = ?`, idwcs, err => {
=======
    connection.query(`UPDATE wcs_api SET answer = !answer WHERE id_wcs = ?`,  idwcs, err => {
>>>>>>> 8fb182f1c32437544a35c3ce48705263ea771a8d
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("nous n'avons pas pu inserer les données");
        } else {

            // Si tout s'est bien passé, on envoie un statut "ok".
            res.send("Données ajouté");
        }
    });
})

/**
 * 10.Suppression d'une donnée
 */
app.delete("/all/delete/:id", (req, res) => {
    const idColumn = req.params.id;

    connection.query("DELETE FROM wcs_api WHERE id_wcs = ?", idColumn, err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur dans la suppression");
        } else {
            res.sendStatus(200);
        }
    });
});


/**
 * 11.Supprime quand answer est false.
 */
app.delete("/all/deletew/", (req, res) => {

    connection.query("DELETE FROM wcs_api WHERE answer = false", err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur dans la suppressions");
        } else {
            res.sendStatus(200);
        }
    })
})


app.listen(port);
