const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});