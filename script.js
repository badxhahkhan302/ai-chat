async function askAI() {
    const q = document.getElementById('question').value;
    const out = document.getElementById('output');
    if (!q.trim()) { out.innerText = '⚠️ Ask something...'; return; }
    out.innerText = '⏳ Thinking... (2-3 sec)';
    
    try {
        const API_KEY = process.env.GROQ_API_KEY;
        const url = "https://api.groq.com/openai/v1/chat/completions";
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: 'user', content: q }],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        out.innerText = data.choices[0].message.content || '❌ No response';
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