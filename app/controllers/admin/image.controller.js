// services
const Image = require('../../services/image.service');

function renderAll(req, res) {
  Image.getAll((response) => {
    res.json(response);
  });
}

function upload (req, res) {
  const { status, message } = Image.upload(req);
  res.status(status).send(message);
}

function removeOne (req, res) {
  Image.removeOne(req, (response) => {
    res.send(response);
  });
}

function removeGroup(req, res) {
  Image.removeGroup(req, (response) => {
    res.status(200).send(response);
  });
}

module.exports = {
  renderAll,
  upload,
  removeOne,
  removeGroup
};