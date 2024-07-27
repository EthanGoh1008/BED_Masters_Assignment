document.addEventListener("DOMContentLoaded", function () {
  fetchCounts();
  displayUsername();

  document.querySelector(".logout").addEventListener("click", function () {
    alert("Logging out...");
    localStorage.clear();
    window.location.href = "../login/loggingopt.html";
  });
});

async function fetchCounts() {
  try {
    const usersResponse = await fetch(
      "http://localhost:3000/api/admin/count-users"
    );
    const usersData = await usersResponse.json();
    document.getElementById(
      "total-users"
    ).textContent = `${usersData.totalUsers} Total Users`;

    const membersResponse = await fetch(
      "http://localhost:3000/api/admin/count-members"
    );
    const membersData = await membersResponse.json();
    document.getElementById(
      "total-members"
    ).textContent = `${membersData.totalMembers} Total Members`;

    const adminsResponse = await fetch(
      "http://localhost:3000/api/admin/count-admins"
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
