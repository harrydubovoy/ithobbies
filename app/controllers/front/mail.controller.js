const Mail = require('../../services/mail.service');

function send (req, res) {
  Mail.send(req, (response) => res.send(response))
}


module.exports = {
  send
};