async function fetchRecipes() {
  const response = await fetch("/recipes"); // Replace with your API endpoint
  const data = await response.json();

  const recipeList = document.getElementById("recipes-list");

  data.forEach((recipe) => {
    const recipeItem = document.createElement("div");
    recipeItem.classList.add("recipe"); // Add a CSS class for styling

    // Create elements for title, image_url, etc. and populate with recipe   data
    const titleElement = document.createElement("h2");
    titleElement.textContent = recipe.title;

    const image_urlElement = document.createElement("p");
    image_urlElement.textContent = recipe.image_url;

    // ... add more elements for other recipe data (optional)

    recipeItem.appendChild(titleElement);
    recipeItem.appendChild(image_urlElement);
    // ... append other elements

    recipeList.appendChild(recipeItem);
  });
}

fetchRecipes(); // Call the function to fetch and display book data
