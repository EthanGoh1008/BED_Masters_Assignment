document.addEventListener("DOMContentLoaded", () => {
  fetch("/recipes")
    .then((response) => response.json())
    .then((data) => {
      const recipesList = document.getElementById("recipes-list");
      data.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image_url;
        recipeImage.alt = recipe.title;

        const recipeTitle = document.createElement("h2");
        recipeTitle.textContent = recipe.title;

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);

        recipesList.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
});

function addRecipe() {
  var form = document.getElementById("addrecipeform");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function addRecipeToDB(event) {
  event.preventDefault(); // Prevent the form from submitting in the default way

  // Get the input values
  const recipeTitle = document.getElementById("recipetitle").value;
  const imageUrl = document.getElementById("imageurl").value;

  // Create the data object to send to the server
  const data = {
    title: recipeTitle,
    image_url: imageUrl,
  };

  // Send a POST request to the server
  fetch("/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).finally(() => {
    location.reload(); // Refresh the page after submission
  });
}
