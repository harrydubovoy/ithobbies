const { MODEL } = global.MODULE_PATH;

// models
const CommentModel = require(`${MODEL}/admin/comments.model`);

async function render (req, res) {
  CommentModel.getAll(req)
    .then((comments) => {
      res.json({comments})
    })
    .catch((error) => {
      console.log(error)
    });
}

async function approve (req, res) {
  CommentModel.approve(req)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
    });
}

function remove (req, res) {
  CommentModel.remove(req)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
    });
}

module.exports = {
  render,
  approve,
  remove
};