import {
  Service
} from '../common';

class InvoiceService extends Service {
  constructor (model) {
    super(model);
    this.deleteAll = this.deleteAll.bind(this);
  }

  async deleteAll() {
    try {
      let items = await this.model.remove();
      return {
        error: false,
        status: 200,
        data: items
      }
    } catch (errors) {
      return {
        error: true,
        status: 500,
        errors
      }
    }
  }
}

export default InvoiceService;