const Image = require('../../services/image.service');

function uploadImage(req, res) {
  Image.uploadEditor(req, (response) => {
    res.json(response);
  });
}

module.exports = {
  uploadImage
};