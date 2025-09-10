// --- Theme Handling ---
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  toggleButton.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
} else {
  body.classList.add("light-mode");
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

// --- Pane Resizing ---
const divider = document.getElementById("divider");
const leftPane = document.querySelector(".left-pane");
const rightPane = document.querySelector(".right-pane");
const splitView = document.getElementById("split-view");

let isResizing = false;

// Load saved pane width
const savedWidth = localStorage.getItem("leftPaneWidth");
if (savedWidth) {
  leftPane.style.width = savedWidth;
}

// Start dragging
divider.addEventListener("mousedown", () => {
  isResizing = true;
  document.body.style.cursor = "col-resize";
});

// Dragging
document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const containerRect = splitView.getBoundingClientRect();
  const offset = e.clientX - containerRect.left;
  const percentage = (offset / containerRect.width) * 100;

  // Limit min/max width
  if (percentage > 10 && percentage < 90) {
    leftPane.style.width = `${percentage}%`;
  }
});

// Stop dragging
document.addEventListener("mouseup", () => {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = "default";
    localStorage.setItem("leftPaneWidth", leftPane.style.width);
  }
});
