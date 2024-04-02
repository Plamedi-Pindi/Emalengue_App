// Import config ===================================================================

const index = (req, res) => {
    res.render('site/crowdfunder/index', {
        title: 'eMaLENGUE | Crowdfunder'
    });
}

module.exports = {
    index,
}