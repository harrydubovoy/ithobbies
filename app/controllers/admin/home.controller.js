const { MODEL } = global.MODULE_PATH;

// models
const { PostsModel } = require(`${MODEL}/post.model`);

async function render (req, res) {
  res.render('admin/layout')
}

module.exports = {
  render
};