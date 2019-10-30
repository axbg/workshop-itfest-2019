const controllers = require('./controllers');
const router = require("express").Router();

router.get("/", controllers.root);
router.post("/test", controllers.test)

module.exports = router;