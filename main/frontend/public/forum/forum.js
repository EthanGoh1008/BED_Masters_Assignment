document.addEventListener("DOMContentLoaded", () => {
  fetchForums();

  const addForumButton = document.querySelector(".add-forum");
  const addForumContainer = document.getElementById("addForumContainer");
  const addForumForm = document.getElementById("addForumForm");

  // Show the form when the "Add Forum" button is clicked
  addForumButton.addEventListener("click", () => {
    addForumContainer.style.display = "block";
  });

  // Handle form submission
  addForumForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(addForumForm);
    const newForum = {
      title: formData.get("title"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForum),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdForum = await response.json();
      addForumToPage(createdForum);

      addForumForm.reset();
      addForumContainer.style.display = "none";
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  });

  // Fetch forums from the server
  async function fetchForums() {
    try {
      const response = await fetch("http://localhost:3000/api/forum");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const forums = await response.json();
      forums.forEach((forum) => {
        addForumToPage(forum);
      });
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  }

  // Add forum to the page
  function addForumToPage(forum) {
    const forumsContainer = document.getElementById("forum-container");

    const forumElement = document.createElement("div");
    forumElement.classList.add("forum-post");
    forumElement.setAttribute("data-id", forum.id); // Add data-id attribute

    forumElement.innerHTML = `
        <div class="post-header">
          <span class="post-title">${forum.title}</span>
          <div class="post-actions">
            <button class="edit-post">✎</button>
            <button class="delete-post">🗑</button>
          </div>
        </div>
        <div class="post-content">
          <img src="${forum.image_url}" alt="${forum.title}" />
          <p>${forum.description}</p>
          <div class="post-interactions">
            <button class="like">👍</button>
            <button class="dislike">👎</button>
            <button class="share">🔗</button>
          </div>
        </div>
      `;

    // Attach event listeners for edit and delete buttons
    forumElement
      .querySelector(".edit-post")
      .addEventListener("click", () => editForum(forum.id));
    forumElement
      .querySelector(".delete-post")
      .addEventListener("click", () => deleteForum(forum.id, forumElement));

    forumsContainer.appendChild(forumElement);
  }

  // Edit forum
  function editForum(forumId) {
    // Display the form with current forum data
    const forumElement = document.querySelector(
      `.forum-post[data-id='${forumId}']`
    );
    const title = forumElement.querySelector(".post-title").innerText;
    const description = forumElement.querySelector(".post-content p").innerText;
    const imageUrl = forumElement.querySelector(".post-content img").src;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("image_url").value = imageUrl;

    addForumContainer.style.display = "block";

    addForumForm.removeEventListener("submit", handleFormSubmit);
    addForumForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(addForumForm);
      const updatedForum = {
        title: formData.get("title"),
        description: formData.get("description"),
        image_url: formData.get("image_url"),
      };

      try {
        const response = await fetch(
          `http://localhost:3000/api/forum/${forumId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedForum),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Update the forum in the DOM
        forumElement.querySelector(".post-title").innerText =
          updatedForum.title;
        forumElement.querySelector(".post-content p").innerText =
          updatedForum.description;
        forumElement.querySelector(".post-content img").src =
          updatedForum.image_url;

        addForumForm.reset();
        addForumContainer.style.display = "none";
      } catch (error) {
        console.error("Error updating forum:", error);
      }
    });
  }

  // Delete forum
  async function deleteForum(forumId, forumElement) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/forum/${forumId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Remove the forum element from the DOM
      forumElement.remove();
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  }

  // Handle form submit for creating a new forum
  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(addForumForm);
    const newForum = {
      title: formData.get("title"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
    };

    createForum(newForum);
  }

  // Create a new forum
  async function createForum(newForum) {
    try {
      const response = await fetch("http://localhost:3000/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForum),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdForum = await response.json();
      addForumToPage(createdForum);

      addForumForm.reset();
      addForumContainer.style.display = "none";
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  }
});
