process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('./app');
chai.use(chaiHttp);

describe('/GET all sports', () => {
    it('it should GET all the sports', (done) => {
        chai.request(server)
            .get('/sports')
            .end((err, res) => {
                res.body.should.be.a('obect');
                done();
            });
    });
});

describe('/GET events by sport name', () => {
    it('it should GET all the events in sports category', (done) => {
        chai.request(server)
            .get('/sports/Football')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/GET sports by sport name and event id', () => {
    it('it should GET all the sports in category', (done) => {
        chai.request(server)
            .get('/sports/Football/events/879542800')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
});
