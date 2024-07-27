document.addEventListener("DOMContentLoaded", () => {
  fetchEvents();
});

async function fetchEvents() {
  try {
    const response = await fetch("http://localhost:3000/api/event"); // Ensure this URL matches your backend route
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const events = await response.json();
    const eventsContainer = document.querySelector(".events-container");

    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("event-item");

      eventElement.innerHTML = `
        <div style="border-radius: 12px; border: 1px solid var(--border);">
            <div style="padding: 16px;">
                <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${
                  event.event_title
                }</h4>
                <p style="font-size: 14px; color: var(--foreground-500);">${new Date(
                  event.event_date
                ).toLocaleDateString()}</p>
            </div>
            <div>
                <img style="object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: 1px solid var(--border);" src="${
                  event.event_image_url
                }" width="250" height="200" alt="${event.event_title}" />
                <p style="font-size: 14px; color: var(--foreground-500); margin-top: 12px; padding-left: 8px; padding-right: 8px;">
                    Join us for an exciting ${
                      event.event_title
                    } event! Save the date and RSVP now.
                </p>
            </div>
            <div style="text-align: center; padding: 8px;">
                <button style="width: 100%; padding: 8px; font-size: 18px; background-color: var(--button-background); color: var(--button-text); border-radius: 4px; border: none; cursor: pointer;">Like</button>
            </div>
        </div>
      `;
      eventsContainer.appendChild(eventElement);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
