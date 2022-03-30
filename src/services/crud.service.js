const crudService = (model) => ({
    async get(id) {
        return model.findById(id)
    },
    async getOne(query) {
      return model.findOne(query)
    },
    async getAll() {
        return model.find()
    },
    async create(candidate) {
        const object = new model(candidate)
        return object.save()
    },
    async update(id,candidate) {
        return await model.findByIdAndUpdate(id, candidate, {new: true})
    },
    async delete(id) {
        return model.findByIdAndDelete(id)
    },
    async reqByQuery(query) {
      return model.find(query)
    },
})

module.exports = crudService