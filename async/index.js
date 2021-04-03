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

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)
      .then((res) => {
        console.log(res.body.message);
        fs.writeFile('img.txt', res.body.message, (err) => {
          console.log('saved');
        });
      })
      .catch((err) => {
        console.log('err');
        console.log(err.message);
      });
  })
  .catch((err) => {
    console.log(err);
  });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {

// });
