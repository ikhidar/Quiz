document.querySelector("#gradeBtn").addEventListener("click", gradeQuiz);

let score = 0;

let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
if (isNaN(attempts)) attempts = 0;

document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;

displayQ4Choices();

const q5Slider = document.querySelector("#q5");
const q5Value = document.querySelector("#q5Value");
q5Value.textContent = q5Slider.value;
q5Slider.addEventListener("input", () => {
  q5Value.textContent = q5Slider.value;
});

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function displayQ4Choices() {
  const q4ChoicesDiv = document.querySelector("#q4Choices");
  q4ChoicesDiv.innerHTML = ""; 

  let q4ChoicesArray = ["for", "while", "repeat", "do...while"];
  q4ChoicesArray = shuffleArray(q4ChoicesArray);

  for (let i = 0; i < q4ChoicesArray.length; i++) {
    const choice = q4ChoicesArray[i];
    const id = `q4_${choice.replace(/\W+/g, "")}`; // safe id

    q4ChoicesDiv.innerHTML += `
      <div class="optionItem">
        <input type="radio" name="q4" id="${id}" value="${choice}">
        <label for="${id}">${choice}</label>
      </div>
    `;
  }
}

function isFormValid() {
  let isValid = true;
  const validation = document.querySelector("#validationFdbk");
  validation.textContent = "";
  validation.className = "alert";

  if (document.querySelector("#q1").value.trim() === "") {
    isValid = false;
    validation.textContent = "Missing answer to question 1.";
    validation.classList.add("alertBad");
    return isValid;
  }

  if (document.querySelector("#q2").value === "") {
    isValid = false;
    validation.textContent = "Missing answer to question 2.";
    validation.classList.add("alertBad");
    return isValid;
  }

  const q4Selected = document.querySelector("input[name=q4]:checked");
  if (!q4Selected) {
    isValid = false;
    validation.textContent = "Missing answer to question 4.";
    validation.classList.add("alertBad");
    return isValid;
  }

  return isValid;
}

function rightAnswer(index) {
  const fb = document.querySelector(`#q${index}Feedback`);
  fb.textContent = "Correct!";
  fb.className = "feedback good";

  document.querySelector(`#markImg${index}`).innerHTML =
    "<img src='img/checkmark.png' alt='Correct checkmark'>";

  score += 20;
}

function wrongAnswer(index) {
  const fb = document.querySelector(`#q${index}Feedback`);
  fb.textContent = "Incorrect!";
  fb.className = "feedback bad";

  document.querySelector(`#markImg${index}`).innerHTML =
    "<img src='img/xmark.png' alt='Incorrect X mark'>";
}

function gradeQuiz() {
  score = 0;

  const over80 = document.querySelector("#over80");
  over80.textContent = "";
  over80.className = "alert";

  if (!isFormValid()) return;

  const q1Response = document.querySelector("#q1").value.trim().toLowerCase();
  const q2Response = document.querySelector("#q2").value;
  const q4Response = document.querySelector("input[name=q4]:checked").value;
  const q5Response = parseInt(document.querySelector("#q5").value, 10);

  if (
    q1Response === "cascading style sheets" ||
    q1Response === "cascading stylesheet" ||
    q1Response === "cascading stylesheets"
  ) {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  if (q2Response === "script") rightAnswer(2);
  else wrongAnswer(2);

  const stringChecked = document.querySelector("#String").checked;
  const booleanChecked = document.querySelector("#Boolean").checked;
  const numberChecked = document.querySelector("#Number").checked;
  const arrayChecked = document.querySelector("#Array").checked;

  if (stringChecked && booleanChecked && numberChecked && !arrayChecked) rightAnswer(3);
  else wrongAnswer(3);

  if (q4Response === "repeat") rightAnswer(4);
  else wrongAnswer(4);

  if (q5Response === 8) rightAnswer(5);
  else wrongAnswer(5);

  attempts += 1;
  localStorage.setItem("total_attempts", attempts);

  document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;

  if (score > 80) {
    over80.textContent = "Congratulations! You scored above 80!";
    over80.classList.add("alertGood");
  } else {
    over80.textContent = "Try again! You scored 80 or below.";
    over80.classList.add("alertBad");
  }
}