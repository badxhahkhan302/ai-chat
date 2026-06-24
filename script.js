async function askAI() {
    const q = document.getElementById('question').value;
    const out = document.getElementById('output');
    if (!q.trim()) { out.innerText = '⚠️ Ask something...'; return; }
    out.innerText = '⏳ Thinking... (2-3 sec)';
    
    try {
        // 🔑 Google Gemini API Key
        const API_KEY = "AQ.Ab8RN6IaqTp3D6x3G63D2F6CTLT7loNueJ3OoPqKvXPzyXIqwQ";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: q }]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            out.innerText = '❌ API Error: ' + data.error.message;
            return;
        }
        
        out.innerText = data.candidates[0].content.parts[0].text || '❌ No response';
    } catch(e) {
        out.innerText = '❌ Error: ' + e.message;
    }
}

document.getElementById('question').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') askAI();
});

window.onload = function() {
    document.getElementById('question').focus();
};
