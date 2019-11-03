const controllers = require('./controllers');
const router = require("express").Router();

router.get("/", controllers.root);
router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
router.get("/devices", controllers.getDevices);
router.get("/test", controllers.test)

module.exports = router;