const dialogflow = require("dialogflow");

module.exports = {
    root: () => {
        return { message: "itfest-x-accenture" };
    },
    callDialogflow: async (projectId, sessionId, command) => {
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: command,
                    languageCode: "en-US"
                }
            }
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        console.log(`Query: ${result.queryText}`);
        console.log(`Response: ${result.fulfillmentText}`);

        return result.fulfillmentText;
    },
    controlDevice: async (user, dialogResult) => {
        //process dialogResponse params
        const devices = await user.kasa.getDevices();
        await user.kasa.power(devices[user.device].deviceId, true);
    }
}