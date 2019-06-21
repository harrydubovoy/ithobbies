const { MODEL } = global.MODULE_PATH;

const SearchModel = require(`${MODEL}/admin/search.model`);

async function render(req, res) {
  SearchModel.find(req)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  render
};