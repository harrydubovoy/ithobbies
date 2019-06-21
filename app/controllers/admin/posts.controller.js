const { MODEL } = global.MODULE_PATH;

const PostModel = require(`${MODEL}/admin/post.model`);
const CategoriesModel = require(`${MODEL}/admin/categories.model`);


async function renderAll (req, res) {
  PostModel.getAll()
    .then((posts) => res.json(posts))
    .catch((error) => console.log(error));
}

async function renderCreate (req, res) {
  CategoriesModel.getAll(req)
    .then((categories) => res.json({categories}))
    .catch((error) => res.status(400).send(error))
}

async function create (req, res) {
  PostModel.create(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

async function renderEdit (req, res) {
  PostModel.getEdit(req)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error));
}

async function edit (req, res) {
  PostModel.setEdit(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

async function remove (req, res) {
  PostModel.remove(req)
    .then((data) => res.send(data))
    .catch((error) => res.status(400).send(error));
}

async function renderWithNewComments (req, res) {
  PostModel.getWithNewComments()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  renderAll,
  renderCreate,
  renderEdit,
  create,
  edit,
  remove,
  renderWithNewComments
};