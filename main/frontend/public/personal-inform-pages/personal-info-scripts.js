document.addEventListener("DOMContentLoaded", async function () {
  const userId = 2013; // Use a fixed user ID for testing

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/profile/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userData = await response.json();

    if (response.ok) {
      document.getElementById("name").value = userData.username || "";
      document.getElementById("email").value = userData.email || "";
      document.getElementById("about-myself").value =
        userData.aboutMyself || "";
      document.getElementById("preferred-event").value =
        userData.preferredEvent || "";
    } else {
      console.error("Failed to fetch user data:", userData.msg);
      alert(userData.msg || "User profile not found");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch user data");
  }

  document
    .getElementById("update-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const aboutMyself = document.getElementById("about-myself").value;
      const preferredEvent = document.getElementById("preferred-event").value;

      try {
        const response = await fetch(
          `http://localhost:3000/api/users/profile/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ aboutMyself, preferredEvent }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Profile updated successfully");
        } else {
          console.error("Failed to update profile:", result.msg);
          alert(result.msg || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to update profile");
      }
    });
});
