# Accenture's Workshop@ITFest 2019
#### The POC developed for Accenture's workshop held at ITFest 2019
##### The app provides a vocal interface used to control TPLink's Smart Bulbs
#
* Back-end
    * Node.js
    * Express
    * [Dialogflow](https://github.com/googleapis/nodejs-dialogflow)
    * [Kasa Control](https://github.com/konsumer/kasa_control)
* Front-end
    * Vue.js
    * Vue Material
    * WebSpeech API

##### How to deploy
* install [Node.js]()
* git clone https://github.com/axbg/workshop-itfest-2019
* download your GCP credentials.json and add its path as an environment variable
    * Back-End
        * cd workshop-itfest-2019/back
        * npm install
        * npm start
        * import api-sample.json in Postman
        * call /login endpoint using valid kasa credentials
        * import the obtained token in the Postman collection as Bearer Token authentication
    * Front-end
        * cd workshop-itfest-2019/front 
        * install [vue-cli](https://www.npmjs.com/package/@vue/cli)
        * npm install 
        * npm run serve or vue serve
