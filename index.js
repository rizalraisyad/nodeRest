const fs = require("fs");
const http = require("http");
// const { type } = require("node:os");
const url = require("url");
const replaceTemplate = require("./starter/module/replaceTemplate");
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
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  "utf-8",
);

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  "utf-8",
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  // console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  // console.log(url.parse(req.url, true));
  // const pathname = req.url;
  // Overview page
  if (pathname === "/overview" || pathname === "/") {
    // console.log(__dirname);
    // console.log(__filename);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHTML);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);
    // res.end("this is the overview");

    //product
  } else if (pathname === "/product") {
    // console.log(query);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // console.log(product);
    res.end(output);

    //api
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
