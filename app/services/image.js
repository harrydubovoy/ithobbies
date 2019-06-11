// npm
const fs = require('fs');

function remove(image, res) {
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

function getAll(res) {
  const folder = './public/uploads/images/';
  const regImageFile = /\.(gif|jpg|jpeg|tiff|png)$/i;
  const regImageThumb = /thumb/i;

  fs.readdir(folder, (error, files) => {
    if(error) {
      console.log('error image render', error)
    } else {
      const images = files.filter((file) => regImageFile.test(file) && !file.match(regImageThumb));

      res.json({images})
    }
  });
}

module.exports = {
  getAll,
  remove
};