document.addEventListener("DOMContentLoaded", async function () {
  const userId = localStorage.getItem("userId"); // Get the userId from local storage

  if (!userId) {
    alert("User not logged in");
    window.location.href = "../signin/signin.html"; // Redirect to login page if userId is not found
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/profile/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
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
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
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
