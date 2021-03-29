const fs = require("fs");
const http = require("http");
// const { type } = require("node:os");
const url = require("url");
// const { start } = require("node:repl");
// // blocking
// const textin = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(textin);

// const textout = `this is what we now about the avocado0oo0o: ${textin}./n Create on ${Date.now()}`;
// // console.log(textout);
// fs.writeFileSync("./starter/txt/output.txt", textout);
// console.log("file written");

//non blocking
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./starter/txt/${data}.txt`, "utf-8", (err, data1) => {
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data2) => {
//       console.log(data2);
//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data1}\n${data2}`,
//         "utf-8",
//         (err) => {
//           console.log("data has been witten");
//         },
//       );
//     });
//   });
// });

// end of callback file

/////////////////////////////////////

//server
// fs.readFileSysnc(
//   `${__dirname}/starter/dev-data/data.json`,
//   "utf-8",
//   (err, data) => {
//     const productData = JSON.parse(data);
//     // console.log(productData);
//     // res.writeHead(200, {
//     //   "Content-type": "application/json",
//     // });
//     // res.end(data);
//   },
// );

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  "utf-8",
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  const pathname = req.url;
  if (pathname === "/overview") {
    // console.log(__dirname);
    // console.log(__filename);
    res.end("this is the overview");
  } else if (pathname === "/product") {
    res.end("this is the product");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8080, "localhost", () => {
  console.log("listening to request on ort 8080");
});
