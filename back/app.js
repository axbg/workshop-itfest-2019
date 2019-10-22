const app = require('express')();
const PORT = require('./config').PORT;

app.get("/", (req, res) => {
    res.status(200).json({message: "itfest-x-accenture started"});
})

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT);
})