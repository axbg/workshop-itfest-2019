const app = require('express')();
const routes = require('./routes');

const PORT = require('./config').PORT;

app.use("/", routes);

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT);
})