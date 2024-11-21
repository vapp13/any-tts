const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
app.use(express.json());

const ENDPOINT = "https://api.tiktok.com/tts";
const MAX_TEXT_LENGTH = 200;

app.post("/generate", async (req, res) => {
  const { text, voice } = req.body;
  const chunks = text.match(new RegExp(`.{1,${MAX_TEXT_LENGTH}}`, "g"));
  const audioBuffers = [];

  for (const chunk of chunks) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: chunk, voice })
    });
    const buffer = await response.buffer();
    audioBuffers.push(buffer);
  }

  const fullAudio = Buffer.concat(audioBuffers);
  fs.writeFileSync("output.mp3", fullAudio);
  res.sendFile(__dirname + "/output.mp3");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
