async function render (req, res) {
    res.render('admin/user', {
        title: 'Dashboard - Settings'
    })
}

async function edit (req, res) {
    res.render('admin/article', {
        title: 'Dashboard - Posts',
    })
}

module.exports = {
    render,
    edit
};