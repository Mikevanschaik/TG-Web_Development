class Quiz {
  constructor(questionArray, quizCounter, prevAnswers) {
    this.appContainer = document.querySelector(".container");
    this.quizContainer = document.createElement("div");
    this.quizContainer.classList.add("quiz-container");
    this.questionAnswerContainer = document.createElement("div");
    this.questionAnswerContainer.classList.add("question-answers-container");
    this.answersList = document.createElement("ul");

    this.questionArray = questionArray;
    this.quizCounter = quizCounter;

    this.nextBtn = document.createElement("button");
    this.prevBtn = document.createElement("button");
    this.btnsContainer = document.createElement("div");

    this.answerHasBeenSelected = [false, false, false, false, false, false];
    this.givenAnswers = [null, null, null, null, null, null];
    this.correctAnswerNumber = 0;
  }

  init() {
    this.addQuizContentToAppContainer();
    this.addBtnsToAppContainer();
    this.getNextQuizQuestionOnClick();
    this.getPrevQuizQuestionOnClick();
    this.selectAnswer(this.questionArray[0]);
  }

  addTitleToQuizContainer() {
    const title = document.createElement("h1");
    title.innerText = "De Rekentoets";
    title.classList.add("quiz-title");
    this.quizContainer.appendChild(title);
  }

  addPageCounterToQuizContainer() {
    const counter = document.createElement("p");
    counter.innerText = (this.quizCounter + 1) + " / 6";
    counter.classList.add("page-counter");
    this.quizContainer.insertBefore(counter, document.querySelector(".question-answers-container"));
  }

  addQuestionToQaContainer(questionObj) {
    const questionElement = document.createElement("h2");
    questionElement.innerText = questionObj.question;
    questionElement.classList.add("question");
    this.questionAnswerContainer.appendChild(questionElement);
  }

  addAnswersToList(questionObj) {
    for (let answer of questionObj.possibleAnswers) {
      const answerElement = document.createElement("li");
      const answerNumber = document.createElement("span");
      const answerValue = document.createElement("span");

      answerElement.classList.add("answer");
      answerNumber.classList.add("answer-number");
      answerValue.classList.add("answer-value");

      let counter = "☺";
      answerNumber.innerText = counter;
      counter++;
      answerValue.innerText = answer;

      answerElement.appendChild(answerNumber);
      answerElement.appendChild(answerValue);
      this.answersList.appendChild(answerElement);
    }
  }

  addAnswersListToQaContainer() {
    this.answersList.classList.add("answers");
    this.questionAnswerContainer.appendChild(this.answersList);
  }

  addQuizContentToAppContainer() {
    this.addTitleToQuizContainer();
    this.addPageCounterToQuizContainer();
    this.addQuestionToQaContainer(this.questionArray[0]);
    this.addAnswersToList(this.questionArray[0]);
    this.addAnswersListToQaContainer();

    this.quizContainer.appendChild(this.questionAnswerContainer);
    this.appContainer.appendChild(this.quizContainer);
  }

  addBtnsToAppContainer() {
    this.nextBtn.classList.add("next-btn");
    this.prevBtn.classList.add("prev-btn");
    this.nextBtn.innerText = "Volgende";
    this.prevBtn.innerText = "Vorige";
    this.btnsContainer.appendChild(this.prevBtn);
    this.btnsContainer.appendChild(this.nextBtn);
    this.appContainer.appendChild(this.btnsContainer);
  }

  getNextQuizQuestionOnClick() {
    this.nextBtn.addEventListener("click", () => {
      let quizNumberToBeOpenend = ++this.quizCounter;
      for (let i = 0; i < questions.length; i++) {
        if (quizNumberToBeOpenend === i) {
          this.questionAnswerContainer.innerHTML = "";
          this.answersList.innerHTML = "";
          document.querySelector(".page-counter").remove();

          this.addPageCounterToQuizContainer(this.quizCounter);
          this.addQuestionToQaContainer(this.questionArray[i]);
          this.addAnswersToList(this.questionArray[i]);
          this.addAnswersListToQaContainer();
          this.selectAnswer(this.questionArray[i]);
        }
      }

      if (quizNumberToBeOpenend === questions.length) {
        if (this.givenAnswers.includes(null)) {
          alert(new Error("Nog niet alle vragen zijn beantwoord"));
          throw Error("Nog niet alle vragen zijn beantwoord");
        }
        this.quizContainer.remove();
        this.btnsContainer.remove();
        new Button("Herstart", new Button("Start", new Quiz(questions, 0)), this.correctAnswerNumber).init();
      }
    });
  }

  getPrevQuizQuestionOnClick() {
    this.prevBtn.addEventListener("click", () => {
      if (this.quizCounter === 0) {
        alert(new Error("Je kunt niet verder terug"));
        throw Error("Je kunt niet verder terug");
      }

      let quizNumberToBeOpenend = --this.quizCounter;
      for (let i = 0; i < questions.length; i++) {
        if (quizNumberToBeOpenend === i) {
          this.questionAnswerContainer.innerHTML = "";
          this.answersList.innerHTML = "";
          document.querySelector(".page-counter").remove();

          this.addPageCounterToQuizContainer(this.quizCounter);
          this.addQuestionToQaContainer(this.questionArray[i]);
          this.addAnswersToList(this.questionArray[i]);
          this.addAnswersListToQaContainer();
          this.selectAnswer(this.questionArray[i])
        }
      }
    });
  }

  colorCorrectAnswerGreen(questionObj) {
    const answerValues = document.querySelectorAll(".answer-value");
    for (let answerValue of answerValues) {
      if (answerValue.innerText === questionObj.correctAnswer.toString()) {
        answerValue.style.background = "green";
      }
    }
  }

  colorWrongAnswerRed(element, questionObj) {
    if (element.innerText !== questionObj.correctAnswer.toString()) {
      element.style.background = "red";
    }
  }

  colorPrevAnswers(questionObj) {
    if (this.answerHasBeenSelected[this.quizCounter] === true) {
      const answerValues = document.querySelectorAll(".answer-value");
      for (let answerValue of answerValues) {
        if (answerValue.innerText === this.givenAnswers[this.quizCounter]) {
          this.colorCorrectAnswerGreen(questionObj);
          this.colorWrongAnswerRed(answerValue, questionObj);
        }
      }
    };
  }

  selectAnswer(questionObj) {
    this.colorPrevAnswers(questionObj);
    const handleListener = () => {
      listenerFunction(event);
    }
    const listenerFunction = event => {
      if (event.target.classList[0] === "answer-value") {
        if (this.answerHasBeenSelected[this.quizCounter] === false) {
          this.givenAnswers[this.quizCounter] = event.target.innerText;

          console.log(this.givenAnswers[this.quizCounter]);
          console.log(questionObj.correctAnswer);

          if (this.givenAnswers[this.quizCounter] === questionObj.correctAnswer.toString()) {
            this.correctAnswerNumber++;
          }

          this.answerHasBeenSelected[this.quizCounter] = true;
          this.colorCorrectAnswerGreen(questionObj);
          this.colorWrongAnswerRed(event.target, questionObj);     
          
          window.removeEventListener("click", handleListener);
          return; 
        }
      }
    }
    window.addEventListener("click", handleListener); 
  }
}

class Button {
  constructor(btnName, instanceToBeCreated, correctAnswerNumber) {
    this.appContainer = document.querySelector(".container");
    this.btnName = btnName;
    this.btn = document.createElement(btnName);
    this.instanceToBeCreated = instanceToBeCreated;
    this.correctAnswerNumber = correctAnswerNumber;
    console.log(this.correctAnswerNumber)
  }

  init() {
    this.appContainer.innerHTML = "";
    this.addFinishTextToDOM();
    this.addBtnToDOM();
    this.runNewInstanceOnClick();
  }

  addBtnToDOM() {
    this.btn.classList.add(this.btnName);
    this.btn.setAttribute("type", "button");
    this.btn.innerText = this.btnName;
    this.appContainer.appendChild(this.btn);
  }

  addFinishTextToDOM() {
    if (this.btnName === "Herstart") {
      const finishText = document.createElement("p");
      finishText.classList.add("finish-text");
      if (this.correctAnswerNumber >= 4) {
        finishText.innerHTML = `Gefeliciteerd! je hebt ${this.correctAnswerNumber} van de 6 vragen goed! Je bent geen idioot!`
      } else {
        finishText.innerHTML = `Jammer... je hebt maar ${this.correctAnswerNumber} van de 6 vragen goed! Je bent een idioot!`
      }
      this.appContainer.appendChild(finishText);
    }
  }

  runNewInstanceOnClick() {
    this.btn.addEventListener("click", () => {
      this.btn.remove();
      this.instanceToBeCreated.init();
    });
  }
}

class Question {
  constructor(question, possibleAnswers, answerHasBeenSelected, correctAnswer) {
    this.question = question;
    this.possibleAnswers = possibleAnswers;
    this.answerHasBeenSelected = answerHasBeenSelected;
    this.correctAnswer = correctAnswer;
  }
}

const questions = [
  new Question("46 + 12", [58, 62, 13, 67, 5], false, 58),
  new Question("40 - 32", [26, 8, 14, 7, 6], false, 8),
  new Question("70 x 1", [31, 70, 71, 1, 56], false, 70),
  new Question("21 + 9", [30, 5, 6, 7, 8], false, 30),
  new Question("17 - 16", [5, 1, 7, 8, 0], false, 1),
  new Question("100 x 0", [7, 0, 9, 100, 12], false, 0),
];

const startQuiz = new Button("Start", new Quiz(questions, 0)).init();