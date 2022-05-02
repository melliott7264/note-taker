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
        const note = newNote;
        
        notes.push(note);
    
        fs.writeFileSync(
            path.join(__dirname, '/db/db.json'),
            JSON.stringify(notes, null, 2)
        );
    
        return note;
    };
};

app.get('/api/notes', (req, res)=> {
    let results = notes;

    res.json(results);
});

app.post('/api/notes', (req, res) => {
     // set id based on what the next index of the array will be
     req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if ( !validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(req.body);
    }
   
});

app.delete('/api/notes/:id', (req, res) => {

})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});