document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display challenges on page load
  fetchChallenges();

  // Function to fetch and display challenges
  async function fetchChallenges() {
    const apiKey = "66a61ac72212c709c28e9c1d";
    const url = "https://eventsdatabase-c2d1.restdb.io/rest/challenges";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const challenges = await response.json();
      console.log("Fetched challenges:", challenges);

      // Display all challenges
      displayChallenges(challenges);
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    }
  }

  // Function to display challenges in the table
  function displayChallenges(challenges) {
    const challengeTableBody = document.getElementById("challenge-table-body");
    challengeTableBody.innerHTML = "";

    challenges.forEach((challenge) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const descCell = document.createElement("td");
      const typeCell = document.createElement("td");

      nameCell.textContent = challenge.ChallengeName;
      descCell.textContent = challenge.ChallengeDesc;
      typeCell.textContent = challenge.ChallengeType;

      row.appendChild(nameCell);
      row.appendChild(descCell);
      row.appendChild(typeCell);

      challengeTableBody.appendChild(row);
    });
  }
});
