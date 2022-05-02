const express = require('express');
const notes = require('./db/db');
const fs = require('fs');

const path = require('path');

// set port for Heroku, if available, or 3001 by default
const PORT = process.env.PORT || 3001;

const app = express();

function validateNotes(newNote) {

};

function createNewNote(newNote, notes) {

};

app.get('/api/notes', (req, res)=> {
    let results = notes;

    res.json(results);
});

app.post('/api/notes', (req, res) => {

    // if any data in req.body is incorrect, send 400 error back
    if ( !validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(req.body);
    }
   
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});