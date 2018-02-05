const express = require('express');
const bodyParser = require('body-parser');

const {
  addDocument,
  getOne,
  getAllDocs,
  updateDoc,
  removeDoc,
} = require('./src/query.js');

const app = express.router();

app.use(bodyParser.json());

// Create a document.
app.put('/addDocument', (req, res) => {
  addDocument()
    .then(passedData => res.send(passedData))
    .catch(err => res.status(500).send(err));
});

// Get one by id.
app.get('/getOne', (req, res) => {
  getOne()
    .then(passedData => res.send(passedData))
    .catch(err => res.status(500).send(err));
});

// Get all.
app.get('/getAllDocs', (req, res) => {
  getAllDocs()
    .then(passedData => res.send(passedData))
    .catch(err => res.status(500).send(err));
});

// Update a doc.
app.post('/updateDoc', (req, res) => {
  updateDoc()
    .then(passedData => res.send(passedData))
    .catch(err => res.status(500).send(err));
});

// Delete a doc.
app.delete('/removeDoc', (req, res) => {
  removeDoc()
    .then(passedData => res.send(passedData))
    .catch(err => res.status(500).send(err));
});

