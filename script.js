async function askAI() {
    const q = document.getElementById('question').value;
    const out = document.getElementById('output');
    if (!q.trim()) { out.innerText = '⚠️ Ask something...'; return; }
    out.innerText = '⏳ Loading... (30-50 sec)';
    try {
        const url = `https://klyphic.onrender.com/chat?q=${encodeURIComponent(q)}&model=gpt-3.5-turbo`;
        const res = await fetch(url);
        const data = await res.text();
        out.innerText = data || '❌ No response';
    } catch(e) { out.innerText = '❌ Error. Try again.'; }
}
document.getElementById('question').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') askAI();
});
window.onload = function() { document.getElementById('question').focus(); };