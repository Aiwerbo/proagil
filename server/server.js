const express = require('express');
const fs = require("fs");
//const cors = require("cors");
const uuidv4 = require("uuid/v4");
const server = express();
const port = 5000;

const seekURL = "/api/seeks";
const gameURL = "/api/game";

server.use(express.json());

// View all game suggestions
server.get(seekURL, (req, res) => {
  fs.readFile("games.json", (err, data) => {
      if (err) throw err;
      let games = JSON.parse(data);
      res.status(200).send(games);
    });
});
// Add a game suggestion
server.post(seekURL, (req, res) => {
  fs.readFile("games.json", function(err, data) {
      let body = req.body;
      body.id = uuidv4();

      let json = JSON.parse(data);
       json.push(body);
       fs.writeFile("games.json", JSON.stringify(json), err => {
        if (err) throw err;
      });  
    });

    res.sendStatus(201);
});

server.post(seekURL + "/:id", (req, res) => {
  const id = req.params.id;
  res.send("Seek Post ID:" + id);
});

server.get(gameURL + "/:id", (req, res) => {
  const id = req.params.id;
  res.send("Game ID:" + id);
});

server.post(gameURL + "/move", (req, res) => res.send("Game Move Post"));

server.listen(port, () => console.log(`Chess server listening on port ${port}!`));
