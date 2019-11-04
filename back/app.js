const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = require('./config').PORT

app.use(cors());
app.use(bodyParser.json())

app.use("/", routes);

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT);
})