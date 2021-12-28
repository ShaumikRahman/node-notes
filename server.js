const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/', async (req,res) => {
     res.setHeader('Content-type', 'application/json');

    fs.readFile(path.join(__dirname, 'notes', 'notes.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
                res.send(data);
        }
    });
})

app.post('/add', async (req,res) => {
    res.setHeader('Content-type', 'application/json');

    console.log(req.body.note);

    fs.readFile(path.join(__dirname, 'notes', 'notes.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.end({
                result: 'fail'
            });
        } else {
            const notes = [...JSON.parse(data), {
                id: '4',
                title: 'this is the new note',
                created: new Date(),
                modified: "",
                body: req.body.note
            }];

            res.send(JSON.stringify(notes));

            // TODO dynamic ID
        }
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});