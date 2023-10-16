function processInput() {
    const userInput = document.getElementById("userInput").value;
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").textContent = data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
