function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const messageList = document.getElementById("messageList");
    const messageDetail = document.getElementById("messageDetail");

    // Hide detail view by default
    messageDetail.style.display = "none";

    if (messages.length === 0) {
        messageList.innerHTML = "<p style='text-align: center;'>No messages yet.</p>";
        return;
    }

    messageList.innerHTML = ""; // Clear existing messages
    messages.forEach((msg, index) => {
        const messageItem = document.createElement("div");
        messageItem.classList.add("message-item");
        messageItem.innerHTML = `
          <span>${msg.from}</span>
          <p>${msg.text.substring(0, 30)}...</p>
        `;
        messageItem.addEventListener("click", () => showDetail(msg));
        messageList.appendChild(messageItem);
    });
}

function showDetail(msg) {
    const messageDetail = document.getElementById("messageDetail");
    const messageList = document.getElementById("messageList");

    document.getElementById("messageSender").textContent = `From: ${msg.from}`;
    document.getElementById("messageText").textContent = msg.text;

    // Show detail view and hide list
    messageDetail.style.display = "block";
    messageList.style.display = "none";
}

function closeDetail() {
    const messageDetail = document.getElementById("messageDetail");
    const messageList = document.getElementById("messageList");

    // Show list and hide detail view
    messageDetail.style.display = "none";
    messageList.style.display = "block";
}

function clearMessages() {
    if (confirm("Are you sure you want to clear all messages?")) {
        localStorage.setItem("messages", JSON.stringify([]));
        loadMessages();
    }
}

// Load messages on page load
loadMessages();

// Check for new messages periodically
setInterval(() => {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const messageList = document.getElementById("messageList");

    if (messages.length !== messageList.childElementCount) {
        loadMessages();
        alert("You have new messages!");
    }
}, 3000);
