const services = require('./services');

module.exports = {
    root: (req, res) => {
        res.status(200).send(services.root());
    }
}