import * as tmi from "tmi.js";
import Express from "express";
import dotenv from "dotenv";

dotenv.config();

const { WATCHED_CHANNEL, BOT_USERNAME, BOT_USER_ACCESS_TOKEN } = process.env;

if (!WATCHED_CHANNEL) throw new Error("WATCHED_CHANNEL required");
if (!BOT_USERNAME) throw new Error("BOT_USERNAME required");
if (!BOT_USER_ACCESS_TOKEN) throw new Error("BOT_USER_ACCESS_TOKEN required");

const port = process.env.PORT || 4141;

const app = Express();

const client = new tmi.Client({
  channels: [WATCHED_CHANNEL],
  identity: {
    username: BOT_USERNAME,
    password: `oauth:${BOT_USER_ACCESS_TOKEN}`,
  },
});

client.connect();

client.on("message", (channel, tags, message, isSelf) => {
  // Your chatbot logic goes here!
  const senderUser = tags["display-name"];
  const modifiedMessage = message.replace(/r/gi, "rrr");

  if (!isSelf && modifiedMessage !== message) {
    client.say(
      channel,
      `@${senderUser} did you mean: ${modifiedMessage}? Kappa`
    );
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
