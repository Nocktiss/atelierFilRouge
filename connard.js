const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const connection = require('./conf');

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/connard', (req, res) => {
    connection.query('SELECT * from connard', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage des connards');
        } else {
            res.json(results);
        }
    });
});

app.get('/connard/list', (req, res) => {
    connection.query('SELECT firstname, bastard, level from connard', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage spécifique des connards');
        } else {
            res.json(results);
        }
    })
})

app.get('/connard/content', (req, res) => {
    connection.query('SELECT * from connard where bastard = true', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage spécifique des batards');
        } else {
            res.json(results);
        }
    })
})

app.get('/connard/start', (req, res) => {
    connection.query('select * from connard where firstname like "s%"', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage spécifique des batards');
        } else {
            res.json(results);
        }
    })
})

app.get('/connard/sup', (req, res) => {
    connection.query('select * from connard where birthday > "1990-01-01"', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage spécifique des batards');
        } else {
            res.json(results);
        }
    })
})

app.get('/connard/level/:ass', (req, res) => {
    const enculer = req.params.ass;
    connection.query(`select * from connard ORDER BY level ${enculer}`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors du repérage spécifique des enculers');
        } else {
            res.json(results);
        }
    })
})

app.post('/connard/add', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO connard SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de l'insertion des connards");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/connard/modif', (req, res) => {
    const formData = req.body;
    connection.query('UPDATE connard SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de la modification d'un bastards");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/connard/toggle', (req, res) => {
    const formData = req.body;
    connection.query('UPDATE connard SET bastard = ?', formData, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors du switch du connard");
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/connard/delete/:id', (req, res) => {
    const enculer = req.params.id;
    connection.query('DELETE FROM connard WHERE id = ?', [enculer], err => {
        if (err) {
            res.status(500).send("Erreur lors de la suppression d'un connard");
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(port, console.log(`http://localhost:${port}`))