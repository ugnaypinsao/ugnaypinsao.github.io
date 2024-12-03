function sendMessage() {
    const message = document.getElementById("userMessage").value;

    if (!message) {
        alert("Message cannot be empty.");
        return;
    }

    // Save the message to localStorage (simulate backend storage)
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({ from: "User", text: message });
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Your message has been sent!");
    document.getElementById("userMessage").value = "";

    // Simulate notifying admin
    localStorage.setItem("adminNotification", "true");
}
