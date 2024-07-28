document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-event-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const challengeName = document.getElementById("challengename").value;
    const challengeDesc = document.getElementById("challengedesc").value;
    const challengeType = document.getElementById("type").value;

    const data = {
      ChallengeName: challengeName,
      ChallengeDesc: challengeDesc,
      ChallengeType: challengeType,
    };

    try {
      const apiKey = "66a61ac72212c709c28e9c1d";
      const url = "https://eventsdatabase-c2d1.restdb.io/rest/challenges";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Challenge added:", result);

      // Optionally, redirect to the challenge list or clear the form
      window.location.href = "adminevent.html"; // Redirect to manage challenges page
    } catch (error) {
      console.error("Failed to add challenge:", error);
    }
  });
});
