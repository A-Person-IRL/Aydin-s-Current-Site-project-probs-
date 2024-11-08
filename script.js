let round = 1;
let score = 0;
let sequence = [];
let userSequence = [];
let isPlaying = false;

window.addEventListener("load", () => {
  const userDisplay = document.getElementById("userDisplay");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const username = sessionStorage.getItem("username");

  if (userDisplay) userDisplay.textContent = `Player: ${username}`;
  if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;

  startRound();
});

// Start a new round
function startRound() {
  sequence = [];
  userSequence = [];
  isPlaying = false;
  displayMessage(`Round ${round}: Watch the sequence!`);

  // Generate the sequence for the current round
  for (let i = 0; i < round; i++) {
    const randomBox = Math.floor(Math.random() * 4) + 1; // Random box from 1 to 4
    sequence.push(randomBox);
  }

  // Show the sequence to the player
  showSequence();
}

// Display a message to the player
function displayMessage(message) {
  const messageDisplay = document.getElementById("scoreDisplay");
  messageDisplay.textContent = message;
}

// Show the sequence of boxes by hiding them temporarily
function showSequence() {
  let delay = 0;

  sequence.forEach((box, index) => {
    setTimeout(() => {
      toggleBoxVisibility(box, false); // Hide the box
    }, delay);

    setTimeout(() => {
      toggleBoxVisibility(box, true); // Show the box again
      if (index === sequence.length - 1) {
        isPlaying = true; // Allow player to start clicking
        displayMessage("Now, repeat the sequence!");
      }
    }, delay + 1000);

    delay += 1500; // Increase delay for the next box
  });
}

// Toggle the visibility of a box
function toggleBoxVisibility(boxNumber, isVisible) {
  const box = document.querySelector(`.button:nth-child(${boxNumber})`);
  if (box) {
    box.style.opacity = isVisible ? "1" : "0"; // Toggle opacity for visibility
  }
}

// Handle user's box click
function recordAnswer(boxNumber) {
  if (!isPlaying) return; // Ignore clicks if not playing

  userSequence.push(boxNumber);

  // Check if the user clicked the correct box in sequence
  if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
    displayMessage("Incorrect sequence! Game Over.");
    resetGame();
    return;
  }

  // If the user completed the sequence correctly
  if (userSequence.length === sequence.length) {
    score += round * 10; // Increase score
    round++; // Move to the next round
    sessionStorage.setItem("score", score);
    displayMessage("Correct! Next round starting...");

    // Start the next round after a short delay
    setTimeout(startRound, 2000);
  }
}

// Reset the game if the user makes a mistake
function resetGame() {
  round = 1;
  score = 0;
  sequence = [];
  userSequence = [];
  sessionStorage.setItem("score", score);
  displayMessage("Game Over! Starting over...");
  setTimeout(startRound, 2000); // Restart the game after 2 seconds
}
