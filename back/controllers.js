const services = require("./services");
const bodyParser = require("body-parser");
const dialogflow = require("dialogflow");
const uuid = require("uuid");
const axios = require("axios");
const { Client } = require("tplink-smarthome-api");
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
projectId = "test-pcpvuw";

module.exports = {
  root: (req, res) => {
    res.status(200).send(services.root());
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
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
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
