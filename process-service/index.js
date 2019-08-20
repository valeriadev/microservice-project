require("dotenv").config();
require("./db");
const messageHandler = require("./messageHandler");
messageHandler.handleMessages();