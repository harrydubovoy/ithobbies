const { MODEL } = global.MODULE_PATH;

// models
const SearchModel = require(`${MODEL}/front/search.model`);

function render(req, res) {
  SearchModel.find(req)
    .then((data) => {
      res.render('front/search', data)
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  render
};