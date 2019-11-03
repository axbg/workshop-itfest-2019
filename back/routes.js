const controllers = require('./controllers');
const router = require("express").Router();

router.get("/", controllers.root);
router.get("/test", controllers.test)

module.exports = router;