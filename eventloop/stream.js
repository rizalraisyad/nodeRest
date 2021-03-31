const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  // Solution 2 Stream
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('file not found');
  // });

  //SOLUTION 3 USING PIPE
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // Readablesource.pipe(writabledestionation)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for request ... ');
});
