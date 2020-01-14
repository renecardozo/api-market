import { Controller } from '../common';
import { InvoiceService } from '../services';
import { Invoice } from '../models';
const invoice = new Invoice();
const invoiceService = new InvoiceService(invoice.getInstance());

class InvoiceController extends Controller {

  constructor(service) {
    super(service);
    this.removeAll = this.removeAll.bind(this);
  }

  async removeAll(req, res) {
    let response = await this.service.deleteAll();
    return res.status(response.status).send(response);
  }
}

export default new InvoiceController(invoiceService);
