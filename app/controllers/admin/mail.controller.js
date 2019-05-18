async function render (req, res) {
    res.render('admin/mail', {
      title: 'Dashboard - Mail'
    })
}

module.exports = {
    render
};