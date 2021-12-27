const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', async (req,res) => {
    res.setHeader('Content-type', 'application/json');

    fs.readFile(path.join(__dirname, 'notes', 'notes.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            console.log(data);
            res.send(data);
        }
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});