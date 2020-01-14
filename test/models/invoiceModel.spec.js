import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MongoMemoryServer } from 'mongodb-memory-server';
let should = require('chai').should();
let expect = require('chai').expect;
var mongoose = require('mongoose');
var invoiceModel = require('../test-helper');
let mongoServer;
const opts = { userMongoClient: true};
describe('Invoice Model ', () => {
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    mongoose.connect(mongoUri, opts);
    const db = mongoose.connection;
    db.on('open', async () => {
      console.log('# MONGO CONNECT TO TEST DB');
      await invoiceModel.create([{
        'date': new Date('2016-01-12'),
        'invoiceNumber': 3,
        'net': 25.25,
        'tax': 565.5,
        'total': 260
      },
      {
        'date': new Date('2016-05-26'),
        'invoiceNumber': 3,
        'net': 25.25,
        'tax': 565.5,
        'total': 260
      },
      {
        'date': new Date('2016-10-15'),
        'invoiceNumber': 2,
        'net': 25.25,
        'tax': 565.5,
        'total': 260
      },
      {
        'date': new Date('2019-10-26'),
        'invoiceNumber': 1,
        'net': 25.25,
        'tax': 565.5,
        'total': 260
      }]);
    });
    db.once('error', () => {
      console.error('CONNECT TO TEST DB FAILED');
    });
  });

  it('should save a new document ', async () => {
    const newDoc = await invoiceModel.create({
      'date': '1987-10-26',
      'invoiceNumber': 1,
      'net': 10.25,
      'tax': 10.5,
      total: 10
    });
    should.exist(newDoc);
    newDoc.should.be.an('object');
  });

  it('should get all document ', async () => {
    const query = {};
    const docs = await invoiceModel.find(query);
    expect(docs).to.have.lengthOf(5);
  });

  it('should get all document with an invoiceNumber property', async () => {
    const query = {
      invoiceNumber: 3
    };
    const docs = await invoiceModel.find(query);
    expect(docs).to.have.lengthOf(2);
  });

  it('should get all document with number a specific number', async () => {
    const query = {
      date: { 
        $gte: new Date('2016-01-12'),
        $lte: new Date('2016-10-15')
      }
    };
    const docs = await invoiceModel.find(query);
    expect(docs).to.have.lengthOf(3);
  });

  it('should delete a document with specific id', async () => {
    const newDoc = await invoiceModel.create({
      'date': new Date('2016-01-12'),
      'invoiceNumber': 3,
      'net': 25.25,
      'tax': 565.5,
      'total': 260
    });
    const doc = await invoiceModel.findOneAndDelete(newDoc._id);
    doc.should.be.an('object');
  });

  after(async () => {
    try {
      await mongoose.disconnect();
      await mongoServer.stop();
    } catch (error) {
      throw error;
    }
  });
  
});

