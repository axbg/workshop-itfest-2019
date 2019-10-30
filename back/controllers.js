const services = require('./services');
const bodyParser = require('body-parser')


module.exports = {
    root: (req, res) => {
        res.status(200).send(services.root());
    },
    test: (req, res) => {
        const question = req.body.qureyResult && req.body.qureyResult.parameters;
        const answer = {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                        simpleResponse = {
                            textToSpeech: question
                        }
                    ]
                }
            }
        }
        return res.json({
            payload: answer,
            fulfillmentText: question,
            question: question,
            displayText: question
        })
   }
}