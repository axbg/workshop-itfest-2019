const dialogflow = require("dialogflow");

const mapColor = (colorName) => {
    switch (colorName) {
        case "red":
            return 0;
        case "yellow":
            return 60;
        case "green":
            return 120;
        case "blue":
            return 240;
        case "violet":
            return 300;
        default:
            return 0;
    }
}

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

        const dialogResult = await sessionClient.detectIntent(request);
        const action = dialogResult[0].queryResult.action;

        if (action === "input.unknown") {
            throw { message: dialogResult[0].queryResult.fulfillmentText };
        }

        const rawParameters = dialogResult[0].queryResult.parameters.fields;
        const parameters = Object.keys(rawParameters).map(parameter => {
            if (rawParameters[parameter].stringValue) {
                return { [parameter]: rawParameters[parameter].stringValue };
            } else if (rawParameters[parameter].numberValue) {
                return { [parameter]: rawParameters[parameter].numberValue };
            }
        }).filter(parameter => parameter !== undefined)
            .reduce((r, c) => Object.assign(r, c));

        return { parameters: parameters, message: dialogResult[0].queryResult.fulfillmentText }
    },
    controlDevice: async (user, parameters) => {
        const kasaRequest = {};

        if (parameters.devices) {
            user.device = parameters.devices - 1;
        }

        if (parameters.state) {
            kasaRequest.on_off = parameters.state === "on" ? 1 : 0;
        }

        if (parameters.brightness) {
            kasaRequest.brightness = parameters.brightness;
        }

        if (parameters.color) {
            kasaRequest.hue = mapColor(parameters.color);
            kasaRequest.saturation = 100;
        }

        const devices = await user.kasa.getDevices();
        await user.kasa.send(devices[user.device].deviceId, {
            'smartlife.iot.smartbulb.lightingservice': {
                'transition_light_state': { ...kasaRequest }
            }
        })
    }
}