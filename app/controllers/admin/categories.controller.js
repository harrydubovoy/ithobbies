const { MODEL } = global.MODULE_PATH;

const CategoriesModel = require(`${MODEL}/admin/categories.model`);


function renderAll (req, res) {
  CategoriesModel.getAll(req)
    .then((categories) => res.json(categories))
    .catch((error) => res.status(400).send(error))
}

function create (req, res) {
  CategoriesModel.save(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

async function edit (req, res) {
  CategoriesModel.update(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

async function remove (req, res) {
  CategoriesModel.remove(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  renderAll,
  create,
  edit,
  remove
};