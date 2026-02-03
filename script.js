const husbandName = "Gogul Shami";
const questions = [
    {
        question: `When did we first meet, ${husbandName}? 💫`,
        options: [
            "By pure destiny ✨",
            "When the universe pushed us together 😌",
            "I don’t remember the date, but I remember the feeling 💖",
            "Somewhere between fate and luck 😆",
            "I know the exact date & Place 😏"
        ],
        dateInputOption: 4
    },
    {
        question: "How did you officially fall in love with me? 😌",
        options: [
            "At first sight 😍",
            "After realizing I’m awesome",
            "Slowly… then all at once 💖",
            "I don’t remember, but I’m glad I did 😆"
        ],
        loveReveal: true
    },
    {
        question: "Who is more dramatic during arguments? 🎭",
        options: [
            "Me",
            "You",
            "Both of us 😅",
            "We don’t argue, we 'discuss' 😇"
        ],
        fightPopup: true
    },
    {
        question: "What is my superpower? 🦸‍♀️",
        options: [
            "Looking cute without trying 😍",
            "Knowing what you’re thinking",
            "Annoying you lovingly 😆",
            "All of the above"
        ]
    },
    {
        question: "Who would survive better without the other? 😏",
        options: [
            "Me",
            "You",
            "Neither of us",
            "Don’t even try"
        ],
        revealType: "together"
    }, {
        question: "What’s my love language with you? 💌",
        options: [
            "Words",
            "Actions",
            "Presence",
            "All of it, mixed"
        ],
        revealType: "loveLanguage"
    }, {
        question: "When do you feel most loved by me? ❤️",
        options: [
            "When I listen",
            "When I care quietly",
            "When I’m playful with you",
            "All the time"
        ],
        revealType: "mostLoved"
    },
    {
        question: "Will you be my Valentine today, tomorrow, and forever? 💍",
        options: [
            "Yes ❤️",
            "No 🔪"
        ],
        dangerOption: 1
    }
];
let currentQuestion = 0;
let noClickCount = 0;
function startQuiz() {
    document.getElementById("bgMusic").play();
    showQuestion();
}

function showQuestion() {
    document.getElementById("alertBox").innerHTML = "";
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    let optionsHTML = "";
    q.options.forEach((option, index) => {
        // SPECIAL: date input option (only for first question)
        if (q.dateInputOption === index) {
            optionsHTML += `
   <button class="btn btn-outline-danger w-100 mb-2"
            onclick="showDateInput()">
            ${option}
   </button>
        `;
        }
        // NO button chaos (last question)
        else if (q.dangerOption === index) {
            optionsHTML += `
   <button id="noBtn"
            class="btn btn-outline-danger w-100 mb-2 runaway"
            onmouseover="moveNoButton()"
            ontouchstart="moveNoButton()">
            ${option}
   </button>
        `;
        }
        // Normal options
        else {
            optionsHTML += `
           <button class="btn btn-outline-danger w-100 mb-2"
                onclick="${q.fightPopup
                    ? 'showFightPopup()'
                    : q.loveReveal
                        ? 'showLoveReveal()'
                        : q.allCorrect
                            ? 'showAllCorrect()'
                            : q.revealType
                                ? `handleReveal('${q.revealType}')`
                                : q.finalQuestion
                                    ? 'handleFinalAnswer(this)'
                                    : 'nextQuestion()'
                }">
                ${option}
           </button>
           
            `;
        }
    });
    document.getElementById("options").innerHTML = optionsHTML;
}


function moveNoButton() {
    const btn = document.getElementById("noBtn");
    if (!btn) return;
    const maxX = window.innerWidth - btn.offsetWidth - 10;
    const maxY = window.innerHeight - btn.offsetHeight - 10;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    btn.style.position = "absolute";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}
function dangerClicked() {
    noClickCount++;
    document.getElementById("alertBox").innerHTML =
        noClickCount === 1
            ? `<div class="alert alert-warning">😐 Are you sure about that, ${husbandName}?</div>`
            : `<div class="alert alert-danger">
          🚨 WRONG ANSWER 🚨<br>
          This option is permanently disabled 😌❤️
</div>`;
}
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    document.getElementById("question").innerText =
        `💖 Congratulations, ${husbandName}! 💖`;
    document.getElementById("options").innerHTML = `
<p class="fs-5 mt-3">
     You officially passed the Love Test 😘
</p>
<p class="mt-3">
     From the moment we met, my life changed forever.
     You are my comfort, my laughter, my safe place, and my home.
     I choose you — today, tomorrow, and forever. ❤️
</p>
<div class="heart-container">
 ${generateHearts()}
 
<h5 class="mt-4">📸 Screenshot this & send it to me 💕</h5>
 `;
 document.getElementById("loveTicket").classList.remove("hidden");
 const isMobile = window.innerWidth < 576;
    confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.6 }
    });

    showLoveToken();
}

function showDateInput() {
    document.getElementById("alertBox").innerHTML = "";
    document.getElementById("options").innerHTML = `
   <div class="text-start">
   <label class="form-label">
          😏 Okay genius… date AND place please
   </label>
   <input type="text"
          id="dateAnswer"
          class="form-control mb-3"
          placeholder="e.g. January 11, Dubai">
   <button class="btn btn-danger w-100"
          onclick="checkDateAnswer()">
          Submit 💕
   </button>
   </div>
    `;
}

function checkDateAnswer() {
    const answer = document
        .getElementById("dateAnswer")
        .value
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
    const correctAnswers = [
        "september 21, chennai",
        "september 21 chennai",
        "21 september, chennai",
        "21 september chennai",
        "sept 21, chennai",
        "sept 21 chennai"
    ];
    if (correctAnswers.includes(answer)) {
        document.getElementById("alertBox").innerHTML = `
   <div class="alert alert-success text-center">
   <div class="heart-container">
 ${generateHearts()}
   <h5>📍 Chennai ❤️</h5>
   <p class="mb-2">
            September 21 — a date I’ll always remember
   </p>
   <p class="fst-italic">
            Thank you for making that place safe again for me.
   </p>
   </div>
      `;
      const isMobile = window.innerWidth < 576;
        confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            nextQuestion();
        }, 4000);
    } else {
        document.getElementById("alertBox").innerHTML = `
   <div class="alert alert-warning text-center">
          😆 Almost!<br>
          Date + city, remember? 😉<br>
          Try again, my love 💕
   </div>
      `;
    }
}


function showLoveReveal() {
    document.getElementById("options").innerHTML = `
   <div class="alert alert-danger text-center">
   <div class="heart-container">
 ${generateHearts()}
   <h5 class="mb-2">💖 My truth 💖</h5>
   <p>
          I didn’t fall in love because of one big moment.
          I fell in love with you in the little things —
          the way you listened, the way you cared,
          the way you showed up for me without being asked.
   </p>
   <p class="fst-italic">
          Loving you felt easy… like home.
   </p>
   <button class="btn btn-danger mt-3 w-100"
          onclick="continueAfterLove()">
          Continue ❤️
   </button>
   </div>
    `;
}

function continueAfterLove() {
    nextQuestion();
}

function showFightPopup() {
    document.getElementById("options").innerHTML = `
    <div class="alert alert-warning text-center">
    <div style="font-size: 2.5rem;">
    <span class="fight-left">🤜</span>
    <span>💥</span>
    <span class="fight-right">🤛</span>
    </div>
    <h5 class="mt-2">Ding! Ding! Ding! 🔔</h5>
    <p class="mt-2">
           And in this corner… drama! 😆<br>
           But somehow, we always end up choosing each other ❤️
    </p>
    <button class="btn btn-danger mt-3 w-100"
           onclick="continueAfterFight()">
           Okay okay… continue 😄
    </button>
    </div>
     `;
}

function continueAfterFight() {
    nextQuestion();
}

function handleReveal(type) {
    let content = "";
    if (type === "together") {
        content = `
   <h5>😌 Nice try</h5>
   <p>
          But the truth is…<br>
          we’ve grown into <strong>us</strong> ❤️
   </p>
   <p>
          <strong>Vaada nee vena sandaiku vaada</strong>💪
   </p>
      `;
    }
    if (type === "loveLanguage") {
        content = `
   <h5>💌 The answer</h5>
   <p>
          It’s not just one thing.
   </p>
   <p>
          You love through your words,<br>
          your actions,<br>
          and simply by being there 🤍
   </p>
   <p class="fst-italic">
          That’s what makes it feel real.
   </p>
      `;
    }
    if (type === "mostLoved") {
        content = `
   <h5>❤️ My truth</h5>
   <p>
          Loving you isn’t something I turn on and off.
   </p>
   <p>
          It’s in the listening,<br>
          the quiet care,<br>
          and the laughter we share every day 😌
   </p>
      `;
    }
    document.getElementById("options").innerHTML = `
   <div class="alert alert-danger text-center heart-container">
   ${generateHearts()}
   ${content}
<button class="btn btn-danger mt-3 w-100"
     onclick="nextQuestion()">
     Continue ❤️
</button>
</div>
    `;
}

function generateHearts() {
    let heartsHTML = "";
    for (let i = 0; i < 6; i++) {
      const left = Math.random() * 90;
      const delay = Math.random() * 2;
      heartsHTML += `
   <span class="heart" style="left:${left}%; animation-delay:${delay}s;">
          ❤️
   </span>
      `;
    }
    return heartsHTML;
   }

   function redeemTicket() {
    document.getElementById("alertBox").innerHTML = `
   <div class="alert alert-danger text-center heart-container">
        ${generateHearts()}
   <h5>💋 Kiss Redeemed</h5>
   <p>
          This token can be redeemed anytime,<br>
          anywhere — no expiry 😌❤️
   </p>
   <p class="fst-italic">
          Terms & conditions: unlimited cuddles included.
   </p>
   </div>
    `;
   }