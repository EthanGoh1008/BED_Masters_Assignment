document
  .getElementById("profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Example of simple form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const about = document.getElementById("about").value;

    if (!name || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Form submitted successfully!");
    // You can add your form submission logic here
  });
