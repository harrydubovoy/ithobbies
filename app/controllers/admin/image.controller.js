

// services
const { crop } = require('../../services');
const Image = require('../../services/image');

function uploadImage (req, res) {
  const file = req.file;

  if(file) {
    crop(file, 'medium');
    res.send('Image uploaded');
  } else {
    res.status(400).send('Something went wrong');
  }
}

function removeImage (req, res) {
  const { image } = req.body;

  Image.remove(image, res);
}

function removeImageGroup(req, res) {
  const { images } = req.body;

  images.forEach((image) => {
    Image.remove(image, res);
  })
}

function renderAll(req, res) {
  Image.getAll(res);
}

module.exports = {
  renderAll,
  uploadImage,
  removeImage,
  removeImageGroup
};