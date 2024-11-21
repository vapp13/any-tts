// JavaScript for TikTok TTS integration
document.getElementById('convertBtn').addEventListener('click', async () => {
    const text = document.getElementById('text').value;
    const voice = document.getElementById('voice').value;
    const sessionId = document.getElementById('sessionId').value;

    if (!text || !sessionId) {
        alert('Please enter both text and session ID.');
        return;
    }

    const apiBaseUrl = "https://api16-normal-v6.tiktokv.com/media/api/text/speech/invoke/";
    const userAgent = "com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)";

    try {
        // Prepare the text for the API
        const reqText = text
            .replace(/\+/g, "plus")
            .replace(/\s/g, "+")
            .replace(/&/g, "and")
            .replace(/ä/g, "ae")
            .replace(/ö/g, "oe")
            .replace(/ü/g, "ue")
            .replace(/ß/g, "ss");

        // Send the request to the TikTok API
        const response = await fetch(`${apiBaseUrl}?text_speaker=${voice}&req_text=${reqText}&speaker_map_type=0&aid=1233`, {
            method: 'POST',
            headers: {
                'User-Agent': userAgent,
                'Cookie': `sessionid=${sessionId}`
            }
        });

        const data = await response.json();

        if (data.message !== "success") {
            alert("Error generating speech: " + data.message);
            return;
        }

        // Decode the Base64-encoded audio
        const audioBlob = new Blob([Uint8Array.from(atob(data.data.v_str), c => c.charCodeAt(0))], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Set up the audio player
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = audioUrl;
        audioPlayer.style.display = 'block';

        // Set up the download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = audioUrl;
        downloadLink.style.display = 'block';

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
    }
});
