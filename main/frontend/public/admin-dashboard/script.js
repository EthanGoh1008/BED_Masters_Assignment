document.addEventListener("DOMContentLoaded", function () {
  fetchCounts();
  displayUsername();
  displayAdminAdditionalDetails();
  fetchEventCount();
  fetchForumCount();

  document.querySelector(".logout").addEventListener("click", function () {
    alert("Logging out...");
    localStorage.clear();
    window.location.href = "../login/loggingopt.html";
  });
});

async function fetchCounts() {
  try {
    const usersResponse = await fetch(
      "http://localhost:3000/api/admin/count-users",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const usersData = await usersResponse.json();
    document.getElementById(
      "total-users"
    ).textContent = `${usersData.totalUsers} Total Users`;

    const membersResponse = await fetch(
      "http://localhost:3000/api/admin/count-members",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const membersData = await membersResponse.json();
    document.getElementById(
      "total-members"
    ).textContent = `${membersData.totalMembers} Total Members`;

    const adminsResponse = await fetch(
      "http://localhost:3000/api/admin/count-admins",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const adminsData = await adminsResponse.json();
    document.getElementById(
      "total-admins"
    ).textContent = `${adminsData.totalAdmins} Admin`;
  } catch (error) {
    console.error("Error fetching counts:", error);
    document.getElementById("total-users").textContent =
      "Error loading total users";
    document.getElementById("total-members").textContent =
      "Error loading total members";
    document.getElementById("total-admins").textContent =
      "Error loading total admins";
  }
}

async function fetchEventCount() {
  try {
    const eventsResponse = await fetch(
      "http://localhost:3000/api/admin/count-events"
    );
    const eventsData = await eventsResponse.json();
    document.getElementById(
      "total-events"
    ).textContent = `${eventsData.totalEvents} Total Events`;
  } catch (error) {
    console.error("Error fetching event count:", error);
    document.getElementById("total-events").textContent =
      "Error loading total events";
  }
}

async function fetchForumCount() {
  try {
    const forumResponse = await fetch(
      "http://localhost:3000/api/admin/count-forum"
    );
    const forumData = await forumResponse.json();
    document.getElementById(
      "total-forum"
    ).textContent = `${forumData.totalForum} Total Forum Posts`;
  } catch (error) {
    console.error("Error fetching forum count:", error);
    document.getElementById("total-forum").textContent =
      "Error loading total forum posts";
  }
}

function displayUsername() {
  const username = localStorage.getItem("username");
  console.log("Retrieved username:", username);
  if (username) {
    document.querySelector(".user-info span").textContent = username;
    document.getElementById("username-display").textContent = username;
  } else {
    document.querySelector(".user-info span").textContent = "No user";
    document.getElementById("username-display").textContent = "No user";
  }
}

async function displayAdminAdditionalDetails() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID is not available in local storage.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/admin-details/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching admin details: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Admin details fetched:", data);

    // Update the DOM elements with the fetched data
    document.getElementById("age").textContent = `Age: ${data.age}`;
    document.getElementById("about").textContent = `About: ${data.about}`;
    document.getElementById(
      "years-of-experience"
    ).textContent = `Years of Experience: ${data.yearsOfExperience}`;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    document.getElementById("age").textContent = "Age: N/A";
    document.getElementById("about").textContent = "About: N/A";
    document.getElementById("years-of-experience").textContent =
      "Years of Experience: N/A";
  }
}

async function updateAdminDetails() {
  const userId = localStorage.getItem("userId");
  const age = document.getElementById("edit-age").value;
  const about = document.getElementById("edit-about").value;
  const yearsOfExperience = document.getElementById("edit-experience").value;

  const updatedDetails = { age, about, yearsOfExperience };

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/admin-details/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedDetails),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update admin details");
    }

    const result = await response.json();
    alert(result.msg);
    displayAdminAdditionalDetails();
  } catch (error) {
    console.error("Error updating admin details:", error);
    alert("Error updating admin details");
  }
}
