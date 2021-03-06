const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const server = express();
const port = 5001;

const seekURL = '/test/api/seeks';
const gameURL = '/test/api/game';

server.use(express.json());

fs.open('testgames.json', 'r', (err, fd) => { 

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

  if(!req.body.spelare) {
    res.status(400).end()
    return;
  }
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
  if(!req.params.id) {
    res.status(404).end()
    return;
  }
  else if (!req.body.spelare) {
    res.status(400).end()
    return;
  }
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
  fs.readFile('testgames.json', (err, data) => {
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
  if (!req.params.id) {
    res.status(404).end();
    return;
  }
  else if (!req.body.move) {
    res.status(400).end();
    return;
  }
    const { id } = req.params;
    const { move } = req.body;
    fs.readFile('testgames.json', (err, data) => {
      const json = JSON.parse(data);
      const filtered = json.filter((x) => x.id === id);
      filtered[0].moves.push(move);
      fs.writeFile('testgames.json', JSON.stringify(json), (error) => {
        if (error) throw error;
      });
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
  fs.readFile('testgames.json', (err, data) => {
    const json = JSON.parse(data);
    const filtered = json.filter((x) => x.id === id);
    res.status(200).send(filtered[0].moves);
  });
});

server.listen(port, () =>
  console.log(`Chess server listening on port ${port}!`)
);
