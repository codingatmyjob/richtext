// Theme Handling
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme or set default
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(savedTheme);
    toggleButton.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
} else {
    body.classList.add("light-mode");
    toggleButton.textContent = "🌙";
}

// Toggle theme
toggleButton.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️";
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        toggleButton.textContent = "🌙";
        localStorage.setItem("theme", "light-mode");
    }
});

// Input/Output Functionality
const promptInput = document.getElementById("prompt-input");
const outputBox = document.getElementById("output-box");
const placeholderText = document.querySelector(".placeholder-text");
const copyButton = document.getElementById("copy-btn");
const sendButton = document.getElementById("send-btn");

// Function to handle input submission
function handleSubmit() {
    const inputText = promptInput.value.trim();
    if (inputText) {
        // Hide placeholder and show output
        placeholderText.style.display = "none";
        outputBox.innerHTML = inputText;
        
        // Show copy button
        copyButton.style.display = "block";
        outputBox.appendChild(copyButton);
        
        // Clear input
        promptInput.value = "";
    }
}

// Handle Enter key in input
promptInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSubmit();
    }
});

// Handle send button click
sendButton.addEventListener("click", handleSubmit);

// Copy functionality
copyButton.addEventListener("click", () => {
    // Get text content without the copy button
    const outputContent = outputBox.cloneNode(true);
    outputContent.removeChild(outputContent.querySelector(".copy-button"));
    
    navigator.clipboard.writeText(outputContent.textContent).then(() => {
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = "✅ Copied!";
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1500);
    }).catch(() => {
        // Fallback for older browsers
        copyButton.textContent = "❌ Copy failed";
        setTimeout(() => {
            copyButton.textContent = "📋 Copy";
        }, 1500);
    });
});