document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/events")
    .then((response) => response.json())
    .then((events) => {
      const eventsContainer = document.querySelector(".events-container"); // Make sure this selector matches your HTML

      events.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event-item");

        eventElement.innerHTML = `
                    <div style="border-radius: 12px; border: 1px solid var(--border);">
                        <div style="padding: 16px;">
                            <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${
                              event.title
                            }</h4>
                            <p style="font-size: 14px; color: var(--foreground-500);">${new Date(
                              event.event_date
                            ).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <img style="object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: 1px solid var(--border);" src="${
                              event.image_url
                            }" width="250" height="200" alt="${event.title}" />
                            <p style="font-size: 14px; color: var(--foreground-500); margin-top: 12px; padding-left: 8px; padding-right: 8px;">
                                Join us for an exciting ${
                                  event.title
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
    })
    .catch((error) => console.error("Error fetching events:", error));
});
