const chai = require('chai');

const should = chai.should();
const io = require('socket.io-client');

let client1;
let client2;

beforeEach((done) => {
  client1 = io('http://localhost:5020');
  client2 = io('http://localhost:5020');
  done();
});
afterEach((done) => {
  client1.disconnect();
  client2.disconnect();
  done();
});

describe('Socket server connection', () => {
  it('users trying to connected ', (done) => {
    client1.on('connect', () => {
      done();
    });
  });
});

describe('Server respond', () => {
  it('User sending chess object ', (done) => {
    const obj = { room: '123', turnColor: 'black', fen: '456' };
    client1.emit('message', { data: obj }, () => {
    });
    client2.on('123', (message) => {
      message.data.should.be.an('object');
      message.data.should.have.all.keys('room', 'turnColor', 'fen');
      message.data.fen.should.be.a('string');
      message.data.turnColor.should.be.a('string');
      done();
    });
  });
});
