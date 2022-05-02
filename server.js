const express = require('express');
const notes = require('./db/db1');
const fs = require('fs');

const path = require('path');

// set port for Heroku, if available, or 3001 by default
const PORT = process.env.PORT || 3001;

const app = express();



app.get('/api/notes', (req, res)=> {
    let results = notes;
    
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }

    res.json(results);
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if ( !validateNotes(req.body)) {
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