const boom = require("boom");
const {blAdapter} = require('../helpers/blacklist')
const {CrudService} = require("../services");

const blacklist = new blAdapter()

const genericCrud = (model) => ({

  async get({ params: { id } }, res) {
    try {
      const item = await CrudService(model).get(id)
      res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll(req, res) {
    try {
      const items = await CrudService(model).getAll()
      res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create({ body }, res) {
    try {
      const item = await CrudService(model).create(body)
      res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async update({ params: { id }, body }, res) {
    try {
      const item = await CrudService(model).update(id,body)
      res.send(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async delete({ params: { id } }, res) {
    try {
      await CrudService(model).delete(id)
      res.status(200).send('OK');
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async queryArgs({query},res) {
    try {
      if(blacklist.queryChecker(query)) return res.send(boom.notAcceptable('Query permission denied',query))
      const items = await CrudService(model).reqByQuery(query);
      res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async bodyArgs({body},res) {
    try {
      if(blacklist.queryChecker(body)) return res.send(boom.notAcceptable('Query permission denied',body))
      const items = await CrudService(model).reqByQuery(body)
      res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async test(req, res) {
    try {
      res.status(200).send({ page: "generic routed test" });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
});

module.exports = genericCrud;
