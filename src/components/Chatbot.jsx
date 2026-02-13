import { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! I am your Veridion assistant. How can I help you today?', isFAQ: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const faqs = [
        { q: 'How do I change my avatar?', a: 'Go to Settings > Profile Details and pick one of the 8 available options!' },
        { q: 'How do I add items to cart?', a: 'Click on "Browse Items" in the sidebar, then click the "Add to Cart" button on any product.' },
        { q: 'Where are my settings?', a: 'Click your profile icon in the top right corner to find the Settings link.' },
        { q: 'Is there a dark mode?', a: 'Yes! Use the crescent moon/sun icon in the top navigation bar to toggle themes.' }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        const newUserMsg = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        // Enhanced bot response logic
        setTimeout(() => {
            const inputLower = text.toLowerCase().trim();
            let responseText = "";

            if (inputLower.includes("hi") || inputLower.includes("hello") || inputLower.includes("hey")) {
                responseText = "Hello there! 👋 I'm your Veridion AI. How can I assist you today?";
            } else if (inputLower.includes("thank")) {
                responseText = "You're very welcome! Feel free to ask more questions anytime.";
            } else if (inputLower.includes("bye") || inputLower.includes("goodbye")) {
                responseText = "Goodbye! Have a great day with Veridion! 😊";
            } else if (inputLower.includes("who") || inputLower.includes("what")) {
                responseText = "I'm the Veridion support assistant, here to provide quick help and answer your FAQs!";
            } else {
                responseText = "I'm still learning, but check out the FAQs above! They cover most navigation and feature questions. Anything else?";
            }

            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                text: responseText
            };
            setMessages(prev => [...prev, botResponse]);
        }, 800);
    };

    const handleFAQClick = (faq) => {
        const newUserMsg = { id: Date.now(), type: 'user', text: faq.q };
        setMessages(prev => [...prev, newUserMsg]);

        setTimeout(() => {
            const botResponse = { id: Date.now() + 1, type: 'bot', text: faq.a };
            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-status"></div>
                        <h3>Support assistant</h3>
                    </div>

                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                {msg.text}
                                {msg.isFAQ && (
                                    <div className="faq-list">
                                        {faqs.map((faq, index) => (
                                            <button
                                                key={index}
                                                className="faq-btn"
                                                onClick={() => handleFAQClick(faq)}
                                            >
                                                {faq.q}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="send-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <button
                className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chatbot"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="11" r="1"></circle>
                        <circle cx="9" cy="11" r="1"></circle>
                        <circle cx="15" cy="11" r="1"></circle>
                    </svg>
                )}
            </button>
        </div>
    );
}

export default Chatbot;
