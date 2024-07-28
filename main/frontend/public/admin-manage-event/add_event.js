document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("edit-event-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const eventDetails = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event created:", data);
        window.location.href = "manageevents.html"; // Redirect to manage events page
      } else {
        console.error("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  });
});
