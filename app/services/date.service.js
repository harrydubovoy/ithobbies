const moment = require('moment');

const formatedDate = date => {
  return moment(date).format('DD/MM/YY')
};

module.exports = {
  formatedDate
};