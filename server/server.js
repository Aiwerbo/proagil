
const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const server = express();
const port = 5000;

const seekURL = '/api/seeks';
const gameURL = '/api/game';

server.use(express.json());

fs.open('games.json', (err) => {
  if (err) {
    fs.writeFile('games.json', JSON.stringify([]), (error) => {
      if (error) throw error;
    });
  }
});
// View all game suggestions
server.get(seekURL, (req, res) => {
  fs.readFile('games.json', (err, data) => {
    if (err) throw err;
    const games = JSON.parse(data);
    res.status(200).send(games);
  });
});
// Add a new game suggestion
server.post(seekURL, (req, res) => {
  fs.readFile('games.json', (err, data) => {
    const body = req.body;
    body.id = uuidv4();
    body.moves = [];
    const json = JSON.parse(data);
    json.push(body);
    fs.writeFile('games.json', JSON.stringify(json), (error) => {
      if (error) throw error;
    });
  });
  res.sendStatus(201);
});

server.post(`${seekURL}/:id`, (req, res) => {
  const id = req.params.id;
  fs.readFile('games.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    if (filtered.length < 1) {
      res.status(404).end();
      return;
    }
    res.send(filtered);
  });
});

server.get(`${gameURL}/:id`, (req, res) => {
  const id = req.params.id;
  res.send(id);
});

server.post(`${gameURL}/move`, (req, res) => res.send('Game Move Post'));

server.listen(port, () => console.log(`Chess server listening on port ${port}!`));
