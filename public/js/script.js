// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Goalture imported successfully!");
});

// Create more steps at the creategoal form
const steps = [];
const stepsForm = document.getElementById("steps-form");
let index = 0;
let stepsButton = document.getElementById("new-step");
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
  const stepLi = document.createElement("li");
  const currentStep = `step${index - 1}`;
  const currentBlocker = `blockers${index - 1}`;
  stepLi.innerHTML = `
     <label class="form-label bg-transparent">Step:</label>
            <input type="text" name="step${index}" class="form-control" value=" "  />
            <label class="form-label bg-transparent">Do you have any blockers?</label>
            <input type="text" class="form-control" name="blockers${index}" value=" " />
            <div class="form-check bg-transparent">
              <input
                type="checkbox"
                class="form-check-input"
                name="isCompleted${index}" ${
    stepData.isCompleted ? "checked" : ""
  }
              />
              <label for="isCompleted" class="form-check-label bg-transparent">Done</label>
            </div>
  `;
  stepLi.className = "list-group-item";
  if (steps.length >= 3) {
    stepsButton.disabled = true;
  }
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
