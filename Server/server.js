const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');

const path = require('path');
console.log( path.join(__dirname, '/db/db.json'));

// set port for Heroku, if available, or 3001 by default
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/notes', (req, res)=> {
    let results = notes;
    
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }

    res.send('This is a test of the Note Taker app.');
    // res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if ( !validateAnimal(req.body)) {
        res.status(400).send('The animal data is not property formatted.');
    } else {
        // add animal to json file and animals array in this function
        const note = createNewNote(req.body, notes);
        res.json(req.body);
    }
   
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});