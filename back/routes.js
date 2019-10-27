const controllers = require('./controllers');
const router = require("express").Router();

router.get("/", controllers.root);

module.exports = router;