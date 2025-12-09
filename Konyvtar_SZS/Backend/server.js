const cors = require('cors');
const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());



app.listen(3000, "localhost", () =>
{
    console.log('A szerver fut a localhost ip címen a 3000-es porton!');
});

const connection = mysql.createConnection
({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'konyvtar'
});



app.get('/', (req, res) =>
{
    res.send('Fut a backend, milyen jó ez most!');
});

app.get('/konyvek', (req, res) =>
{
    const query = 'SELECT * FROM Konyv';
    connection.query(query, (error, results) =>
    {
        if (error)
        {
            console.error('Hiba a könyvek lekérdezésekor:', error);
            res.send('Hiba a könyvek lekérdezésekor!');
        }

        res.json(results);
    });
});

app.post('/konyv/uj/:cim/:szerzo/:mufaj', (req, res) =>
{
    const { cim, szerzo, mufaj } = req.params;

    const query = 'INSERT INTO konyv (konyvCime) VALUES (?)';
    connection.query(query, [cim], (error, results) =>
    {
        if (error)
        {
            console.error('Hiba az új könyv hozzáadásakor:', error);
            res.send('Hiba az új könyv hozzáadásakor!');
        }
    });

    const query2 = 'INSERT INTO szerzo (szerzoNeve) VALUES (?)';
    connection.query(query2, [szerzo], (error, results) =>
    {
        if (error)
        {
            console.error('Hiba az új szerző hozzáadásakor:', error);
            res.send('Hiba az új szerző hozzáadásakor!');
        }
    });

    const query3 = 'INSERT INTO mufaj (mufajNev) VALUES (?)';
    connection.query(query3, [mufaj], (error, results) =>
    {
        if (error)
        {
            console.error('Hiba az új műfaj hozzáadásakor:', error);
            res.send('Hiba az új műfaj hozzáadásakor!');
        }

        res.send('Sikeres hozzáadás!');
    });
});

app.delete('/konyv/torol/:id', (req, res) =>
{
    const { id } = req.params;

    const query = 'DELETE FROM konyv WHERE konyvId = ?';
    connection.query(query, [id], (error, results) =>
    {
        if (error)
        {
            console.error('Hiba a könyv törlésekor:', error);
            res.send('Hiba a könyv törlésekor!');
        }

        res.send('Sikeres törlés!');
    });
});