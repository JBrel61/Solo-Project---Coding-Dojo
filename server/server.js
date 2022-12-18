require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(express.static("public"));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/dev.routes')(app);
require('./routes/org.routes')(app);
require('./routes/tech.routes')(app);
require('./routes/profile.routes')(app);
// require('./routes/job.routes')(app);

app.listen(process.env.port, () => console.log(`Listening on port: ${process.env.PORT}`) );


