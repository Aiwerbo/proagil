const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

// Tänk på att servern måste vara startad "nodemon server.js"

describe('Get list off games', () => {
  describe('GET /test/api/seeks', () => {
    it('Should get all games', (done) => {
      chai
        .request('http://localhost:5001')
        .get('/test/api/seeks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

describe('Post new game suggestion', () => {
  describe('POST /test/api/seeks', () => {
    it('Should add new game suggestion', (done) => {
      chai
        .request('http://localhost:5001')
        .post('/test/api/seeks')
        .send({
          spelare: 'Test Player'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});

describe('Post accept to play game', () => {
  describe('POST /test/api/seeks/{id}', () => {
    it('Should accept new game', (done) => {
      chai
        .request('http://localhost:5001')
        .post('/test/api/seeks/1')
        .send({
          spelare: 'Test Player2'
        })
        .end((err, res) => {
          if(res.status === 403) {
          res.should.have.status(403);
          res.body.should.be.a('object');
            return done();
          }
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].spelare.should.have.lengthOf(2)
          done();
        });
    });
  });
});

describe('Test to get all players', () => {
  describe('GET /test/api/game/{id}', () => {
    it('Should get all players', (done) => {
      chai
        .request('http://localhost:5001')
        .get('/test/api/game/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //res.body[0].should.have.all.keys('from', 'to')
          done();
        });
    });
  });
});


describe('Test to get all moves', () => {
  describe('GET /test/api/game/move/{id}', () => {
    it('Should get all moves', (done) => {
      chai
        .request('http://localhost:5001')
        .get('/test/api/game/move/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

//test/api/game /move/:id`,

describe('Test to post a move', () => {
  describe('POST /test/api/game/move/{id}', () => {
    it('Should post a move', (done) => {
      chai
        .request('http://localhost:5001')
        .post('/test/api/game/move/1')
        .send({
          move: 'Test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('array');
          //res.body[0].should.have.all.keys('move')
          done();
        });
    });
  });
});


