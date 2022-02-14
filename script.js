// Page elements and other consts

const buttonEl = document.querySelector(".add");
const tutorialBtnEl = document.querySelector(".tutorial");
const inputEl = document.querySelector(".input");
const textAreaEl = document.querySelector(".textarea");
const createListBtn = document.querySelector(".create-list");
const listEl = document.querySelector(".goals-list");
const clearAchBtnEl = document.querySelector(".remove-completed");
const clearAllBtnEl = document.querySelector(".clear-list");
const exitModalFourBtn = document.getElementById("fourth");
const cancelClearListHiddenBtn = document.getElementById("fifth");
const modalTitleEl = document.querySelector(".modal-rock");
const modalBodyEl = document.querySelector(".modal-msg");

const closeTutBtnEl = document.querySelector(".close-tutorial");
const leftArrowEl = document.querySelector(".fa-circle-chevron-left");
const rightArrowEl = document.querySelector(".fa-circle-chevron-right");
const carouselArrowEl = document.querySelectorAll(".tut-icon");
const slideBtns = document.querySelectorAll(".slide-btn");

let stopClock = false;
let stopwatchReset = true;
let startCountdown = false;
let swSec = 0;
let swMin = 0;
let swH = 0;

const hoursEl = document.querySelector(".hours");
const minsEl = document.querySelector(".mins");
const secsEl = document.querySelector(".secs");
const daytimeEl = document.querySelector(".daytime");
const dow = document.querySelectorAll(".day");

const monthEl = document.querySelector(".month");
const dateEl = document.querySelector(".domo");

const alarmEl = document.querySelector(".icon-alarm");
const startTimerEl = document.querySelector(".start-timer");

const setCountdownHoursEl = document.querySelector(".set-h");
const setCountdownMinutesEl = document.querySelector(".set-min");
const setCountdownSecondsEl = document.querySelector(".set-sec");

// console.log(dow);
// ***********************************************

// Text for dynamic modals

const modalRock = [
  "Are you sure?",
  "You rock!",
  "You're not there yet!",
  "Every goal deserves a nice title :(",
  "What will it be?",
  "It's empty, Jim!",
  "Time's up!",
];
const modalMsg = [
  "You're about to give up on your goals and be lazy. Give it another go...?",
  "You managed to achieve every single goal! Eat a cookie and be proud! And while you're at it, why not set up new goals?",
  "You still have some work to do. Get the job done and then clear it from your list.",
  "So why don't you come up with nifty title for your up and coming challenge?",
  "Choose a countdown to challenge yourself or a timer to see how long it takes you. Or just leave it like that and watch the time pass by.",
  "So why don't you come up with nifty titles for your up and coming challenges?",
  "While every word is like an unnecessary stain on silence and nothingness, they're pretty much mandatory for a list of goals.",
  "Did you manage it? If not, don't dispair. Just give it another go!",
];

// ***********************************************

// const modalTutorial = ;
// const modalTasks= ;
// const modalTimer = ;

// ADD GOAL button

function addGoal() {
  const enteredValue = inputEl.value.toLowerCase();
  const listItemEl = document.createElement("li");
  listItemEl.textContent = enteredValue;
  if (
    listItemEl.textContent === "" ||
    listItemEl.textContent.trim().length < 1
  ) {
    addModal(modalRock[3], modalMsg[3]);
  } else {
    listEl.appendChild(listItemEl);
    listEl.style.textTransform = "capitalize";
  }
  inputEl.value = "";

  listItemsStyling(listItemEl, enteredValue);

  // listItemEl.innerHTML =
  //   '<span><i class="fas fa-hourglass-half fa-1x icons-unfinished"></i></span>' +
  //   enteredValue;
  // listItemEl.style.backgroundColor = "rgb(158, 3, 3, 0.2)";

  // listItemEl.addEventListener("click", () => {
  //   listItemEl.innerHTML =
  //     '<span><i class="fa-solid fa-check fa-1x icons-finished"></i></span>' +
  //     enteredValue;
  //   listItemEl.style.removeProperty("backgroundImage");
  //   listItemEl.style.backgroundColor = "rgba(5, 121, 11, 0.2)";
  //   listItemEl.style.pointerEvents = "none";
  // });
}

// ***********************************************

// Minor style adjustments function for goals in goals list

function listItemsStyling(element, value) {
  element.innerHTML =
    '<span><i class="fas fa-hourglass-half fa-1x icons-unfinished"></i></span>' +
    value;
  element.style.backgroundColor = "rgb(158, 3, 3, 0.2)";

  element.addEventListener("click", () => {
    element.innerHTML =
      '<span><i class="fa-solid fa-check fa-1x icons-finished"></i></span>' +
      value;
    element.style.removeProperty("backgroundImage");
    element.style.backgroundColor = "rgba(5, 121, 11, 0.2)";
    element.style.pointerEvents = "none";
  });
}

// ***********************************************

// CLEAR LIST button

function clearList() {
  if (listEl.innerHTML.length < 1) {
    addModal(modalRock[5], modalMsg[6]);
  } else {
    cancelClearListHiddenBtn.classList.remove("hidden");
    addModal(modalRock[0], modalMsg[0]);
    cancelClearListHiddenBtn.addEventListener("click", () => {
      while (listEl.firstChild) {
        listEl.removeChild(listEl.firstChild);
      }
      closeModal();
      // TO FIX EVENTUALLY - will not hide btn if user exits modal without clearing list;
      // cancelClearListHiddenBtn.classList.add("hidden");
    });
  }
}

// ***********************************************

// MODAL POP-UP toggles

function addModal(a, b) {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".main-section").classList.add("blur-active");
  modalTitleEl.textContent = a;
  modalBodyEl.textContent = b;
}

function closeModal() {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".main-section").classList.remove("blur-active");
  // Prevents hidden modal btn from showing up on other modal panels than the one intended
  if (!cancelClearListHiddenBtn.classList.contains("hidden")) {
    cancelClearListHiddenBtn.classList.add("hidden");
  }
}

// ***********************************************

// CLEARED ACHIEVED button

function clearAchievedGoals() {
  const completedGoals = Array.from(document.querySelectorAll("li"));
  let modalCounter = completedGoals.length;
  for (i = 0; i < completedGoals.length; i++) {
    if (completedGoals[i].style.backgroundColor === "rgba(5, 121, 11, 0.2)") {
      modalCounter--;
      completedGoals[i].remove();
      if (modalCounter == 0) {
        addModal(modalRock[1], modalMsg[1]);
      }
    } else {
      addModal(modalRock[2], modalMsg[2]);
    }
  }
}

// ***********************************************

// CREATE LIST button

function createGoalsList() {
  if (textAreaEl.value.length < 1) {
    addModal(modalRock[3], modalMsg[5]);
  }
  const bulkGoalsEl = textAreaEl.value.toLowerCase();
  const goalsList = bulkGoalsEl.split(",");
  for (i = 0; i < goalsList.length; i++) {
    if (goalsList[i] === "" || goalsList[i].trim().length < 1) {
      continue;
    }
    goalsList[i] = goalsList[i].trim();
    console.log(goalsList[i]);
    const listEntryEl = document.createElement("li");
    listEntryEl.textContent = goalsList[i];
    listItemsStyling(listEntryEl, goalsList[i]);
    listEl.appendChild(listEntryEl);
    listEl.style.textTransform = "capitalize";
  }
  textAreaEl.value = "";
}

// ***********************************************

// UPDATE DAY/DATE on page load

function dayAndDate() {
  const day = new Date().getDay();
  dow[day].classList.add("current");
  monthEl.textContent = (new Date().getMonth() + 1).toString();
  dateEl.textContent = new Date().getDate().toString();
}

// ***********************************************

// WORKING CLOCK

function clock() {
  if (!stopClock) {
    const dayZ = new Date();
    const hours = dayZ.getHours();
    const minutes = dayZ.getMinutes();
    const seconds = dayZ.getSeconds();

    // hoursEl.textContent = `${~~(hours / 10)}` + `${hours % 10}`;
    // console.log(hoursEl.textContent);

    if (hours > 12) {
      hoursPM = hours - 12;
      if (hoursPM < 10) {
        hoursEl.textContent = "0" + hoursPM.toString();
      } else {
        hoursEl.textContent = hoursPM.toString();
      }
      daytimeEl.textContent = "PM";
    } else {
      if (hours < 10) {
        hoursEl.textContent = "0" + hours.toString();
      } else {
        hoursEl.textContent = hours.toString();
      }
      daytimeEl.textContent = "AM";
    }

    if (minutes < 10) {
      minsEl.textContent = "0" + minutes.toString();
    } else {
      minsEl.textContent = minutes.toString();
    }

    if (seconds < 10) {
      secsEl.textContent = "0" + seconds.toString();
    } else {
      secsEl.textContent = seconds.toString();
    }

    setTimeout(clock, 1000);
  }
}

// setInterval(clock, 1000);

// ***********************************************

// TUTORIAL MODAL

function tutorialCarousel() {
  let slidesCounter = 1;
  const image = document.querySelector(".active-image");
  const slideBtnsEl = Array.from(slideBtns);
  // console.log(slideBtnsEl);
  image.src = `tutimg/t${slidesCounter}.jpg`;
  document.querySelector(".modal-tutorial").classList.remove("hidden");
  document.querySelector(".main-section").classList.add("blur-active");

  closeTutBtnEl.addEventListener("click", () => {
    document.querySelector(".modal-tutorial").classList.add("hidden");
    document.querySelector(".main-section").classList.remove("blur-active");
    slidesCounter = 1;
    document
      .querySelectorAll(".progress-btns .slide-btn")
      .forEach((el) => el.classList.remove("slide-btn-active"));
  });

  slideBtnsEl[slidesCounter - 1].classList.add("slide-btn-active");
  carouselArrowEl.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (arrow.classList.contains("fa-circle-chevron-left")) {
        slideBtnsEl[slidesCounter - 1].classList.remove("slide-btn-active");
        slidesCounter--;
        if (slidesCounter === 0) slidesCounter = 7;
        image.src = `tutimg/t${slidesCounter}.jpg`;
        slideBtnsEl[slidesCounter - 1].classList.add("slide-btn-active");
      } else {
        slideBtnsEl[slidesCounter - 1].classList.remove("slide-btn-active");
        slidesCounter++;
        if (slidesCounter === 8) slidesCounter = 1;
        image.src = `tutimg/t${slidesCounter}.jpg`;
        slideBtnsEl[slidesCounter - 1].classList.add("slide-btn-active");
      }
    });

    slideBtnsEl.forEach((btn) => {
      const click = slideBtnsEl.indexOf(btn);
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".progress-btns .slide-btn")
          .forEach((el) => el.classList.remove("slide-btn-active"));

        image.src = `tutimg/t${click + 1}.jpg`;
        slideBtnsEl[click].classList.add("slide-btn-active");
      });
    });
  });

  // leftArrowEl.addEventListener("click", () => {
  //   slidesCounter--;

  //   image.src = `tutimg/t${slidesCounter}.jpg`;
  // });

  // rightArrowEl.addEventListener("click", () => {
  //   slidesCounter++;

  //   image.src = `tutimg/t${slidesCounter}.jpg`;
  // });
}

// ***********************************************

// WATCH SETTINGS MODAL

function watchSettingsModal() {
  let resume = 0;
  document.querySelector(".timer-settings").classList.remove("hidden");
  document.querySelector(".main-section").classList.add("blur-active");

  document
    .querySelector(".close-timer-settings")
    .addEventListener("click", () => {
      document.querySelector(".timer-settings").classList.add("hidden");
      document.querySelector(".main-section").classList.remove("blur-active");
      document.querySelector(".set-countdown").classList.add("hidden");
      document
        .querySelector(".stopwatch-input-container")
        .classList.add("hidden");
      setCountdownHoursEl.value = "";
      setCountdownMinutesEl.value = "";
      setCountdownSecondsEl.value = "";
    });

  document.querySelector(".btn-countdown").addEventListener("click", () => {
    document.querySelector(".set-countdown").classList.remove("hidden");
  });

  document.querySelector(".btn-stopwatch").addEventListener("click", () => {
    document.querySelector(".set-countdown").classList.add("hidden");
  });

  const stopwatchBtnEl = document.querySelector(".btn-stopwatch");
  stopwatchBtnEl.addEventListener("click", () => {
    stopClock = true;
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
    daytimeEl.innerHTML =
      '<button class="btn btn-stopwatch btn-end">Clear</button> <button class="btn btn-stopwatch btn-start">Start</button>';
    daytimeEl.classList.add("flex-column");
    document.querySelector(".timer-settings").classList.add("hidden");
    document.querySelector(".main-section").classList.remove("blur-active");

    let clickCounter = 0;

    document.querySelector(".btn-start").addEventListener("click", () => {
      clickCounter++;
      if (clickCounter % 2 == 1) {
        document.querySelector(".btn-start").style.backgroundColor =
          "var(--mainbtnbgcol)";
        document.querySelector(".btn-start").textContent = "Stop";
        stopwatchReset = false;
      }

      if (clickCounter % 2 == 0) {
        document.querySelector(".btn-start").style.backgroundColor =
          "var(--okbtncol)";
        document.querySelector(".btn-start").textContent = "Start";
        stopwatchReset = true;
        swSec = 0;
        swMin = 0;
        swH = 0;
      }
    });
    document.querySelector(".btn-end").addEventListener("click", () => {
      stopClock = false;
      stopwatchReset = true;
      swSec = 0;
      swMin = 0;
      swH = 0;
      clock();
    });
  });
}

// STOPWATCH

let timeCount = setInterval(() => {
  if (!stopwatchReset) {
    swSec++;
    if (swSec < 10) {
      secsEl.textContent = "0" + swSec.toString();
    } else {
      secsEl.textContent = swSec;
    }
    if (swSec > 59) {
      swSec = 0;
      swMin++;
    }

    if (swMin < 10) {
      minsEl.textContent = "0" + swMin.toString();
    } else {
      minsEl.textContent = swMin;
    }
    if (swMin > 59) {
      swMin = 0;
      swH++;
    }

    if (swH < 10) {
      hoursEl.textContent = "0" + swH.toString();
    } else {
      hoursEl.textContent = swH;
    }

    if (swH == 99 && swMin == 59 && swSec == 59) {
      swSec = 0;
      swMin = 0;
      swH = 0;
    }
    console.log(swH, swMin, swSec);
  }
}, 1000);

// COUNTDOWN

startTimerEl.addEventListener("click", () => {
  console.log(startCountdown);

  document.querySelector(".timer-settings").classList.add("hidden");
  document.querySelector(".main-section").classList.remove("blur-active");
  daytimeEl.classList.add("flex-column");

  stopClock = true;
  hoursEl.textContent = setCountdownHoursEl.value;
  minsEl.textContent = setCountdownMinutesEl.value;
  secsEl.textContent = setCountdownSecondsEl.value;

  if (setCountdownHoursEl.value < 10) {
    hoursEl.textContent = "0" + setCountdownHoursEl.value.toString();
  }
  if (setCountdownHoursEl.value == "") {
    hoursEl.textContent = "00";
  }

  if (setCountdownMinutesEl.value < 10) {
    minsEl.textContent = "0" + setCountdownMinutesEl.value.toString();
  }
  if (setCountdownMinutesEl.value == "") {
    minsEl.textContent = "00";
  }

  if (setCountdownSecondsEl.value < 10) {
    secsEl.textContent = "0" + setCountdownSecondsEl.value.toString();
  }
  if (setCountdownSecondsEl.value == "") {
    secsEl.textContent = "00";
  }
  swSec = Number(secsEl.textContent);
  swMin = Number(minsEl.textContent);
  swH = Number(hoursEl.textContent);

  daytimeEl.innerHTML =
    '<button class="btn btn-stopwatch btn-end-countdown">Clear</button> <button class="btn btn-stopwatch btn-start-countdown">Start</button>';

  setCountdownHoursEl.value = "";
  setCountdownMinutesEl.value = "";
  setCountdownSecondsEl.value = "";

  startCountdown = false;
  document
    .querySelector(".btn-start-countdown")
    .addEventListener("click", () => {
      document.querySelector(".btn-start-countdown").style.pointerEvents =
        "none";

      const intervo = setInterval(() => {
        if (!startCountdown) {
          swSec--;
          console.log(swSec);
          secsEl.textContent = swSec;
          if (swSec < 10) {
            secsEl.textContent = "0" + swSec.toString();
          }
          if (swSec < 0) {
            swSec = 59;
            swMin--;
            minsEl.textContent = swMin;
            secsEl.textContent = swSec;
          }
          if (swMin < 10) {
            minsEl.textContent = "0" + swMin.toString();
          }
          if (swMin < 0 && swH > 0) {
            swMin = 59;
            swH--;
            minsEl.textContent = swMin;
            hoursEl.textContent = swH;
          }
          if (swH < 10) {
            hoursEl.textContent = "0" + swH.toString();
          }

          if (swH == 0 && swMin == 0 && swSec == 0) {
            startCountdown = true;
            addModal(modalRock[6], modalMsg[7]);
          }
        }
        // console.log(swSec);
        // /******************************************************************************* */
        // NOTE TO SELF: Stitched together in a panick, it somehow works, DO NOT DISTURB!!!!
        document
          .querySelector(".btn-end-countdown")
          .addEventListener("click", () => {
            clearInterval(intervo);
          });
      }, 1000);
    });
  document.querySelector(".btn-end-countdown").addEventListener("click", () => {
    stopClock = false;
    startCountdown = true;
    swSec = 0;
    swMin = 0;
    swH = 0;
    clock();
  });
  // /******************************************************************************* */
});

// ***********************************************

alarmEl.addEventListener("click", watchSettingsModal);
tutorialBtnEl.addEventListener("click", tutorialCarousel);
buttonEl.addEventListener("click", addGoal);
clearAllBtnEl.addEventListener("click", clearList);
clearAchBtnEl.addEventListener("click", clearAchievedGoals);
exitModalFourBtn.addEventListener("click", closeModal);
createListBtn.addEventListener("click", createGoalsList);
window.onload = () => {
  clock();
  dayAndDate();
};

// a = 23;
// b = a % 10;
// c = ~~(a / 10);

// console.log(a, c, b);
