// This is to display the Edit form when the Edit button is clicked
const editButton = document.getElementById("edit-goal");
const editForm = document.getElementById("edit-form");
console.log(editButton);
editButton.addEventListener("click", () => {
  editForm.style.display = "block";
  console.log("click");
});

// Delete button DOM 
const deleteButton = document.getElementById("delete-goal");
const deleteForm = document.getElementById("delete-form");
deleteButton.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to delete this goal?");
  if (confirmed) {
    deleteForm.submit();
  }
});
