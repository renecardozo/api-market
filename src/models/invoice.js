import mongoose, { Schema } from 'mongoose';

class Invoice {

  constructor() {
    this.name = 'invoices';
  }

  create() {
    const schema = new Schema({
      date: {
        type: Date,
        required: true
      },
      invoiceNumber: {
        type:  Number,
        required: true
      },
      net: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    });

    mongoose.model(this.name, schema);
  }
  
  getInstance() {
    this.create();
    return mongoose.model(this.name);
  }

}

export default Invoice;