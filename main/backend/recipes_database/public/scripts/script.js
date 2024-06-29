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
