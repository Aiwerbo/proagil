const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const server = express();
const port = 5001;

const seekURL = '/test/api/seeks';
const gameURL = '/test/api/game';

server.use(express.json());

fs.open('testgames.json', 'r', (err) => {
  if (err) {
    fs.writeFile('testgames.json', JSON.stringify([{"spelare":["Test1"],"id":"1","moves":[{"from": "string", "to": "string"}]}]), { flag: 'wx' }, (error) => {
      if (error) throw error;
    });
  }
});
// View all game suggestions
server.get(seekURL, (req, res) => {
  fs.readFile('testgames.json', (err, data) => {
    if (err) throw err;
    const games = JSON.parse(data);
    res.status(200).send(games);
  });
});
// Add a new game suggestion
server.post(seekURL, (req, res) => {
  fs.readFile('testgames.json', (err, data) => {
    const { spelare } = req.body;
    const body = { spelare: [spelare], id: uuidv4(), moves: [] };
    const json = JSON.parse(data);
    json.push(body);
    fs.writeFile('testgames.json', JSON.stringify(json), (error) => {
      if (error) throw error;
    });
  });
  res.sendStatus(201);
});
// Accept to play game
server.post(`${seekURL}/:id`, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  fs.readFile('testgames.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    if(filtered[0].spelare.length > 1) {
      res.status(403).end()
      return;
    }
    filtered[0].spelare.push(body.spelare);
    if (filtered.length < 1) {
      res.status(404).end();
      return;
    }
    fs.writeFile('testgames.json', JSON.stringify(json), (error) => {
      if (error) throw error;
    });
    res.status(200).send(filtered);
  });
});

server.get(`${gameURL}/:id`, (req, res) => {
  // may iunclude the strange hashish chess string instead of below crap data.
  const { id } = req.params;
  fs.readFile('testgames.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    if (filtered.length < 1) {
      res.status(404).end();
      return;
    }
    res.status(200).send(filtered[0].moves);
  });
});

server.post(`${gameURL}/move`, (req, res) => res.send('Game Move Post'));

server.listen(port, () =>
  console.log(`Chess server listening on port ${port}!`)
);
