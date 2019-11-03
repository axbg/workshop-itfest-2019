const controllers = require('./controllers');
const router = require("express").Router();

const loginRequired = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send();
    } else {
        req.token = req.headers.authorization.split(" ")[1];
        next();
    }
}

router.get("/", controllers.root);
router.post("/login", controllers.login);
router.post("/logout", loginRequired, controllers.logout);
router.get("/devices", loginRequired, controllers.getDevices);
router.post("/command", loginRequired, controllers.processCommand)

module.exports = router;