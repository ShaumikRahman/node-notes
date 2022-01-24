
fs = require('fs');
path = require('path');

fs.mkdir(path.join(__dirname, 'notes'), {}, err => {
    if (err) {
        if (err.code === 'EEXIST') {
            // exists
            console.log('exists');
        } else {
            fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), '[]', {}, err => {
                if (err) throw err;
            });
            throw err;
        }
    }
});
