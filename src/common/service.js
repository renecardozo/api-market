
class Service {

  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query={}) {
    try {
      let items = await this.model.find(query);
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

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          status: 202,
          data: item
        }
      }
    } catch (errors) {
      return {
        error: true,
        status: 500,
        errors
      }
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item) {
        return {
          error: true,
          status: 404,
          errors: ['item not found']
        }
      }
      return {
        error: false,
        status: 202,
        data: item
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

export default Service;