// npm
const fs = require('fs');

// services
const { crop } = require('../../services');

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
  const imagePath = `./public/uploads/images/${image}`;
  const thumbImagePath = `./public/uploads/images/thumb-${image}`;

  fs.exists(imagePath, function(exists) {
    if(exists) {
      fs.unlink(imagePath, (error) => {
        if (error) {
          res.send({
            type: 'error',
            message: `Something went wrong ${error}`
          });
        }

        fs.exists(thumbImagePath, function(exists) {
          if(exists) {
            fs.unlink(thumbImagePath, (err) => {
              if (err) res.send('Error');

              res.send({
                type: 'success',
                message: 'Image deleted'
              });
            });
          } else {
            res.send({
              type: 'success',
              message: 'Image deleted'
            });
          }
        });
      });
    } else {
      res.send({
        type: 'warning',
        message: 'File not found, so not deleting.'
      });
    }
  })
}

module.exports = {
  uploadImage,
  removeImage
};