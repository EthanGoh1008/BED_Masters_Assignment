document.addEventListener("DOMContentLoaded", () => {
  fetchEvents();

  async function fetchEvents() {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const events = await response.json();
      events.forEach((event) => {
        addEventToPage(event);
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function addEventToPage(event) {
    const eventsContainer = document.querySelector(".events-container");

    const eventElement = document.createElement("div");
    eventElement.classList.add("event-card");

    eventElement.innerHTML = `
      <div class="event-header">
        <h4>${event.event_title}</h4>
        <p>${new Date(event.event_date).toLocaleDateString()}</p>
      </div>
      <div class="event-body">
        <img src="${event.event_image_url}" alt="${event.event_title}" />
        <p>${event.description || "No description available"}</p>
      </div>
      <div class="event-footer">
        <button class="like-button">Like</button>
      </div>
    `;

    eventsContainer.appendChild(eventElement);
  }
});
