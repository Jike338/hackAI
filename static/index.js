document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) { // Check if "Enter" was pressed
        event.preventDefault(); // Prevent the default action (like form submission)
        processInput();
    }
});

function appendTableToChat(data, sender) {
    const chatWindow = document.getElementById("chatWindow");
    const messageBox = document.createElement("div");
    messageBox.classList.add(sender);
    
    // Create a table element
    const table = document.createElement("table");
    
    // Iterate over each row of the array
    data.forEach(row => {
        const tableRow = document.createElement("tr");
        
        // Iterate over each cell in the row
        row.forEach(cell => {
            const tableCell = document.createElement("td");
            tableCell.innerText = cell;
            tableRow.appendChild(tableCell);
        });
        
        table.appendChild(tableRow);
    });

    messageBox.appendChild(table);
    chatWindow.appendChild(messageBox);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}

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
        setTimeout(() => { // Delay the bot's second response
            if (Array.isArray(data.result2) && Array.isArray(data.result2[0])) {
                appendTableToChat(data.result2, 'bot');
            } else {
                appendMessage(data.result2, 'bot');
            }
        }, 2000);
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
