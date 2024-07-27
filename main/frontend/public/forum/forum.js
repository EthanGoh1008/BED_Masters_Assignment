document.addEventListener("DOMContentLoaded", () => {
  fetchForums();

  const modal = document.getElementById("forumModal");
  const btn = document.querySelector(".add-forum");
  const span = document.querySelector(".close");
  const form = document.getElementById("addForumForm");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
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

      form.reset();
      modal.style.display = "none";
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  });
});

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

function addForumToPage(forum) {
  const forumsContainer = document.getElementById("forum-container");

  const forumElement = document.createElement("div");
  forumElement.classList.add("forum-post");

  forumElement.innerHTML = `
      <div class="post-header">
        <span class="post-title">${forum.title}</span>
        <div class="post-actions">
          <button class="edit-post">✎</button>
          <button class="delete-post">🗑</button>
          <button class="view-post">👁</button>
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

  forumsContainer.appendChild(forumElement);
}
