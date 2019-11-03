const services = require("./services");
const dialogflow = require("dialogflow");
const uuid = require("uuid");
const axios = require("axios");
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
    if (!req.headers.authorization) {
      return res.status(403).send();
    }

    const token = req.headers.authorization.split(" ")[1];
    loggedUsers.delete(token);
    res.status(200).send();
  },
  getDevices: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).send();
    }

    const token = req.headers.authorization.split(" ")[1];
    const user = loggedUsers.get(token);

    if (!user) {
      return res.status(403).send();
    }

    const devices = await user.kasa.getDevices();
    res.status(200).send({ devices: devices });
  },
  test: async (req, res) => {
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: "Vreau mov!",
          languageCode: "en-US"
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    console.log("Detect intent");
    const result = responses[0].queryResult;
    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);
    //aici pt bec 
    const client = new Client();
    client.startDiscovery().on('device-new', (device) => {
      device.getSysInfo().then(console.log);
      device.setPowerState(true);
    });
    //tb trimis request ul ca sa schimbam lumina 
    console.log(breeds);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    res.status(200).send(services.test());
  }
};
