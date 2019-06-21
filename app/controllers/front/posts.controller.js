const { MODEL } = global.MODULE_PATH;
const PostModel = require(`${MODEL}/front/post.model`);


function renderAll (req, res) {
  PostModel.getAll(req)
    .then((data) => {
      res.render('front/home', data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function renderOne (req, res) {
  PostModel.getOne(req)
    .then((data) => {
      data ? res.render('front/article', data) : res.render('front/404');
    })
    .catch((error) => {
      console.log('error', error)
    });
}

function renderCategory (req, res) {
  PostModel.getInCategory(req)
    .then((data) => {
      data ? res.render('front/home', data) : res.render('front/404')
    })
    .catch((error) => {
      console.log('error', error)
    })
}


module.exports = {
  renderAll,
  renderOne,
  renderCategory
};