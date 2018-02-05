/* eslint no-underscore-dangle: "off" */

const nodeDb = require('nano')('http://localhost:5984/node_db');


function addDocument(document) {
  return new Promise((resolve, reject) => {
    nodeDb.insert(document, (err, body) => {
      if (err) reject(new Error(`There was a problem inserting the new record in the database.\nDocument sent: ${document}\nError from database: ${err}`));
      resolve(body);
    });
  });
}

// Get one by id.
function getOne(id) {
  return new Promise((resolve, reject) => {
    nodeDb.get(id._id, (err, body) => {
      if (err) reject(new Error(`There was a problem getting that record from the database.\nID requested: ${id}\nError from database: ${err}`));
      resolve(body);
    });
  });
}

// Get all.
function getAllDocs() {
  return new Promise((resolve, reject) => {
    nodeDb.list({ include_docs: true }, (err, body) => {
      if (err) reject(new Error('There was a problem getting all of the documents from that database.'));
      resolve(body);
    });
  });
}

// Update a doc.
function updateDoc(id, document) {
  return new Promise((resolve, reject) => {
    nodeDb.insert(document, id._id, (err, body) => {
      if (err) reject(new Error(`There was a problem updating that record.\n_id of record to be updated: ${id}\nDocument the record is to be updated to: ${document}\nError from database: ${err}`));
      resolve(body);
    });
  });
}

// Delete a doc.
function removeDoc(id, revision) {
  return new Promise((resolve, reject) => {
    nodeDb.destroy(id, revision, (err, body) => {
      if (err) reject(new Error(`There was a problem deletting the document from the database.\n_id of the document to be deleted: ${id}\nrev of the document to be deleted: ${revision}\nError from the database: ${err}`));
      resolve(body);
    });
  });
}

module.exports = {
  addDocument,
  getOne,
  getAllDocs,
  updateDoc,
  removeDoc,
};
