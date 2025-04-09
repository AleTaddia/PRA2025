import { useState } from 'react';

export default function ChatbotVerniciatura() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isNamed, setIsNamed] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: username, text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { sender: 'Bot Verniciatura', text: botResponse }]);
    }, 500);
  };

  const getBotResponse = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes('ciao')) return `Ciao ${username}! Come posso aiutarti con la verniciatura a polvere?`;
    if (msg.includes('preventivo')) return 'Certo! Dimmi tipo di materiale, dimensioni e colore RAL.';
    if (msg.includes('grazie')) return 'Prego! Se hai bisogno di altro sono qui.';
    return 'Grazie per il messaggio! Un operatore ti risponderà a breve.';
  };

  const handleNameSubmit = () => {
    if (username.trim()) setIsNamed(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-xl">
      {!isNamed ? (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Benvenuto nella chat!</h2>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Inserisci il tuo nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleNameSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Inizia Chat
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="h-80 overflow-y-scroll border p-2 rounded bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-xl max-w-[70%] mb-2 ${
                  msg.sender === 'Bot Verniciatura' ? 'bg-green-100 self-start' : 'bg-blue-100 self-end'
                }`}
              >
                <div className="text-xs text-gray-600 font-semibold">{msg.sender}</div>
                <div>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded p-2"
              placeholder="Scrivi un messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
              Invia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
