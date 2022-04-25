const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require("helmet");
const  morgan = require('morgan')
const bodyParser = require('body-parser')
const {notFound} = require('./middlewares/handleErrors')
const {api} = require('./api')
require('dotenv').config()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet());
app.use(bodyParser.json({ type: '*/*' }));

app.use('/api/v1', api)

app.use(notFound)

module.exports= {app}
 

