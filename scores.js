const jsonBody = require('body/json');
const textBody = require('body')
const http = require('http');

let scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];

const resources = {
    "/IP": "Internet Protocol",
    "/TCP": "Transmission Control Protocol",
    "/scores": JSON.stringify(scores)
};


const hostname = null;
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
            res.end("ERROR NOT FOUND");
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            resources[req.url] = JSON.stringify(scores)
            const responseBody = resources[req.url];
            res.end(responseBody);
        }
    } else if (req.method === "PUT") {
        res.statusCode = 201;
        textBody(req, res, (err, requestBody) => {
            resources[req.url] = requestBody;
            const responseBody = resources[req.url];
            res.end(responseBody);
        })
    } else if (req.method === "POST") {
        res.statusCode = 201;
        jsonBody(req, res, (err, requestBody) => {
            scores.push(requestBody)
            scores.sort((a, b) => b.score - a.score)
            scores = scores.slice(0, 3)
            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(scores))
        })
        
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});