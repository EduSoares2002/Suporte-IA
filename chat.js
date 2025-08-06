document.getElementById('ia-button').onclick = () => {
  document.getElementById('chat-box').classList.toggle('hidden');
};

document.getElementById('close-btn').onclick = () => {
  document.getElementById('chat-box').classList.add('hidden');
};

document.getElementById('send-btn').onclick = async () => {
  const input = document.getElementById('user-input');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage("Você", msg);
  input.value = "";

  // Envia para backend
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  addMessage("IA", data.reply);
};

function addMessage(sender, text) {
  const chat = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.textContent = `${sender}: ${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
