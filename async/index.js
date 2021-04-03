const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(file, (err, data) => {
      if (err) rejects('could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // this promise tipe that can return resolve and reject
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('imgs.txt', res.body.message); // this promise get from promise before and return resolve and reject
  })
  .then(() => {
    console.log('saved');
  })
  .catch((err) => {
    console.log(err);
  });

// t
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {

// });
