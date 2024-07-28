document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    if (response.ok) {
      const events = await response.json();
      const eventTableBody = document.getElementById("event-table-body");

      events.forEach((event, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${event.event_title}</td>
                    <td>${event.description}</td>
                    <td>
                        <button class="edit-event" data-id="${
                          event.event_id
                        }">✎</button>
                        <button class="delete-event" data-id="${
                          event.event_id
                        }">🗑</button>
                    </td>
                `;
        eventTableBody.appendChild(row);
      });
    } else {
      console.error("Failed to fetch events");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
});
