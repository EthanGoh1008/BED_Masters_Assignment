document.querySelector(".logout").addEventListener("click", function () {
  alert("Logging out...");
  // Add actual logout functionality here
});

const editButtons = document.querySelectorAll(".edit");
const deleteButtons = document.querySelectorAll(".delete");

editButtons.forEach((button) => {
  button.addEventListener("click", function () {
    alert("Edit functionality not implemented yet.");
    // Add actual edit functionality here
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.remove();
    // Add actual delete functionality here
  });
});
