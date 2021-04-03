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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const alll = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(alll);
    const imgs = alll.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('img.txt', imgs.join('\n'));
    console.log('saved');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return 'READYYYY';
};

(async () => {
  try {
    console.log('1: will get dog pics');
    const data = await getDogPic();
    console.log(data);
    console.log('2: Done gettig dog pics');
  } catch (err) {
    console.log(err);
  }
})();

// console.log('1: will get dog pics');
// let a;
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('2: Done gettig dog pics');
//     a = x;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // this promise tipe that can return resolve and reject
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('imgs.txt', res.body.message); // this promise get from promise before and return resolve and reject
//   })
//   .then(() => {
//     console.log('saved');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// t
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {

// });
