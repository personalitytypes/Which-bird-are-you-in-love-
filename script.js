let userAnswers = [];
const questions = [
   { question: "How do you show love, bird-style?", answers: [
       "Physical Touch - Stay close!",
       "Words - Sing to them!",
       "Acts - Build a nest!",
       "Quality Time - Fly together!"
   ]},
   { question: "How would you impress a mate if you were a bird?", answers: [
       "Dance!", "Sing!", "Bring gifts!", "Fly together!"
   ]},
   { question: "If your partner is sad, what do you do as a loving bird?", answers: [
       "Cuddle!", "Chirp softly!", "Bring food!", "Take them somewhere fun!"
   ]}
];
let currentQuestionIndex = 0;
const nameInputContainer = document.getElementById("name-input-container");
const userNameInput = document.getElementById("user-name");
const submitNameBtn = document.getElementById("submit-name");
const welcomeMessage = document.getElementById("welcome-message");
const quizIntro = document.getElementById("quiz-intro");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");
const specialMessage = document.getElementById("special-message");
submitNameBtn.addEventListener("click", () => {
   let userName = userNameInput.value.trim(); // Trim spaces to avoid blank input
   if (userName !== "") {  // Check if name is not empty
       welcomeMessage.innerText = `Hey ${userName}! Let’s take flight into this fun quiz! 🚀🐦`;
       nameInputContainer.classList.add("hidden"); // Hide name input
       quizIntro.classList.remove("hidden"); // Show the next section
   } else {
       alert("Please enter your name before starting! 😊"); // Prevent empty input
   }
});
startBtn.addEventListener("click", () => {
   quizIntro.classList.add("hidden");
   quizContainer.classList.remove("hidden");
   setNextQuestion();
});
function setNextQuestion() {
   resetState();
   questionElement.innerText = questions[currentQuestionIndex].question;
   questions[currentQuestionIndex].answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerText = answer;
       button.classList.add("answer-button");
       button.addEventListener("click", () => selectAnswer(button));
       answerButtons.appendChild(button);
   });
}
function resetState() {
   nextBtn.classList.add("hidden");
   answerButtons.innerHTML = "";
}
function selectAnswer(selectedButton) {
   document.querySelectorAll(".answer-button").forEach(btn => btn.classList.remove("selected"));
   let selectedText = selectedButton.innerText;
   if (selectedText.includes("Physical Touch")) userAnswers.push("Physical Touch");
   else if (selectedText.includes("Words")) userAnswers.push("Words of Affirmation");
   else if (selectedText.includes("Acts")) userAnswers.push("Acts of Service");
   else if (selectedText.includes("Quality Time")) userAnswers.push("Quality Time");
   selectedButton.classList.add("selected");
   nextBtn.classList.remove("hidden");
}
nextBtn.addEventListener("click", () => {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
       setNextQuestion();
   } else {
       showResult();
   }
});
function showResult() {
   quizContainer.classList.add("hidden");
   resultContainer.classList.remove("hidden");
   let loveLanguageCount = { "Physical Touch": 0, "Words of Affirmation": 0, "Acts of Service": 0, "Quality Time": 0 };
   userAnswers.forEach(choice => loveLanguageCount[choice]++);
   let topLoveLanguage = Object.keys(loveLanguageCount).reduce((a, b) => loveLanguageCount[a] > loveLanguageCount[b] ? a : b);
   let birdData = {
       "Physical Touch": {
           type: "Parrot 🦜",
           animation: "parrot-animation",
           message: "You’re playful, affectionate, and love staying close to your partner. Like a parrot, you express love through touch, cuddles, and endless fun conversations! You never get tired of telling your loved ones how much they mean to you—sometimes even repeating it over and over!<br><br><b>I’d repeat ‘I love you’ a hundred times like a true parrot, but I’d rather just ask… will you be my one and only?</b>"
       },
       "Acts of Service": {
           type: "Penguin 🐧",
           animation: "penguin-animation",
           message: "You’re the definition of loyalty—once you love, you’re in it for life! Like a penguin, you believe in deep emotional bonds and love expressing affection through small but meaningful acts. Whether it’s bringing your partner their favorite treat or simply holding hands on a cold day, you always find ways to show love. <br><br><b>So, wanna slide into my heart forever?</b>"
       },
       "Words of Affirmation": {
           type: "Swan 🦢",
           animation: "swan-animation",
           message: "If love was a lake, you’d float in it forever. Like a swan, you believe in deep, meaningful connections and lifelong love. You enjoy romantic moments, sweet conversations, and making your partner feel truly special. <br><br>When you love, it’s forever—so, will you be my one and only?"
       },
       "Quality Time": {
           type: "Eagle 🦅",
           animation: "eagle-animation",
           message: "Love with you is never boring—it’s an adventure! Like an eagle, you take relationships to new heights, embracing both independence and deep passion. You want a partner who can fly beside you, soaring through life’s challenges and victories together. <br><br>So… wanna be my co-pilot in love?"
       }
   };
   let bird = birdData[topLoveLanguage];
   resultMessage.innerHTML = `<span class="animated-bird ${bird.animation}">You are a ${bird.type} in love!</span>`;
   specialMessage.innerHTML = `<p>${bird.message}</p>`;
   addBirdThemedButtons(bird.type);
document.getElementById("end-credit").classList.remove("hidden");
}
function addBirdThemedButtons(birdType) {
   let yesChoices = [
       "YES! 🥰",
       "Absolutely YES! 💖",
   ];
   yesChoices.forEach(choice => {
       let button = document.createElement("button");
       button.innerText = choice;
       button.classList.add("answer-button");
       button.addEventListener("click", () => alert("Yay! I knew you'd say yes ❤️ I love you to the moon"));
       resultContainer.appendChild(button);
   });
}
