const fs = require('fs');
const superagent = require('superagent');
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      console.log(res.body.message);
      if (err) return console.log(err.message);
      fs.writeFile('img.txt', res.body.message, (err) => {
        console.log('saved');
      });
    });
});
