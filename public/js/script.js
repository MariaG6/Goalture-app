// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2 JS imported successfully!");
});

// Create more steps at the creategoal form
const steps = [];
const stepsForm = document.getElementById("steps-form");
let index = 0
stepsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target); // get the values from the form and pass it as an object
  const fromEntries = Object.fromEntries(formData); // get the object and create key-value pairs
  steps.push(fromEntries); // add to steps
  index++
  drawSteps(fromEntries); 
});

const drawSteps = (fromEntries) => {
  const stepContainer = document.querySelector("#step-container"); 
    const step = fromEntries;
    const stepHtml = generateStepHtml(step,index);
    stepContainer.appendChild(stepHtml);
};

const generateStepHtml = (stepData, index) => {
  console.log(stepData,index)
  const stepLi = document.createElement("li");
  const currentStep = `step${index-1}`
  const currentBlocker = `blockers${index-1}`
  stepLi.innerHTML = `
    <input type="text" name="step${index}" value=" " />
    Do you have any blockers?
    <input type="text" name="blockers${index}" value=" " /><br />
    <label for="isCompleted">Done</label>
    <input type="checkbox" name="isCompleted${index}" ${
    stepData.isCompleted ? "checked" : ""
  } /><br />
  `;
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