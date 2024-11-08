// Redirect to the game page with the username stored in sessionStorage
function enterGame() {
  const username = document.getElementById("username").value;
  if (username) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("score", 0); // Initialize score to 0
    window.location.href = "game.html"; // Redirect to the game page
  } else {
    alert("Please enter a username.");
  }
}

// When game.html loads, display the username and score
window.addEventListener("load", () => {
  const userDisplay = document.getElementById("userDisplay");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const username = sessionStorage.getItem("username");
  const score = sessionStorage.getItem("score");

  if (userDisplay) userDisplay.textContent = `Player: ${username}`;
  if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
});

// Function to record an answer and update the score
function recordAnswer(choice) {
  let score = parseInt(sessionStorage.getItem("score"));

  // Example: Increment score if the correct answer is "A"
  if (choice === "A") {
    score += 10;
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }

  sessionStorage.setItem("score", score);
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}
