import express from 'express';
import {
  InvoiceController
} from '../controllers';

const invoiceRouter = express.Router();

invoiceRouter.get('/invoice', InvoiceController.getAll);
invoiceRouter.post('/invoice', InvoiceController.insert);
invoiceRouter.delete('/invoice/:id', InvoiceController.delete);
invoiceRouter.delete('/invoices', InvoiceController.removeAll);

export default invoiceRouter;
