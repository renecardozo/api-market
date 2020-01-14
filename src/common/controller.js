class Controller {
  
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let response = await this.service.getAll(req.query);
    return res.status(response.status).send(response);
  }

  async insert(req, res) {
    let response = await this.service.insert(req.body);
    return res.status(response.status).send(response);
  }

  async delete(req, res) {
    const { id } = req.params;
    let response = await this.service.delete(id);
    return res.status(response.status).send(response);
  }
}

export default Controller;