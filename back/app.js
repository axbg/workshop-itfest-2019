const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')
const PORT = require('./config').PORT

//nu cred ca ne mai tb body-parser
  
app.use("/", routes);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT);
})