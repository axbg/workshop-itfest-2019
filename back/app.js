const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')
const PORT = require('./config').PORT
const dialogflow = require('dialogflow')
const uuid = require('uuid')

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
projectId = 'test-pcpvuw'
 
 

app.use("/", routes);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.get("/test", async (req,res) =>{
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: "Test test",
                languageCode: 'en-US'
            }
        }
    }
    const responses = await sessionClient.detectIntent(request);
    console.log('Detect intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    res.status(200).send({messsage: `${result.fulfillmentText} tata merge`});
})
app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT);
})