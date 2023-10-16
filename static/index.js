document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) { // Check if "Enter" was pressed
        event.preventDefault(); // Prevent the default action (like form submission)
        processInput();
    }
});

function processInput() {
    const userInput = document.getElementById("userInput").value;
    appendMessage(userInput, 'user');
    document.getElementById("userInput").value = "";

    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        setTimeout(() => { // Delay the bot's response
            appendMessage(data.result, 'bot');
        }, 1000); // Delay by 1 second
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function appendMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;

    // Append the message and make it visible with a delay
    chatbox.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.opacity = "1";
    }, 50);

    // Scroll to the newest message
    chatbox.scrollTop = chatbox.scrollHeight;
}
