// Toggle Chatbox Visibility
function toggleChat() {
    const chatBox = document.getElementById("chat-box");
    const chatToggle = document.getElementById("chat-toggle");

    if (chatBox.style.display === "block") {
        // Close the chatbox
        chatBox.style.display = "none";
        chatToggle.style.display = "flex"; // Show the chat toggle
    } else {
        // Open the chatbox
        chatBox.style.display = "block";
        chatToggle.style.display = "none"; // Hide the chat toggle
        chatBox.classList.add("fade-in"); // Add fade-in animation
    }
}


// Fetch API for Chatbot Interaction
function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const userMessage = inputField.value;
    if (!userMessage) return;

    // Display user message
    const chatBody = document.getElementById("chat-body");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.textContent = userMessage;
    userMessageDiv.style.textAlign = "right";
    chatBody.appendChild(userMessageDiv);

    // Clear input
    inputField.value = "";

    // Fetch chatbot response
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_KEY", // Replace with your API Key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const botMessage = data.choices[0].message.content;

            // Display bot response
            const botMessageDiv = document.createElement("div");
            botMessageDiv.textContent = botMessage;
            chatBody.appendChild(botMessageDiv);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
