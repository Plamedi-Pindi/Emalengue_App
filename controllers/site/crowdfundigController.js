// Import config ===================================================================

const index = (req, res) => {
    res.render('site/crowdfunder/index', {
        title: 'eMaLENGUE | Crowdfunder'
    });
}

const details = (req, res) => {
    res.render('site/crowdfunder/details/details',{
        title: 'eMaLENGUE | Detalhes'
    })
}
module.exports = {
    index,
    details,
}