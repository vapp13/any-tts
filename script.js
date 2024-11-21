document.getElementById("generateButton").addEventListener("click", async () => {
  const text = document.getElementById("textInput").value;
  const voice = document.getElementById("voiceSelect").value;
  
  if (!text.trim()) {
    alert("Please enter some text.");
    return;
  }

  try {
    const response = await fetch('https://api.tiktok.com/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice })
    });

    const data = await response.blob();
    const audioPlayer = document.getElementById("audioPlayer");
    const audioURL = URL.createObjectURL(data);
    audioPlayer.src = audioURL;

    document.getElementById("downloadButton").onclick = () => {
      const a = document.createElement("a");
      a.href = audioURL;
      a.download = "output.mp3";
      a.click();
    };
  } catch (error) {
    console.error("Error generating audio:", error);
    alert("There was an error generating the audio.");
  }
});
