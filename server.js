
const express = require('express');
const notes = require('./db/db');
const fs = require('fs');

const path = require('path');

// using Short Unique ID for note IDs
const ShortUniqueId = require('short-unique-id');

// set port for Heroku, if available, or 3001 by default
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware - parse incoming string or array data
app.use(express.urlencoded({extended: true}));

// Middleware - parse incoming JSON data
app.use(express.json());

// Middleware - make everything in 'public' available over HTTP
app.use(express.static('public'));

function validateNotes(newNote) {

    if (!newNote.title || typeof newNote.title !== "string") {
        return false;
    }

    if (!newNote.text || typeof newNote.text !== "string") {
        return false;
    }

    return true;

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

function deleteNote(id) {
    // loop through array to find the note with id
    for ( i=0; i<notes.length; i++ ) {
        if ( notes[i].id === id) {
            notes.splice(i,1);
            fs.writeFileSync(
                path.join(__dirname, '/db/db.json'),
                JSON.stringify(notes, null, 2)
            );
        } 
    }
    return;
};

app.get('/api/notes', (req, res)=> {
    let results = notes;

    res.json(results);
});

app.post('/api/notes', (req, res) => {
    // must enable json middleware at top of file for this to work
    // use Short Unique ID (https://www.npmjs.com/package/short-unique-id)to generate a note id
    const uid = new ShortUniqueId();
    req.body.id = uid();

    // if any data in req.body is incorrect, send 400 error back
    if ( !validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
   
});

app.delete('/api/notes/:id', (req, res) => {
    // get the id of the note to delete
    let id = req.params.id;
    deleteNote(id);
});

// serving up the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// serving up the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// serving up the wild card
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// the server is listening on the specified port to serve HTML and JSON
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});