const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const registeredUsers = ["john123", "alice456"]; // Simulate existing users

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/check-username", (req, res) => {
  const { username } = req.body;
  const isAvailable = !registeredUsers.includes(username);
  res.json({ available: isAvailable });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});