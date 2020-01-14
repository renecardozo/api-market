import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MongoMemoryServer } from 'mongodb-memory-server';
let should = require('chai').should();
let expect = require('chai').expect;
var mongoose = require('mongoose');
var invoiceInstance = require('../test-helper');
var InvoiceService = require('../../src/services').InvoiceService;
var invoiceServiceMock = new InvoiceService(invoiceInstance);
let mongoServer;
const opts = { userMongoClient: true};

describe('Invoice Service ', () => {
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    mongoose.connect(mongoUri, opts);
    const db = mongoose.connection;
    db.on('open', async () => {
      console.log('# MONGO CONNECT TO TEST DB');
    });
    db.once('error', () => {
      console.error('CONNECT TO TEST DB FAILED');
    });
  });

  it('should add a new invoice document ', async () => {
    const newDoc = await invoiceServiceMock.insert({
      'date': '1987-10-26',
      'invoiceNumber': 1,
      'net': 10.25,
      'tax': 10.5,
      total: 10
    });
    should.exist(newDoc);
    newDoc.should.be.an('object');
  });

  it('should get all invoices ', async () => {
    const query = {};
    const docs = await invoiceServiceMock.getAll(query);
    expect(docs.data).to.have.lengthOf(5);
  });

  it('should get all invoices between a range of date', async () => {
    const query = {
      date: { 
        $gte: new Date('2016-01-12'),
        $lte: new Date('2016-10-15')
      }
    };
    const docs = await invoiceServiceMock.getAll(query);
    expect(docs.data).to.have.lengthOf(3);
  });

  it('should get all invoices  with an invoiceNumber', async () => {
    const query = {
      invoiceNumber: 3
    };
    const docs = await invoiceServiceMock.getAll(query);
    expect(docs.data).to.have.lengthOf(2);
  });

  it('should delete an invoice with specific id', async () => {
    const newDoc = await invoiceServiceMock.insert({
      'date': new Date('2016-01-12'),
      'invoiceNumber': 3,
      'net': 25.25,
      'tax': 565.5,
      'total': 260
    });
    const doc = await invoiceServiceMock.delete(newDoc._id);
    doc.should.be.an('object');
  });

  it('should delete all invoice ', async () => {
    const doc = await invoiceServiceMock.deleteAll();
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

