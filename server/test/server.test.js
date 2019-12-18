const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

// Tänk på att servern måste vara startad "nodemon server.js"

describe('Get list off games', () => {
  describe('GET /api/seeks', () => {
    it('Should get all games', (done) => {
      chai
        .request('http://localhost:5000')
        .get('/api/seeks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

describe('Post new game suggestion', () => {
  describe('POST /api/seeks', () => {
    it('Should add new game suggestion', (done) => {
      chai
        .request('http://localhost:5000')
        .post('/api/seeks')
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
