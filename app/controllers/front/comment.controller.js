const { MODEL } = global.MODULE_PATH;

// models
const CommentModel = require(`${MODEL}/front/comment.model`);

async function add(req, res) {
  CommentModel.save(req)
    .then(() => {
      res.send('ok');
    })
    .catch((error) => {
      res.send('Something went wrong', error);
    });

}

module.exports = {
  add
};