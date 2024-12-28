const { createClient } = require("redis");
const client = createClient({
  password: "password",
}).connect();
module.exports = client;
