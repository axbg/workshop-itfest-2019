const services = require("./services");
const uuid = require("uuid");
const projectId = require("./config").projectId;
const KasaControl = require('kasa_control');
const loggedUsers = new Map();

module.exports = {
  root: (req, res) => {
    res.status(200).send(services.root());
  },
  login: async (req, res) => {
    const kasa = new KasaControl();

    try {
      await kasa.login(req.body.email, req.body.password);
    } catch (ex) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    const userToken = uuid.v4();
    loggedUsers.set(userToken, { kasa: kasa, device: 0 });
    res.status(200).send({ token: userToken });
  },
  logout: (req, res) => {
    loggedUsers.delete(req.token);
    res.status(200).send();
  },
  getDevices: async (req, res) => {
    const user = loggedUsers.get(req.token);

    if (!user) {
      return res.status(403).send();
    }

    const devices = await user.kasa.getDevices();
    res.status(200).send({ devices: devices });
  },
  processCommand: async (req, res) => {
    const user = loggedUsers.get(req.token);

    if (!user) {
      return res.status(403).send();
    }

    //dialogResponse should contain both the final message and the extracted params
    const dialogResponse = await services.callDialogflow(projectId, token, req.body.command);

    try {
      await services.controlDevice(user, dialogResponse);
    } catch (ex) {
      return res.status(400).send({ message: "An error occured" });
    }

    res.status(200).send({ message: "Done" });
  }
};
