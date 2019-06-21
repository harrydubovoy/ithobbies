// npm
const fs = require('fs');
const Jimp = require('jimp');

const crop = (photo, type) => {
  Jimp.read(photo.path, (err, image) => {
    if (err) throw new Error;
    image
      .cover(270, 160)
      .write(`${photo.destination}/thumb-${photo.originalname}`)
  })
};

function getAll(cb) {
  const folder = './public/uploads/images/';
  const regImageFile = /\.(gif|jpg|jpeg|tiff|png)$/i;
  const regImageThumb = /thumb/i;

  fs.readdir(folder, (error, files) => {
    if(error) {
      cb({ message: `Something went wrong: ${error}` });
    } else {
      const images = files.filter((file) => regImageFile.test(file) && !file.match(regImageThumb));
      cb({ images });
    }
  });
}

function upload(req) {
  const file = req.file;

  if(file) {
    crop(file, 'medium');
    return {
      message: 'Image uploaded',
      status: 200,
    };
  } else {
    return {
      message: `Something went wrong: ${error}`,
      status: 400
    };
  }
}

function remove(image, cb) {
  const imagePath = `./public/uploads/images/${image}`;
  const thumbImagePath = `./public/uploads/images/thumb-${image}`;

  fs.exists(imagePath, (exists) => {
    if(exists) {
      fs.unlink(imagePath, (error) => {
        if (error) {
          cb({
            type: 'error',
            message: `Something went wrong ${error}`
          });
        }

        fs.exists(thumbImagePath, function(exists) {
          if(exists) {
            fs.unlink(thumbImagePath, (error) => {
              if (error) `Something went wrong ${error}`;

              cb({
                type: 'success',
                message: 'Image deleted'
              })
            })
          } else {
            cb({
              type: 'success',
              message: 'Image deleted'
            });
          }
        });
      });
    } else {
      cb({
        type: 'warning',
        message: 'File not found, so not deleting.'
      });
    }
  })
}

function removeOne(req, cb) {
  const { image } = req.body;
  remove(image, cb);
}

function removeGroup(req, cb) {
  const { images } = req.body;
  const quantity = images.length - 1;

  images.forEach((image, index) => {
    remove(image, (response) => {
      if(quantity === index) {
        cb(response)
      }
    });
  })
}

function uploadEditor(req, cb) {
  fs.readFile(req.file.path, (error) => {
    if(error) {
      const response = {
        "uploaded": 0,
        "fileName": req.file.originalname,
        "error": {
          "message": "Sorry, file couldn\'t be uploaded."
        }
      };
      cb(response);
    } else {
      const response = {
        "location": `/uploads/images/${req.file.originalname}`
      };
      cb(response)
    }
  })
}

module.exports = {
  getAll,
  upload,
  removeOne,
  removeGroup,
  uploadEditor
};