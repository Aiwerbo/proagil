const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const server = express();
const port = 5000;

const seekURL = '/api/seeks';
const gameURL = '/api/game';

const writeFileFn = (data) => {
  fs.writeFile('games.json', JSON.stringify(data), (error) => {
    if (error) throw error;
  });
}

server.use(express.json());

fs.open('games.json', 'r', (err) => {
  if (err) {
    fs.writeFile('games.json', JSON.stringify([]), { flag: 'wx' }, (error) => {
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
  console.log(req.body)
  if (!req.body.spelare) {
    res.status(400).end();
    return;
  }
  fs.readFile('games.json', (err, data) => {
    const { spelare } = req.body;
    const body = { spelare: [spelare], id: uuidv4(), moves: [] };
    const json = JSON.parse(data);
    json.push(body);
    writeFileFn(json)
    res.status(201).send(body);
  });
});
// Accept to play game
server.post(`${seekURL}/:id`, (req, res) => {
  if (!req.params.id) {
    res.status(404).end();
    return;
  }
  else if (!req.body.spelare) {
    res.status(400).end();
    return;
  }
  const { id } = req.params;
  const { body } = req;

  fs.readFile('games.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    if (filtered[0].spelare.length > 1) {
      res.status(403).end();
      return;
    }
    filtered[0].spelare.push(body.spelare);
    if (filtered.length < 1) {
      res.status(404).end();
      return;
    }
    writeFileFn(json)
    res.status(200).send(filtered[0]);
  });
});

server.get(`${gameURL}/:id`, (req, res) => {
  // may iunclude the strange hashish chess string instead of below crap data.
  if (!req.params.id) {
    res.status(404).end();
    return;
  }
  const { id } = req.params;
  fs.readFile('games.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    if (filtered.length < 1) {
      res.status(403).end();
      return;
    }
    res.status(200).send(filtered[0].spelare);
  });
});

// POST moves to specific game
server.post(`${gameURL}/move/:id`, (req, res) => { 
  if (!req.body.move) {
    res.status(400).end();
    return;
  }
  else if (!req.params.id) {
    res.status(404).end();
    return;
  }
    const { id } = req.params;
    const { move } = req.body;
    fs.readFile('games.json', (err, data) => {
      const json = JSON.parse(data);
      const filtered = json.filter((x) => x.id === id);
      filtered[0].moves.push(move);
      writeFileFn(json)
      res.status(201).send(filtered[0].moves);
  });
});

//GET all moves from a specific game
server.get(`${gameURL}/move/:id`, (req, res) => {
  if (!req.params.id) {
    res.status(404).end();
    return;
  }
  const { id } = req.params;
  fs.readFile('games.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    res.status(200).send(filtered[0].moves);
  });
});

server.listen(port, () =>
  console.log(`Chess server listening on port ${port}!`)
);
