// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2 JS imported successfully!");
});

// Create more steps at the creategoal form
const steps = [];
const stepsForm = document.getElementById("steps-form");
let index = 0;
stepsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target); // get the values from the form and pass it as an object
  const fromEntries = Object.fromEntries(formData); // get the object and create key-value pairs
  steps.push(fromEntries); // add to steps
  index++;
  drawSteps(fromEntries);
});

const drawSteps = (fromEntries) => {
  const stepContainer = document.querySelector("#step-container");
  const step = fromEntries;
  const stepHtml = generateStepHtml(step, index);
  stepContainer.appendChild(stepHtml);
};

const generateStepHtml = (stepData, index) => {
  console.log(stepData, index);
  const stepLi = document.createElement("li");
  const currentStep = `step${index - 1}`;
  const currentBlocker = `blockers${index - 1}`;
  stepLi.innerHTML = `
    <input type="text"  class="form-control" name="step${index}" value=" " />
    <label class="form-label">Do you have any blockers?</label>
    <input type="text" class="form-control" name="blockers${index}" value=" " />
    <div class="form-check">
    <input type="checkbox" name="isCompleted${index}" ${
    stepData.isCompleted ? "checked" : ""} />
    <label for="isCompleted">Done</label>
     </div>
  `;
  stepLi.className = 'list-group-item'
  console.log(stepLi)
  return stepLi;
};

const addNewStep = () => {
  const newStepData = {
    step: "",
    blockers: "",
    isCompleted: false,
  };
  steps.push(newStepData);
  drawSteps();
};

// Initially draw the steps
drawSteps();

// This is to display the Edit form when the Edit button is clicked
const editButton = document.getElementById("edit-goal");
const editForm = document.getElementById("edit-form");
editButton.addEventListener("click", () => {
  console.log("click");
  editForm.style.display = "block";
});

const deleteButton = document.getElementById("delete-goal");
const deleteForm = document.getElementById("delete-form");
deleteButton.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to delete this goal?");
  if (confirmed) {
    deleteForm.submit();
  }
});
